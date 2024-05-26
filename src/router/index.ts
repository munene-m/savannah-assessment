import {
  createRouter,
  createWebHistory,
  type NavigationGuardNext,
  type RouteLocationNormalized
} from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: () => import('../views/LandingView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: {
        title: 'Login'
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignupView.vue'),
      meta: {
        title: 'Signup'
      }
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: {
        title: 'Home',
        requireAuth: true
      }
    },

    {
      path: '/user/:id',
      name: 'user',
      component: () => import('../views/UserView.vue'),
      meta: {
        requireAuth: true,
        title: 'User page'
      },
      props: true
    },
    {
      path: '/album/:id',
      name: 'album',
      component: () => import('../views/AlbumView.vue'),
      meta: {
        requireAuth: true,
        title: 'Album page'
      },
      props: true
    }
  ]
})

const dynamicTitleGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const title = to.meta.title
  if (typeof title === 'string') {
    document.title = title
  } else {
    document.title = 'Digitrada - Your Stellar SEP-24 Powered Cross-Border Money Transfer Service'
  }
  next()
}

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener(), resolve(user)
      },
      reject
    )
  })
}

router.beforeEach(async (to, form, next) => {
  if (to.matched.some((record) => record.meta.requireAuth)) {
    if (await getCurrentUser()) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
router.beforeEach(dynamicTitleGuard)

export default router
