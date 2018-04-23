<template>
	<div class="home">
		<transition name="fade">
			<nav v-if="fixedNav" :class="{'active':fixedNav}" ref="nav">
				<ul>
					<li>小说</li>
					<li>图书</li>
					<li>漫画</li>
				</ul>
				<i class="icon iconfont" @click="showSearch">&#xe609;</i>
			</nav>
		</transition>
		<mt-loadmore :top-method="loadTop" ref="loadmore">
		<header ref="header">
			<transition name="fade">
				<nav v-if="!fixedNav">
					<ul>
						<li>小说</li>
						<li>图书</li>
						<li>漫画</li>
					</ul>
					<i class="icon iconfont" @click="showSearch">&#xe609;</i>
				</nav>
			</transition>
			<banner></banner>
		</header>
		<centerNav></centerNav>
		<div class="choseRecommen">
			<router-link tag="div" class="chosen" to="/home/PerfectSelection">
				<div class="slogan">
					<p class="top">完美精选</p>
					<p class="bottom">一览到底</p>
				</div>
				<div class="Cover">
					<img src="../../assets/img/img.png">
				</div>
			</router-link>
			<router-link tag="div" class="recommend" to="/home/HeavyRecommend">
				<div class="slogan">
					<p class="top">重磅推荐</p>
					<p class="bottom">火热阅读中</p>
				</div>
				<div class="Cover">
					<img src="../../assets/img/cover.png">
				</div>
			</router-link>
		</div>
		<split></split>
		<slideNew @openDes="openDes"></slideNew>
		<section v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
			<ul class="booklist">
				<list v-for="(item, index) in this.classList" :key="index" :item="item" @openDes="openDes">
    				<p class="classfiy" slot="classFiy">
						<span v-if="item.score && item.score == ''">连载中</span>
						<span v-if="item.score && item.score != ''" class="red">{{item.score}}分</span>
						<span v-if="!item.score" class="red">连载中</span>
						<span>{{item.label.replace(/(^\s*)|(\s*$)/g,"").split(' ')[0]}}</span>
					</p>
    			</list>
		    </ul>
			<p class="page-infinite-loading" v-if="this.loading == true">
		      	<span class="spinner"><mt-spinner type="fading-circle" color="#26a2ff" :size="20"></mt-spinner></span>加载中...
		    </p>
		    <p class="page-infinite-loading" v-if="this.touchend == true">
		      	已经加载全部内容
		    </p>
		</section>
		</mt-loadmore>
		<loadding name="loading" v-if="loadingShow"></loadding>
		<!--图书详情页展示-->
		<transition name="slide">
			<bookDes v-if="showDes" @close="close" :num="id"></bookDes>
		</transition>
		<!--重磅推荐-->
		<transition name="slide">
			<router-view></router-view>
		</transition>
		<!--搜索记录-->
		<transition name="router-slide">
			<serchhistroy v-if="serchhistroy" @closesearch="closesearch"></serchhistroy>
		</transition>
		<vfoot></vfoot>
	</div>
