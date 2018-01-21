export function loadFromLocal (id, key, dft) {
  let seller = window.localStorage.__seller__
  if (!seller) {
    return dft
  }
  seller = JSON.parse(seller)
  if (!seller[id]) {
    return dft
  }
  return seller[id][key] || dft
}
export function saveToLocal (id, key, value) {
  let seller = window.localStorage.__seller__
  if (!seller) {
    seller = {}
    seller[id] = {}
  }
  seller = JSON.parse(seller)
  if (!seller[id]) {
    seller[id] = {}
  }
  seller[id][key] = value
  window.localStorage.__seller__ = JSON.stringify(seller)
}
