<template>
	<div class="shelfList" @click="openDes(item.isbn)">
		<section>
			<img v-if="item.bookImg && item.bookImg != ''" :src="item.bookImg" />
			<img v-if="item.bookImg && item.bookImg == '' || item.bookImg == null" src="../../assets/img/moren.jpg"/>
			<img v-if="!item.bookImg" src="../../assets/img/moren.jpg" />
		</section>
		<p class="shelfName">{{item.bookName}}</p>
		<slot name="hotsearch"></slot>
		<slot name="borrow"></slot>
		<slot name="checks"></slot>
	</div>
</template>
<script>
export default {
	data() {
		return {
			
		}
	},
	props: ['item'],
	methods: {
		openDes(id) {
			this.$emit('openDes',id);
		}
	}
}
</script>
<style scoped>
.shelfList {
	width:100%;
	text-align: center;
	padding-bottom:.7rem;
}
.shelfList section {
	width:80%;
	height:5rem;
	overflow: hidden;
	margin: 0 auto;
	text-align: center;
	border:1px solid #ddd;
	box-shadow: 0 0 .3rem rgba(0,0,0,.2);
}
.shelfList section img {
	width:100%;
}
.shelfList p {
	width:80%;
	margin: 0 auto;
	text-align: left;
	margin-top: .3rem;
	font-size: .6rem;
	overflow:hidden; 
	text-overflow:ellipsis;
	display:-webkit-box; 
	-webkit-box-orient:vertical;
	-webkit-line-clamp:2; 
}
</style>