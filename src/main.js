import Vue from 'vue'
import App from './App.vue'

// 导入第三方组件库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/less/index.less'
// 导入路由
import router from './router/index.js'

// 导入axios
import http from 'axios'
// 导入vuex
import store from '@/store/index.js'

// 导入mock数据
import '../api/mock.js'

// 导入粒子组件
import VueParticles from 'vue-particles'
Vue.use(VueParticles)

// 安装插件
Vue.use(ElementUI)
Vue.config.productionTip = false

Vue.prototype.$http = http

router.beforeEach((to, from, next) => {
  store.commit('getToken')
  const token = store.state.user.token
  if (!token && to.name !== 'login') {
    next({ name: 'login' })
  } else if (token && to.name === 'login') {
    next({ name: 'home' })
  } else {
    next()
  }
})

//Vue控制入口
new Vue({
  store: store,
  router,
  render: (h) => h(App),
  created() {
    store.commit('addMenu', router)
  },
}).$mount('#app')
