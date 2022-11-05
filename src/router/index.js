import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import globalRoutes from './globalRoutes'
import mainRoutes from './mainRoutes'
import { ElMessage } from 'element-plus'

const router = createRouter({
  history: createWebHistory(),
  routes: mainRoutes.concat(globalRoutes)
})

// 路由加载前
router.beforeEach(async (to, from, next) => {
  const index = globalRoutes.findIndex(item =>
    (item.name == "home" && item.children.length > 0)
  )
  await store.dispatch("permission/generateRoutes", globalRoutes[index].children)

  const isLogin = store.getters.token ? true : false;

  //判断该路由是否需要权限
  if (to.meta.gorouter) {
    if (isLogin) {
      next();
    } else {
      if (from.path !== "/into") {
        ElMessage({
          showClose: true,
          message: "请先登录",
          type: "warning"
        });
      }

      next({
        path: '/into',
      })
    }
  } else {
    next()
  }
})

// 路由加载后
router.afterEach(() => {

})
export default router
