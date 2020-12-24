import axios from 'axios'
import urls from './urls'

const handleRes = (result, handleResolve, handleReject) => {
  const { data, status } = result
  // 处理异常，正确返回resolve状态
  if (data && status === 200 && data.status === 100000) {
    handleResolve(data)
  } else {
    handleReject(data)
  }
}

const httpHelpctors = (options) => {
  return new Promise((resolve, reject) => {
    options.headers = {
      'Content-Type': 'application/json',
    }
    axios(options).then((res) => {
      handleRes(res, resolve, reject)
    })
  })
}

class http {
  static post(opt) {
    return httpHelpctors({ method: 'post', ...opt })
  }
}
// 接口方法封装
const controller = {
  getPlayInfo: (params) => {
    return http.post({
      params,
      url: urls.getPlayInfo,
    })
  },
  reportPlayStatus: (params) => {
    return http.post({
      params,
      url: urls.reportPlayStatus,
    })
  },
}

export default controller
