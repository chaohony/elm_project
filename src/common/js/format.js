export function format (date, fmt) {
  let reg = /(y+)/
  if (reg.test(fmt)) {
    let year = date.getFullYear() + ''
    fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 4 ? year : year.substring(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : paddingZeroWith(o[k]))
    }
  }
  return fmt
}
function paddingZeroWith (f) {
  f = f + ''
  return ('00' + f).substring(f.length)
}
