<template>
	<div>
		<form>
			<section class="search">
				<i class="icon iconfont">&#xe609;</i>
				<input type="text"  placeholder="搜索作者、书名" v-on:focus="insinte" />
			</section>
		</form>
	</div>
</template>
<script>
export default {
	name:'search',
	data() {
		return {
		}
	},
	methods: {
		insinte() {
			this.$emit('showHistroy')
		}
	}
}
</script>
<style scoped>
.search{
	display: flex;
	padding: 0 .2rem 0 .4rem;
	height:1.5rem;
	line-height:1.5rem;
	background: #FAFAFA;
	border:1px solid #CECECE;
	border-radius:5px;
	color: #CECECE;
}
.search input {
	background: none;
	height:1.5rem;
	line-height:1.5rem;
	flex: auto;
	color: #B3B3B3;
	font-size: .55rem;
}
.search .icon {
	margin-right:.4rem;
	color: #B3B3B3;
	font-size: 1rem;
}
</style>