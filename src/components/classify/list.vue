<template>
	<div>
		<section class="bookclassList">
			<section class="bookClass">
				<p class="className">{{book.text}}</p>
				<!--<p class="bookNum">{{book.level}}</p>-->
			</section>
			<section class="bookimg">
				<img v-if="book.patch != ''" :src="'/file/'+book.patch" />
				<img v-if="book.patch == ''" src="../../assets/img/class.png" />
				<img v-if="!book.patch" src="../../assets/img/class.png" />
			</section>
		</section>
	</div>
</template>
<script>
export default {
	data() {
		return {
		}
	},
	props: ['book'],
	created() {
		
	},
	mounted() {
		
	},
}
</script>
<style scoped>
.bookclassList{
	display: flex;
	justify-content: center;
	width:100%;
	height:3.5rem;
	padding: .5rem .3rem;
	padding-bottom: 0;
	border: 1px solid #EFEFEF;
	border-radius:5px;
	/*background: antiquewhite;*/
	color: #333;
}	
.bookclassList .bookClass{
	flex: 2;
	text-align: left;
	font-size: .65rem;
}
.bookclassList .bookClass .bookNum{
	font-size: .55rem;
	color:#7F7F7F;
	margin-top:.2rem;
}
.bookclassList .bookimg{
	flex: 1;
	text-align: center;
	width:100%;
	height:100%;
}
.bookclassList .bookimg img{
	max-width:3.2rem;
	height:100%;
}
</style>