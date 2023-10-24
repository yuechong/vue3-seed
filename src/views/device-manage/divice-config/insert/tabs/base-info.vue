<template>
  <div class="tab-base-info">
    <a-form ref="form" :model="formState" name="basic" :label-col="{ flex	: '200px' }" :wrapper-col="{flex	: '564px' }"
      :hideRequiredMark="true" autocomplete="off">
      <a-form-item label="设备类型" name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
        <a-input v-model:value="formState.username" placeholder="请输入设备类型" :disabled="disabled"/>
      </a-form-item>
      <a-form-item label="设备名称" name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
        <a-input v-model:value="formState.username" placeholder="请输入设备名称"  :disabled="disabled"/>
      </a-form-item>
      <a-form-item label="设备序列号" name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
        <a-input v-model:value="formState.username" placeholder="请输入设备序列号"  :disabled="disabled"/>
      </a-form-item>
      <a-form-item label="设备品牌" name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
        <a-input v-model:value="formState.username" placeholder="请输入设备品牌"  :disabled="disabled"/>
      </a-form-item>
      <!-- 自有模板表单字段 -->
      <a-form-item v-for="item in selfLabels" :key="item.value" :label="item.label" :name="item.value"
        :rules="[{ required: true, message: 'Please input your username!' }]">
        <a-input v-model="formState[item.value]" :placeholder="'请输入' + item.label"  :disabled="disabled"/>
      </a-form-item>

      <a-form-item label="设备图片" name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
        <upload-pic v-model="formState.src"  :disabled="disabled"/>
      </a-form-item>

    </a-form>
  </div>
</template>

<script setup>
import { ref, onBeforeMount ,toRef} from 'vue';
import uploadPic from '../../../../comm/upload-pic.vue';

const props = defineProps({
  inputDisabled: Boolean
});

const disabled = toRef(props,'inputDisabled');

const selfLabels = ref();
const formState = ref({});

const form = ref(null);
function formValid() {

}

function pageInit() {
  selfLabels.value = [
    { label: '主轴系统转速', value: 'a' },
    { label: '进给速度', value: 'b' },
  ];
}

onBeforeMount(() => {
  pageInit();
});


defineExpose({ formValid });
</script>
<style lang='less' scoped></style>