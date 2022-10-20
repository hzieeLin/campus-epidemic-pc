
export function dateFormat(time, types) {
  const date = time === null ? new Date() : new Date(time)
  const year = date.getFullYear()
  const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
  const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
  const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
  const seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
  // 将时间全转换成秒
  const H = `${date.getSeconds()}`
  if (types === 0) {
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  } else if (types === 1) {
    return `${hours}:${minutes}:${seconds}`
  } else if (types === 2) {
    return `${month}.${day}`
  } else if (types === 3) {
    return `${date.getSeconds()}`
  } else if (types === 4) {
    return `${day}`
  }
}
export function getDaysBetween(startDate, enDate) {
  const sDate = Date.parse(startDate)
  console.log(sDate)
  const eDate = Date.parse(enDate)
  console.log(eDate)
  if (sDate > eDate) return 0    //开始日期大于结束日期，返回0
  if (sDate === eDate) return 1  //如果日期相同 返回一天
  const cur = (eDate - sDate) / (24 * 60 * 60 * 1000)
  return cur/14*100;
}
