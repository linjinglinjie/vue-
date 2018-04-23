<template>
	<div class="recomend">
		<vhead :title="title" class="head" @hidesetpage="hidesetpage"></vhead>
		<section class="content">
			<mt-loadmore :top-method="loadTop" ref="loadmore">
				<section>
					<strong>推荐</strong>
					<section class="user">
						<section class="userInfo">
							<section class="userHead">
								<img src="/static/images/user.png"  />
							</section>
							<section class="accountNum">
								<p class="num">46767464543</p>
								<p class="date">7小时前</p>
							</section>
						</section>
						<section class="userRating">
							最近看的书，本人看小说还是很挑剔的，所以推荐给大家看看，希望能合口
						</section>
					</section>
					<section class="recomendlist">
						<list v-for="(item, index) in 3" :key="index" @openDes="openDes"></list>
					</section>
				</section>
			</mt-loadmore>
		</section>
		<section class="bottomopera">
			<section class="btn"><i class="icon iconfont">&#xe630;</i><span class="num">9</span></section>
			<section class="btn"><i class="icon iconfont">&#xe665;</i><span class="num">11</span></section>
		</section>
		<transition name="slideLeft">
			<bookDes v-if="showDes" @close="close" :num="id"></bookDes>
		</transition>
	</div>
</template>
<script>
import vhead from '@/components/common/head'
import list from '@/components/book/recomend/recomendList'
import bookDes from '@/components/book/bookdescript'
export default {
	data() {
		return {
			title:'推荐',
			showDes:false, //显示book详情页
			id:''
		}
	},
	components: {
		vhead,
		list,
		bookDes
	},
	methods: {
		//图书详情页展开
		openDes(val) {
			this.showDes = true;
			this.id = val;
		},
		//图书详情页关闭
		close() {
			this.showDes = false;
		},
		//返回上一页
		hidesetpage() {
			this.$router.go(-1);
		},
		/*下拉加载数据*/
		loadTop() {
		  setTimeout(() => {
		  	this.$refs.loadmore.onTopLoaded();
		  }, 1000);
		}
	}
}
</script>
<style scoped>
.recomend {
	position: fixed;
	top:0;
	left:0;
	width:100%;
	bottom:0;
	z-index: 1000;
	background:#fff;
}
.head {
	position: fixed;
	top:0;
	left:0;
	width:100%;
}
.content {
	position: absolute;
	top:2rem;
	bottom:2rem;
	left:0;
	right:0;
	padding:1rem .5rem;
	overflow-y: auto;
}
strong {
	font-size: .85rem;
	color:#000;
	font-weight: normal;
}
.userInfo{
	display: flex;
	justify-content: flex-start;
	align-items: center;
	margin:1rem 0 .5rem 0;
}
.userInfo .userHead img {
	vertical-align: middle;
	width:2rem;
	height:2rem;
	border-radius:50%;
	margin-right: .5rem;
}
.accountNum .num {
	font-size: .7rem;
	margin-bottom:.1rem;
	color:#6FA6A7;
}
.accountNum .date {
	color:#B4B4B4;
	font-size: .55rem;
}
.userRating {
	font-size: .65rem;
	color: #565656;
	line-height: 1rem;
}
.bottomopera {
	position: fixed;
	bottom:0;
	left:0;
	right:0;
	display: flex;
	justify-content: space-around;
	align-items: center;
	background: #F5F5F5;
	border-top:1px solid #EBEBEB;
	height:2rem;
	line-height: 2rem;
}
.bottomopera .btn .icon {
	font-size: 1rem;
	color:#787878;
	vertical-align: middle;
}
.bottomopera .btn .num {
	font-size: .7rem;
	margin-left: .3rem;
	color:#787878;
}
.slideLeft-enter-active, .slideLeft-leave-active {
	transition:all .4s;
}
.slideLeft-enter, .slideLeft-leave-active {
	transform: translateX(100%);
}
</style>