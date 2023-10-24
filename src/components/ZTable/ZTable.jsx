import { h } from 'vue';
import { Table } from 'ant-design-vue';

export default {
  name: 'ZTable',
  props: {
    size: { type: String, default: 'middle' },
    rowKey: String,
    loading: Boolean,
    columns: Array,
    dataSource: Array,
    pagination: { type: [Object, Boolean], default: false }
  },
  setup(props, { attrs, slots, emit, expose }) {
    console.log('props', props);
    let _pagination = {
      ...props.pagination,
      showTotal: (total) => `共${total}条`,
      pageSizeOptions: [10, 20, 50],
      showQuickJumper: true,
      hideOnSinglePage: true,
      
    };
    console.log('_pagination',_pagination);
    return () =>
      h(
        Table,
        {
          ...props,
          ...attrs,
          pagination: _pagination,
          class: 'z-dark-table'
        },
        {
          ...slots
        }
      );
  }
};
