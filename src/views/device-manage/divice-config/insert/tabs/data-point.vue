<template>
  <div class="data-point-view">
    <div class="data-point-list">
      <a-form ref="form" :model="formState" name="basic" :label-col="{ flex: '180px' }" :hideRequiredMark="true"
        autocomplete="off">
        <div class="data-point-item" v-for="(item, index) in formState.point" :key="index">
          <div class="header">
            <div class="title">测点{{ index + 1 }}:</div>
            <a href="javascript:;" class="op" @click="deleteFn(index)">
              <svg-icon icon="close"></svg-icon>
            </a>
          </div>
          <div class="content">
            <!-- 测点名称 -->
            <a-form-item label="测点名称">
              <div class="flex-box">
                <a-form-item :name="['point', index, 'first']" :rules="{
                  required: true,
                  message: 'Missing first name'
                }" class="mb0">
                  <a-input v-model:value="item.first" placeholder="First Name" style="width: 200px" />
                </a-form-item>
                <a-form-item label="测点单位" :label-col="{ flex: '164px' }" class="mb0">
                  <a-input v-model:value="item.first" placeholder="First Name" style="width: 200px" />
                </a-form-item>
              </div>
            </a-form-item>
            <!--  网关-->
            <a-form-item label="网关" :name="['point', index, 'first']" :rules="{
              required: true,
              message: 'Missing first name'
            }">
              <div class="gate-input">
                <a-form-item :name="['point', index, 'first']" :rules="{
                  required: true,
                  message: 'Missing first name'
                }" class="mb0">
                  <a-input class="no-border" v-model:value="item.first" placeholder="网关id" style="width: 279px" />
                </a-form-item>
                <span>/</span>
                <a-form-item :name="['point', index, 'first']" :rules="{
                  required: true,
                  message: 'Missing first name'
                }" class="mb0">
                  <a-input class="no-border" v-model:value="item.first" placeholder="通道号id" style="width: 270px" />
                </a-form-item>
              </div>
            </a-form-item>
            <!-- 数据源映射 -->
            <a-form-item label="数据源映射" :name="['point', index, 'first']" :rules="{
              required: true,
              message: 'Missing first name'
            }">
              <a-select v-model:value="item.first" style="width: 564px">
                <a-select-option value="lucy">Lucy</a-select-option>
              </a-select>
            </a-form-item>
          </div>
        </div>
      </a-form>
      <div class="data-point-op">
        <a href="javascript:;" @click="insertFn">
          <span>增加一个测点</span>
          <svg-icon icon="plus"></svg-icon>
        </a>
      </div>
    </div>
    <div class="data-point-img">
      <div>传感器位置:</div>
      <div>
        <point-img :points="formState.point"
          :src="'https://axure-file.lanhuapp.com/855b36f7-2b25-4b3e-9684-5c63ef7e3c4b__fb7f1cdc2da0e1617caef8956f921240.png'" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, toRef } from 'vue';
import pointImg from '@/views/comm/point-img.vue';
const props = defineProps({ forms: Object });
const forms = toRef(props, 'forms');

const formState = ref({
  point: [{ name: '温度1', left: 0, top: 0, first: '', last: '', id: Date.now() }]
});

function deleteFn(index) {
  formState.value.point.splice(index, 1);
}

function insertFn() {
  formState.value.point.push({
    first: '',
    last: '',
    id: Date.now()
  });
}
</script>
<style lang="less">
.data-point-view {
  .data-point-list {
    .content {

      .ant-input,
      .ant-select:not(.ant-select-customize-input) .ant-select-selector {
        background-color: #f4f4f4;
        border-color: rgba(0, 0, 0, 0.45);
        border-radius: 4px;
      }

      .ant-input:focus,
      .ant-input-focused {
        outline: none;
        box-shadow: none;
      }

      .ant-input.no-border {
        border: 0 none;
        outline: none;
        box-shadow: none;
      }
    }
  }
}
</style>
<style lang="less" scoped>
@bg: #f4f4f4;
@color: #4e4e4e;

.data-point-list {
  padding: 24px 16px;
  background-color: #fff;
  margin-top: 16px;
  font-size: 16px;

  .data-point-item {
    background-color: @bg;
    border-radius: 6px;

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

      .op {
        width: 16px;
        height: 16px;
      }
    }

    .content {
      padding-top: 27px;
      padding-bottom: 24px;

      .flex-box {
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }

      .gate-input {
        width: 564px;
        height: 32px;
        background-color: @bg;
        border-radius: 4px;
        border: 1px solid rgba(0, 0, 0, 0.45);
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }
    }
  }

  .data-point-item+.data-point-item {
    margin-top: 16px;
  }

  .data-point-op {
    margin-top: 16px;
    height: 56px;
    width: 100%;

    a {
      display: block;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: @color;
      background-color: @bg;
      border-radius: 6px;

      span {
        padding-right: 5px;
        font-size: 20px;
        font-weight: 500;
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
}

.data-point-img {
  margin-top: 16px;
  padding: 24px 0 32px 118px;
  background-color: #fff;
  display: flex;
  justify-content: start;
  gap: 8px;
}
</style>
