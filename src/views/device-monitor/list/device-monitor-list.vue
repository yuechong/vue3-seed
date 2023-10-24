<template>
  <div class="device-config-page">
    <div class="z-search-bar flex-between">
      <div class="left-form">
        <a-form layout="inline" :model="formState">
          <a-form-item label="设备类型">
            <a-select v-model:value="formState.user" style="width: 176px" placeholder="请选择">
              <a-select-option value="lucy">Lucy</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="设备名称">
            <a-input v-model:value="formState.user" placeholder="请输入设备名称"> </a-input>
          </a-form-item>
          <a-form-item label="设备序列号">
            <a-input v-model:value="formState.user" placeholder="请输入设备序列号"> </a-input>
          </a-form-item>
          <a-form-item>
            <a-button class="z-search-btn" type="primary"> 搜索 </a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
    <div class="z-table-card">
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
import { useRouter } from 'vue-router';
import { Modal } from 'ant-design-vue';
const $router = useRouter();

const formState = ref({
  user: undefined
});
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
function detailFn(record) {
  $router.push({ name: 'deviceMonitorListPanorama', params: { id: 1 } });
}
function changeFn({ current, pageSize }) {
  console.log('Page: ', current);
  // this.pagination.value.current = current;
}

function insertPage() {
  $router.push({ name: 'deviceConfigInsert' });
}
</script>
<style lang="less" scoped></style>
