<template>
  <header class="flex justify-around flex-nowrap items-center mb-4 bg-white">
    <!-- 导航 -->
    <Navigation class="grow-0" />
    <!-- 搜索框 -->
    <Search class="grow" />
    <!-- 控制 -->
    <Controls class="grow-0" />
  </header>
</template>

<script lang="ts" setup>
import Search from './src/Search.vue'
import Navigation from './src/Navigation.vue'
import Controls from './src/Controls.vue'
</script>
