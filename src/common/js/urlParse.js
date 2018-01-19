/**
 * @example ?id=12345&a=b
 * @return obj {id: 12345, a: b}
 */
export function urlParse () {
  let url = window.location.search
  let reg = /[?&][^?&]+=[^?&]+/g
  let obj = {}
  if (reg.test(url)) {
    let arr = url.match(reg)
    arr.forEach((item, index) => {
      let tempArr = item.substring(1).split('=')
      let key = tempArr[0]
      let value = tempArr[1]
      obj[key] = value
    })
  }
  return obj
}
