<template>
	<div>
		<section class="allHead">
			<i class="icon iconfont" @click="goBack">&#xe607;</i>
			<span class="title">
				{{title}}
			</span>
		</section>
	</div>
</template>
<script>
export default {
	data() {
		return {
			
		}
	},
	props: ['title'],
	methods: {
		goBack() {
			this.$emit('hidesetpage')
		}
	}
}
</script>
<style scoped>
.allHead{
	position: relative;
	background: #fff;
	padding:0 .5rem;
	height:2rem;
	line-height: 2rem;
	border-bottom:1px solid #ddd;
	font-size: 0;
	color:#000;
}
.allHead span{
	position: absolute;
	top:0;
	left:0;
	right:0;
	z-index: 1;
	text-align: center;
	font-size: .75rem;
	color:#000;
}
.allHead .icon {
	position: absolute;
	left:.5rem;
	top: 0rem;
	z-index: 2;
	font-size: 1rem;
	vertical-align: top;
}
</style>