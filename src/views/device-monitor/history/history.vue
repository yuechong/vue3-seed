<template>
  <div class="history-page">
    <tabs />
    <div class="container">
      <div class="data-points">
        <div class="chart-item">1</div>
        <div class="chart-item2">2</div>
        <div class="chart-item">3</div>
        <div class="chart-item">
          <!-- <chart-dom :option="option" :actions="actions" style="width: 800px;height: 400px;"/> -->
        </div>
        {{ uid }}
        <a-button @click="datazoomFn(true)">datazoom</a-button>
        <a-button @click="resetDataZoomFn">resetDataZoom</a-button>
        <chart-dom
          :option="option"
          :actions="actions"
          style="width: 800px; height: 400px"
          @uid="getUidFn"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import tabs from '../comm/tabs.vue';
var option = window.$chartWork.generator({
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  toolbox: {
    itemSize:0,
    showTitle:false,
    // show: false,
    feature: {
      dataZoom: {
        yAxisIndex: 'none',
      },
      dataView: { readOnly: false },
      magicType: { type: ['line', 'bar'] },
      restore: {},
      saveAsImage: {}
    }
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }
  ]
});

console.log('ooo', option);

var actions = [
  {
    event: 'click',
    params: { data: 1 },
    handler: (params) => {
      console.log('params', params);
    }
  },
  {
    event: 'datazoom',
    params: { data: 1 },
    handler: (params) => {
      console.log('params', params);
    }
  }
];
const uid = ref();
function getUidFn(_uid) {
  uid.value = _uid;
}

function datazoomFn() {
  window.$chartWork.dataZoom(uid.value);
}

function resetDataZoomFn() {
  window.$chartWork.resetDataZoom(uid.value);
}
</script>
<style lang="less" scoped>
.history-page {
  .container {
    .data-points {
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      flex-wrap: wrap;
      gap: 0px;
      .chart-item {
        flex: 0 1 50%;
        background-color: red;
      }
      .chart-item2 {
        flex: 0 1 100%;
        background-color: red;
      }
    }
  }
}
</style>
