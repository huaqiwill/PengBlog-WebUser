import { defineStore } from 'pinia'

export const useSearchStore = defineStore('searchStore', {
  state: () => ({
    // 打开搜索框
    openModal: false
  }),
  getters: {},
  actions: {
    // 设置搜索框状态
    setOpenModal(status: boolean) {
      this.openModal = status
      if (status) document.body.classList.add('modal--active')
      else document.body.classList.remove('modal--active')
      document.getElementById('App-Container')?.focus()
    }
  }
})
