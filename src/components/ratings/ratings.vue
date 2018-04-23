<template>
	<li class="ratingList">
		<section class="userCover">
			<img src="../../assets/img/user.png"  />
		</section>
		<section class="content">
			<p class="userName">vcgfg</p>
			<section class="flex">
				<p class="ratingstar">
					<ratingstar :rating="5"></ratingstar>
				</p>
				<p class="like">
					<i class="icon iconfont"></i>
					<span class="likeNum">5</span>
				</p>
			</section>
			<p class="ratingContent">
				澳大利亚在移植中再造澳大利亚在移植中再造澳大利亚在移植中再造
			</p>
			<p class="ratingdate"><!--{{item.date  | dateTime}}-->2017-02-15</p>
		</section>
	</li>
</template>
<script>
import ratingstar from '@/components/common/ratingStar'
export default {
	data() {
		return {
			
		}
	},
	props:['item'],
	components: {
		ratingstar
	}
}
</script>
<style scoped>
li.ratingList {
	padding:.3rem .6rem;
	display: flex;
}
.userCover {
	width:2rem;
	margin-right:.6rem;
}
.userCover img {
	width:100%
}
.ratingList .content {
	flex:auto;
	color:#898989;
}
.userName {
	height:1.2rem;
	line-height: 1.2rem;
	color:#589598;
	font-size: .6rem;
}
.flex {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.ratingList .ratingstar {
	flex: auto;
}
.like {
	width:4rem;
	text-align: right;
}
.like .icon {
	margin-right:.3rem;
	font-size: 1rem;
	color:#898989;
}
.like .likeNum {
	font-size: .5rem;
	color:#898989;
}
.ratingdate {
	margin-top: .3rem;
	font-size: .5rem;
	color:#898989;
}
.ratingContent {
	font-size: .55rem;
	color:#575757;
	line-height: 1rem;
}
</style>