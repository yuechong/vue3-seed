import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
  // i18n
  const locale = ref('zh-cn');
  function localChange(lang){
    locale.value = lang;
  }

  // collapsed
  const collapsed = ref(false);
  function toggelCollapsed(){
    collapsed.value = !collapsed.value;
  }
 
 

  
  return { locale,localChange,collapsed,toggelCollapsed };
});
