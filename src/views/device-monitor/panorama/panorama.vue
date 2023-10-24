<template>
  <div class="panorama-page">
    <tabs />
    <div class="flex-between">
      <div>
        <h3>在线监测</h3>
      </div>
      <div>
        <h3>基本信息</h3>
        <ul>
          <li></li>
        </ul>
      </div>
    </div>
    <div>
      <h3>历史报警</h3>
      <z-table
        :loading="loading"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="pagination"
        rowKey="id"
        @change="changeFn"
      >
        <template #bodyCell="{ text, record, index, column }">
          <template v-if="column.key === 'op'">
            <div class="z-btn-group">
              <a class="z-text-btn" href="javascript:;" @click="detailFn(record)">查看</a>
            </div>
          </template>
        </template>
      </z-table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import tabs from '../comm/tabs.vue';

const loading = ref(false);
const columns = ref([
  {
    title: '序号',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '设备类型',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '设备名称',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: '设备序列号',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '设备品牌',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: '操作',
    dataIndex: 'op',
    key: 'op'
  }
]);
const dataSource = ref([
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号'
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号'
  }
]);
const pagination = ref({
  current: 1,
  pageSize: 10,
  total: 200
});
</script>
<style lang="less" scoped></style>
