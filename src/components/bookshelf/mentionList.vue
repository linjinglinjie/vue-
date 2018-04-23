<template>
	<li class="shelfList">
		<section class="book"
			<section class="coverPath">
				<img v-if="item.bookImg && item.bookImg != ''" :src="item.bookImg" />
				<img v-if="item.bookImg && item.bookImg == '' || item.bookImg == null" src="../../assets/img/moren.jpg" />
				<img v-if="!item.bookImg" src="../../assets/img/moren.jpg" />
				<slot name="mentionSign" class="mentionSign"></slot>
			</section>
			<section class="des">
				<p class="shelfName">{{item.book_name}}</p>
				<p class="borwdres">借阅处：<span>{{item.borrow_department_name}}</span></p>
				<p class="Author">预约人：<span>{{item.user_name}}</span></p>
				<p>取书时间：<span>{{item.reserve_time}}</span></p>
				<p>分类号：<span>{{item.fenleihao}}</span></p>
				<p class="Author">书架名称：<span>{{item.book_shelf_name}}</span></p>
				<p class="Author">行列：<span>{{item.ranks}}</span></p>

			</section>
		</section>
		<!--<div class="mentionSign">
			<input class="tgl tgl-flip" :id="index" type="checkbox">
    		<label class="tgl-btn" data-tg-off="Nope" data-tg-on="Found" :for="index"></label>
		</div>-->
	</li>
</template>
<script>
	import checks from '@/components/common/checkbox'
	export default {
		data() {
			return {
				/*checkboxData:1,
				checked:false*/
			}
		},
		components: {
			checks
		},
		props: ['item'],
		methods: {
			
		}
	}
</script>
<style scoped>
	.shelfList {
		width: 100%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding: .5rem 0;
		border-bottom: 1px solid #ddd;
	}
	
	.shelfList:last-child {
		border-bottom: none;
	}
	
	.mentionSign {
		width: 2.5rem;
	}
	
	.shelfList .book {
		flex: auto;
		display: flex;
		/*align-items: center;*/
	}
	.shelfList .mentionSign {
		margin:.5rem 0 0 .7rem;
	}
	.shelfList section img {
		width: 3.8rem;
		height: 4.8rem;
		display: block;
		margin-right: 0.5rem;
	}
	
	.shelfList .des {
		flex: auto;
	}
	
	.shelfList p {
		margin-top: .3rem;
		font-size: .6rem;
		color: #9C9C9C;
	}
	
	.shelfList p.shelfName {
		margin: 0 0 .3rem 0;
		font-size: .7rem;
		color: #373737;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
	
	.shelfList p.Author span {
		color: #f90;
	}
	
	.shelfList p.borwdres span {
		color: #6AA7D3;
	}
	/*标记按钮*/
	
	.tgl {
		display: none;
	}
	
	.tgl,
	.tgl:after,
	.tgl:before,
	.tgl *,
	.tgl *:after,
	.tgl *:before,
	.tgl+.tgl-btn {
		box-sizing: border-box;
	}
	
	.tgl::-moz-selection,
	.tgl:after::-moz-selection,
	.tgl:before::-moz-selection,
	.tgl *::-moz-selection,
	.tgl *:after::-moz-selection,
	.tgl *:before::-moz-selection,
	.tgl+.tgl-btn::-moz-selection {
		background: none;
	}
	
	.tgl::selection,
	.tgl:after::selection,
	.tgl:before::selection,
	.tgl *::selection,
	.tgl *:after::selection,
	.tgl *:before::selection,
	.tgl+.tgl-btn::selection {
		background: none;
	}
	
	.tgl+.tgl-btn {
		outline: 0;
		display: block;
		width: 2.5rem;
		height: 1.2rem;
		position: relative;
		cursor: pointer;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
	
	.tgl+.tgl-btn:after,
	.tgl+.tgl-btn:before {
		position: relative;
		display: block;
		content: "";
		width: 50%;
		height: 100%;
	}
	
	.tgl+.tgl-btn:after {
		left: 0;
	}
	
	.tgl+.tgl-btn:before {
		display: none;
	}
	
	.tgl:checked+.tgl-btn:after {
		left: 50%;
	}
	
	.tgl-flip+.tgl-btn {
		padding: 2px;
		-webkit-transition: all .2s ease;
		transition: all .2s ease;
		font-family: sans-serif;
		-webkit-perspective: 100px;
		perspective: 100px;
	}
	
	.tgl-flip+.tgl-btn:after,
	.tgl-flip+.tgl-btn:before {
		display: inline-block;
		-webkit-transition: all .4s ease;
		transition: all .4s ease;
		width: 100%;
		text-align: center;
		position: absolute;
		line-height: 1.2rem;
		font-weight: bold;
		color: #fff;
		position: absolute;
		top: 0;
		left: 0;
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;
		border-radius: 4px;
	}
	
	.tgl-flip+.tgl-btn:after {
		font-size: .6rem;
		content: attr(data-tg-on);
		background: #02C66F;
		-webkit-transform: rotateY(-180deg);
		transform: rotateY(-180deg);
	}
	
	.tgl-flip+.tgl-btn:before {
		font-size: .6rem;
		background: #FF3A19;
		content: attr(data-tg-off);
	}
	
	.tgl-flip+.tgl-btn:active:before {
		-webkit-transform: rotateY(-20deg);
		transform: rotateY(-20deg);
	}
	
	.tgl-flip:checked+.tgl-btn:before {
		-webkit-transform: rotateY(180deg);
		transform: rotateY(180deg);
	}
	
	.tgl-flip:checked+.tgl-btn:after {
		-webkit-transform: rotateY(0);
		transform: rotateY(0);
		left: 0;
		background: #7FC6A6;
	}
	
	.tgl-flip:checked+.tgl-btn:active:after {
		-webkit-transform: rotateY(20deg);
		transform: rotateY(20deg);
	}
</style>