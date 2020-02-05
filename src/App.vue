<template>
  <div id="app" class="app-container">
    <h1>Inflection Input</h1>
    <check-homonym />
  </div>
</template>

<script>

import CheckHomonym from '@/components/check-homonym/check-homonym.vue'

export default {
  name: 'app',
  components: {
    CheckHomonym
  }
}
</script>

<style lang="scss">
  body {
    margin: 0;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
    box-sizing: border-box;
  }

  h1 {
    text-align: center;
  }

  .app-container {
      width: 95%;
      margin: 20px auto;
      text-align: left;
  }

</style>
