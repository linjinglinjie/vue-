<template>
	<li class="tabClas" v-for="(item, index) in tabList" @click="chooseMenu(index)" :class="{'active':showIndex === index }">{{item}}</li>
</template>
<script>
export default {
	data() {
		return {
			showIndex:''
		}
	},
	props: ['tabList'],
	methods: {
		chooseMenu() {
			this.$emit('chooseMenu');
		}
	}
}
</script>
<style scoped>
.tabClas {
	height:2rem;
	line-height: 2rem;
	font-size: .7rem;
	color:#292929;
}
.tabClas.active {
	color:#f90;
}
</style>