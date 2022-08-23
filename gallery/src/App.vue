<!-- <template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template> -->

<template>
  <div id="app">
    <gallery-main>
      <gallery-item src="/images/1.jpg" caption="Just do it" />
      <gallery-item src="/images/2.jpg" caption="Just did it" />
      <gallery-item src="/images/3.jpg" />
      <gallery-item src="/images/4.jpg" />
      <gallery-item src="/images/5.jpg" />
      <gallery-item src="/images/6.jpg" />
    </gallery-main>
  </div>
</template>
<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
}
</script>

<style>
  .gallery-main {
    text-align: center;
  }
  .gallery-main .gallery-item {
    display: inline-block;
    width: 33%;
    margin: 10px;
  }

  .gallery-main .gallery-item img {
    width: 100%
  }
</style>
