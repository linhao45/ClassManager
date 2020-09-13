import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Welcome from '../views/Welcome.vue'
import PrivateInfo from "../views/info/PrivateInfo.vue"
import FinishedTasks from "../views/tasks/FinishedTasks.vue"
import UnFinishedTasks from "../views/tasks/UnFinishedTasks.vue"
import MyTasks from "../views/tasks/MyTasks.vue"

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/tasklaunch', component: MyTasks },
      { path: '/lookinfo', component: PrivateInfo },
      { path: '/taskfinished', component: FinishedTasks },
      { path: '/taskunfinished', component: UnFinishedTasks },
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !window.sessionStorage.getItem('token'))
    return next('/login');
  next()
})

export default router
