import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useCommStore = defineStore('comm', () => {
  const locale = ref('zh-cn');

  function localChange(lang){
    locale.value = lang;
  }
 
 

  
  return { locale,localChange };
});
