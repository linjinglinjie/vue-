<template>
	<div class="FeaturedBook">
		<vhead :title='title' class="headTitle" @hidesetpage="hidesetpage"></vhead>
		<section class="booklist" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
			<mt-loadmore :top-method="loadTop" ref="loadmore">
			<FeaturedList v-for="(item,index) in num" :key="index"></FeaturedList>
			</mt-loadmore>
			<p class="page-infinite-loading" v-if="loading">
		      	加载中...
		    </p>
		</section>
		<transition name="slideBottom">
			<section v-if="recommendShow" class="Irecommend">
				<i class="icon iconfont"></i>
				我来推荐
			</section>
		</transition>
		<transition name="slideLeft">
			<!--<recomend v-if="recomendListS" @goBack="goBack"></recomend>-->
			<router-view></router-view>
		</transition>
	</div>
</template>
<script>
import vhead from '@/components/common/head'
import FeaturedList from '@/components/book/FeaturedBookList'
import recomend from '@/components/book/recomend/index'
export default {
	data() {
		return {
			title:'精选书单',
			num:10,
			recommendShow:false,
			loading: false,
			scroll: '',
			touchend: false //没有更多数据
		}
	},
	components: {
		vhead,
		FeaturedList,
		recomend
	},
	mounted() {
		window.addEventListener('scroll', this.scrollMethod)
	},
	watch: {
		scroll(curval, oldval) {
			if(curval > 300) {
				this.recommendShow = true;
			}else {
				this.recommendShow = false;
			}
		}
	},
	methods: {
		hidesetpage() {
			this.$router.go(-1);
		},
		/*下拉加载数据*/
		loadTop() {
		  setTimeout(() => {
		  	this.num = this.num-2;
		  	this.$refs.loadmore.onTopLoaded();
		  }, 1000);
		},
		/*上拉加载更多*/
		loadMore() {
			if (this.touchend) {
				return
			}
			//防止重复请求
			if (this.preventRepeatReuqest) {
				return 
			}
			this.loading = true;
			setTimeout(() => {
				this.num = this.num+2;
				this.loading = false;
			},2000);
		},
		scrollMethod() {
		    this.scroll = document.documentElement.scrollTop || document.body.scrollTop;
		}
	}
}
</script>
<style scoped>
.FeaturedBook {
	
}
.headTitle {
	position: fixed;
	top:0;
	left:0;
	right:0;
	z-index: 1000;
}
.booklist {
	margin-top:2rem;
}
.page-infinite-loading{
	height:50px;
	line-height:50px;
	text-align: center;
	font-size: .55rem;
}
.Irecommend{
	position: fixed;
	bottom:0;
	left:0;
	right:0;
	background: #fff;
	border-top:1px solid #ddd;
	height:2rem;
	text-align: center;
	color:#f90;
	font-size: .7rem;
	line-height: 2rem;
}
.Irecommend .icon {
	margin-right:.3rem;
}
.slideBottom-enter-active, .slideBottom-leave-active {
	transition:all .4s;
}
.slideBottom-enter, .slideBottom-leave-active {
	transform: translateY(100%);
}
.slideLeft-enter-active, .slideLeft-leave-active {
	transition:all .4s;
}
.slideLeft-enter, .slideLeft-leave-active {
	transform: translateX(100%);
}
</style>