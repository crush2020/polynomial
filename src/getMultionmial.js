function getMultionmial(textarea,that) {
  // 把输入的数据按“，”分割为一个数组
  const dataArray = textarea.split(',')
  if(dataArray.length%2 !=0) {
    that.$message.error('输入的数据不符合多项式 x, y 一一对应的规则。');
    return
  }
  //得到多项式函数的n
  const n = (dataArray.length / 2) - 1
  // 存储处理后的数据
  let xArray = []
  let yArray = []
  let lineArray = []
  // 把输入点的x，y分别存入对应数组中
  for (let index = 0; index < dataArray.length; index++) {
    if(index%2 ==0 || index == 0) {
      const x_data = dataArray[index]
      lineArray.push(x_data)
      // 把x带入数学模型中，得到一串常数项，并存入数组中
      for (let index = n; index >= 0; index--) {
        // Math.pow(base，exponent) 函数返回基数（base）的指数（exponent）次幂如2^3=8
        let newXdata = Math.pow(x_data, index)
        xArray.push(newXdata)
      }
    }else {
      // 把输入点的y存入数组
      yArray.push(dataArray[index])
    }
    
  }
  return [xArray,yArray,lineArray]
}
export default getMultionmial