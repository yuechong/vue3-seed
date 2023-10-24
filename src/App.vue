<script setup>
import { ref, watchEffect } from 'vue';
import { RouterView } from 'vue-router';
import { useCommStore } from '@/stores/comm.js';
import enUS from 'ant-design-vue/es/locale/en_US';
import zhCN from 'ant-design-vue/es/locale/zh_CN';

const { locale } = useCommStore();
const lang = ref(zhCN);

watchEffect(() => {
  if (locale.value === 'zh-cn') {
    lang.value = zhCN;
  } else if (locale.value === 'en') {
    lang.value = enUS;
  } else {
    lang.value = zhCN;
  }
});
</script>

<template>
  <a-config-provider :locale="lang">
    <RouterView />
  </a-config-provider>
</template>

<style lang="less" scoped></style>
