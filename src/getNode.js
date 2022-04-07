
/**
 * 功能:
 * **/
function getNode(xArray,result) {
  const min = maxmin(xArray)[0]
  const max = maxmin(xArray)[xArray.length - 1]
  const newXarray = parts(min, max)
  const newYarray = y_parst(newXarray,result)
  return [newXarray,newYarray]
}
/**
 * 功能:对数组进行从小到大排序
 * 输入:欲排序的数组
 * 输出:排序后的数组
 * **/
function maxmin(xArray) {
  //数组从小到达排序
  xArray.sort((a, b) => a - b)
  //返回排序好的数组
  return xArray
}
/**
 * 功能:在从小到大的范围内,平均等分成20份
 * 输入1:最小值
 * 输入2:最大值
 * 输出:坐标数组
 * **/
function parts(min, max) {
  min = Number(min)
  max = Number(max)
  const n = (max-min)/20
  let x_coordinate = [min]
  let x_data  = min 
  for (let index = 1; index < 20; index++) {
    x_data = x_data + n
    x_coordinate.push(x_data)
  }
  x_coordinate[0] = min
  return x_coordinate
}
/**
 * 功能:根据x计算出y的值
 * 输入1:x数组
 * 输入2:公式常数
 * 输出:y数组
 * **/
function y_parst(newXarray,result) {
  const x = newXarray.length - 1
  const y = result.length - 1
  const Yarray = []
  for (let i = 0; i <= x; i++) {
    let y_data = 0
    for (let j = 0; j <= y; j++) {
      y_data += ( Number(result[j]) ) * ( Math.pow(Number(newXarray[i]), j) )
    }
    Yarray.push(y_data)
  }
  return Yarray
}
export default getNode