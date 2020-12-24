import Log from './console'
const isBrowser = () => {
  const agent = navigator.userAgent.toLowerCase()
  const msie = agent.match(/msie\s([\d\.]+)/)
  const edge = agent.match(/edge\/([\d\.]+)/)
  const chrome = agent.match(/chrome\/([\d\.]+)/)
  const opera = agent.match(/(?:opera|opr).([\d\.]+)/)
  const firefox = agent.match(/firefox\/([\d\.]+)/)
  const safari = agent.match(/version\/([\d\.]+).*safari/)
  const browsers = { msie, edge, chrome, opera, firefox, safari }
  const map = {
    msie: 'ie',
    edge: 'edge',
    chrome: 'chrome',
    opera: 'opera',
    firefox: 'firefox',
    safari: 'safari',
  }
  if (msie && msie[1] <= 10) {
    throw new Error('本组件暂不支持IE11以下版本的浏览器，请升级浏览器版本!')
  }
  for (let key of Object.keys(map)) {
    if (browsers[key]) {
      Log.log(`${map[key]}=====>版本号${browsers[key][0]}`)
      return map[key]
    }
  }
}

const getOs = () => {
  let sUserAgent = navigator.userAgent
  let isWin = navigator.platform == 'Win32' || navigator.platform == 'Windows'
  let isMac =
    navigator.platform == 'Mac68K' ||
    navigator.platform == 'MacPPC' ||
    navigator.platform == 'Macintosh' ||
    navigator.platform == 'MacIntel'
  if (isMac) return 'Mac'
  let isUnix = navigator.platform == 'X11' && !isWin && !isMac
  if (isUnix) return 'Unix'
  let isLinux = String(navigator.platform).indexOf('Linux') > -1
  if (isLinux) return 'Linux'
  if (isWin) {
    let isWin2K =
      sUserAgent.indexOf('Windows NT 5.0') > -1 ||
      sUserAgent.indexOf('Windows 2000') > -1
    if (isWin2K) return 'Win2000'
    let isWinXP =
      sUserAgent.indexOf('Windows NT 5.1') > -1 ||
      sUserAgent.indexOf('Windows XP') > -1
    if (isWinXP) return 'WinXP'
    let isWin2003 =
      sUserAgent.indexOf('Windows NT 5.2') > -1 ||
      sUserAgent.indexOf('Windows 2003') > -1
    if (isWin2003) return 'Win2003'
    let isWinVista =
      sUserAgent.indexOf('Windows NT 6.0') > -1 ||
      sUserAgent.indexOf('Windows Vista') > -1
    if (isWinVista) return 'WinVista'
    let isWin7 =
      sUserAgent.indexOf('Windows NT 6.1') > -1 ||
      sUserAgent.indexOf('Windows 7') > -1
    if (isWin7) return 'Win7'
    let isWin10 =
      sUserAgent.indexOf('Windows NT 10') > -1 ||
      sUserAgent.indexOf('Windows 10') > -1
    if (isWin10) return 'Win10'
  }
  return 'other'
}
export { isBrowser, getOs }
