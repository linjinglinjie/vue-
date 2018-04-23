<template>
	<div class="AcceptedList">
		<section class="fixedTop">
			<section class="topsearch">
				<i class="icon iconfont" @click="goBack">&#xe607;</i>
				<section class="title">
					{{title}}
				</section>
			</section>
		</section>
		<!--书架-->
		<section class="shelf">
			<mt-loadmore :top-method="loadTop" ref="loadmore">
				<ul v-if="this.shelflist.length>0" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
					<mentionList class="shelfList" v-for="(item, index) in shelflist" :key="index" :item="item">
						<div class="mentionSign" slot="mentionSign">
							<input class="tgl tgl-flip" :id="'tgl'+index" type="checkbox">
				    		<label class="tgl-btn" data-tg-off="Nope" data-tg-on="Found" :for="'tgl'+index"></label>
						</div>
					</mentionList>
				</ul>
				<section class="nothing" v-if="this.shelflist.length == 0">
					<section>
						<i class="icon iconfont">&#xe624;</i>
						<p class="nobook">暂时还没有订单哦！</p>
					</section>
				</section>
			</mt-loadmore>
			<p class="page-infinite-loading" v-if="this.loading == true">
		      	<span class="spinner"><mt-spinner type="fading-circle" color="#26a2ff" :size="20"></mt-spinner></span>加载中...
		    </p>
		</section>
		<loadding v-if="this.loadingShow"></loadding>
	</div>
</template>
<script>
	import allHead from '@/components/common/head'
	import mentionList from '@/components/bookshelf/mentionList'
	import loadding from '@/components/common/loading'
	import { baseUrl } from '@/assets/plugins/env.js'
	export default {
		data() {
			return {
				offset: 0,
				pageCount:1,
				limit: 0,
				shelflist: '',
				loading: false, // 
				touchend: false, //没有更多数据
				loadingShow: false
			}
		},
		props:['title'],
		components: {
			allHead,
			loadding,
			mentionList
		},
		created() {
			this.loadMore();
		},
		mounted() {
			
		},
		computed: {
			//订单状态status
			
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
			loadTop() {
				this.offset = 1;
				this.touchend = false;
				this.$http.post(baseUrl+'/bookLendingManagement/borrow/borrowList.shtml',this.transformRequest({pageNum:this.offset}),{
	                headers: {
	                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
	                }
	            }).then((response) => {
				   this.shelflist = response.data.page.page.list;
				   this.$refs.loadmore.onTopLoaded();
				   if(response.data.page.page.list < this.limit) {
						this.touchend = true;
				   }
				}).catch(function(err){
				  console.log(err);
				  this.$refs.loadmore.onTopLoaded();
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
				this.$http.post(baseUrl+'/bookLendingManagement/borrow/borrowList.shtml',this.transformRequest({pageNum:this.offset}),{
	                headers: {
	                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
	                }
	            }).then((response) => {
	            	this.limit = response.data.page.page.pageSize;
					this.pageCount = response.data.page.page.totalCount;
					if(this.shelflist.length == 0) {
						this.shelflist = response.data.page.page.list;
					}else {
						this.shelflist = this.shelflist.concat(response.data.page.page.list);
					}
				   this.loading = false;
				   this.loadingShow = false;
				}).catch(function(err){
				  console.log(err);
				});
			},
			goBack() {
				this.$emit('hidesetpage');
			}
		}
	}
</script>
<style scoped>
	.AcceptedList {
		position: fixed;
		top:0;
		left:0;
		right:0;
		bottom:0;
		z-index: 100;
		overflow-y: auto;
		background:#fff;
	}
	.fixedTop{
		position: fixed;
		z-index: 102;
		top: 0;
		left: 0;
		right: 0;
	}
	.topsearch {
		background: #fff;
		border-bottom:1px solid #ddd;
		display: flex;
		justify-content: center;
		align-content: center;
		position: relative;
		z-index: 102;
		top: 0;
		left: 0;
		right: 0;
	}
	
	.topsearch.border {
		border-bottom: 1px solid #eee;
	}
	.topsearch .icon {
		width:1.5rem;
		font-size: 1rem;
		padding:.5rem;
		position: absolute;
		left:0;
		top:0;
	}
	.title {
		height:2rem;
		line-height:2rem;
		text-align: center;
		font-size:.75rem;
		color:#000;
	}
	
	.shelfList {
		position: relative;
	}
	.shelfList .borrow {
		position: absolute;
		top: 0;
		left: 10%;
		width: .9rem;
		height: 2.3rem;
		line-height: .6rem;
		text-align: center !important;
		margin:0 !important;
		display: flex;
		justify-content: center;
		/*align-items: center;*/
		padding-top: .1rem;
		background: url('../../assets/img/sign.png') no-repeat top center;
		background-size: cover;
		color: #fff;
		font-size: .5rem;
		border: none;
		box-shadow: none;
	}
	.mint-switch {
		transform: scale(.7);
		display: inline-block;
		vertical-align: middle;
	}
	
	.shelf {
		padding-top:2.2rem;
	}
	
	.shelf ul {
		background: #fff;
		display: flex;
		/*justify-content: space-between;*/
		flex-flow: row wrap;
		padding: .5rem;
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
	/*暂时没有图书*/
	
	.nothing {
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		padding: 25% 0;
	}
	
	.nothing .icon {
		font-size: 4rem;
		color: #666;
	}
	
	.nothing .nobook {
		font-size: .7rem;
		color: #333;
		margin-bottom: .2rem;
	}
	.slide-enter-active,
	.slide-leave-active {
		transition: all .4s;
	}
	
	.slide-enter,
	.slide-leave-active {
		transform: translateY(-100%);
	}
	
	.fade-enter-active,
	.fade-leave-active {
		transition: all .4s;
	}
	
	.fade-enter,
	.fade-leave-active {
		opacity: 0;
	}
	
	.slideLeft-enter-active,
	.slideLeft-leave-active {
		transition: all .4s;
	}
	
	.slideLeft-enter,
	.slideLeft-leave-active {
		transform: translateX(100%);
	}
	
	.router-slide-enter-active,
	.router-slide-leave-active {
		transition: all .4s;
	}
	
	.router-slide-enter,
	.router-slide-leave-active {
		transform: translate3d(2rem, 0, 0);
		opacity: 0;
	}
</style>