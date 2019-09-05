
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', redirect: '/people/' },
      { path: 'people/', component: () => import('pages/People/Index.vue') },
      { path: 'people/:id', component: () => import('pages/Person/Index.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    name: 'not_found',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
