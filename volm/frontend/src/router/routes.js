
const routes = [
    {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            { path: '', component: () => import('pages/Index.vue') },
        ],
    },
    {
        path: '/auth/',
        component: () => import('layouts/BareLayout.vue'),
        children: [
            {
                component: () => import('pages/Login.vue'),
                name: 'login',
                path: 'login/',
            },
            { path: 'register/', component: () => import('pages/registration/Register.vue') },
            {
                component: () => import('pages/registration/ConfirmEmail.vue'),
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
