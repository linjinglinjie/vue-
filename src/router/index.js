import Vue from 'vue'
import Router from 'vue-router'

const Home = resolve => require(['@/components/home/home'], resolve)
const classify = resolve => require(['@/components/classify/classify'], resolve)
const classfiyList = resolve => require(['@/components/classify/classfiyList'], resolve)
const bookshelf = resolve => require(['@/components/bookshelf/bookshelf'], resolve)
const my = resolve => require(['@/components/personal/my'], resolve)
const AcceptedList = resolve => require(['@/components/personal/AcceptedList'], resolve)
const bookIndex = resolve => require(['@/components/book/bookindex'], resolve)
const bookdescript = resolve => require(['@/components/book/bookdescript'], resolve)
const HeavyRecommend = resolve => require(['@/components/home/child/HeavyRecommend'], resolve)
const PerfectSelection = resolve => require(['@/components/home/child/PerfectSelection'], resolve)
const leaderboards = resolve => require(['@/components/home/child/Leaderboards'], resolve)
const FeaturedBook = resolve => require(['@/components/home/child/FeaturedBook'], resolve)
const Topic = resolve => require(['@/components/home/child/Topic'], resolve)
const free = resolve => require(['@/components/free/free'], resolve)
const sexArea = resolve => require(['@/components/sex/sexArea'], resolve)
const login = resolve => require(['@/components/login'], resolve)

Vue.use(Router)

export default new Router({
	//mode: 'history',
  routes: [
    {
      path: '/',
      //component:login,
      redirect: '/home'
    },
    {
    	path: '/home',
    	component: Home,
    	children: [
    		{
    			path: 'HeavyRecommend',
    			component: HeavyRecommend
    		},
    		{
    			path: 'PerfectSelection',
    			component: PerfectSelection
    		},
    		/*{
    			path: 'Leaderboards',
    			component: leaderboards
    		},
    		{
    			path: 'FeaturedBook',
    			component: FeaturedBook
    		}*/
    	],
    	beforeEnter: (to, from, next) => {
	     	if(from.path == '/bookIndex'){
	     		//to.meta.keepAlive = true
	     		console.log(to.meta.keepAlive)
	     	}else if(from.path == '/bookIndex/bookdescript'){
	     		//to.meta.keepAlive = true
	     	}
	     	next()
	    }
    },
    {
    	path:'/bookIndex',
    	component:bookIndex,
    	children: [
    		{
    			path: 'bookdescript',
		    	component: bookdescript
    		}
    	]
    },
    {
    	path: '/classify',
    	component: classify,
    	children: [
    		{
    			path: 'classfiyList',
    			component:classfiyList
    		}
    	]
    },
    {
    	path: '/bookshelf',
    	component: bookshelf,
    	meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
    },
    {
		path: '/Leaderboards',
		component: leaderboards
	},
	{
		path: '/FeaturedBook',
		component: FeaturedBook
	},
	{
		path: '/Topic',
		component: Topic
	},
    {
    	path: '/my',
    	component: my,
    	children: [
    		{
    			path:'AcceptedList',
    			name:'AcceptedList',
    			component: AcceptedList
    		},
    		{
    			path:'completed',
    			name:'completed',
    			component: AcceptedList
    		},
    		{
    			path:'allOrder',
    			name:'allOrder',
    			component: AcceptedList
    		}
    	]
    },
    {
    	path:'*',
    	redirect: '/home'
    },
    {
    	path: '/free',
    	component: free
    },
    {
    	path: '/sex',
    	component: sexArea
    }
  ],
  /*scrollBehavior (to, from, savedPosition) {
	  if (savedPosition) {
	    return savedPosition
	  } else {
	    return { x: 0, y: 0 }
	  }
	}*/
	/*scrollBehavior (to, from, savedPosition) {
	    if (savedPosition) {
	        return savedPosition
	    } else {
	        if (from.meta.keepAlive) {
	          from.meta.savedPosition = document.body.scrollTop;
	        }
	       return { x: 0, y: to.meta.savedPosition || 0 }
	    }
  	}*/
})

