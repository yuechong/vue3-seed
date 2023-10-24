<template>
  <div class="point-img-box">
    <img :src="imgSrc" alt="" srcset="" />
    <a
      href="javascript:;"
      class="point"
      v-for="item in points"
      :key="item.id"
      :title="item.name"
      v-dragmove
      :data-disabled="false"
      :data-id="item.id"
      @moveEvent="moveFn"
    ></a>
  </div>
</template>

<script setup>
import { ref, toRef } from 'vue';
const props = defineProps({
  src: String,
  points: Array
});

const imgSrc = toRef(props, 'src');
const points = toRef(props, 'points');


function  moveFn(){
  console.log('movefn',arguments);
}


</script>
<style lang="less">
.point-img-box {
  width: 564px;
  height: 310px;
  border-radius: 8px;
  border: 1px solid #d8d8d8;
  overflow: hidden;
  position: relative;
  img {
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 1;
    width: 372px;
    height: 215px;
    transform: translate(-50%, -50%);
    object-fit: cover;
    border: 0 none;
  }
  .point {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
    background-color: #000;
    width: 16px;
    height: 16px;
    border-radius: 50%;
  }
}
</style>
