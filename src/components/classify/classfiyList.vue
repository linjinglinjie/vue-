<template>
	<div class="classfiyList">
		<classHead class="classfiyHead" :title="title" @hidesetpage="goBack"></classHead>
		<transition name="slide">
			<section class="classNav topNav" v-if="showNav" :class="{'showAll':showAllNav}">
				<ul>
					<li >
						<a @click="showList('all',-1)" :class="{'active':navActive == -1}">全部</a>
						<a v-for="(item, index) in navList" :key="index" @click="showList(item.text,index)" :class="{'active':navActive == index}">{{item.text}}</a>
					</li>
				</ul>
			</section>
		</transition>
		<section class="wrap" ref="wrap">
			<mt-loadmore :top-method="loadTop" ref="loadmore">
			<section>
				<section class="classNav">
					<ul>
						<li>
							<a @click="showList('all',-1)" :class="{'active':navActive == -1}">全部</a>
							<a v-for="(item, index) in navList" :key="index" @click="showList(item.text,index)" :class="{'active':navActive == index}">{{item.text}}</a>
						</li>
					</ul>
				</section>
				<split></split>
				<section ref="listtop">
					<section v-if="bookList.length != 0" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
						<list v-for="(item,index) in bookList" :key="index" @openDes="openDes" :item="item"></list>
						<p class="page-infinite-loading" v-if="this.loading == true">
					      	<span class="spinner"><mt-spinner type="fading-circle" color="#26a2ff" :size="20"></mt-spinner></span>加载中...
					    </p>
					</section>
					<section v-if="bookList.length == 0"></section>
				</section>
				
			</section>
			</mt-loadmore>
		</section>
		<loadding v-if="showLoading"></loadding>
		<transition name="slideLeft">
	    	<bookDes v-if="showDes" @close="close" :num="id"></bookDes>
	    </transition>
	</div>
</template>
<script>
import classHead from '../common/head'
import list from '../book/list'
import split from '../common/split'
import loadding from '../common/loading'
import bookDes from '@/components/book/bookdescript'
import {baseUrl} from '@/assets/plugins/env.js'
export default {
	data() {
		return {
			title:'',
			listTop:'',
			offset:0,
			pageCount:1,
			loading: false, // 
			showDes:false, //显示book详情页
			touchend: false, //没有更多数据
			showNav:false,
			showAllNav:false,
			showLoading:false,
			navList:'',
			bookList:'',
			id:'',
			level:'',
			scroll: '',
			keysearch:'',
			navActive:-1
		}
	},
	components: {
		classHead,
		list,
		split,
		loadding,
		bookDes
	},
	created() {
		this.title = this.$route.query.title;
		this.id = this.$route.query.id;
		this.level = this.$route.query.level;
		this._initData();
	},
	mounted() {
		this.getTop();
		this.$refs.wrap.offsetParent.addEventListener('scroll', this.scrollMethod)
		this.showList('all',-1)
	},
	watch: {
		scroll(curval, oldval) {
			if(curval > parseInt(this.listTop)) {
				this.showNav = true;
           	 }else if(curval < 40){
           	 	this.showNav = false;
           	 	this.showAllNav = false
           	 }
		}
	},
	methods: {
		openDes(val) {
			this.showDes = true;
			this.id = val;
		},
		close() {
			this.showDes = false;
		},
		//请求后台数据之前转换入参
		transformRequest: function (data) {
		    let ret = ''
		    for (let it in data) {
		    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
		        }
		    return ret
		},
		showList(val,num) {
			if(val == 'all') {
				this.keysearch = ''
			}else {
				this.keysearch = val;
			}
			this.navActive = num;
			this.bookList = '';
			this.offset = 0;
			this.touchend = false;
			this.loadMore();
		},
		_initData() {
			this.showLoading = true;
			this.$http.post(baseUrl+'/bookLendingManagement/booksort/searchForMoveSelectNext.shtml',this.transformRequest({level:this.level,pid:this.id}),{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            }).then((response) => {
				this.navList = response.data.list;
				console.log(response.data.list)
			}).catch(function(err){
			  console.log(err);
			});
            this.showLoading = false;
		},
		loadMore() {
			if (this.touchend) {
				return
			}
			//防止重复请求
			if (this.preventRepeatReuqest) {
				return 
			}
			
		   this.loading = true;
		   //数据的分页加1位
			if(this.offset < this.pageCount){
		   	  this.offset = this.offset+1;
		    }else {
		      this.touchend = true;
		      this.loading = false;
		   	  return 
		    }
			this.$http.post(baseUrl+'/bookLendingManagement/bookprofession/getPerfectSelection.shtml',this.transformRequest({label:this.keysearch,pageNum:this.offset}),{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            }).then((response) => {
				if(response.data.msgcode == 'success') {
					this.pageCount = response.data.pageCount;
					if(this.bookList.length == 0) {
						this.bookList = response.data.result_data;
					}else {
						this.bookList = this.bookList.concat(response.data.result_data);
					}
				   this.loading = false;
				}
				
			   this.showLoading = false;
			}).catch(function(err){
			  console.log(err);
			});
		},
	    scrollMethod() {
		    this.scroll = this.$refs.wrap.offsetParent.scrollTop;
		},
		getTop() {
			this.listTop = this.$refs.listtop.offsetTop-40;
		},
	    goBack() {
	    	this.$emit('goBack')
	    },
	    /*下拉加载数据*/
		loadTop() {
		  this._initData();
		  this.showList(this.keysearch,this.navActive);
		  this.$refs.loadmore.onTopLoaded();
		},
		showAll() {
			this.showAllNav = true;
		},
		
		
	}
}
</script>
<style scoped>
.classfiyList {
	position: fixed;
	top:0;
	left:0;
	bottom:0;
	width:100%;
	z-index: 1000;
	background: #fff;
	overflow-y: auto;
}
.classfiyHead {
	position: fixed;
	top:0;
	left:0;
	right:0;
	z-index: 999;
}
.wrap {
	margin-top:2rem;
}
.topNav {
	position: fixed;
	top:2rem;
	left:0;
	right:0;
	height:2.1rem;
	z-index: 998;
	overflow: hidden;
	border-bottom:1px solid #ddd;
}
.showAll {
	height:auto;
}
.classNav li {
	position: relative;
	background: #fff;
	border-bottom: 1px solid #ddd;
	padding:.3rem .5rem;
}
.classNav li .more {
	position: absolute;
	right:.5rem;
	top:.3rem;
	font-size: 1rem;
	color:#51959E;
}
.classNav li:last-child {
	border:none;
}
.classNav li a {
	display: inline-block;
	padding:.2rem .4rem;
	font-size: .65rem;
}
.classNav li a.active {
	color:#f90;
}
.page-infinite-loading{
	height:50px;
	line-height:50px;
	text-align: center;
	font-size: .55rem;
}
.spinner{
	display: inline-block;
	vertical-align: middle;
	margin-right: .2rem;
}
.slide-enter-active, .slide-leave-active {
	transition:all .3s
}	
.slide-enter{
	transform: translateY(-100%);
}
.slide-leave-active {
	opacity: 0;
}
.slideLeft-enter-active, .slideLeft-leave-active {
	transition:all .4s
}	
.slideLeft-enter, .slideLeft-leave-active{
	transform: translateX(100%);
	opacity: 0;
}
</style>