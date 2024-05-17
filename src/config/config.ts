export default {
  qqLogin: {
    QQ_APP_ID: '101999415',
    QQ_REDIRECT_URI: 'https://www.linhaojun.top/oauth/login/qq'
  },
  /* 路由 */
  routes: [
    /* 首页 */
    {
      name: 'Home',
      path: '/',
      i18n: {
        cn: '博客',
        en: 'Home'
      },
      children: []
    },
    /* 说说 */
    {
      name: 'Talks',
      path: '/talks',
      i18n: {
        cn: '说说',
        en: 'talks'
      },
      children: []
    },
    /* 相册 */
    {
      name: 'Album',
      path: '/albums',
      i18n: {
        cn: '相册',
        en: 'Album'
      },
      children: []
    },
  ]
}
