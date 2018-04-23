<template>
	<div class="SearchList">
		<section>
			<section class="back">
				<i class="icon iconfont" @click="closeSearch">&#xe607;</i>
			</section>
			<form>
				<section class="search">
					<!--<i class="icon iconfont">&#xe609;</i>-->
					<input type="text"  placeholder="书名、作者" v-on:focus="insinte" v-model="value"  />
					<i class="icon iconfont clearWord" v-if="this.value!=0" @click="clearWord">&#xe637;</i>
					<input type="button" value="搜索" @click="searchOut"/>
				</section>
			</form>
			<section class="numzero" v-if="this.classList.length == 0 && this.showErr==false">
				<!--<section class="hotList">
					<p class="title">大家都在搜</p>
					<ul>
						<li class="shelfList">
							<section>
								<img src="../../assets/img/cover.png" />
							</section>
							<p class="shelfName">猎场</p>
							<p class="hotnum">今日热搜2414次</p>
						</li>
						<li class="shelfList">
							<section>
								<img src="../../assets/img/img.png" />
							</section>
							<p class="shelfName">一念永恒</p>
							<p class="hotnum">今日热搜32650次</p>
						</li>
						<li class="shelfList">
							<section>
								<img src="../../assets/img/cover.png" />
							</section>
							<p class="shelfName">龙的传说</p>
							<p class="hotnum">今日热搜30262次</p>
						</li>
					</ul>
				</section>
				<split></split>
				<section class="hotRecommend">
					<p class="title">热门推荐</p>
					<ul>
						<li>飞剑问道</li>
						<li>驭房有术</li>
						<li>牧神记</li>
						<li>放开那个女巫</li>
						<li>我是至尊</li>
						<li>圣墟</li>
						<li>一念永恒</li>
						<li>超级小村民</li>
						<li>浴血兵魂</li>
					</ul>
				</section>
				<split></split>-->
				<section class="nothing">暂无搜索记录</section>
			</section>
			<!--搜索记录-->
				<section class="searchList" v-if="this.classList.length != 0 && this.showErr==false">
					<section class="Recommendlist">
						<ul class="booklist" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
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
					   <!-- <p class="page-infinite-loading" v-if="this.touchend == true">
					      	已经加载全部内容
					    </p>-->
					</section>
					<!--<section class="nothing">暂无搜索记录</section>-->
				</section>
				<section class="showErr" v-if="this.showErr">
					<section>
						<i class="icon iconfont">&#xe624;</i>
						<p>您的搜索暂无数据哦</p>
					</section>
				</section>
		</section>
		<loadding name="loading" v-if="loadingShow"></loadding>
	    <transition name="slide">
			<bookDes v-if="showDes" @close="close" :num="id"></bookDes>
		</transition>
	</div>
