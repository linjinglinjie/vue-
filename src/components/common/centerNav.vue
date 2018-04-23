<template>
	<div class="centernav">
		<ul>
			<router-link tag="li" to="/Leaderboards">
				<i class="icon iconfont bd">&#xe611;</i>
				<span>榜单</span>
			</router-link>
			<router-link tag="li" to="/Topic">
				<i class="icon iconfont zt">&#xe635;</i>
				<span>专题</span>
			</router-link>
			<router-link tag="li" to="/sex">
				<i class="icon iconfont girl">&#xe604;</i>
				<span>女生</span>
			</router-link>
			<!--<router-link tag="li" to="/free">
				<i class="icon iconfont free">&#xe602;</i>
				<span>免费</span>
			</router-link>-->
			<router-link tag="li" to="/FeaturedBook">
				<i class="icon iconfont recomend">&#xe6d9;</i>
				<span>推荐</span>
			</router-link>
		</ul>
	</div>
</template>
<script>
export default {
	data() {
		return {

		}
	}
}
</script>
<style scoped>
.centernav ul {
	display: flex;
	background: #fff;
}
.centernav ul li {
	flex: 1;
	padding :1rem 0;
	text-align: center;
	font-size: .6rem;
}
.icon {
	display: block;
	margin-bottom:.2rem;
	font-size: 1rem;
}
.icon.bd {
	color:#f90
}
.icon.zt {
	color:#f00;
}
.icon.girl {
	color:green
}
.icon.free {
	color:green
}
.icon.recomend {
	color:#5FACEA
}
</style>
