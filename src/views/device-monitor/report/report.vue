<template>
  <div class="report-page">
    <tabs />
    {{ id }}
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
              <a class="z-text-btn" href="javascript:;" @click="goPageFn">查看</a>
            </div>
          </template>
        </template>
      </z-table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import tabs from '../comm/tabs.vue';
const $router = useRouter();
const $route = useRoute();

const id = $route.params?.id;
const loading = ref(false);
const columns = ref([
  {
    title: '序号',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '报表编号',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '时间',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: '报表详情',
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
function changeFn({ current, pageSize }) {
  console.log('Page: ', current);
  // this.pagination.value.current = current;
}

function goPageFn() {
  $router.push({ name: 'deviceMonitorListReportDetail', params: { id, rid: 1 } });
}
</script>
<style lang="less" scoped></style>
