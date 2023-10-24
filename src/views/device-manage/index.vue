<template>
  <router-view v-slot="{ Component, route }">
    <keep-alive :max="5">
      <component :is="Component" :key="route.fullPath" />
    </keep-alive>
  </router-view>
</template>

<script>
export default {
  name: '',
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>
<style lang="less" scoped></style>
