<template>
  <div class="config-insert-page">
    <div class="z-search-bar flex-between">
      <div>
        <a-button class="mr14" :type="currentTab === 1 ? 'primary' : 'default'" @click="toggelTabFn(1)">基本信息</a-button>
        <a-button class="mr14" :type="currentTab === 2 ? 'primary' : 'default'" @click="toggelTabFn(2)">数据测点</a-button>
        <a-button class="mr14" :type="currentTab === 3 ? 'primary' : 'default'" @click="toggelTabFn(3)">阙值设置</a-button>
      </div>
      <div>
        <a-button v-if="mtype === 'detail'" type="primary" ghost="true" class="z-edit-btn" @click="editFn">编辑 <svg-icon
            icon="edit" /></a-button>
      </div>
    </div>
    <div class="tabs">
      <!-- 基本信息 -->
      <div class="z-table-card" v-show="currentTab === 1">
        <base-info :input-disabled="inputDisabled" :formState="formState" />
      </div>
      <!-- 数据测点 -->
      <div class="tabs" v-show="currentTab === 2">
        <data-piont :input-disabled="inputDisabled" :formState="formState" />
      </div>
      <!-- 阙值设置 -->
      <div class="tabs" v-show="currentTab === 3">
        <threshold-set :input-disabled="inputDisabled" :formState="formState" />
      </div>
    </div>
    <div class="z-op-bar">
      <div class="btns">
        <a-button class="mr24 z-search-btn">取消</a-button>
        <a-button v-show="currentTab != 3" class="z-search-btn" type="primary" @click="nextTabFn">下一步</a-button>
        <a-button v-show="currentTab == 3" class="z-search-btn" type="primary" @click="submitFn">保存</a-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, computed } from 'vue';
import { useRoute } from 'vue-router';
import baseInfo from './tabs/base-info.vue';
import dataPiont from './tabs/data-point.vue';
import thresholdSet from './tabs/threshold-set.vue';

const $route = useRoute();
const currentTab = ref(1);
const mtype = ref('insert');
const inputDisabled = computed(() => {
  return mtype.value !== 'insert';
});

const formState = ref({
  points: [ {use:false} ]
});

function toggelTabFn(tabIndex) {
  currentTab.value = tabIndex;
}
function nextTabFn() {
  // 校验表单,下一步
  currentTab.value++;
}

function editFn() { }

// 表单提交
function submitFn() {
  // 调用各自子组件的表单校验
  // Promise.all();
}

onBeforeMount(() => {
  // $route.name
  // 判断页面是新增|详情|编辑
});
</script>
<style lang="less">
.config-insert-page {
  .ant-form-item-label>label {
    font-size: 16px;
  }

  .ant-input {
    font-size: 16px;
    padding: 2px 11px;
  }
}
</style>
