<script setup>
import { computed } from 'vue';
const props = defineProps({
  prefix: {
    type: String,
    default: 'icon'
  },
  icon: {
    type: String,
    required: true
  },
  size: {
    type: String,
    default: '1em'
  }
});

const symbolId = computed(() => `#${props.prefix}-${props.icon}`);
</script>

<template>
  <svg aria-hidden="true" class="svg-icon" :width="props.size" :height="props.size">
    <use :xlink:href="symbolId" />
  </svg>
</template>
