<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App'
  
}
</script>

<style>
body::-webkit-scrollbar {display: none;}
html,
body {
	background: url('./assets/a.png') no-repeat;
	background-size: cover;
	background-attachment: fixed;/* 不设置的话页面滑动时，背景会不铺满*/
  
} 

</style>
