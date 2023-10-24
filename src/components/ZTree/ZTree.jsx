import ZTreeItem from './ZTreeItem';

export default {
  name: 'ZTree',
  components: { ZTreeItem },
  props: {
    column: Array,
    treeData: { type: Array, default: () => [] },
    defaultExpandAll: { type: Boolean, default: false },
    switchCloseIcon: { type: String, default: '' },
    switchOpenIcon: { type: String, default: '' }
  },
  emits: ['select'],
  data() {
    return {
      data: [],
      selectItem: null
    };
  },
  watch: {
    treeData: {
      immediate: true,
      handler(newArr) {
        this.treeDataParse(newArr);
      }
    }
  },
  render() {
    const slots = this.$slots;
    // console.log('slots', slots);

    return (
      <div class="z-tree-box">
        {this.data.map((item) => (
          <ZTreeItem
            class="level1"
            key={item.id}
            item={item}
            selectItem={this.selectItem}
            v-slots={slots}
            titleClick={this.titleClick}
          ></ZTreeItem>
        ))}
      </div>
    );
  },
  methods: {
    /**
     * uuid
     * @date 2021-07-15
     * @returns {string} uuid
     */
    getUUID() {
      const randomItem = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      return (
        randomItem() +
        randomItem() +
        '-' +
        randomItem() +
        '-' +
        randomItem() +
        '-' +
        randomItem() +
        '-' +
        randomItem() +
        randomItem() +
        randomItem()
      );
    },
    treeDataParse(tree) {
      console.log('treeDataParse tree', tree);
      let result = [];
      const { defaultExpandAll, switchCloseIcon, switchOpenIcon } = this;
      const loop = function (temp, arr) {
        arr.forEach((item) => {
          let obj = {
            ...item,
            id: item.id || getUUID(),
            expanded: item?.expanded || defaultExpandAll,
            switchCloseIcon: switchCloseIcon || null,
            switchOpenIcon: switchOpenIcon || null,
            fileIcon: item.fileIcon || null,
            isLeaf: false
          };
          if (item.children) {
            obj.children = [];
            loop(obj.children, item.children);
          } else {
            obj.isLeaf = true;
          }
          temp.push(obj);
        });
      };

      loop(result, tree);

      console.log('ssss', result);
      this.data = result;
    },
    titleClick(data) {
      console.log('titleClick', data);
      this.selectItem = data;
      this.$emit('select',data)
    }
  }
};
