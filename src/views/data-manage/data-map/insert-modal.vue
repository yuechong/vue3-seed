<template>
  <a-modal class="data-map-insert-dialog" :visible="visible" :closable="false" :footer="null" :width="690">
    <template #title>
      <div class="flex-between">
        <div class="ant-modal-title">{{ title }}</div>
        <a-button v-if="mtype === 'detail'" type="primary" ghost="true" class="z-edit-btn" @click="editFn">编辑 <svg-icon
            icon="edit" /></a-button>
      </div>
    </template>
    <div class="data-map-insert">
      <a-form :model="formState" name="basic" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }"
        :hideRequiredMark="true" autocomplete="off">
        <a-form-item label="映射规则名称" name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
          <a-input v-model:value="formState.username" placeholder="请输入映射规则名称" />
        </a-form-item>
        <a-form-item label="备注" name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
          <a-input v-model:value="formState.username" placeholder="请输入备注信息" />
        </a-form-item>
        <a-form-item label="映射规则配置" style="padding-top: 8px"> </a-form-item>
        <a-form-item v-for="item in dataMaps" :key="item.id" :label-col="{ span: 0 }"
          :wrapper-col="{ offset: 2, span: 22 }" :colon="false">
          <a-row gutter="12">
            <a-col :span="4">
              <a-select v-model:value="item.origin">
                <a-select-option value="源字段">源字段</a-select-option>
                <a-select-option value="默认值">默认值</a-select-option>
              </a-select></a-col>
            <a-col :span="8">
              <a-form-item style="margin-bottom: 0" name="username" :label-col="{ span: 0 }"
                :rules="[{ required: true, message: 'Please input your username!' }]">
                <a-input v-model:value="formState.username" placeholder="请输入备注信息" style="width: 190px" />
              </a-form-item>
            </a-col>
            <a-col :span="2"> <span>——></span></a-col>
            <a-col :span="8"> <a-input readonly :value="item.to" /></a-col>
            <a-col :span="2"> <a href="javascript:;">?</a></a-col>
          </a-row>
        </a-form-item>
      </a-form>
    </div>
    <!-- footer -->
    <div class="footer-btns" v-if="mtype !== 'detail'">
      <a-button class="mr24 z-search-btn" @click="cancelFn">取消</a-button>
      <a-button class="z-search-btn" type="primary" :loading="loading" @click="submitFn">保存</a-button>
    </div>
  </a-modal>
</template>

<script setup>
import { ref, computed, toRef } from 'vue';
const props = defineProps({ modelValue: Boolean, title: String, mtype: String, mdata: Object });
const emits = defineEmits(['update:modelValue', 'updateMtype', 'refresh']);

const title = toRef(props, 'title');
const visible = toRef(props, 'modelValue');
const mtype = toRef(props, 'mtype');

const loading = ref(false);
const formState = ref({
  username: undefined
});

const dataMaps = [
  { id: 1, origin: '源字段', value: undefined, to: 'device_id' },
  { id: 1, origin: '源字段', value: undefined, to: 'device_id' },
  { id: 1, origin: '源字段', value: undefined, to: 'device_id' },
  { id: 1, origin: '源字段', value: undefined, to: 'device_id' },
  { id: 1, origin: '源字段', value: undefined, to: 'device_id' },
  { id: 1, origin: '源字段', value: undefined, to: 'device_id' }
];

function editFn() {
  emits('updateMtype', 'update');
}

function cancelFn() {
  emits('update:modelValue', false);
}
function submitFn() { }
</script>
<style lang="less">
.data-map-insert-dialog {
  .ant-modal-header {
    padding: 18px 16px 13px;
  }

  .data-map-insert {
    .ant-form-item {
      margin-bottom: 16px;
    }
  }

  .footer-btns {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
