
<template>
  <Sidebar>
	  <RouterView />
  </Sidebar>

</template>

<script setup lang="ts">
	import { RouterView } from 'vue-router'
	import Sidebar from './components/Sidebar.vue'
</script>
