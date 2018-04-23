<template>
	<div class="AcceptedList">
		<section class="fixedTop">
			<section class="topsearch" :class="{'border':operatShow || styleShow}">
				<i class="icon iconfont" @click="goBack">&#xe607;</i>
				<section class="title">
					{{this.title}}
				</section>
				<section class="operating" @click="Showoperat">
					<i class="icon iconfont">&#xe60a;</i>
				</section>
			</section>
			<transition name="slide">
				<section class="operatlist" v-if="operatShow">
					<ul>
						<li @click="Histry">
							<i class="icon iconfont">&#xe600;</i>
							<p>借阅记录</p>
						</li>
						<li @click="showStyle">
							<i class="icon iconfont">&#xe600;</i>
							<p>书架风格</p>
						</li>
					</ul>
				</section>
			</transition>
			<!--书架风格-->
			<transition name="slide" mode="out-in">
				<section class="style" v-if="styleShow">
					<section class="styleList">
						<section class="list easy" :class="{'active':StyleNum==0}" @click="choseStyle(0)">
							<p class="Styletitle">简约（推荐）</p>
							<div class="shelfStyle"></div>
						</section>
						<section class="list classic" :class="{'active':StyleNum==1}" @click="choseStyle(1)">
							<p class="Styletitle">经典</p>
							<div class="shelfStyle"></div>
						</section>
					</section>
					<!--<section class="showoron">
						<section class="right">
							<span>简易模式</span>
							<mt-switch v-model="value"></mt-switch>
						</section>
					</section>-->
				</section>
			</transition>
		</section>
		<!--书架-->
		<section class="shelf" v-if="this.shelflist.length != 0">
			<ul v-if="StyleNum==0">
				<shelfList class="shelfList shelfListqb" v-for="(item, index) in shelflist" :key="index" :item="item" @openDes="openDes">
					<!--<p class="borrow" slot="borrow" v-if="localpath == 'allOrder' && item.Borrow">已借</p>
					<p class="borrow" slot="borrow" v-if="localpath == 'allOrder' && item.reservation">预约</p>-->
					<p class="borrow" slot="borrow" v-if="localpath == 'allOrder' && item.handle_state == 0">已归还</p>
					<p class="borrow" slot="borrow" v-if="localpath == 'allOrder' && item.handle_state == 1">已预约</p>
					<p class="borrow" slot="borrow" v-if="localpath == 'allOrder' && item.handle_state == 2">受理中</p>
					<p class="borrow" slot="borrow" v-if="localpath == 'allOrder' && item.handle_state == 3">已完成</p>
				</shelfList>
			</ul>
			<ul v-if="StyleNum==1">
				<shelfListclassic class="shelfList" v-for="(item, index) in shelflist" :key="index" :item="item" @openDes="openDes">
					<p slot="status" v-if="localpath == 'allOrder'">借阅状态：
						<span v-if="item.handle_state == 0">已归还</span>
						<span v-if="item.handle_state == 1">已预约</span>
						<span v-if="item.handle_state == 2">受理中...</span>
						<span v-if="item.handle_state == 3">已完成</span>
					</p>
				</shelfListclassic>
			</ul>
		</section>
		<section class="nothing" v-if="this.shelflist.length == 0">
			<section>
				<i class="icon iconfont">&#xe624;</i>
				<p class="nobook">暂时还没有订单哦！</p>
			</section>
		</section>
		<transition name="fade">
			<section class="shadow" v-if="operatShow || styleShow" @click="allfalse"></section>
		</transition>
		<!--借阅历史-->
		<transition name="slideLeft">
			<section class="showHistry" v-if="showHistry">
				<borrowHistry @hidesetpage="hideHistry"></borrowHistry>
			</section>
		</transition>
		<!--图书详情页展示-->
		<transition name="slideLeft">
			<bookDes v-if="showDes" @close="close" :num="id"></bookDes>
		</transition>
		<loading v-if="this.loading"></loading>
	</div>
