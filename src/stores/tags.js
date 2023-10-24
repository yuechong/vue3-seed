import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useTagsStore = defineStore('tags', () => {
  const _ss = window.sessionStorage.getItem('tags');
  const tags = ref([]);
  if (_ss) {
    tags.value = JSON.parse(_ss);
  }
  function deleteTag(tag) {
    for (let i = tags.value.length - 1; i > -1; i--) {
      const item = tags.value[i];
      if (item.fullPath === tag.fullPath) {
        tags.value.splice(i, 1);
        break;
      }
    }
  }

  function arrIndex(fullPath) {
    for (let i = 0; i < tags.value.length; i++) {
      const tag = tags.value[i];
      if (tag.fullPath == fullPath) {
        return i;
      }
    }
    return -1;
  }

  function insertTag(tag) {
    // 判断下数据
    if (tag?.fullPath && tag.fullPath !== '/') {
      const index = arrIndex(tag.fullPath);
      if (index > -1) {
        tags.value.splice(index, 1, tag);
      } else {
        tags.value.push(tag);
      }
      if (tags.value.length > 5) {
        tags.value.shift();
      }
    }
    console.log('tags',tags);
  }
  function saveTagsSession() {
    // console.error("TCL: saveTagsSession -> saveTagsSession", 'saveTagsSession')
    window.sessionStorage.setItem('tags', JSON.stringify(tags.value));
  }
  function replaceTag(oldFullpath,tag) {
    console.log('replaceTag',oldFullpath);
    for (let i = tags.value.length - 1; i > -1; i--) {
      const item = tags.value[i];
      console.log('item.fullPath',item.fullPath);
      if (item.fullPath.indexOf(oldFullpath) > -1) {
        console.log('got it');
        tags.value.splice(i, 1,tag);
        break;
      }
    }
  }

  return { tags, insertTag, deleteTag,replaceTag, saveTagsSession };
});
