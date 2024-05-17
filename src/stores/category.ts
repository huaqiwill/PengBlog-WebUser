import { defineStore } from 'pinia'

export const useCategoryStore = defineStore('categoryStore', {
  state: () => {
    return {
      // 分类列表
      categories: [] as any[]
    }
  },
  actions: {}
})
