<template>
	<li class="clear" @click="openDes(item.ISBN)">
		<section class="book-img">
			<img v-if="item.src && item.src != '' && item.src != address+'/file/'" :src="item.src" class="verM"/>
			<img v-if="item.src && item.src == '' || item.src == null || item.src == address+'/file/'" src="../../assets/img/moren.jpg" class="verM"/>
			<img v-if="!item.src" src="../../assets/img/moren.jpg" class="verM"/>
		</section>
		<hgroup class="book-right">
			<h1 class="book-title">
				{{item.book_name}}
			</h1>
			<section class="Introduction">
				{{item.book_introduction}}
			</section>
			<section class="operating">
				<p class="Author">{{item.author}}</p>
				<slot name="classFiy"></slot>
			</section>
		</hgroup>
	</li>
</template>
<script>
import { baseUrl } from '@/assets/plugins/env.js'
export default {
	name:'booklist',
	data() {
		return {
			address:''
		}
	},
	props: ["item"],
	created() {
		this.address = baseUrl;
	},
	methods: {
		openDes(id) {
			this.$emit('openDes',id);
		}
	}
}
</script>
<style scoped>
.clear{
	display: flex;
	justify-content: space-between;
	background: #fff;
	padding: 0.7rem 0.4rem;
  border-bottom:1px solid #ddd;
}
.book-img img {
	width:3.4rem;
	height:4.6rem;
	display: block;
	margin-right: 0.5rem;
}
.book-right {
	flex: auto;
	position: relative;
}
.book-title {
	font-size:.65rem;
	color:#373737;
	margin-bottom:.3rem;
	width:220px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow:ellipsis;
}
.Introduction {
	overflow:hidden;
	text-overflow:ellipsis;
	display:-webkit-box;
	-webkit-box-orient:vertical;
	-webkit-line-clamp:2;
	font-size:.55rem;
	color:#9C9C9C;
	line-height: .9rem;
	height: 1.8rem;
}
.operating {
	position: absolute;
	bottom: 0;
	left:0;
	width:100%;
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	margin-top:.2rem;
}
.operating .Author {
	max-width:45%;
	color:#9C9C9C;
	font-size: .5rem;
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
}
.operating .classfiy span{
	padding:.1rem .3rem;
	border:1px solid #ddd;
	font-size: .5rem;
	margin-left: .1rem;
}
.operating .classfiy span.red{
	color:#f90;
	border:1px solid #f90;
}
</style>
