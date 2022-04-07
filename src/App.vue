<template>
  <div id="app">
    <div class="box">
      <div class="box_title">多项式曲线拟合在线模拟</div>
      <div class="box_shuru">
        <el-input
          class="box_shuru_input"
          type="textarea"
          clearable
          :rows="2"
          placeholder="请输入需要拟合的点，每个点用‘，’分割如：25，36，34，78为两组数据"
          v-model="textarea">
        </el-input>
        <el-button class="box_shuru_button" @click="polynomial" type="primary">开始绘制曲线</el-button>
         <el-button class="box_shuru_button" @click="cleare" type="primary">一键清空</el-button>
      </div>
      <div class="myFunction">函数方程式为：{{hanshu}}</div>
      <div class="box_line">
        <Home :conent="dataLine"/>
      </div>
    </div>
  </div>
</template>

<script>
import Home from './components/Home.vue'
import multinomial from "./multinomial"
import getMultionmial from '@/getMultionmial'
import getNode from './getNode'
export default {
  name: 'App',
  data() {
    return {
      textarea: '2545,3544,30455,4543,4455,43543',
      hanshu: 'F(x)=0.0008040804305537057XX+26.570447830629867X-58869.7406782458',
      dataLine:[[2545, 3940.5, 5336, 6731.5, 8127, 9522.5, 10918, 12313.5, 13709, 15104.5, 16500, 17895.5, 19291, 20686.5, 22082, 23477.5, 24873, 26268.5, 27664, 29059.5],[3543.999999999999, 33345.7177486911, 60015.67047120418, 83553.85816753926, 103960.28083769634, 121234.9384816754, 135377.83109947643, 146388.95869109948, 154268.3212565445, 159015.91879581154, 160631.7513089005, 159115.81879581153, 154468.1212565445, 146688.65869109944, 135777.4310994764,121734.4384816754,104559.6808376963,84253.15816753928,60814.870471204165,34244.81774869119]],
      result: [],
      xArray: []
    }
  },
  components: {
    Home
  },
  methods: {
    polynomial() {
      const that = this
      // 传入输入的数据根据数学模型得到多项式方程组
      const acquire = getMultionmial(this.textarea,that)
      // 得到含x的数组
      this.xArray = acquire[2]
      // 解多项式方程组获得函数的常数项
      this.result = multinomial(acquire[0],acquire[1])
      //执行得到函数表达式的方法
      this.hanshuDisplay()
      //执行得到坐标点的方法
      this.lindeNode()
    },
    // 得到函数表达式的方法
    hanshuDisplay() {
      const n = this.result.length - 1
      let myString = []
      const result =this.result.reverse()
      //把函数分成一个个数组，最后转换为字符串
      for (let index = n; index >= 0; index--){
        let x_data = 'X'
        for (let i=1; i<=n-1; i++) {
          x_data += 'X'
        }
        if(result[index]>1){
          myString[index] = '+' + result[index] + x_data.slice(0,index)
        }else if(result[index]==1){
          myString[index] = '+' + x_data.slice(0,index)
        }else if(result[index]==0){
          
        }else {
          myString[index] = result[index] + x_data.slice(0,index)
        }
      }
      // join方法将一个数组的所有元素连接成一个字符串并返回这个字符串。以参数为分隔
      let my_string = myString.reverse().join('')
      my_string = my_string.substring(1,my_string.length-1)
       if(my_string[0]=='-')
       {
        my_string = "-" + my_string        
       } 
      this.hanshu = 'F(x)='+my_string
    },
    // 得到坐标点的方法
    lindeNode() {
      this.dataLine = getNode(this.xArray,this.result)
      if( isFinite(this.dataLine[1][this.dataLine.length - 1] )) {
        this.$message({
          message: '模拟成功',
          type: 'success'
        });
      }else {
        this.$message.error('输入的数据不符合多项式 x, y 一一对应的规则。');
      }
    },
    //清空输入方法
    cleare() {
      this.textarea = ''
      this.$message({
        message: '清除成功',
        type: 'success'
      })
    }
  }
}
</script>

<style>
@import './assets/main.css';
.box {
  width: 100%;
  height: 100%;
}
.box_title {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 30px;
}
.box_line , .box_shuru {
  display: flex;
  justify-content: center;
}
.el-textarea {
  width: 500px !important;
  height: 50px !important;
}
.el-button {
  margin-left: 20px !important;
  height: 54px !important;
}
.myFunction {
  display: flex;
  justify-content: center;
  font-size: 10px;
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>
