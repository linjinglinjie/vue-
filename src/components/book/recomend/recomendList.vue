<template>
	<div class="recomendList" @click="openDes('002')">
		<section class="title">
			<span class="sequence">1</span>
			<span class="bookName">《妖路芳菲（原名狐说八道）》</span>
		</section>
		<section class="book">
			<section class="bookImg">
				<img src="/static/images/img.png"  />
			</section>
			<section class="startLook">
				<h1>《妖路芳菲（原名狐说八道）》</h1>
				<p class="Author">慕兰州</p>
				<a class="look">开始阅读</a>
			</section>
		</section>
		<section class="rating">
			《妖路芳菲（原名狐说八道）》文笔轻松又感人
		</section>
	</div>
</template>
<script>
export default {
	data() {
		return {
			
		}
	},
	methods: {
		openDes(id) {
			this.$emit('openDes',id);
		}
	}
}
</script>
<style scoped>
.recomendList {
	padding:.8rem 0 .3rem 0;
}
.title span {
	font-size: .65rem;
	color:#539999;
}
.title span.sequence {
	display: inline-block;
	width:1rem;
	height:1rem;
	text-align: center;
	line-height: 1rem;
	border-radius:50%;
	border:1px solid #539999;
}
.book {
	display: flex;
	justify-content: space-around;
	align-items: center;
	padding:.5rem;
	background:#F5F5F5;
	margin:.5rem 0;
}
.book .bookImg img {
	width:4rem;
	height:5rem;
	margin-right:.2rem;
	box-shadow: 0 3px 5px #999;
}
.startLook {
	flex:1;
	text-align: center;
}
.startLook h1 {
	overflow:hidden; 
	text-overflow:ellipsis;
	display:-webkit-box; 
	-webkit-box-orient:vertical;
	-webkit-line-clamp:1; 
	color:#000;
	font-size: .75rem;
}
.Author {
	font-size: .55rem;
	color:#858585;
	margin:.5rem 0;
}
.look {
	display: inline-block;
	font-size: .65rem;
	color:#6EAE4E;
	border:1px solid #6EAE4E;
	border-radius:4px;
	padding:.25rem .8rem;
}
.rating {
	font-size: .65rem;
	color: #565656;
	line-height: 1rem;
}
</style>