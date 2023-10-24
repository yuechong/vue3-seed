<script setup>
import navHeader from './nav-header.vue';
import navSider from './nav-sider.vue';
import { useUserStore } from '@/stores/user.js';
const userStore = useUserStore();
</script>
<template>
  <div class="layout-view" :class="{ collapsed: userStore.collapsed }">
    <nav-header class="nav-header"></nav-header>
    <nav-sider class="nav-sider"></nav-sider>
    <div class="main">
      <div class="page-body">
        <router-view v-slot="{ Component, route }">
            <keep-alive :max="5">
              <component :is="Component" :key="route.fullPath" />
            </keep-alive>
        </router-view>
      </div>
    </div>
  </div>
</template>
<style lang="less">

// 菜单展开
.layout-view {
  width: 100%;
  min-height: 100vh;
  height: 100%;
  background-color: var(--body-bg);
  @navHeader: 96px;
  @navSider: 198px;

  .nav-header {
    width: 100%;
    height: @navHeader;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 998;
    background: var(--topbar-bg);
    padding-left: @navSider;

    .header-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 48px;
      padding-left: 11px;

      .left-flex {
        .collapsed-icon {
          display: inline-block;
          width: 20px;
          height: 20px;
        }
      }
    }

    .header-tags {
      width: 100%;
      height: 48px;
      padding: 0 16px;
      box-shadow: 0px 2px 8px 1px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
  }

  .nav-sider {
    width: @navSider;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    background: var(--nav-bg);
    /* x 偏移量 | y 偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色 */
    box-shadow: 2px 0px 6px 1px rgba(0, 21, 41, 0.35);
    box-sizing: border-box;
    user-select: none;

    .nav-sider-title {
      padding: 17px 22px;
      height: 56px;

      h3 {
        margin: 0;
        padding: 0;
        font-size: 22px;
        color: #ffffff;
        font-weight: 500;
      }
    }

    .nav-body {
      position: relative;
      height: calc(100vh - 56px);
      overflow: hidden;
    }

    // 菜单背景色
    .ant-menu.ant-menu-dark {
      background: var(--nav-bg);
    }

    // 子菜单背景色
    .ant-menu-dark .ant-menu-inline.ant-menu-sub {
      background: var(--nav-sub-bg);
    }

    // 子菜单选中li背景色
    .ant-menu-dark.ant-menu-dark:not(.ant-menu-horizontal) .ant-menu-item-selected {
      background-color: var(--nav-select-bg);
    }

    // 子菜单选中标题css
    .ant-menu-dark.ant-menu-dark:not(.ant-menu-horizontal)
      .ant-menu-item-selected
      .ant-menu-title-content {
      font-weight: 500;
    }

    .z-sider {
    }
  }

  .main {
    width: 100%;
    min-height: 100vh;
    height: 100%;
    padding-top: @navHeader;
    padding-left: @navSider;
    box-sizing: border-box;

    .page-body {
      width: 100%;
      height: 100%;
      padding: 16px;
    }
  }
}

// 菜单收起
.layout-view.collapsed {
  @navHeader: 96px;
  @navSider: 80px;
  .nav-header {
    padding-left: @navSider;
  }
  .nav-sider {
    width: @navSider;
  }
  .main {
    padding-top: @navHeader;
    padding-left: @navSider;
  }
}
</style>