</template>
<script>
import shelfList from '../bookshelf/shelfList'
import split from '../common/split'
import list from '@/components/book/list'
import loadding from '@/components/common/loading'
import bookDes from '@/components/book/bookdescript'
import {baseUrl} from '@/assets/plugins/env.js'
export default {
	name:'search',
	data() {
		return {
			value:'',
			offset: 1,
			pageCount:1,
			classList:'',
			loadingShow: false, 
			loading: false, // 
			showDes:false, //显示book详情页
			id:'',
			showErr:false,
			touchend: false //没有更多数据
		}
	},
	components: {
		shelfList,
		split,
		list,
		loadding,
		bookDes
	},
	mounted() {
	},
	methods: {
		//请求后台数据之前转换入参
		transformRequest: function (data) {
		    let ret = ''
		    for (let it in data) {
		    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
		        }
		    return ret
		},
		searchOut() {
			this.offset = 1;
			this.classList = '';
			this.touchend = false;
			this.loadingShow = true;
			this.$http.post(baseUrl+'/bookLendingManagement/bookprofession/getPerfectSelection.shtml',this.transformRequest({label:this.value,pageNum:this.offset}),{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            }).then((response) => {
				if(response.data.msgcode == 'success') {
					this.showErr = false;
					this.pageCount = response.data.pageCount;
					this.classList = response.data.result_data;
				}else {
					this.showErr = true
				}
			   this.loadingShow = false;
			}).catch(function(err){
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
		   //数据的分页加1位
			if(this.offset < this.pageCount){
		   	  this.offset = this.offset+1;
		    }else {
		      this.touchend = true;
		      this.loading = false;
		   	  return 
		    }
			this.$http.post(baseUrl+'/bookLendingManagement/bookprofession/getPerfectSelection.shtml',this.transformRequest({label:this.value,pageNum:this.offset}),{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            }).then((response) => {
				if(response.data.msgcode == 'success') {
					this.pageCount = response.data.pageCount;
					if(this.classList.length == 0) {
						this.classList = response.data.result_data;
					}else {
						this.classList = this.classList.concat(response.data.result_data);
					}
				   this.loading = false;
				}
			   this.loadingShow = false;
			}).catch(function(err){
			  console.log(err);
			});
		},
		insinte() {
			
		},
		openDes(val) {
			this.showDes = true;
			this.id = val;
		},
		close() {
			this.showDes = false;
		},
		clearWord() {
			this.value=''
		},
		closeSearch() {
			this.$emit('closesearch');
		}
	},
	
}
</script>
<style scoped>
.SearchList {
	position: fixed;
	z-index: 998;
	top:0;
	left:0;
	width:100%;
	bottom:0;
	overflow-y: auto;
	background: #fff;
}
.back {
	position: absolute;
	left:.5rem;
	top:.3rem;
	z-index: 1000;
}
.back .icon {
	font-size: 1rem;
	color:#333;
}
.SearchList .title {
	color:#000;
	margin-bottom:.5rem;
	font-size: .7rem;
}
.SearchList .search{
	position: fixed;
	top:0;
	left:0;
	right:0;
	z-index: 999;
	display: flex;
	border-bottom:1px solid #ddd;
	background: #F7F7F7;
	padding:.3rem .6rem .3rem 2rem;
	color: #CECECE;
}
.SearchList .search input[type="text"] {
	height:1.4rem;
	line-height:1.4rem;
	flex: auto;
	color: #B3B3B3;
	font-size: .6rem;
	padding-left:.3rem;
	padding-right:1rem;
	border-radius:4px;
}
.SearchList .search input[type="button"] {
	font-size: .6rem;
	padding:0 .6rem;
	height:1.4rem;
	line-height:1.4rem;
	background: #F7F7F7;
	color:#999;
	border-radius:6px;
}
.SearchList .search .icon {
	margin-right:.3rem;
	color: #B3B3B3;
	font-size: 1rem;
	margin-top:.2rem;
}
.SearchList .search .icon.clearWord {
	position: absolute;
	right:3.8rem;
	top:.6rem;
	font-size: .6rem;
}
.hotList, .hotRecommend, .searchList {
	padding:.5rem;
}
.numzero, .searchList {
	margin-top:2.3rem;
}
.showErr {
	position: fixed;
	top:2.5rem;
	bottom:0;
	left:0;
	width:100%;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	font-size: .7rem;
}
.showErr .icon {
	font-size: 4rem;
	color:#666;
}
.hotList ul{
	display: flex;
	justify-content: space-between;
	flex-flow: row wrap;
}
.shelfList {
	width:30%;
	padding:.5rem 0;
}
.shelfList section {
	width:95%;
	height:5.5rem;
	overflow: hidden;
	margin: 0 auto;
	text-align: center;
	border:1px solid #ddd;
	box-shadow: 0 0 .3rem #333;
}
.shelfList section img {
	width:100%;
	height:100%;
}
.shelfList .shelfName {
	margin-top: .3rem;
	font-size: .6rem;
}
.hotnum {
	font-size: .5rem;
	color:#f90;
	margin-top:.2rem;
}
/*热门推荐*/
.hotRecommend li {
	background: #FCEAE6;
	display: inline-block;
	margin:0 .2rem .3rem 0;
	padding:.3rem .8rem;
	border:1px solid #ddd;
	border-radius:.3rem;
	font-size: .65rem;
	color: #7A6D64;
}
.hotRecommend li:nth-child(2n) {
	background: #FCEDDA;
}
.hotRecommend li:nth-child(3n) {
	background: #E6F9DB;
}
.nothing {
	padding:1rem 0;
	text-align: center;
	font-size: .65rem;
	color:#989898;
}
.Recommendlist {
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
.slide-enter-active, .slide-leave-active {
	transition:all .4s
}	
.slide-enter, .slide-leave-active{
	transform: translateX(100%);
}
</style>