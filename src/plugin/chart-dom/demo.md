<template>
  <div>
    <div class="demo-chart">
      <chart-dom :option="option" :actions="actions" />
      <chart-dom :option="option2" :actions="actions" />
    </div>
  </div>
</template>

<script setup>
var option =  window.$chartWork.generator({
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }
  ]
});

var actions = {
  event: 'click',
  params: { data: 1 },
  handler: (params) => {
    console.log('params', params);
  }
};
const option2 = window.$chartWork.generator({
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)'
      }
    }
  ]
});

console.log('option2',option2);
</script>
<style lang="less" scoped>
.demo-chart {
  width: 500px;
  height: 400px;
}
</style>
