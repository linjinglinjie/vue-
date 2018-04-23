<template>
	<div class="PerfectSelection">
		<section class="headTitle">
			<vHead :title="title" @hidesetpage="hidesetpage"></vHead>
		</section>
		<section class="Recommendlist">
			<mt-loadmore :top-method="loadTop" ref="loadmore">
			<ul v-if="this.classList.length==0" class="booklist" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
				<list v-for="(item, index) in this.classList" :key="index" :item="item" @openDes="openDes">
    				<p class="classfiy" slot="classFiy">
						<span v-if="item.score && item.score == ''">连载中</span>
						<span v-if="item.score && item.score != ''" class="red">{{item.score}}分</span>
						<span v-if="!item.score" class="red">连载中</span>
						<span>{{item.label.replace(/(^\s*)|(\s*$)/g,"").split(' ')[0]}}</span>
					</p>
    			</list>
		    </ul>
		    <section class="showErr" v-if="this.classList.length==0">
				<section>
					<i class="icon iconfont">&#xe624;</i>
					<p>暂无数据哦!</p>
				</section>
			</section>
		     </mt-loadmore>
			<p class="page-infinite-loading" v-if="this.loading == true">
		      	<span class="spinner"><mt-spinner type="fading-circle" color="#26a2ff" :size="20"></mt-spinner></span>加载中...
		    </p>
		    <!--<p class="page-infinite-loading" v-if="this.touchend == true">
		      	已经加载全部内容
		    </p>-->
		</section>
		<loadding name="loading" v-if="loadingShow"></loadding>
	    <transition name="slide">
			<bookDes v-if="showDes" @close="close" :num="id"></bookDes>
		</transition>
	</div>
</template>
<script>
import vHead from '@/components/common/head'
import list from '@/components/book/list'
import loadding from '@/components/common/loading'
import bookDes from '@/components/book/bookdescript'
import {baseUrl} from '@/assets/plugins/env.js'
export default {
	data() {
		return {
			title:'推荐',
			offset: 0,
			pageCount:1,
			limit: 5,
			classList:'',
			loadingShow: true, 
			loading: false, // 
			showDes:false, //显示book详情页
			id:'',
			touchend: false //没有更多数据
		}
	},
	components: {
		vHead,
		list,
		loadding,
		bookDes
	},
	mounted() {
		/*this.initData()*/
		this.loadMore()
	},
	methods: {
		loadTop() {
			this.offset = 1;
			this.touchend = false;
			this.$http.post(baseUrl+'/bookLendingManagement/bookprofession/getPerfectSelection.shtml',this.transformRequest({label:'推荐',pageNum:this.offset}),{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            }).then((response) => {
				console.log(response)
				if(response.data.msgcode == 'success') {
				   this.classList = response.data.result_data;
				   this.$refs.loadmore.onTopLoaded();
				   if(response.data.result_data.length < this.limit) {
						this.touchend = true;
				   }
				}else {
					this.$refs.loadmore.onTopLoaded();
					this.touchend = true;
				}
			}).catch(function(err){
			  console.log(err);
			  this.$refs.loadmore.onTopLoaded();
			});
		},
		//请求后台数据之前转换入参
		transformRequest: function (data) {
		    let ret = ''
		    for (let it in data) {
		    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
		        }
		    return ret
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
			this.$http.post(baseUrl+'/bookLendingManagement/bookprofession/getPerfectSelection.shtml',this.transformRequest({label:'推荐',pageNum:this.offset}),{
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
				   /*if(response.data.result_data.length < this.limit) {
						this.touchend = true;
				   }*/
				}else {
					this.loading = false;
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
		hidesetpage() {
			this.$router.go(-1);
		}
	}
}
</script>
<style scoped>
.headTitle {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 998;
}
.PerfectSelection {
	position: fixed;
	top:0;
	bottom:0;
	left:0;
	right:0;
	background: #fff;
	z-index: 101;
	overflow-y: auto;
}
.Recommendlist {
	margin-top:2rem;
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
.showErr {
	width:100%;
	padding:10% 0;
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
.slide-enter-active, .slide-leave-active {
	transition:all .4s
}	
.slide-enter, .slide-leave-active{
	transform: translateX(100%);
}
</style>