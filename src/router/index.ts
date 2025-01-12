import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '@/lib/supabase';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { authRequired: true },
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/transactions',
      name: 'transactions',
      meta: { authRequired: true },
      component: () => import('@/views/TransactionsView.vue'),
      children: [
        {
          path: ':id',
          name: 'transaction-detail',
          meta: { authRequired: true },
          component: () => import('@/components/TransactionDetail.vue'),
        },
      ],
    },
    {
      path: '/report',
      name: 'report',
      meta: { authRequired: true },
      component: () => import('@/views/ReportView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    }
  ],
})

router.beforeEach(async (to, _, next) => {
  const { data: { session } } = await supabase.auth.getSession();
  const currentUser = session?.user;
  if (to.meta.authRequired && !currentUser) {
    return next({ name: 'login' })
  } else {
    return next()
  }
})

export default router
