<template>
  <div class="flex flex-col justify-center items-center">
    <img
      v-if="websiteConfig.authorAvatar !== ''"
      class="circle-avatar h-28 w-28 shadow-xl m-0"
      :src="websiteConfig.authorAvatar"
      alt="avatar" />
    <ob-skeleton v-else width="7rem" height="7rem" circle />

    <h2 class="text-center pt-4 text-4xl font-semibold text-ob-bright">
      <template v-if="websiteConfig.author">
        {{ websiteConfig.author }}
      </template>
      <ob-skeleton v-else height="2.25rem" width="7rem" />
    </h2>

    <span class="h-1 w-14 rounded-full mt-2" :style="gradientBackground" />

    <p
      v-if="websiteConfig.authorIntro"
      class="pt-6 px-2 w-full text-sm text-center text-ob-dim"
      v-html="websiteConfig.authorIntro" />
    <p v-else class="pt-6 px-10 w-full text-sm text-center flex flex-col gap-2">
      <ob-skeleton :count="2" height="20px" width="10rem" />
    </p>
    <Social />
    <ul class="grid grid-cols-3 pt-4 w-full px-2 text-lg">
      <li class="col-span-1 text-center">
        <span class="text-ob-bright">{{ articleCount }}</span>
        <p class="text-base text-ob-dim">{{ t('settings.articles') }}</p>
      </li>
      <li class="col-span-1 text-center">
        <span class="text-ob-bright">{{ categoryCount }}</span>
        <p class="text-base text-ob-dim">{{ t('settings.categories') }}</p>
      </li>
      <li class="col-span-1 text-center">
        <span class="text-ob-bright">{{ tagCount }}</span>
        <p class="text-base text-ob-dim">{{ t('settings.tags') }}</p>
      </li>
    </ul>
  </div>
  <ul class="flex flex-col justify-center items-center mt-8 w-full list-none text-ob-bright">
    <li class="pb-2 cursor-pointer" v-for="route in routes" :key="route.path">
      <div
        class="text-sm block px-1.5 py-0.5 rounded-md relative uppercase"
        @click="pushPage(route.path)"
        v-if="route.children && route.children.length === 0">
        <span class="relative z-50" v-if="$i18n.locale === 'cn' && route.i18n.cn">
          {{ route.i18n.cn }}
        </span>
        <span class="relative z-50" v-else-if="$i18n.locale === 'en' && route.i18n.en">
          {{ route.i18n.en }}
        </span>
        <span class="relative z-50" v-else>{{ route.name }}</span>
      </div>

      <a-dropdown>
        <span class="relative z-50" v-if="$i18n.locale === 'cn' && route.i18n.cn">
          {{ route.i18n.cn }}
        </span>
        <span class="relative z-50" v-else-if="$i18n.locale === 'en' && route.i18n.en">
          {{ route.i18n.en }}
        </span>
        <span class="relative z-50" v-else>{{ route.name }}</span>
        <template #content>
          <a-doption v-for="sub in route.children" :key="sub.path" :name="sub.path">
            <span class="relative z-50" v-if="$i18n.locale === 'cn' && sub.i18n.cn">
              {{ sub.i18n.cn }}
            </span>
            <span class="relative z-50" v-else-if="$i18n.locale === 'en' && sub.i18n.en">
              {{ sub.i18n.en }}
            </span>
            <span class="relative z-50" v-else>{{ sub.name }}</span>
          </a-doption>
        </template>
      </a-dropdown>
    </li>
    <li>
      <a-dropdown>
        <span class="relative z-50" v-if="$i18n.locale === 'cn'"> 相册 </span>
        <span class="relative z-50" v-else-if="$i18n.locale === 'en'"> PhotoAlbums </span>
        <template #content>
          <a-doption v-for="item in albums" :key="item.id" @click="pushPage(`/photos/${item.id}`)">
            <span class="relative z-50">{{ item.albumName }}</span>
          </a-doption>
        </template>
      </a-dropdown>
    </li>
  </ul>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs } from 'vue'
import { useAppStore } from '@/stores/app'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useNavigatorStore } from '@/stores/navigator'
import Social from '@/components/Social.vue'
import config from '@/settings'
import api from '@/api/api'

export default defineComponent({
  name: 'ObMobileMenu',
  components: { Social },
  setup() {
    const appStore = useAppStore()
    const router = useRouter()
    const navigatorStore = useNavigatorStore()
    const { t } = useI18n()
    const reactiveData = reactive({
      routes: '' as any,
      albums: [] as any
    })
    onMounted(() => {
      reactiveData.routes = config.routes
      fetchAblums()
    })
    const fetchAblums = () => {
      api.getAlbums().then(({ data }) => {
        reactiveData.albums = data.data
      })
    }
    const pushPage = (path: string): void => {
      console.log(path)
      if (!path) return
      navigatorStore.toggleMobileMenu()
      navigatorStore.setOpenNavigator(false)
      if (path.match(/(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g)) {
        window.location.href = path
      } else {
        router.push({
          path: path
        })
      }
    }
    return {
      ...toRefs(reactiveData),
      themeConfig: computed(() => appStore.themeConfig),
      gradientBackground: computed(() => {
        return { background: appStore.themeConfig.header_gradient_css }
      }),
      pushPage,
      websiteConfig: computed(() => appStore.websiteConfig),
      articleCount: computed(() => appStore.articleCount),
      talkCount: computed(() => appStore.talkCount),
      categoryCount: computed(() => appStore.categoryCount),
      tagCount: computed(() => appStore.tagCount),
      t
    }
  }
})
</script>
