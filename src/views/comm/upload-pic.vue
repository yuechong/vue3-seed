<template>
  <div class="upload-pic">
    <input ref="input" type="file" accept="*" hidden @change="changeFile">
    <!-- 图片显示界面 -->
    <div v-if="src" class="image-show">
      <img :src="src" alt="">
      <div class="mask" v-show="!disabled">
        <a-button class="update-pic-btn" @click="triggerInput">更换图片</a-button>
      </div>
    </div>
    <!-- 图片上传界面 -->
    <div class="image-insert" v-show="!src" @click="triggerInput">
      <a href="javascript:;" class="pic-icon">
        <svg-icon icon="plus"></svg-icon>
      </a>
      <div>上传照片</div>
    </div>
  </div>
</template>

<script setup>
import { ref, toRef } from 'vue';
const props = defineProps({ 'modelValue': String,'disabled':Boolean });
const emits = defineEmits(['update:modelValue', 'upload']);

const src = toRef(props, 'modelValue');
const disabled = toRef(props,'disabled');

const input = ref();
function triggerInput() {
  input.value.value = null;
  input.value.click();
}
function changeFile(e) {
  console.log('changeFile', e);
  const file = e.target.files[0];
  let reader = new FileReader();
  reader.onload = function () {
    console.log('base', this.result);
    emits('update:modelValue', this.result);
    emits('upload');
  }
  reader.readAsDataURL(file);
}

</script>
<style lang='less' scoped>
.upload-pic {
  width: 564px;
  height: 310px;
  border-radius: 2px 2px 2px 2px;
  border: 1px solid rgba(0, 0, 0, 0.15);

  .image-show {
    width: 100%;
    height: 100%;
    position: relative;

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 2px 2px 2px 2px;
    }

    .mask {
      position: absolute;
      left: 0;
      top: 0;
      z-index: inherit;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.67);
      display: none;

      .update-pic-btn {
        position: absolute;
        left: 50%;
        top: 50%;
        z-index: inherit;
        transform: translate(-50%, -50%);
        color: var(--primary);
        border-color: var(--primary);
      }
    }

    &:hover {
      .mask {
        display: block;
      }
    }

  }

  .image-insert {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.04);
    text-align: center;
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    font-weight: 400;
    padding-top: 129px;
    cursor: pointer;

    .pic-icon {
      display: inline-block;
      width: 24px;
      height: 24px;

      color: rgba(0, 0, 0, 0.65);
    }
  }
}
</style>