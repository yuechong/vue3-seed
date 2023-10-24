import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  // something vue-i18n options here ...
  locale: 'zh-cn',
  // allowComposition: true, // you need to specify that!
  messages: {
    en: {
      nav:{
        'side_menu_device_manage': 'device manage'
      }
      
    },
    'zh-cn': {
      nav:{
        'side_menu_device_manage': '设置管理'
      }
      
    }
  }
});

export default i18n;