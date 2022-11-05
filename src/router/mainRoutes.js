export default [
    {
        path: '/',
        redirect: "/into"
    },
    {
        path: '/t',
        name: "/temp",
        component: () => import('../components/Temp'),
        meta: {
            keepAlive: false,
            gorouter: false,
        }
    },
    {
        path: '/into',
        name: "/login",
        component: () => import('@/views/Login'),
        meta: {
            keepAlive: false,
            gorouter: false,
        }
    },
]