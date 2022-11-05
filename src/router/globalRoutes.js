export default [
    {
        path: '/home',
        name: 'home',
        component: () => import('@/views/Home'),
        children: [
            {
                path: '/list',
                name: 'list',
                component: () => import('@/views/PlayList'),
                meta: {
                    title: "队列",
                    icon: "ali-zy-liebiao",
                    keepAlive: false,
                    gorouter: true,
                }
            },
            {
                path: '/receive',
                name: 'receive',
                component: () => import('@/views/Receive'),
                meta: {
                    title: "收件箱",
                    icon: "ali-zy-shoujianxiang",
                    keepAlive: false,
                    gorouter: true,
                }
            },
            {
                path: '/library',
                name: 'library',
                component: () => import('@/views/MySubscribe'),
                meta: {
                    title: "订阅",
                    icon: "ali-zy-icon_dingyue",
                    keepAlive: false,
                    gorouter: true,
                }
            },
            {
                path: '/collect',
                name: 'collect',
                component: () => import('@/views/Collection'),
                meta: {
                    title: "收藏",
                    icon: "ali-zy-shoucang1",
                    keepAlive: true,
                    gorouter: true,
                }
            },
            {
                path: '/search',
                name: 'Search',
                component: () => import('@/views/Search'),
                meta: {
                    title: "搜索",
                    icon: "ali-zy-sousuo",
                    keepAlive: false,
                    gorouter: true,
                }
            }
        ]
    },
]
