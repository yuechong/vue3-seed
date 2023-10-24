<template>
  <div class="z-search-bar flex-between">
    <div>
      <a-button
        v-for="tab in tabs"
        :key="tab.name"
        class="mr14"
        :type="currentTab === tab.name ? 'primary' : 'default'"
        @click="goPage(tab)"
        >{{ tab.title }}</a-button
      >
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';

const $route = useRoute();
const $router = useRouter();

const id = $route.params?.id;
const currentTab =
  $route.name === 'deviceMonitorListReportDetail' ? 'deviceMonitorListReport' : $route.name;
const tabs = [
  { title: '设备全景', name: 'deviceMonitorListPanorama' },
  { title: '历史数据', name: 'deviceMonitorListHistory' },
  { title: '智能报表', name: 'deviceMonitorListReport' }
];

function goPage({ name }) {
  $router.push({ name, params: { id } });
}
</script>

<style lang="less" scoped></style>
