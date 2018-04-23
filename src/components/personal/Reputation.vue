<template>
	<div class="tationList">
		<section class="headTitle">
			<vHead :title="title" @hidesetpage="hidesetpage"></vHead>
		</section>
		<section class="content">
			<mt-loadmore :top-method="loadTop" ref="loadmore">
			<ul class="list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
				<li v-for="(item,index) in reputateList" :key='index'>
					<section class="descript">
						<p class="project">{{item.book_name}}</p>
						<p class="date">{{item.return_time}}</p>
					</section>
					<section v-if="item.is_overdue==1" class="reason Less">逾期</section>
					<section v-if="item.is_overdue==1" class="score Less">-10</section>
					<section v-if="item.is_overdue==0" class="reason Add">按时归还</section>
					<section v-if="item.is_overdue==0" class="score Add">+10</section>
				</li>
			</ul>
			</mt-loadmore>
			<p class="page-infinite-loading" v-if="this.loading == true">
		      	<span class="spinner"><mt-spinner type="fading-circle" color="#26a2ff" :size="20"></mt-spinner></span>加载中...
		    </p>
	    </section>
		<section class="totleScore">
			<i class="icon iconfont">&#xe60b;</i>总分：<span>{{totleScore}}</span>
		</section>
		<loadding v-if="loadingShow"></loadding>
	</div>
</template>
<script>
import vHead from '@/components/common/head'
import loadding from '@/components/common/loading'
import { baseUrl } from '@/assets/plugins/env.js'
export default {
	data() {
		return {
			title:'信誉值记录',
			totleScore:'',
			offset:0,
			pageCount:1,
			loading: false, // 
			touchend: false, //没有更多数据
			limit:10,//一页默认10条
			reputateList:'', //信誉值列表
			loadingShow: true
		}
	},
	components: {
		vHead,
		loadding
	},
	created() {
		
	},
	mounted() {
		this.loadMore();
	},
	methods: {
		loadTop() {
			this.offset = 1;
			this.touchend = false;
			this.$http.get(baseUrl+'/bookLendingManagement/borrow/userGloryListInfo.shtml',{
			  params:{
			    pageNum:this.offset
			  }
			}).then((response) => {
				console.log(response)
			   this.reputateList = response.data.page.list;
			   this.$refs.loadmore.onTopLoaded();
			   if(response.data.page.list.length < this.limit) {
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
			this.$http.get(baseUrl+'/bookLendingManagement/borrow/userGloryListInfo.shtml',{
			  params:{
			    pageNum:this.offset
			  }
			}).then((response) => {
				this.pageCount = response.data.page.totalPage;
				this.totleScore = response.data.userGlory;
				if(this.reputateList.length == 0) {
					this.reputateList = response.data.page.list;
				}else {
					this.reputateList = this.reputateList.concat(response.data.page.list);
				}
			   this.loading = false;
			   this.loadingShow = false;
			}).catch(function(err){
			  console.log(err);
			  this.loadingShow = false;
			});
		},
		hidesetpage() {
			this.$emit('closeTation');
		}
	}
}
</script>
<style scoped>
.tationList {
	position: fixed;
	top:0;
	left:0;
	right:0;
	bottom:0;
	z-index: 999;
	overflow-y: auto;
	background:#fff;
}
.headTitle {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 998;
}
.content {
	margin:2rem 0;
}
.list li {
	display: flex;
	justify-content:space-between;
	align-items: center;
	padding:.5rem .8rem;
	border-bottom:1px solid #f1f1f1;
}
.list li .descript {
	width:50%;
}
.list li .descript .project {
	width:100%;
	height:1rem;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	font-size: .65rem;
	color:#666;
}
.list li .descript .date {
	font-size: .5rem;
	color:#9C9C9C;
	margin-top:.2rem;
}
.list li .reason, .list li .score {
	color:#f90;
	font-size: .65rem;
}
.list li .reason.Less, .list li .score.Less {
	color:#0080FF;
}
.totleScore {
	position: fixed;
	bottom:0;
	left:0;
	right:0;
	background:#f90;
	height:2rem;
	line-height: 2rem;
	padding:0 .8rem;
	text-align: right;
	font-size: .7rem;
	color:#fff;
}
.totleScore .icon {
	margin-right: .3rem;
	font-size: .8rem;
	color:#fff;
	vertical-align: middle;
}
.totleScore span {
	font-size: .8rem;
	color:#f00;
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
</style>