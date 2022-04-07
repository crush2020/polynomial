<template>
  <div class="home">
    <div ref="myLine" :style="{ height: '500px', width: '800px' }" />
  </div>
</template>

<script>
export default {
  name: "Home",
  props: {
    conent: {
      type: Array,
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.drawLine();
    });
  },
  watch: {
    conent() {
      this.drawLine()
    }
  },
  methods: {
    drawLine() {
      const myChart = this.$echarts.init(this.$refs.myLine);
      let option = {};
      option = {
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          name: "x",
          data: this.conent[0],
        },
        yAxis: {
          type: "value",
          name: "F(x)",
        },
        series: [
          {
            data: this.conent[1],
            type: "line",
            name: 'F(x)',
            smooth: true,
          },
        ],
      };
      myChart.setOption(option);
    },
  },
};
</script>

<style>
</style>
