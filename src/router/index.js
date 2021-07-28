import { createRouter, createWebHistory } from 'vue-router'

const Index = () => import('@/views/Index.vue')
const Error404 = () => import('@/views/Error404.vue')
const Discover = () => import('@/views/discover/Discover.vue')
const PerRecommend = () => import('@/views/discover/children/PerRecommend.vue')
const SongSheet = () => import('@/views/discover/children/SongSheet.vue')
const Ranking = () => import('@/views/discover/children/Ranking.vue')
const Singer = () => import('@/views/discover/children/Singer.vue')
const DetailsPage = () => import('@/views/detailsPage/DetailsPage.vue')
const Video = () => import('@/views/video/Video.vue')



const routes = [
	{
		path: '/',
		name: 'Index',
		component: Index,
		redirect: '/discover',
		children: [
			{
				path: '/discover',
				name: 'Discover',
				component: Discover,
				redirect: '/discover/PerRecommend',
				children: [
					{
						path: '/discover/perRecommend',
						name: 'PerRecommend',
						component: PerRecommend
					},
					{
						path: '/discover/songSheet',
						name: 'SongSheet',
						component: SongSheet
					},
					{
						path: '/discover/Ranking',
						name: 'Ranking',
						component: Ranking
					},
					{
						path: '/discover/singer',
						name: 'Singer',
						component: Singer
					}
				]
			},
			{
				path:'/video',
				name:'Video',
				component:Video
			},
			{
				path:'/detailsPage/:type',
				name:'DetailsPage',
				component:DetailsPage
			}
		]
	},
	{
		path: '/:pathMatch(.*)*',
		component: Error404,
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
