// import DPlayer from 'dplayer'
// import DPlayer from '../node_modules/DPlayer.min.js'
import DPlayer from './DPlayer.min.js'
import service from './request'
import md5 from 'js-md5'
import { isBrowser, getOs } from './isBrowser'
const map = {
  1: '标清',
  2: '高清',
  3: '超清',
}
// 1 开始  2 播放中 3 暂停  4结束
const state = {
  status: 1,
}
/**
 * 获取签名
 * @param {*} options
 */
const getSign = (options) => {
  const { appId, appKey } = options
  const timestamp = Date.now()
  const rand = Math.trunc(Math.random() * 10)
  return {
    appId,
    appKey,
    timestamp,
    rand,
    sign: md5(`${appId}-${appKey}-${rand}-${timestamp}`),
  }
}
/**
 * 获取播放信息参数
 * @param {*} options
 */
const getParams = (options) => {
  const { mediaId, protocol, definition, userId, ticket } = options
  return {
    mediaId,
    protocol,
    definition,
    userId,
    ticket,
  }
}
/**
 * 获取埋点参数
 * @param {*} options
 */
const getReportPlayParams = (options) => {
  const { mediaId, userId, seekTime, platform, sessionId } = options
  const status = state.status
  const browser = isBrowser()
  const os = getOs()
  return {
    mediaId,
    status,
    seekTime,
    userId,
    browser,
    os,
    platform,
    sessionId,
  }
}
const getPlayInfo = async (options) => {
  try {
    const params = {
      ...getParams(options),
      ...getSign(options),
    }
    const res = await service.getPlayInfo(params)
    return res
  } catch (e) {
    initErrorDPlayer({
      container: document.querySelector(options.container),
      video: {
        url: '.',
      },
    })
    throw new Error(e.message)
  }
}
/**
 * 埋点信息接口
 * @param {*} options
 */
const reportPlayStatus = async (options) => {
  try {
    const params = {
      ...getSign(options),
      ...getReportPlayParams(options),
    }
    const res = await service.reportPlayStatus(params)
    return res
  } catch (e) {
    throw new Error(e.message)
  }
}
// 埋点  暂停需要停止interval 状态改为暂停状态
const intervalReportPlayStatus = (cb, interval, options, dp) => {
  const intervalStatus = setInterval(() => {
    options.seekTime = dp.video.currentTime
    cb(options)
  }, interval / 100)
  dp.on('pause', () => {
    state.status = 3
    options.seekTime = dp.video.currentTime
    clearInterval(intervalStatus)
    cb(options)
  })
}
/**
 * 点击播放功能,校验时间是否过期，根据服务端返回的expiredTime字段比较大小
 * 埋点 播放状态为播放中需要循环调用埋点接口
 */
const dpPlayEvent = (dp, expiredTime, options) => {
  dp.on('play', () => {
    const dateNow = Date.now()
    state.status = 2
    intervalReportPlayStatus(
      reportPlayStatus,
      state.reportInterval,
      options,
      dp
    )
    if (expiredTime && expiredTime < dateNow) {
      singleDplayer(options)
    }
  })
}
/**
 *
 * @param {*} dp
 * @param {*} expiredTime
 * @param {*} options
 */
const dpQualityEvent = (dp, expiredTime, options) => {
  dp.on('quality_start', () => {
    const dateNow = Date.now()
    if (expiredTime && expiredTime < dateNow) {
      singleDplayer(options)
    }
  })
}
/**
 *
 * @param {*} options
 * @param {*} expiredTime 服务器对应最后失效时间戳
 * @param {*} curPlayLink 当前播放链接对比格式是否支持播放器
 * @param {*} quality 当前对应清晰度列表
 * 初始化dPlayer
 */

const initDplayer = (options, expiredTime, curPlayLink, quality) => {
  const { container } = options
  const option = {
    container: document.querySelector(container),
    video: {
      quality,
      defaultQuality: 0,
    },
    autoplay: false,
    lang: 'zh-cn',
    hotkey: true,
    theme: '#1DA57A',
  }
  const reg = /\.mp4|\.mov|\.m4v/
  if (!reg.test(curPlayLink)) {
    throw new Error(
      '本工具库只支持mp4, mov, m4v视频文件格式，请选择合适的视频文件格式！'
    )
  }
  const dp = new DPlayer(option)
  dpPlayEvent(dp, expiredTime, options)
  dpQualityEvent(dp, expiredTime, options)
}
/**
 * 媒体加载失败界面展示
 * @param {*} options 
 */
const initErrorDPlayer = (
  options = {
    container: document.querySelector('body'),
    video: {
      url: '.',
    },
  }
) => {
  new DPlayer(options)
}
const singleDplayer = (options) => {
  getPlayInfo(options).then((result) => {
    const data = result.data
    const { playInfo, expiredTime, reportInterval } = data
    state.reportInterval = reportInterval
    if (playInfo.length) {
      // 筛选所有清晰度
      let quality = playInfo.reduce((qualitys, curPlayInfo) => {
        const { playLink, definition } = curPlayInfo
        qualitys.push({
          name: map[definition],
          value: definition,
          url: playLink,
        })
        return qualitys
      }, [])
      let curPlayInfo = quality.filter((item) => item.value === data.definition)
      let curPlayLink = curPlayInfo.length && curPlayInfo[0].url
      initDplayer(options, expiredTime, curPlayLink, quality)
      // 埋点 第一次status状态为开始
      reportPlayStatus(options)
    }
  })
}
const dplayer = (options) => {
  singleDplayer(options)
}

export default dplayer
