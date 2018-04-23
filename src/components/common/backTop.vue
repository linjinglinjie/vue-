<template>
	<div>
		<a class="goTop" @click="goTop">
			<i class="icon iconfont">&#xe6dc;</i>
		</a>
	</div>
</template>
<script>
export default {
	data() {
		return {
			
		}
	},
	methods: {
		goTop() {
			this.$emit('goTop');
		}
	}
}
</script>
<style scoped>
.goTop {
	position:fixed;
	bottom:3.5rem;
	right:1rem;
	z-index:1000;
}
.goTop .icon {
	font-size: 1.8rem;
	color:#f90;
	text-shadow: 0 0 .2rem #ddd;
}
</style>