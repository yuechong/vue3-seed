<template>
  <div class="tag-nav">
    <div class="tag-item" v-for="tag in tagList" :key="tag?.fullPath" :class="{ active: tag.fullPath == currentFullpath }"
      @click="goPage(tag)">
      <a href="javascript:;" class="tag-title" :title="tag.title">{{ tag.title }}</a>
      <a href="javascript:;" class="close-link" @click.stop="closeFn(tag)"></a>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useTagsStore } from '@/stores/tags.js';
import { useRouter, useRoute } from 'vue-router';

const tags = useTagsStore();
const $router = useRouter();
const $route = useRoute();

const currentFullpath = ref('');
const tagList = computed(() => tags.tags);



// 路由监听
watch(() => $route.fullPath, (fullPath) => {
  currentFullpath.value = fullPath;
  // console.log('uuuuuu', {
  //   fullPath: fullPath,
  //   params: $route.params,
  //   query: $route.query,
  //   title: $route.meta?.title
  // });
  tags.insertTag({
    fullPath: fullPath,
    params: $route.params,
    query: $route.query,
    title: $route.meta?.title
  });
}, { immediate: true });
// // 路由守卫
// onBeforeRouteUpdate ((to, from) => {
//   // 在导航离开渲染该组件的对应路由时调用
//   // 与 `beforeRouteUpdate` 一样，它可以访问组件实例 `this`
//   console.log('onBeforeRouteUpdate  to',to);
//   console.log('onBeforeRouteUpdate  from',from);
// });

function closeFn(tag) {
  // console.log("TCL: closeFn -> tagList.value.length", tagList.value.length)
  tags.deleteTag(tag);
  const len = tagList.value.length;
  // console.log("TCL: closeFn -> tagList.value.length", tagList.value.length)
  if (len === 0) {
    $router.push({ name: 'layout' });
  } else {
    // 判断删除的是否是当前
    if ($route.fullPath === tag.fullPath) {
      const last = tagList.value[len - 1];
      goPage(last);
    }
  }
}
function goPage(tag) {
  // console.log("TCL: goPage -> tag", tag)
  if ($route.fullPath === tag.fullPath) {
    return;
  }
  $router.push({
    path: tag.fullPath,
    params: tag.params,
    query: tag.query,
    title: tag.query?.title
  });
}
</script>

<style lang="less">
.tag-nav {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  gap: 2px;

  .tag-item {
    position: relative;
    height: 100%;
    padding: 14px 21px 0;

    .tag-title {
      display: block;
      font-size: 18px;
      font-weight: 400;
      color: #7f7f7f;
      white-space: nowrap;
    }

    .close-link {
      position: absolute;
      right: 0;
      top: 16px;
      z-index: inherit;
      width: 12px;
      height: 12px;
      background: url('@/assets/images/tag-close.png') no-repeat left top;
      background-size: cover;
      display: none;
    }

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      background: var(--primary);
      width: 100%;
      height: 2px;
      display: none;
    }

    &:hover {
      .close-link {
        display: block;
      }
    }
  }

  .tag-item.active {
    &::after {
      display: block;
    }

    .tag-title {
      color: var(--primary);
    }
  }

  .tag-item:hover {
    .tag-title {
      color: var(--primary);
    }
  }
}
</style>
