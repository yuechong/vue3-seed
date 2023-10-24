<template>
  <div>
    <div>
      <div>
        <a-button type="primary" @click="insertChild(null)">新增一级菜单</a-button>
        {{ navMenu }}
      </div>
      <div>
        <a-button @click="saveFn">保存配置</a-button>
      </div>
      {{ selectedKeys }}
      <div>
        {{ formState }}
      </div>
    </div>
    <div class="mock-nav">
      <div class="nav-body" v-scroll>
        <a-tree
          v-model:selectedKeys="selectedKeys"
          :tree-data="navMenu"
          auto-expand-parent
          block-node
          default-expand-all
          @select="selectFn"
        >
          <!-- <template #switcherIcon="{ switcherCls }"><down-outlined :class="switcherCls" /></template> -->
          <template #title="{ data, selected }">
            <div class="flex-box">
              <svg-icon v-if="data.icon" :icon="data.icon"></svg-icon>
              <span>{{ data.title }}</span>
              <div class="btn">
                <a href="javascript:;" @click.stop="insertChild(data)">+</a>
                <a href="javascript:;" @click.stop="deleteChild(data)">-</a>
              </div>
            </div>
          </template>
        </a-tree>
        <a-menu mode="inline" theme="dark" class="z-sider">
          <template v-for="item in siderMenu" :key="item.name">
            <navSiderItem :menu-info="item" />
          </template>
        </a-menu>
      </div>

      <div class="params" v-show="showFormBool">
        <a-form
          :model="formState"
          name="basic"
          layout="inline"
          autocomplete="off"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
        >
          <a-form-item label="权限ID" name="pathId">
            <a-input v-model:value="formState.pathId" style="width: 80px" />
          </a-form-item>
          <a-form-item
            label="url path"
            name="path"
            :rules="[{ required: true, message: 'Please input your path!' }]"
          >
            <a-input v-model:value="formState.path" />
          </a-form-item>
          <a-form-item
            label="title"
            name="title"
            :rules="[{ required: true, message: 'Please input your title!' }]"
          >
            <a-input v-model:value="formState.title" />
          </a-form-item>

          <a-form-item label="icon" name="icon">
            <a-select v-model:value="formState.icon" style="width: 120px">
              <a-select-option v-for="icon in icons" :key="icon.key" :value="icon.value">
                <svg-icon :icon="icon.value"></svg-icon>
              </a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="visible" name="icon">
            <a-switch
              v-model:checked="formState.visible"
              checked-children="显示"
              un-checked-children="隐藏"
            />
          </a-form-item>

          <a-form-item label="keep-alive" name="icon">
            <a-switch
              v-model:checked="formState.keepAlive"
              checked-children="缓存"
              un-checked-children="正常"
            />
          </a-form-item>

          <a-form-item label="主页" name="icon">
            <a-checkbox v-model:checked="formState.home"></a-checkbox>
          </a-form-item>

          <a-form-item>
            <a-button type="primary" html-type="submit">{{
              btnType == 'insert' ? '新增' : '修改'
            }}</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import NavSiderItem from '@/views/layout-view/nav-sider-item.vue';

const iconFiles = import.meta.glob('/src/assets/svg/*.svg');
console.log('iconFiles', iconFiles);

const icons = Object.keys(iconFiles).map((filePath) => {
  return {
    key: filePath,
    value: filePath.replace(/(.*\/)*([^.]+).*/gi, '$2')
  };
});
const showFormBool = ref(false);
const btnType = ref('insert');
const selectedKeys = ref([]);
const navMenu = ref([]);
const formState = ref({
  pathId: undefined,
  path: undefined,
  title: undefined,
  icon: undefined,
  visible: true,
  keepAlive: false,
  home: undefined
});

function insertChild(parent = null) {
  console.log('parent', parent);
  resetForm();
  showFormBool.value = true;
  btnType.value = 'insert';
  if (!parent) {
    console.log('null');
    selectedKeys.value = [];
  } else {
    selectedKeys.value = [parent?.key];
  }
}

