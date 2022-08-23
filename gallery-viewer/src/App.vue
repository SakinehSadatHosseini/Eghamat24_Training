<!-- <template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template> -->

<template>
  <div>
    <!-- directive -->
    <div class="images" v-viewer>
      <img class="image" v-for="src in images" :key="src" :src="src">
    </div>
    <button type="button" @click="show">Click to show</button>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
  export default defineComponent({
    data() {
      return {
        images: [
          "/images/1.jpg",
          "/images/2.jpg",
          "/images/3.jpg",
          "/images/4.jpg",
          "/images/5.jpg",
          "/images/6.jpg"
        ]
      };
    },
    methods: {
      show() {
        this.$viewerApi({
          images: this.images,
        })
      },
    },
})

</script>

<style>
.images {
    height: 200px;
    cursor: pointer;
    margin: 5px;
    display: inline-block;
  }
  .image{
    margin: 1px;
    height: 180px;
  }
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
