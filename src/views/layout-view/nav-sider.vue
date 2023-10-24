<template>
  <div>
    <div class="nav-sider-title">
      <h3 v-show="!collapsed">通用平台</h3>
    </div>
    <div class="nav-body" v-scroll>
      <a-menu v-model:openKeys="openKeys" :selectedKeys="selectedKeys" mode="inline" theme="dark"
        :inline-collapsed="collapsed" @click="pageGo" class="z-sider">
        <template v-for="item in navMenu" :key="item.name">
          <navSiderItem :menu-info="item" />
        </template>
      </a-menu>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import RouteApp from '@/router/route-app.js';
import { useUserStore } from '@/stores/user.js';
import navSiderItem from './nav-sider-item.vue';
const $router = useRouter();
const $route = useRoute();
const userStore = useUserStore();

const collapsed = computed(() => userStore.collapsed);
const selectedKeys = ref([]);
const openKeys = ref([]);

// 设置nav menu
const navMenu = ref([]);
watchEffect(() => {
  const apps = RouteApp();
  navMenu.value = initNav(apps);
  console.log('navMenu', navMenu);
});
// 设置导航条
watchEffect(() => {
  // console.log('$route nav', $route);
  // 导航条判断，一级还是多级

  const { matched, meta, name } = $route;
  if (meta?.leaf === true) {
    selectedKeys.value = [meta?.name];
    // 查找openKey
    openKeys.value = [matched[1].name];
  } else {
    // 3级路由
    if (matched.length === 3) {
      openKeys.value = matched.slice(1, -1).map((item) => {
        return item.name;
      });
      selectedKeys.value = [name];
    } else if (matched.length === 4) {
      console.log('matched 4444', matched);
      openKeys.value = [matched[1].name];
      selectedKeys.value = [matched[2].name];
    }
  }
});

function pageGo({ item, key, selectedKeys }) {
  console.log(';', arguments);
  $router.push({ name: key });
}

/**
 * 根据路由生成nav菜单
 * @param {*} app
 */
function initNav(app) {
  let arr = [];
  if (app && app.length) {
    for (let i = 0; i < app.length; i++) {
      const item = app[i];
      // console.log('item', item);
      // * 过滤
      if (item.path === '*') {
        continue;
      }
      if (item.meta?.ignore === true) {
        continue;
      }
      let obj = {
        path: item.path,
        name: item.name,
        meta: item.meta
      };
      if (item.children) {
        obj.children = initNav(item.children);
      }
      arr.push(obj);
    }
    // console.log('navMenu', array);
  }
  return arr;
}
</script>
