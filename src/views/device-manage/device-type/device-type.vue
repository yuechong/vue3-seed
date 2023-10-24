<template>
  <div class="device-type-page">
    <div class="z-search-bar flex-between">
      <div class="left-form">
        <a-form layout="inline" :model="formState">
          <a-form-item label="设备类型">
            <a-input v-model:value="formState.user" placeholder="请输入设备名称"> </a-input>
          </a-form-item>
          <a-form-item>
            <a-button class="z-search-btn" type="primary"> 搜索 </a-button>
          </a-form-item>
        </a-form>
      </div>
      <div class="right-button">
        <a-button class="icon-button" @click="insertPage">
          <span>新增</span> <svg-icon :icon="'plus'" class="icon-plus" />
        </a-button>
      </div>
    </div>
    <div class="z-table-card">
      <z-table :loading="loading" :columns="columns" :dataSource="dataSource" :pagination="pagination" rowKey="id"
        @change="changeFn">
        <template #bodyCell="{ text, record, index, column }">
          <template v-if="column.key === 'status'">
            <a-switch class="z-switch" v-model:checked="record.status" checked-children="启用" un-checked-children="停用" />
          </template>
          <template v-if="column.key === 'op'">
            <div class="z-btn-group">
              <a class="z-text-btn" href="javascript:;">查看</a>
              <span class="divider"></span>
              <a class="z-text-btn" href="javascript:;" @click="deleteFn">删除</a>
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
    dataIndex: 'index',
    key: 'index'
  },
  {
    title: '设备类型',
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: '备注',
    dataIndex: 'a',
    key: 'a'
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: '操作',
    dataIndex: 'op',
    key: 'op'
  }
]);
const dataSource = ref([
  {
    index: '1',
    type: '胡彦斌',
    a: 32,
    status: '西湖区湖底公园1号'
  },
  {
    index: '1',
    type: '胡彦斌',
    a: 32,
    status: '西湖区湖底公园1号'
  },
  {
    index: '1',
    type: '胡彦斌',
    a: 32,
    status: '西湖区湖底公园1号'
  }
]);
const pagination = ref({
  current: 1,
  pageSize: 10,
  total: 200
});


function deleteFn() {
  Modal.confirm({
    title: 'Confirm',
    // icon: createVNode(ExclamationCircleOutlined),
    content: 'Bla bla ...',
    okText: '确认',
    cancelText: '取消',
  });
}


function changeFn({ current, pageSize }) {
  console.log('Page: ', current);
  // this.pagination.value.current = current;
}

function insertPage() {
  $router.push({ name: 'deviceTypeInsert' });
}
</script>
<style lang="less" scoped></style>
