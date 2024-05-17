<template>
  <div class="menu-demo">
    <a-menu mode="horizontal" :default-selected-keys="['1']">
      <a-menu-item key="0" :style="{ padding: 0, marginRight: '38px' }" disabled>
        <div
          :style="{
            borderRadius: '2px',
            cursor: 'text'
          }">
          <Logo />
        </div>
      </a-menu-item>
      <a-menu-item v-for="route in routes" :key="route.path" @click="pushPage(route.path)">{{
          route.i18n.cn
        }}
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { isExternal } from '@/utils/validate'
import config from '@/config/config'
import api from '@/api/api'
import Logo from '@/components/Header/src/Logo.vue'

const { t } = useI18n()
const router = useRouter()
const routes = config.routes

//
const reactiveData = reactive({
  albums: [] as any
})

// Mounted
onMounted(() => {
  api.getAlbums().then(({ data }) => {
    reactiveData.albums = data.data
  })
})

//
const pushPage = (path: string): void => {
  if (!path) return
  if (isExternal(path)) {
    window.location.href = path
  } else {
    router.push({
      path: path
    })
  }
}

// 打开相册
const openPhotoAlbum = (id: any): void => {
  router.push('/photos/' + id)
}
</script>

<style lang="scss" scoped>
.menu-demo {
  box-sizing: border-box;
  width: 100%;
  // padding: 40px;
  background-color: var(--color-neutral-2);
}
</style>