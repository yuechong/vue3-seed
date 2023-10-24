# 表格

表格组件
<ZTable
  :loading="loading"
  :columns="columns"
  :dataSource="dataSource"
  :pagination="pagination"
  rowKey="id"
  @change="changeFn" 
>
  <div slot="action" slot-scope="action, item, index">
    <a-button size="small" type="danger" @click="bindReducerFn(item)" v-show="!bindReducersIds.includes(item.id)">
    选择
    </a-button>
    <a-button size="small" @click="deleteBindReducerFn(item.id)" v-show="bindReducersIds.includes(item.id)">
    取消
    </a-button>
  </div>
</ZTable>

# js
## data:
dataSource: [],
pagination: {
  current: 1,
  pageSize: 8,
  hideOnSinglePage: true,
  showQuickJumper: true,
  total: 0,
  name: ''
}

## methods
/**
* 分页
*/
changeFn({ current }) {
  console.log('Page: ', current);
  this.pagination.current = current;
  this.reducerList();
},

