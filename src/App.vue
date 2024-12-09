<template>
  
  <div id="base-container">
    <router-view />
  </div>
</template>

<script setup>

</script>

<style>
#app {
  font-family: ProtoMono;
  background-color: #000000;
  height: 100dvh !important;
  overflow: hidden;

}

#base-container {
  position: relative;
  height: 100vh;
  max-width: 1000px;
  margin: 0 auto;
  overflow: hidden;
}

</style>