</template>
<script>
	import allHead from '@/components/common/head'
	import shelfList from '@/components/bookshelf/shelfList'
	import shelfListclassic from '@/components/bookshelf/shelfListclassic'
	import loading from '@/components/common/loading'
	import borrowHistry from '@/components/personal/borrowHistry'
	import bookDes from '@/components/book/bookdescript'
	import { baseUrl } from '@/assets/plugins/env.js'
	export default {
		data() {
			return {
				localpath:'AcceptedList',
				title:'',
				id: '',
				shelflist: '',
				operatShow: false,
				styleShow: false,
				topnavHide: false,
				loading: true,
				value: '',
				StyleNum: 0,
				showHistry: false,
				showDes: false,
			}
		},
		components: {
			allHead,
			loading,
			shelfList,
			shelfListclassic,
			borrowHistry,
			bookDes
		},
		created() {
			this.localpath = this.$route.path.substr(this.$route.path.lastIndexOf('/')+1);
			this.initData();
			this.getNum();
		},
		mounted() {
			
		},
		computed: {
			//订单状态status
			
		},
		methods: {
			initData() {
				this.loading = true;
				this.shelflist = [];
				if(this.localpath == 'AcceptedList') {
					this.title = '订单受理中';
					this.$http.get(baseUrl + '/bookLendingManagement/borrow/findByUserId.shtml').then((response) => {
						for(let i=0;i<response.data.length;i++) {
							if(response.data[i].handle_state == 2) {
								this.shelflist.push(response.data[i])
							}
						}
						this.loading = false;
					}).catch(function(err) {
					});
				}else if(this.localpath == 'completed') {
					this.title = '借阅中订单';
					this.$http.get(baseUrl + '/bookLendingManagement/borrow/findByUserId.shtml').then((response) => {
						for(let i=0;i<response.data.length;i++) {
							if(response.data[i].handle_state == 3) {
								this.shelflist.push(response.data[i])
							}
						}
						this.loading = false;
					}).catch(function(err) {
					});
				}else if(this.localpath == 'allOrder') {
					this.title = '所有订单';
					this.$http.get(baseUrl + '/bookLendingManagement/borrow/findByUserId.shtml').then((response) => {
						this.shelflist = response.data;
						this.loading = false;
					}).catch(function(err) {
					});
				}
				
			},
			Showoperat() {
				if(this.styleShow == true) {
					this.operatShow = false;
					this.styleShow = false;
					return
				}
				this.operatShow = !this.operatShow;
			},
			showStyle() {
				this.operatShow = false;
				this.styleShow = true;
			},
			allfalse() {
				this.operatShow = false;
				this.styleShow = false;
			},
			hideHistry() {
				this.showHistry = false;
				this.allfalse();
			},
			//显示借阅历史
			Histry() {
				this.operatShow = false;
				setTimeout(() => {
					this.showHistry = true;
				}, 200)
			},
			//选择图书风格
			choseStyle(val) {
				this.StyleNum = val;
				localStorage.setItem("StyleNum", val);
			},
			//打开图书详情
			openDes(val) {
				this.showDes = true;
				this.id = val;
			},
			//关闭图书详情
			close() {
				this.showDes = false;
			},
			getNum() {
				let num = localStorage.getItem("StyleNum");
				if(num != null) {
					this.StyleNum = num;

				} else {
					this.StyleNum = 0;
				}
			},
			goBack() {
				this.$router.go(-1);
			}
		}
	}
