<template>
	<div>
		<section>
			<div class="tophead">
				<p class="goBack" @click="goBack">
					<i class="icon iconfont" >&#xe607;</i>
				</p>
				图书列表
			</div>
			<mt-loadmore :top-method="loadTop" ref="loadmore">
			<section class="booklistWrap" ref="listWrap" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
				<div class="booklist_container">
					<ul class="booklist">
						<list v-for="(item, index) in this.classList" :key="index" @openDes="openDes" :item="item">
		    				<p class="classfiy" slot="classFiy">
								<!--<span v-if="item.score == ''">连载中</span>
								<span v-if="item.score != ''" class="red">{{item.score}}分</span>
								<span>{{item.label}}</span>-->
								<span v-for="(arr, index) in item.label.split(' ')" :key="index">{{arr}}</span>
							</p>
		    			</list>
				    </ul>
			    </div>
				<p class="page-infinite-loading" v-if="this.loading == true">
			      	<span class="spinner"><mt-spinner type="fading-circle" color="#26a2ff" :size="20"></mt-spinner></span>加载中
			    </p>
			    <p class="page-infinite-loading" v-if="this.touchend == true">
			      	已经加载全部内容
			    </p>
			</section>
			</mt-loadmore>
		</section>
		<loadding name="loading" v-if="loadingShow"></loadding>
	    <transition name="slide">
			<bookDes v-if="showDes" @close="close" :num="id"></bookDes>
		</transition>
    </div>
</template>
<script>
import loadding from '@/components/common/loading'
import split from '../common/split'
import list from './list'
import bookDes from '@/components/book/bookdescript'
import {baseUrl} from '@/assets/plugins/env.js'
export default {
	name:'booklist',
	data() {
		return {
			offset: 0,
			pageCount:1,
			classList: '',
			limit: 5,
			loading: false,
			showDes:false,
			id:'',
			loadingShow: false, 
			touchend: false //没有更多数据
		}
	},
	props: ["classitem"],
	created() {
		this.loadMore();
	},
	components: {
		split,
		bookDes,
		loadding,
		list
	},
	methods: {
		openDes(val) {
			this.showDes = true;
			this.id = val;
		},
		close() {
			this.showDes = false;
		},
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
		loadTop() {
		  setTimeout(() => {
		  	this.$refs.loadmore.onTopLoaded();
		  }, 1000);
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
		   //数据的定位加3位
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
			   /*if(response.data.bookInfo.length < this.limit) {
					this.touchend = true;
			   }*/
			   this.loadingShow = false;
			}).catch(function(err){
			  console.log(err);
			});
		},
		goBack() {
			this.$router.go(-1);
		}
	}
}
</script>
<style scoped>
.mint-loadmore {
	margin-top:2rem;
}
.tophead {
	background: #fff;
	position: fixed;
	z-index: 9;
	top:0;
	left:0;
	width:100%;
	padding:0 .5rem;
	height:2rem;
	line-height:2rem;
	font-size: .75rem;
	text-align: center;
	border-bottom: 1px solid #ddd;
}
.goBack {
	position: absolute;
	left:.5rem;
	top:0;
}
.goBack .icon {
	font-size: 1rem;
}
/*.booklistWrap {
	margin-bottom:2.9rem;
}*/
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