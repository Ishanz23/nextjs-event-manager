export const objToArray = (obj) => {
  let arr = []

  if (!obj) {
    return []
  }
  for (let key in obj) {
    arr.push(obj[key])
  }

  return arr
}
