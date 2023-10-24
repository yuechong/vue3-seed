<template>
  <!-- 一级 -->
  <template v-if="!menuInfo?.children || menuInfo.meta?.leaf">
    <a-menu-item :key="menuInfo.name">
      <template #icon v-if="menuInfo?.meta?.icon">
        <svg-icon :icon="menuInfo.meta.icon" />
      </template>
      {{ menuInfo?.meta?.title }}
    </a-menu-item>
  </template>
  <!-- 多级 -->
  <template v-else>
    <a-sub-menu :key="menuInfo.name" v-bind="$props">
      <template #icon v-if="menuInfo?.meta?.icon">
        <svg-icon :icon="menuInfo.meta.icon" />
      </template>
      <template #title>{{ menuInfo?.meta?.title }}</template>
      <!-- level2 -->
      <template v-for="item in menuInfo.children" :key="item.name">
        <!-- no child or ignore-->
        <a-menu-item v-if="!item.children || item.meta.ignore" :key="item.name">
          <template #icon v-if="item?.meta?.icon">
            <svg-icon :icon="item.meta.icon" />
          </template>
          {{ item?.meta?.title }}
        </a-menu-item>
        <!-- loop -->
        <nav-sider-item v-else :menu-info="item" />
      </template>
    </a-sub-menu>
  </template>
</template>

<script>
import { Menu } from 'ant-design-vue';

export default {
  name: 'NavSiderItem',
  // must add isSubMenu: true
  isSubMenu: true,
  props: {
    ...Menu.SubMenu.props,
    // Cannot overlap with properties within Menu.SubMenu.props
    menuInfo: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>

<style></style>
