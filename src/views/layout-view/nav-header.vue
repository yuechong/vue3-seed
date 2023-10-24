<template>
  <div>
    <div class="header-top">
      <div class="left-flex">
        <a href="javascript:;" @click="userStore.toggelCollapsed">
          <svg-icon :icon="'collapsed'" class="collapsed-icon"></svg-icon>
        </a>
      </div>
      <div class="right-flex"></div>
    </div>
    <div class="header-tags" v-scroll>
      <tag-list />
    </div>
  </div>
</template>

<script setup>
import tagList from './comm/tag-list.vue';
import {useUserStore} from '@/stores/user.js';

const userStore = useUserStore();
</script>
