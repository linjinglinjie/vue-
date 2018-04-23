<template>
	<div>
		<div class="headTitle">
			<vHead :title="title" @hidesetpage="hidesetpage"></vHead>
		</div>
		<section class="book">
			<section class="converImg">
				<img v-if="items.src && items.src != ''" :src="items.src" />
				<img v-if="items.src && items.src == ''" src="../../assets/img/moren.jpg" />
				<img v-if="!items.src" src="../../assets/img/moren.jpg" />
			</section>
			<section class="des">
				<h1>{{items.book_name}}</h1>
				<p class="author">{{items.author}}</p>
			</section>
		</section>
		<split></split>
		<section class="ratingList">
			<section class="title">
				精彩评论
			</section>
			<ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
				<rating :items="items" class="list" v-for="(item, index) in num" :key="index"></rating>
			</ul>
			<p class="page-infinite-loading" v-if="this.loading == true">
		      	加载中...
		    </p>
		</section>
	</div>
</template>
<script>
import vHead from '@/components/common/head'
import rating from '@/components/ratings/ratings'
import split from '@/components/common/split'
import bookDes from '@/components/book/bookdescript'
export default {
	data() {
		return {
			num:10,
			title: '全部书评',
			loading: false,
			touchend: false //没有更多数据
		}
	},
	components: {
		vHead,
		rating,
		split
	},
	props: ['items'],
	methods: {
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
		   		this.num = 15;
		   	 this.loading = false;
		   },2000 )
		},
		hidesetpage() {
			this.$emit('closeRating');
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
    z-index: 1000;
}
.book {
	margin-top:2rem;
	display: flex;
	justify-content: space-around;
	align-items: center;
	background: #fff;
	padding:.5rem .2rem 1rem 1rem;
}
.book .des {
	flex: auto;
	margin-left:.6rem;
}
.converImg img{
	width:3.5rem;
}
.book .des h1 {
	font-size: .7rem;
	margin-bottom:.3rem;
}
.book .des .author {
	margin-top: .2rem;
	font-size: .55rem;
	color:#595959;
}
/*精彩评论*/
.ratingList .title {
	padding:.5rem;
	font-size: .7rem;
	color:#595959;
}
.ratingList .list {
	display: flex;
}
.page-infinite-loading {
	height:50px;
	line-height:50px;
	text-align: center;
	font-size: .55rem;
}
</style>