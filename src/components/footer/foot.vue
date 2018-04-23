<template>
	<div>
		<ul class="footernav">
			<router-link tag="li" to="/home" class="algin-center">
				 <i class="icon iconfont">&#xe616;</i>
	   			<span>首页</span>
			</router-link>
			<router-link tag="li" to="/classify" class="algin-center">
				 <i class="icon iconfont">&#xe600;</i>
	   			<span>分类</span>
			</router-link>
			<router-link tag="li" to="/bookshelf" class="algin-center">
				 <i class="icon iconfont">&#xe603;</i>
	   			<span>预约车</span>
			</router-link>
			<router-link tag="li" to="/my" class="algin-center">
				 <i class="icon iconfont">&#xe8ec;</i>
	   			<span>我的</span>
			</router-link>
		</ul>
	</div>
</template>
<script>
export default {
	data() {
		return {
			selected:'外卖'
		}
	},
	mounted() {
	},
	watch: {

	}
}
</script>
<style scoped>
.footernav {
	width:100%;
	position: fixed;
	bottom:0;
	left: 0;
	z-index: 99;
	display:flex;
	justify-content: center;
	align-items: center;
	background: #fff;
	border-top:1px solid #ddd;
}
.footernav li {
	padding:.3rem 0;
	flex: 1;
	text-align: center;
	font-size: .45rem;
}
.icon{
	display: block;
	color:#4F4F4F;
	font-size: 1rem;
	margin-bottom:.2rem;
}
.router-link-active span{
	color:#f90;
}
.router-link-active .icon {
	color:#f90;
}
</style>
