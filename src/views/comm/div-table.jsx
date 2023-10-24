import { Empty } from 'ant-design-vue';
export default {
  name: 'ZTable',
  props: {
    column: Array,
    rows: { type: Array, default: () => [] }
  },
  data() {
    return {};
  },
  computed: {
    widthCalcObject() {
      let widthCounts = this.column.length;
      let width = 0;
      // 遍历
      for (let i = 0; i < this.column.length; i++) {
        const item = this.column[i];
        if (item.width) {
          width += item.width;
          widthCounts -= 1;
        }
      }
      return { width, widthCounts };
    },
    customWidth() {
      return (index) => {
        const colum = this.column[index];
        // 指定了宽度
        if (colum['width']) {
          return { width: colum['width'] + 'px' };
        }
        if (colum['minWidth']) {
          return { 'min-width': colum['minWidth'] + 'px' };
        }
        // 自动分摊
        const { width, widthCounts } = this.widthCalcObject;
        return {
          width: width === 0 ? `${100 / widthCounts}%` : `calc( (100% - ${width}px)/${widthCounts})`
        };
      };
    }
  },
  render() {
    console.log('this',this);
    return (
      <div class="ignore-ztable">
        <div class="zheader">
          <div class="tr">
            {this.column.map((c, i) => (
              <div class="th" key={c.key} style={this.customWidth(i)}>
                {c.title}
              </div>
            ))}
          </div>
        </div>
        <div class="zbody">
          {this.rows.map((row, index) => (
            <div class="tr" key={row['id'] || index}>
              {this.column.map((c, i) => (
                <div class="td" key={c.key} style={this.customWidth(i)}>
                  {c.slot && this.$slots[c.slot]
                    ? this.$slots[c.slot]({ [c.slot]: row[c.key], row: row, index: index })
                    : row[c.key]}
                </div>
              ))}
            </div>
          ))}
          {!this.rows.length && <a-empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
        </div>
      </div>
    );
  }
};
