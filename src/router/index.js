// 导入Vue,VueRoute模块
import Vue from 'vue'
import VueRoute from 'vue-router'

// use()方法下载插件
Vue.use(VueRoute)

// 路由规则
const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('../views/Main.vue'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('../views/home'),
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('@/views/User/index.vue'),
      },
      {
        path: '/mall',
        name: 'mall',
        component: () => import('@/views/mall/index.vue'),
      },
      {
        path: '/page1',
        name: 'page1',
        component: () => import('@/views/other/pageOne.vue'),
      },
      {
        path: '/page2',
        name: 'page2',
        component: () => import('@/views/other/pageTwo.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/login.vue'),
  },
]

// 路由实例化
const router = new VueRoute({
  mode: 'history',
  routes,
})

// 向全局导出
export default router
