<template>
  <div class="gallery-item">
    <img :src="src">
    <p class="caption" v-if="caption">{{ caption }}</p>
  </div>
</template>

<script>
export default {
  props: ['src', 'caption'],
}
</script>