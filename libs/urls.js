const urlPrefix = process.env.URL
console.log(urlPrefix)
console.log(process.env.NODE_ENV)
const urls = {
  getPlayInfo: '/getPlayInfo',
  reportPlayStatus: '/reportPlayStatus',
}
const getUrlPrefixs = (urls) => {
  const result = {}
  for (let i in urls) {
    if (!urls.hasOwnProperty(i)) continue
    result[i] = `${urlPrefix}${urls[i]}`
  }
  return result
}
export default getUrlPrefixs(urls)
