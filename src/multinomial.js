/**
 * 
 * @param {Array} paramArr 参数数组 一维数组
 * @param {Array} resultArr 方程组根的数组 
 * @returns {Array} answerArr 答案 
 */
function multinomial(paramArr,resultArr) {
  function calcArray(paramArr, resultArr) {
    let len = resultArr.length
    // Math.pow(base，exponent) 函数返回基数（base）的指数（exponent）次幂如2^3=8
    if (Math.pow(len, 2) !== paramArr.length) return false
    let D = det(paramArr)
    let answerArr = []
    for (let i = 0; i < len; i++) {
      answerArr.push(det(mix(paramArr, resultArr, i)) / D)
    }
    return answerArr
  }
  /**
   * 求解行列式
  * @param {Array} arr 
  */
  function det(arr) {
    const size = Math.sqrt(arr.length)
    if (size === 2) {
      return arr[0] * arr[3] - arr[1] * arr[2]
    }
    let res = 0
    for (let i = 0; i < size; i++) {
      let unit = i % 2 === 0 ? 1 : -1
      res += unit * arr[i] * det(getRemainArray(arr, i))
    }
    return res
  }

  /**
   * 求解余子式 
  * @param {Array} array 数组
  * @param {int} index 位置（第一行） index < math.sqrt(array)
  */
  function getRemainArray(arr, index) {
    const size = Math.sqrt(arr.length)
    if (index >= size) return console.log("参数有误")
    const res = arr.filter((_, indey) => {
      return indey >= size && indey % size !== index
    })
    return res
  }
  function mix(paramArr, resultArr, index) {
    const size = resultArr.length
    let copy = JSON.parse(JSON.stringify(paramArr))
    for (let i = 0; i < size; i++) {
      copy.splice(i * size + index, 1, resultArr[i])
    }
    return copy
  }
  return calcArray(paramArr, resultArr)
}

export default multinomial