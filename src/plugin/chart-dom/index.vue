<template>
  <div ref="chartDom" class="z-chart-dom"></div>
</template>

<script setup>
import { ref, watchEffect, onMounted, onBeforeUnmount } from 'vue';
const props = defineProps(['conf', 'option', 'actions']);
const emits = defineEmits(['uid']);

// actions = {
//   event:'click',
//   params: {},
//   handler: function(params){}
// }

// dom
const chartDom = ref();
const chartUid = ref();

const addListenEvent = function () {
  // console.log('props.actions',props.actions);
  if (Array.isArray(props.actions)) {
    props.actions.forEach((action) => {
      window.$chartWork.on(chartUid.value, action?.event, action?.handler);
    });
  } else {
    window.$chartWork.on(chartUid.value, props.actions?.event, props.actions?.handler);
  }
};
const removeListenEvent = function () {
  if (Array.isArray(props.actions)) {
    props.actions.forEach((action) => {
      window.$chartWork.off(chartUid.value, action?.event, action?.handler);
    });
  } else {
    window.$chartWork.off(chartUid.value, props.actions?.event, props.actions?.handler);
  }
};

onMounted(() => {
  if (!chartUid.value) {
    // console.log('dom',chartDom.value);
    chartUid.value = window.$chartWork.init(chartDom.value);
    emits('uid',chartUid.value);
  }
  if(props?.actions){
    addListenEvent();
  }
});

watchEffect(() => {
  // console.log('watchPostEffect',chartUid.value);
  // console.log('option', props.option);
  chartUid?.value && window.$chartWork.setOption(chartUid.value, props.option);
});

// 解绑事件，销毁图表
onBeforeUnmount(() => {
  if(props?.actions){
    removeListenEvent();
  }
  window.$chartWork.destroyed(chartUid.value);
});

// expose
defineExpose({
  uid:chartUid,
  chartDom:chartDom
});
</script>
<style lang="less">
.z-chart-dom {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