</script>
<style scoped>
	.AcceptedList {
		position: fixed;
		top:0;
		left:0;
		right:0;
		bottom:0;
		z-index: 100;
		overflow-y: auto;
		background:#fff;
	}
	.fixedTop{
		position: fixed;
		z-index: 102;
		top: 0;
		left: 0;
		right: 0;
	}
	.topsearch {
		background: #fff;
		border-bottom:1px solid #ddd;
		display: flex;
		justify-content: center;
		align-content: center;
		position: relative;
		z-index: 102;
		top: 0;
		left: 0;
		right: 0;
	}
	
	.topsearch.border {
		border-bottom: 1px solid #eee;
	}
	.topsearch .icon {
		width:1.5rem;
		font-size: 1rem;
		padding:.5rem;
	}
	.title {
		flex: auto;
		height:2rem;
		line-height:2rem;
		text-align: center;
		font-size:.75rem;
		color:#000;
	}
	
	.operating {
		width: 2rem;
		margin-top: .3rem;
		text-align: center;
	}
	
	.operating .icon {
		font-size: 1rem;
		color: #999;
	}
	
	.operatlist,
	.style {
		position: absolute;
		top: 2em;
		left: 0;
		right: 0;
		z-index: 101;
		background: #fff;
	}
	
	.operatlist ul {
		display: flex;
		flex-flow: row wrap;
	}
	
	.operatlist li {
		padding: .8rem .3rem;
		width: 50%;
		text-align: center;
		border-right: 1px solid #ddd;
		border-bottom: 1px solid #ddd;
	}
	
	.operatlist li:nth-child(2n) {
		border-right: none;
	}
	
	.operatlist li .icon {
		font-size: .8rem;
	}
	
	.operatlist li p {
		font-size: .6rem;
		margin-top: .3rem;
		color: #767676;
	}
	
	.shelfList {
		position: relative;
	}
	.shelfListqb {
		width:33.33% !important;
	}
	.shelfList .borrow {
		position: absolute;
		top: 0;
		left: 10%;
		width: .9rem;
		height: 2.3rem;
		line-height: .6rem;
		text-align: center !important;
		margin:0 !important;
		display: flex;
		justify-content: center;
		/*align-items: center;*/
		padding-top: .1rem;
		background: url('../../assets/img/sign.png') no-repeat top center;
		background-size: cover;
		color: #fff;
		font-size: .5rem;
		border: none;
		box-shadow: none;
	}
	/*书架风格*/
	
	.style {
		padding: .5rem 0 .3rem 0;
	}
	
	.styleList {
		display: flex;
		padding: .5rem;
	}
	
	.styleList .list {
		flex: 1;
		margin: 0 .5rem;
		background: #BFBFBF;
		border: .1rem solid #BFBFBF;
		border-radius: .3rem;
		box-shadow: 0 0 .3rem #ddd;
	}
	
	.styleList .list.active {
		background: #619CC4;
		border: .1rem solid #619CC4;
	}
	
	.styleList .list p.Styletitle {
		height: 1.8rem;
		line-height: 1.8rem;
		text-align: center;
		color: #fff;
		font-size: .65rem;
		border-radius: .3rem .3rem 0 0;
	}
	
	.styleList .list.active p.Styletitle {
		background: #619CC4;
	}
	
	.shelfStyle {
		background: #fff;
		height: 5rem;
		border-radius: 0 0 .3rem .3rem;
	}
	
	.style .showoron {
		padding: .2rem;
		border-top: 1px solid #ddd;
		text-align: right;
	}
	
	.style .showoron .right {
		float: right;
	}
	
	.style .showoron .right span {
		font-size: .55rem;
		color: #999;
	}
	
	.mint-switch {
		transform: scale(.7);
		display: inline-block;
		vertical-align: middle;
	}
	
	.shelf {
		padding-top:2.2rem;
	}
	
	.shelf ul {
		background: #fff;
		display: flex;
		/*justify-content: space-between;*/
		flex-flow: row wrap;
		padding: .5rem;
	}
	/*借阅历史*/
	
	.showHistry {
		background: #fff;
		position: fixed;
		z-index: 103;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
	/*暂时没有图书*/
	
	.nothing {
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		padding: 25% 0;
	}
	
	.nothing .icon {
		font-size: 4rem;
		color: #666;
	}
	
	.nothing .nobook {
		font-size: .7rem;
		color: #333;
		margin-bottom: .2rem;
	}
	.slide-enter-active,
	.slide-leave-active {
		transition: all .4s;
	}
	
	.slide-enter,
	.slide-leave-active {
		transform: translateY(-100%);
	}
	
	.fade-enter-active,
	.fade-leave-active {
		transition: all .4s;
	}
	
	.fade-enter,
	.fade-leave-active {
		opacity: 0;
	}
	
	.slideLeft-enter-active,
	.slideLeft-leave-active {
		transition: all .4s;
	}
	
	.slideLeft-enter,
	.slideLeft-leave-active {
		transform: translateX(100%);
	}
	
	.router-slide-enter-active,
	.router-slide-leave-active {
		transition: all .4s;
	}
	
	.router-slide-enter,
	.router-slide-leave-active {
		transform: translate3d(2rem, 0, 0);
		opacity: 0;
	}
</style>