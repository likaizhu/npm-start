import Log from './console'
import { isBrowser } from './isBrowser'
import dplayer from './dPlayer'
class video {
  constructor(options) {
    const { container, mediaId, appKey, appId } = options
    try {
      if (!container || container === 'undefined' || container === 'null') {
        throw new Error('container is required, please add container')
      }
      if (!mediaId) {
        throw new Error('mediaId is required, as a String')
      }
      if (!appKey || appKey === 'undefined' || appKey === 'null') {
        throw new Error('appKey must be required')
      }
      if (!appId || appId === 'undefined' || appId === 'null') {
        throw new Error('appId must be required')
      }
      // 浏览器版本监控
      isBrowser()
      dplayer(options)
    } catch (e) {
      Log.error(e)
    }
  }
}
export default video
