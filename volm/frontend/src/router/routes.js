
const routes = [
    {
        component: () => import('src/layouts/MainLayout.vue'),
        path: '/',
        children: [
            {
                component: () => import('src/pages/Index.vue'),
                path: '',
            },
        ],
    },
    {
        component: () => import('src/layouts/BareLayout.vue'),
        path: '/auth/',
        children: [
            {
                component: () => import('src/pages/Login.vue'),
                name: 'login',
                path: 'login/',
            },
            {
                component: () => import('src/pages/registration/Form.vue'),
                path: 'register/',
            },
            {
                component: () => import('src/pages/registration/ConfirmEmail.vue'),
                name: 'confirm_email',
                path: 'confirm_email/',
            },
        ],
    },
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
    routes.push({
        path: '*',
        component: () => import('pages/Error404.vue'),
    })
}

export default routes
