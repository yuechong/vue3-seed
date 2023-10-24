export default {
  name: 'ZTreeItem',
  props: {
    item: Object,
    selectItem: Object,
    titleClick: Function
  },
  data() {
    return {};
  },
  computed: {
    selectItemId() {
      return this.selectItem?.id;
    }
  },
  render() {
    const slots = this.$slots;
    // console.log('child slots', slots);
    const { item, selectItem, selectItemId, toggelSelectFn } = this;
    return (
      <div
        class={{
          'z-tree-item': true,
          open: item.expanded,
          leaf: item.isLeaf,
          active: item.id == selectItemId
        }}
        onclick={(e) => toggelSelectFn(e, item)}
      >
        <div class="title-flex">
          {item.switchOpenIcon && !item.isLeaf && (
            <span class="switch-icon">
              <svg-icon
                icon={item.expanded ? item.switchCloseIcon : item.switchOpenIcon}
              ></svg-icon>
            </span>
          )}
          {this.item.fileIcon && (
            <span class="file-icon">
              <svg-icon icon={item.fileIcon}></svg-icon>
            </span>
          )}

          <a href="javascript:;" class="title" title={item.title}>
            {slots?.title?.(item) || item.title}
          </a>
        </div>

        {item.children && (
          <div class="z-tree-child">
            {item.children.map((child) => (
              <ZTreeItem
                key={child.id}
                item={child}
                selectItem={selectItem}
                titleClick={this.titleClick}
                v-slots={slots}
              ></ZTreeItem>
            ))}
          </div>
        )}
      </div>
    );
  },
  methods: {
    toggelSelectFn(e,data) {
      e.stopPropagation();
      if (data.isLeaf) {
        this.selectChange(data);
      } else {
        data.expanded = !data.expanded;
      }
    },
    selectChange(data) {
      this.titleClick( data);
    }
  }
};