/**
 * 删除节点
 * @param {*} child
 */
function deleteChild(child) {
  deleteChildByKey(navMenu.value, child?.key);
  resetForm();
}
let tempItem;
function findByKey(arr, key) {
  tempItem = null;
  loop(arr, key);
  console.log('tempItem', tempItem);
  return tempItem;
}
function loop(arr, key) {
  for (let index = 0; index < arr.length; index++) {
    console.log('index', index);
    const item = arr[index];
    if (item?.key == key) {
      console.log('find', item);
      tempItem = item;
      return item;
    }
    if (item?.children && item.children.length) {
      loop(item.children, key);
    }
  }
}
function deleteChildByKey(arr, key) {
  for (let index = 0; index < arr.length; index++) {
    const item = arr[index];
    if (item?.key == key) {
      return arr.splice(index, 1);
    }
    if (item?.children && item.children.length) {
      deleteChildByKey(item.children, key);
    }
  }
}

function selectFn(key, { selected, node: { dataRef } }) {
  console.log(arguments);
  // 通过下标
  // const item = findByKey(navMenu.value, key);
  if (selected) {
    showFormBool.value = true;
    btnType.value = 'update';
    console.log('dataRef', dataRef);
    for (const key in formState.value) {
      formState.value[key] = dataRef.form[key];
    }
  } else {
    resetForm();
  }
}

function onFinish() {
  if (btnType.value === 'update') {
    const key = selectedKeys.value[0];
    console.log('insert parent key', key);
    let item = findByKey(navMenu.value, key);
    item.form = { ...formState.value };
    item.icon = formState.value?.icon;
    item.title = formState.value?.title;
    return;
  }
  if (selectedKeys.value.length) {
    const key = selectedKeys.value[0];
    console.log('insert parent key', key);
    const item = findByKey(navMenu.value, key);
    console.log('parent node', item);

    if (!(item?.children && item.children.length)) {
      item.children = [];
    }
    item.children.push(transToTree(formState.value));
  } else {
    navMenu.value.push(transToTree(formState.value));
  }

  resetForm();
}

function resetForm() {
  showFormBool.value = false;
  for (const key in formState.value) {
    formState.value[key] = undefined;
  }
  formState.value.visible = true;
  formState.value.keepAlive = false;
}

function transToTree(form) {
  const sid = Date.now();
  return {
    form: { ...form },
    icon: form?.icon,
    title: form?.title,
    key: sid
  };
}

function onFinishFailed() {}

/**
 * 保存成bar
 */
const siderMenu = ref([]);

function saveFn() {
  console.log(JSON.stringify(navMenu.value));
  const loop = (item) => {
    let temp = {
      name: item?.form?.path,
      path: item?.form?.path,
      pathId: item?.form?.pathId,
      visible: item?.form.visible,
      meta: {
        ...item.form
      }
    };
    if (item?.children && item.children.length) {
      temp.children = item.children.map(loop);
    }
    return temp;
  };
  // 过滤
  const filterLoop = (item) => {
    if (item.children && item.visible) {
      item.children = item.children.filter(filterLoop);
    }
    return item.visible === true;
  };

  siderMenu.value = navMenu.value.map(loop).filter(filterLoop);
  console.log('siderMenu', siderMenu);
}
</script>
<style lang="less" scoped>
.mock-nav {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  height: 100%;

  .flex-box {
    display: flex;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
    gap: 4px;
    padding-right: 40px;
    position: relative;
    .btn {
      position: absolute;
      right: 0;
      top: 0;
      a {
        font-size: 20px;
        padding: 0 8px;
      }
    }
  }
  .nav-body {
    flex: 0 0 300px;
    height: 100%;
    min-height: 60vh;
    background-color: #fff;
  }
  .params {
    flex: 1 1 auto;
  }
}
</style>
