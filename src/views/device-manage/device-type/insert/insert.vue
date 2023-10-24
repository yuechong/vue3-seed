<template>
  <div class="device-type-insert-page">
    <a-form :model="formState" name="basic" :label-col="{ style: { width: '180px' } }" :wrapper-col="{ span: 16 }"
      :hideRequiredMark="true" autocomplete="off">
      <div class="form-card">
        <a-form-item label="设备类型" name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
          <a-input v-model:value="formState.username" style="width: 200px" />
        </a-form-item>
        <a-form-item label="设备默认图片" name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
          <upload-pic v-model="formState.src" />
        </a-form-item>
        <a-form-item label="备注" name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
          <a-input v-model:value="formState.username" style="width: 200px" />
        </a-form-item>
      </div>

      <div class="device-model">
        <h3 class="title">设备模板</h3>
        <div class="model-box">
          <a-form-item :label-col="{ span: 0 }">
            <div class="label-box">
              <a-input :value="'设备名称'" readonly style="width: 260px" />
              <span class="colon">:</span>
              <a-input disabled style="width: 564px" />
            </div>
          </a-form-item>
          <a-form-item :label-col="{ span: 0 }">
            <div class="label-box">
              <a-input :value="'设备序列号'" readonly style="width: 260px" />
              <span class="colon">:</span>
              <a-input disabled style="width: 564px" />
            </div>
          </a-form-item>
          <a-form-item :label-col="{ span: 0 }">
            <div class="label-box">
              <a-input :value="'设备品牌'" readonly style="width: 260px" />
              <span class="colon">:</span>
              <a-input disabled style="width: 564px" />
            </div>
          </a-form-item>
          <!-- label -->
          <a-form-item :label-col="{ span: 0 }" v-for="(item, index) in formState.labels" :key="index"
            :name="['labels', index, 'label']" :rules="{
              required: true,
              message: '请输入'
            }">
            <div class="label-box">
              <a-input v-model:value="item.label" style="width: 260px" />
              <span class="colon">:</span>
              <a-input disabled style="width: 564px" />
              <a href="javascript:;" @click="deleteLabelFn(index)">x</a>
            </div>
          </a-form-item>

          <div>
            <a href="javascript:;" class="insert-btn" @click="insertLabelFn">
              增加一个字段 <svg-icon icon="plus" />
            </a>
          </div>
        </div>
      </div>
      <div class="z-op-bar">
        <div class="btns">
          <a-button class="mr24 z-search-btn" @click="cancelFn">取消</a-button>
          <a-button class="z-search-btn" type="primary" @click="submitFn">保存</a-button>
        </div>
      </div>
    </a-form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useTagsStore } from '@/stores/tags.js';
import uploadPic from '@/views/comm/upload-pic.vue';

const $router = useRouter();
const $route = useRoute();
const { deleteTag } = useTagsStore();
const formState = ref({
  username: undefined,
  src: undefined,
  labels: []
});

function insertLabelFn() {
  formState.value.labels.push({ label: undefined });
}
function deleteLabelFn(index) {
  formState.value.labels.splice(index, 1);
}

function cancelFn() {
  // 删掉tag新增
  deleteTag({ fullPath: $route.fullPath });
  $router.push({ name: 'deviceTypeList' });
}
function submitFn() { }
</script>
<style lang="less" scoped>
.device-type-insert-page {
  .form-card {
    padding: 72px 24px 24px;
    background: #fff;
  }

  .device-model {
    margin-top: 16px;
    background-color: #fff;

    .title {
      padding: 0 30px;
      height: 38px;
      line-height: 36px;
      border-bottom: 2px solid #d8d8d8;
      color: #4e4e4e;
      font-size: 16px;
      font-weight: 400;
    }

    .model-box {
      padding: 32px 102px;

      .label-box {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 4px;

        .colon {
          font-size: 16px;
          font-weight: 400;
          color: #4e4e4e;
        }
      }

      .insert-btn {
        width: 836px;
        height: 34px;
        border-radius: 4px;
        border: 1px solid #d8d8d8;
        font-size: 15px;
        font-weight: 400;
        color: #141a33;
        display: flex;
        justify-content: center;
        align-items: center;

        svg {
          width: 12px;
          height: 12px;
          margin-left: 4px;
          color: #7f7f7f;
        }
      }
    }
  }
}
</style>
