/**
 * Log 封装
 */
class Log {
  static error(mes) {
    return console.error(mes)
  }
  static log(mes) {
    return console.log(mes)
  }
  static warn(mes) {
    return console.warn(mes)
  }
}

export default Log