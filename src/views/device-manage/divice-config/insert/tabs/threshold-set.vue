<template>
  <div class="thresold-set-view">
    <div class="data-point-list">
      <a-form
        ref="form"
        :model="formState"
        name="basic"
        :label-col="{ flex: '180px' }"
        :hideRequiredMark="true"
        autocomplete="off"
      >
        <div class="data-point-item" v-for="(item, index) in formState.points" :key="index">
          <div class="header">
            <div class="title">测点{{ index + 1 }}:</div>
          </div>
          <div class="content">
            <a-form-item>
              <div class="flex-box">
                <a-checkbox v-model:checked="item.use"></a-checkbox>
                <a-form-item
                  class="mb0"
                  label="上阙值"
                  name="username"
                  :label-col="{ flex: '68px' }"
                  :rules="[{ required: true, message: 'Please input your username!' }]"
                >
                  <a-input v-model:value="formState.username" :disabled="!item.use" />
                </a-form-item>
                <a-form-item
                  class="mb0"
                  label="回程值"
                  name="username"
                  :label-col="{ flex: '120px' }"
                  :rules="[{ required: true, message: 'Please input your username!' }]"
                >
                  <a-input v-model:value="formState.username" :disabled="!item.use" />
                </a-form-item>
                <a-tooltip placement="rightTop" :color="'#fff'" overlayClassName="info-tooltip">
                  <template #title>
                    <p class="txt-info">当xx（温度1）下降至xx（50-5）时，解除报警。</p>
                  </template>
                  <a href="javascript:;" class="info-icon">
                    <svg-icon icon="info"></svg-icon>
                  </a>
                </a-tooltip>
              </div>
            </a-form-item>
            <a-form-item>
              <div class="flex-box">
                <a-checkbox v-model:checked="item.use"></a-checkbox>
                <a-form-item
                  class="mb0"
                  label="下阙值"
                  name="username"
                  :label-col="{ flex: '68px' }"
                  :rules="[{ required: true, message: 'Please input your username!' }]"
                >
                  <a-input v-model:value="formState.username" :disabled="!item.use" />
                </a-form-item>
                <a-form-item
                  class="mb0"
                  label="回程值"
                  name="username"
                  :label-col="{ flex: '120px' }"
                  :rules="[{ required: true, message: 'Please input your username!' }]"
                >
                  <a-input v-model:value="formState.username" :disabled="!item.use" />
                </a-form-item>
                <a-tooltip placement="rightTop" :color="'#fff'" overlayClassName="info-tooltip">
                  <template #title>
                    <p class="txt-info">当xx（温度1）下降至xx（50-5）时，解除报警。</p>
                  </template>
                  <a href="javascript:;" class="info-icon">
                    <svg-icon icon="info"></svg-icon>
                  </a>
                </a-tooltip>
              </div>
            </a-form-item>
          </div>
        </div>
      </a-form>
    </div>
  </div>
</template>

<script setup>
import { ref, toRef } from 'vue';
const props = defineProps({ formState: Object, inputDisabled: Boolean });

const formState = toRef(props, 'formState');
</script>
<style lang="less" scoped>
@color: #4e4e4e;
.thresold-set-view {
  .data-point-list {
    .data-point-item {
      background-color: #fff;
      margin-top: 16px;
      .header {
        padding: 0 8px 0 24px;
        height: 35px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 2px solid #d8d8d8;

        .title {
          font-size: 16px;
          font-weight: 500;
          color: @color;
        }
      }
      .content {
        padding: 27px 44px 24px;
        .flex-box {
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
        .info-icon {
          margin-left: 4px;
          width: 24px;
          height: 24px;
          svg {
            width: 24px;
            height: 24px;
          }
        }
      }
    }
  }
}
</style>
