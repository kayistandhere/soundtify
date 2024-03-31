const router = new VueRouter({
    routes: [
      {
        path: '/login',
        name: 'login',
        component: () => import('../views/login.vue'),
      },
      // ...các route khác
    ],
  });