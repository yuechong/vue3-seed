# vue dom drag

## use

v-dragmove：默认为父容器，可指定具体父容器 id v-dragmove="box"

### dataset:

- disabled： 是否可拖动平移
- left： 相对于容器（默认父节点）定位的 left 的百分比
- top： 相对于容器（默认父节点）定位的 top 的百分比
### demo:
```
<div style="position:relative">
 <i style="position: absolute;"
    v-dragmove
    :data-disabled="false"
    @moveEvent="fn"
  />
</div>
```
