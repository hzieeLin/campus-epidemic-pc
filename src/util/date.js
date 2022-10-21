
export function dateFormat(time, types) {
  const date = time === null ? new Date() : new Date(time)
  const year = date.getFullYear()
  const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
  const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
  const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
  const seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
  // 将时间全转换成秒
  // const H = `${date.getSeconds()}`
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
  let cur = 0
  if (sDate === eDate || sDate > eDate) return 1  //如果日期相同 返回一天
  else {
    cur = (eDate - sDate) / (24 * 60 * 60 * 1000) + 1
    console.log((14-cur)/14*100)
    return cur;
  }
}
