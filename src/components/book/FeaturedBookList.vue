<template>
	<div>
		<router-link tag="div" to="/FeaturedBook/recomend" class="FeaturedBookList">
			<section class="top">
				<section class="left">
					<h1>【投稿自助】：解决书荒的正确姿势</h1>
					<section class="descript">
						你看过什么？你喜欢什么？书荒or解决书荒，这里需要你的参与！属于你们的底地盘，你自己做主！
					</section>
				</section>
				<section class="right">
					<img src="/static/images/img.png" />
				</section>
			</section>
			<section class="bottom">
				<p class="user"><i class="icon iconfont">&#xe6a6;</i>多看原创小编</p>
				<p class="num"><i class="icon iconfont">&#xe6b0;</i>2023</p>
			</section>
		</router-link>
		<split></split>
	</div>
</template>
<script>
import split from '@/components/common/split'
export default {
	data() {
		return {
			
		}
	},
	components: {
		split
	},
	methods: {
	
	}
}
</script>
<style scoped>
.FeaturedBookList {
	background: #fff;
	padding:1rem .5rem .5rem .5rem;
}
.FeaturedBookList .top {
	display: flex;
	justify-content: space-around;
	align-items: center;
}
.FeaturedBookList .top .left {
	flex: auto;
}
.FeaturedBookList .top .right img {
	width:4rem;
	height:5rem;
	display: block;
	margin-left: .8rem;
	box-shadow: 0 0 5px #888888;
}
.FeaturedBookList .top .left h1 {
	overflow:hidden; 
	text-overflow:ellipsis;
	display:-webkit-box; 
	-webkit-box-orient:vertical;
	-webkit-line-clamp:2; 
	font-size:.72rem;
	font-weight: bold;
	color:#373737;
	margin-bottom:.3rem;
	line-height: 1rem;
}
.FeaturedBookList .top .left .descript {
	overflow:hidden; 
	text-overflow:ellipsis;
	display:-webkit-box; 
	-webkit-box-orient:vertical;
	-webkit-line-clamp:3; 
	font-size:.55rem;
	color:#9C9C9C;
	line-height: 1rem;
}
.FeaturedBookList .bottom {
	display: flex;
	justify-content: space-between;
}
.FeaturedBookList .bottom p {
	padding:1rem 0 0 0;
	font-size: .55rem;
	color:#9C9C9C;
}
.user .icon {
	font-size: 1rem;
	margin-right:.3rem;
	color:#ccc;
	vertical-align: sub;
}
.num .icon{
	font-size: .7rem;
	margin-right:.3rem;
	color:#ccc;
}
</style>