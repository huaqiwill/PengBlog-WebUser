export default {
  theme: 'theme-light',
  qqLogin: {
    QQ_APP_ID: '101999415',
    QQ_REDIRECT_URI: 'https://www.linhaojun.top/oauth/login/qq'
  },
  routes: [
    {
      name: 'Home',
      path: '/',
      i18n: {
        cn: '博客',
        en: 'Home'
      },
      children: []
    },
    {
      name: 'Talks',
      path: '/talks',
      i18n: {
        cn: '说说',
        en: 'talks'
      },
      children: []
    },
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
