import { createApp } from 'vue';
import { createPinia } from 'pinia';
// import axios from './http/index';
import App from './App.vue';
import router from './router';
import i18n from './i18n';

import 'virtual:svg-icons-register';

import './assets/main.less';

import {
  Row,
  Col,
  Form,
  Input,
  Checkbox,
  Switch,
  Select,
  Button,
  Table,
  Spin,
  Modal,
  Empty,
  Tree
} from 'ant-design-vue';

import 'ant-design-vue/es/message/style/css';
import 'ant-design-vue/es/modal/style/css';
import 'ant-design-vue/es/table/style/css';

import svgIcon from '@/components/SvgIcon.vue';
import ZTable from '@/components/ZTable/ZTable.jsx';
import PerfectScrollbar from '@/directives/perfect-scroll.js';
import DragMove from '@/directives/dragmove/dragmove.plugin.js';
import ChartDom from '@/plugin/chart-dom/index';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);
app
  .use(Row)
  .use(Col)
  .use(Form)
  .use(Input)
  .use(Checkbox)
  .use(Switch)
  .use(Select)
  .use(Button)
  .use(Table)
  .use(Spin)
  .use(Modal)
  .use(Empty)
  .use(Tree);

app.use(DragMove);
app.use(ChartDom);
app.component('svg-icon', svgIcon);
app.component('z-table', ZTable);
app.directive('scroll', PerfectScrollbar);
app.mount('#app');