</template>
<script>
import split from '@/components/common/split'
import loadding from '@/components/common/loading'
import banner from '@/components/common/swiper'
import centerNav from '@/components/common/centerNav'
import slideNew from '@/components/common/slideNew'
import list from '@/components/book/list'
import bookDes from '@/components/book/bookdescript'
import serchhistroy from '@/components/common/searchhistroy'
import vfoot from '@/components/footer/foot'
import {baseUrl} from '@/assets/plugins/env.js'
import {setCookie,getCookie} from '@/assets/plugins/cookie.js'
export default {
	name:'home',
	data() {
		return {
			offset: 0,
			pageCount:1,
			limit: 5,
			classList:'',
			loadingShow: true,
			loading: false, //
			showDes:false, //显示book详情页
			fixedNav:false, //固定头部导航
			scroll: '', //页面滚动
			banerH:'', //banner高度
			opacity:0,
			id:'',
			serchhistroy:false,//搜索
			touchend: false //没有更多数据
		}
	},
	components: {
		split,
		centerNav,
		slideNew,
		banner,
		list,
		loadding,
		bookDes,
		serchhistroy,
		vfoot
	},
	created() {
	/*	this.initData()*/
		this.loadMore();
		//setCookie('v_v-s-rest',"82d01d22-9892-446d-b535-de2bf3536c4e")
	},
	mounted() {
		this.getBanerH();
		window.addEventListener('scroll', this.scrollMethod);
	},
	watch: {
		scroll(curval, oldval) {
			if(curval === 0) {
				this.fixedNav = false;
			}else if(curval > this.banerH) {
				this.fixedNav = false;
			}else {
				this.fixedNav = true;
				this.$nextTick(() => {
					this.opacity = curval/this.banerH;
					const changecolor = 255 - curval;
					this.$refs.nav.style.backgroundColor = 'rgba(255,255,255,'+this.opacity+')';
					for(let i=0;i<this.$refs.nav.children[0].children.length;i++) {
						this.$refs.nav.children[0].children[i].style.color = 'rgb('+changecolor+','+changecolor+','+changecolor+')';
					}
				})
			}
		}
	},
	methods: {
		initData(){
			this.$http.get(baseUrl+'/bookLendingManagement/homePage/getBookList.shtml',{
			  params:{
			    pageNo:1
			  }
			}).then((response) => {
				this.classList = response.data.bookInfo;
			   if(response.data.bookInfo.length < this.limit) {
					this.touchend = true;
			   }
		       this.loadingShow = false;
			}).catch(function(err){
			  console.log(err);
			});
		},
		openDes(val) {
			this.showDes = true;
			this.id = val;
		},
		close() {
			this.showDes = false;
		},
		loadTop() {
			this.touchend = false;
			this.offset = 1;
			this.$http.get(baseUrl+'/bookLendingManagement/homePage/getBookList.shtml',{
			  params:{
			    pageNo:1
			  }
			}).then((response) => {
				this.classList = response.data.bookInfo;
				this.$refs.loadmore.onTopLoaded();
			   if(response.data.bookInfo.length < this.limit) {
					this.touchend = true;
			   }
			}).catch(function(err){
				this.$refs.loadmore.onTopLoaded();
			  console.log(err);
			});
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
		   //数据的定位加1位
			if(this.offset < this.pageCount){
		   	  this.offset = this.offset+1;
		    }else {
		      this.touchend = true;
		      this.loading = false;
		   	  return
		    }
			this.$http.get(baseUrl+'/bookLendingManagement/homePage/getBookList.shtml',{
			  params:{
			    pageNo:this.offset
			  }
			}).then((response) => {
				this.pageCount = response.data.pageCount;
				if(this.classList.length == 0) {
					this.classList = response.data.bookInfo
				}else {
					this.classList = this.classList.concat(response.data.bookInfo);
				}
			   this.loading = false;
			   if(response.data.bookInfo.length < this.limit) {
					this.touchend = true;
			   }
			   this.loadingShow = false;
			}).catch(function(err){
			  console.log(err);
			});
		},
		getBanerH() {
			this.banerH = this.$refs.header.offsetHeight;
		},
		scrollMethod() {
			/*获取滚动高度*/
		    this.scroll = document.documentElement.scrollTop || document.body.scrollTop;
		},
		showSearch() {
			this.serchhistroy = true;
		},
		closesearch() {
			this.serchhistroy = false;
		}
	}
}
</script>
<style scoped>
.home {
	margin-bottom:3rem;
}
header {
	position: relative;
}
nav {
	position: absolute;
	top: 0;
	left: 0;
	z-index: 99;
	width: 100%;
	height: 1.8rem;
	line-height: 1.8rem;
}
nav li{
	float: left;
	padding:0 15px;
	font-size: .55rem;
	color:#fff;
}
nav.active {
	position: fixed;
	top:0;
	left: 0;
	right:0;
	z-index: 100;
	/*background: #fff;*/
}
nav.active li {
	/*color:#000;*/
}
nav .icon {
	position: absolute;
	right:1rem;
	top:0;
	color:#fff;
	font-size: 1rem;
}
.mint-swipe-items-wrap > div > img {
	width: 100%;
	height: 100%;
}
/*精选推荐*/
.choseRecommen{
	display: flex;
	justify-content: space-between;
	background: #fff;
}
.chosen, .recommend {
	display: flex;
	flex: 1;
	justify-content: center;
	align-items: center;
	background: #fff;
	border-radius:5px;
	height:3.5rem;
	margin:.5rem;
  margin-top:0;
	padding: .4rem;
	background: linear-gradient(to right, #F7F7F7 , #E8E8E8);
  box-shadow:0 0 5px #ddd;
}
.recommend {
	margin-left:0;
	background: linear-gradient(to right, #ECF4F7 , #D2D7DF);
}
.slogan{
	flex:3;
	padding-right:.5rem;
	text-align: center;
}
.slogan .top {
	font-size: .7rem;
}
.slogan .bottom {
	font-size: .5rem;
	margin-top:.2rem;
}
.Cover {
	flex: 2;
	overflow: hidden;
	width:100%;
	height:100%;
}
.Cover img{
	width:100%;
	height:100%;
	box-shadow: 0 0 10px #000;
}
/*加载更多*/
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
.fade-enter-active, .fade-leave-active {
	transition:all .4s
}
.fade-enter, .fade-leave-active{
	opacity: 0;
}
.slide-enter-active, .slide-leave-active {
	transition:all .4s
}
.slide-enter, .slide-leave-active{
	transform: translateX(100%);
}
.router-slide-enter-active, .router-slide-leave-active {
    transition: all .4s;
}
.router-slide-enter, .router-slide-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
}
</style>
