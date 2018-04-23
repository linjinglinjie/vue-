<template>
	<div class="bookdescript">
		<header class="flex head">
			<p class="goBack" @click="goBack">
				<i class="icon iconfont">&#xe607;</i>
			</p>
			<transition name="fade">
				<div class="headtitle" v-show="titleShow">{{items.book_name}}</div>
			</transition>
			<transition name="fade">
				<section class="tabHead" v-show="tabHeadShow">
					<tabHead @indexScroll="indexScroll" :showIndex="showIndex"></tabHead>
				</section>
			</transition>
			<p class="opear" @click="surveyShow = true">
				<i class="icon iconfont">&#xe639;</i>
			</p>
		</header>
		<section v-show="status == 0 || status == '' || status == undefined">
			<section ref="deswrap" class="deswrap">
				<section>
					<section class="bookshow flex">
						<section class="bookimg">
							<img v-if="items.src && items.src != ''" :src="items.src" />
							<img v-if="items.src && items.src == ''" src="../../assets/img/moren.jpg" />
							<img v-if="!items.src" src="../../assets/img/moren.jpg" />
						</section>
						<section class="bookinfo">
							<h1>{{items.book_name}}</h1>
							<p class="author">
								{{items.author}}
								<span class="wordnum">{{items.word_number}}</span>
							</p>
							<section class="star">
								<section class="ratingstar">
									<ratingstar :rating="items.score"></ratingstar>
								</section>
								<span>{{items.score}}分 （{{items.criticNum}}个评价）</span>
							</section>
							<p class="borrow">能否借阅：<span>{{borrow}}</span></p>
							<!--<p class="howbuy">5书币/1000字</p>-->
						</section>
					</section>
					<section class="introduction">
						<p ref="showContent" :class="{'show': showmore,'hideContent': hidemore}">{{items.book_introduction}}</p>
						<section class="more" v-if="!this.showmore && this.hidemore"><i class="icon iconfont" @click="showalldes($event)">&#xe636;</i></section>
					</section>
					<section class="Updated flex">
						<p class="chapter">
							<span>发布时间</span>
						</p>
						<p class="datetime">
							{{items.publishing_year}}
						</p>
					</section>
					<split></split>
					<section class="ratings">
						<p class="title flex"><span>评论（{{items.criticNum}}）</span><span class="more" @click="moreRating">更多<i class="icon iconfont">&#xe60e;</i></span></p>
						<ul>
							<li v-for="(item ,index) in items.ratings" :key="index">
								<section class="flex">
									<p class="ratingstar">
										<ratingstar :rating="item.stars"></ratingstar>
									</p>
									<p class="ratingdate"><span>{{item.name}}</span>{{item.date | dateTime}}</p>
								</section>
								<p class="ratingContent">
									{{item.rating}}
								</p>
							</li>
						</ul>
					</section>
					<split></split>
					<!--类别标签-->
					<section class="Category">
						<p class="title"><span>类别标签</span></p>
						<ul>
							<li v-for="(item, index) in splitlabel" :key="index">{{item}}</li>
						</ul>
					</section>
					<split></split>
					<!--正文推荐-->
					<section class="desTab" ref="desTab">
						<tabHead @indexScroll="indexScroll" :showIndex="showIndex"></tabHead>
						<section class="menuBottom" ref="menuList">
							<!--<div class="mainText">
								<p ref="textContent" :class="{'show': showAll,'hideText': hideAll}">{{items.content}}</p>
								<section class="more" v-if="!this.showAll && this.hideAll"><i class="icon iconfont" @click="showall($event)">&#xe636;</i></section>
							</div>-->
							<div class="Author">
								<h4>作者其他书</h4>
								<ul>
									<!--<other v-for="(item, index) in items.otherBooks" :key="index" :item="item"></other>-->
								</ul>
							</div>
							<!--<div class="recommend">
								<h4>其他书友也收藏了</h4>
								<ul>
									<other v-for="(item, index) in items.recommendBooks" :key="index" :item="item" ></other>
								</ul>
								<p class="more">更多</p>
							</div>-->
						</section>
					</section>
				</section>
			</section>
			<footer class="flex">
				<!--<p class="addShelf"><i class="icon iconfont">&#xe61a;</i>书架</p>-->
				<p class="beginRead" :class="{'noBorrow':this.loadingShow == true || this.items.borrowFlag != 1}" @click="Iwill">我要借阅</p>
			</footer>
		</section>
		<!--已经加入预约流程-->
		<section v-show="status != 0 && status != '' && status != undefined">
			<section ref="deswrapros" class="deswrap pros">
				<section>
				<section class="bookshow flex">
					<section class="bookimg">
						<img v-if="items.src && items.src != ''" :src="items.src" />
						<img v-if="items.src && items.src == ''" src="../../assets/img/moren.jpg" />
						<img v-if="!items.src" src="../../assets/img/moren.jpg" />
					</section>
					<section class="bookinfo">
						<h1>{{items.book_name}}</h1>
						<!--<p class="author">
							{{items.author}}
							<span class="wordnum">{{items.word_number}}</span>
						</p>-->
						<p>下单时间：<span>{{creatTime}}</span></p>
						<p class="borrow">订单状态：<span>{{statusText}}</span></p>
						<p>取书时间：<span>{{reserveTime}}</span></p>
						<p>还书时间：<span>{{expectReturnTime}}</span></p>
					</section>
				</section>
				<section class="remark">
					<span>备注：</span>{{mark}}
				</section>
				<!--流程节点-->
				<div class="ystep-container ystep-lg ystep-blue">
					<ul class="ystep-container-steps">
						<li :class="{'ystep-step-undone': this.status<1,'ystep-step-active':this.status==1,'ystep-step-done':this.status>1}">预定<em></em></li>
						<li :class="{'ystep-step-undone': this.status<2,'ystep-step-active':this.status==2,'ystep-step-done':this.status>2}">受理中<em></em></li>
						<li :class="{'ystep-step-undone': this.status<3,'ystep-step-active':this.status==3,'ystep-step-done':this.status>3}">完成<em></em></li>
						<li :class="{'ystep-step-undone': this.status<4,'ystep-step-active':this.status==4,'ystep-step-done':this.status>4}">返还<em></em></li>
					</ul>
					<div class="ystep-progress" style="width: 75%;">
						<p class="ystep-progress-bar" style="width:100%;">
							<span class="ystep-progress-highlight" :style="'width:'+ (status-1) * 33.33 +'%;'"></span>
						</p>
					</div>
				</div>
				<!--返回订单列表-->
				<button type="button" class="toMyorder" @click="toMyorder">受理中的订单</button>
				</section>
			</section>
		</section>

		<!--更多评论-->
		<transition name="slideLeft">
			<section class="ratingMore" v-if="ratingShow">
				<ratingIndex @closeRating="closeRating" :items='items'></ratingIndex>
			</section>
		</transition>
		<transition name="slideTop">
			<section class="survey" v-if="surveyShow">
				<a class="close" @click="surveyShow = false"><i class="icon iconfont">&#xe60d;</i></a>
				<ul>
					<li>想读</li>
					<li>读过</li>
					<li>推荐</li>
					<li>分享</li>
				</ul>
			</section>
		</transition>
		<transition name="fade">
			<section class="shadow" v-if="surveyShow" @click="surveyShow = false"></section>
		</transition>
		<!--开始阅读-->
		<transition name="slideLeft">
			<BorrowProcess :item="items" :borrow="borrow" v-if="showProcess" @hidesetpage="hidesetpage"></BorrowProcess>
		</transition>
		<transition name="fade">
			<backTop v-if="backTopShow" @goTop="goTop"></backTop>
		</transition>
		<loadding name="loading" v-if="loadingShow"></loadding>
	</div>
</template>
<script>
	import BScroll from 'better-scroll'
	import split from '../common/split'
	import tabHead from './desTabHead'
	import other from '../bookshelf/shelfList'
	import backTop from '@/components/common/backTop'
	import ratingstar from '@/components/common/ratingStar'
	import ratingIndex from '@/components/ratings/index'
	import BorrowProcess from './BorrowProcess'
	import loadding from '@/components/common/loading'
	import { format } from '../../assets/plugins/format.js'
	import { baseUrl } from '@/assets/plugins/env.js'
	import { MessageBox } from 'mint-ui';
	export default {
		data() {
			return {
				hidemore: false,
				showmore: false,
				hideAll: false,
				showAll: false,
				surveyShow: false,
				pulldown: true,
				titleShow: false,
				tabHeadShow: false,
				NavTop: '',
				showIndex: '',
				menuIndexChange: true,
				tabList: [],
				id: '',
				items: '',
				sameisbn:false, // 判断预约车是否有相同isbn号图书
				backTopShow: false,
				Borrow: '',
				status:'', //订单状态码
				statusText:'',//订单状态
				creatTime:'', //下单时间
				reserveTime:'',//取书时间
				expectReturnTime:'',//还书时间
				mark:'',//备注
				ratingShow: false,
				showProcess: false, //借阅流程
				loadingShow: false  //加载动画
			}
		},
		props: ['num'],
		created() {
			this.id = this.num;
			this.initData();
			//this.reservation();
			this.borrowed();
		},
		mounted() {
			this.$nextTick(() => {
				this.autoHeight();
				this.getBookListHeight();
				this._initScroll();
				this._initscrollpro();
			});
		},
		computed: {
			borrow() {
				if(this.items.borrowFlag == 1) {
					return this.Borrow = '可借阅'
				}else {
					return this.Borrow = '不可借阅'
				}
			},
			//类别标签
			splitlabel() {
				if(this.items) {
					return this.items.label.replace(/(^\s*)|(\s*$)/g, "").split(' ');
				} else {
					return ''
				}
			}
		},
		components: {
			split,
			tabHead,
			other,
			backTop,
			ratingstar,
			BorrowProcess,
			ratingIndex,
			loadding
		},
		watch: {
			showIndex(curVal, oldVal) {
				this.menuIndexChange = false;
				this.scroll.scrollTo(0, -this.tabList[curVal], 400);
				this.scroll.on('scrollEnd', () => {
					this.menuIndexChange = true;
				})
			},
			items() {
				this.$nextTick(() => {
					this.autoHeight();
					this.getBookListHeight();
					this._initScroll();
					this._initscrollpro();
				})
			},
			id() {
				this.initData();
				this.sameIsbn();
			},
			showmore() {
				this.$nextTick(() => {
					this.getBookListHeight();
					this.scroll.refresh();
				})
			},
			showAll() {
				this.$nextTick(() => {
					this.getBookListHeight();
					this.scroll.refresh();
				})
			},
			status() {
				this.statusT();
			}
		},
		filters: {
			dateTime: function(value) {
				const time = parseInt(value)
				return new Date(time).format("yyyy-MM-dd");
			}
		},
		methods: {
			//初始化获取数据
			initData() {
				this.loadingShow = true;
				this.$http.get(baseUrl + '/bookLendingManagement/bookprofession/getBookInfoByISBN.shtml', {
					params: {
						ISBN: this.id
					}
				}).then((response) => {
					if(response.data.msgcode == 'success') {
						this.items = response.data.result_data;
						this.$nextTick(() => {
							this._initScroll();
							this._initscrollpro();
						})
					}
					this.loadingShow = false;
				}).catch(function(err) {
					this.loadingShow = false;
					console.log(err);
				});
			},
			//滚动
			_initScroll() {
				if(!this.scroll) {
					this.scroll = new BScroll(this.$refs.deswrap, {
						probeType: 3,
						click: true
					});
					this.scroll.on('scroll', (pos) => {
						this.getNavTop();
						const size = document.documentElement.style.fontSize.substring(0, document.documentElement.style.fontSize.indexOf('px')) * 2;
						if(-Math.round(pos.y) >= size && Math.abs(Math.round(pos.y)) < parseInt(this.NavTop) + size / 2) {
							this.titleShow = true;
							this.tabHeadShow = false
						} else if(Math.abs(Math.round(pos.y)) >= parseInt(this.NavTop) + size / 2) {
							this.tabHeadShow = true;
							this.titleShow = false;
						} else {
							this.titleShow = false;
							this.tabHeadShow = false
						}
						if(Math.abs(Math.round(pos.y)) > 400) {
							this.backTopShow = true;
						} else {
							this.backTopShow = false;
						}
						/*滚动监听导航*/
						this.tabList.forEach((item, index) => {
							if(this.menuIndexChange && Math.abs(Math.round(pos.y)) >= item) {
								this.showIndex = index
							}
						})
					})
				} else {
					this.scroll.refresh()
				}
			},
			_initscrollpro() {
				if(!this.scrollpro) {
					this.scrollpro = new BScroll(this.$refs.deswrapros, {
						probeType: 3,
						click: true
					})
					this.scrollpro.on('scroll', (pos) => {
						const size = document.documentElement.style.fontSize.substring(0, document.documentElement.style.fontSize.indexOf('px')) * 2;
						if(-Math.round(pos.y) >= size && Math.abs(Math.round(pos.y))) {
							this.titleShow = true;
						} else {
							this.titleShow = false;
						}
						if(Math.abs(Math.round(pos.y)) > 400) {
							this.backTopShow = true;
						} else {
							this.backTopShow = false;
						}
					})
				}else {
					this.scrollpro.refresh()
				}
			},
			//获取列表的高度，存入navListTop
			getBookListHeight() {
				const listContainer = this.$refs.menuList;
				const listArr = Array.from(listContainer.children);
				listArr.forEach((item, index) => {
					this.tabList[index] = item.offsetTop;
				});
			},
			showalldes(event) {
				/*if(!event._constructed) {
					return
				}*/
				this.showmore = true;
			},
			showall(event) {
				/*if(!event._constructed) {
					return
				}*/
				this.showAll = true;
			},
			//返回上一页
			goBack() {
				//this.$router.go(-1);
				this.$emit('close')
			},
			//正文坐着推荐距顶部距离
			getNavTop() {
				this.NavTop = this.$refs.desTab.offsetTop;
			},
			indexScroll(value) {
				this.showIndex = value;
			},
			//简介正文隐藏
			autoHeight() {
				const size = document.documentElement.style.fontSize.substring(0, document.documentElement.style.fontSize.indexOf('px'));
				if(this.$refs.showContent.offsetHeight > size * 2) {
					this.hidemore = true;
				}
				/*if(this.$refs.textContent.offsetHeight > size*9) {
					this.hideAll = true;
				}*/
			},
			//返回顶部
			goTop() {
				this.scroll.scrollTo(0, 0, 400);
				this.scrollpro.scrollTo(0, 0, 400);
			},
			//打开全部书评
			moreRating() {
				this.ratingShow = true;
			},
			/*关闭书评*/
			closeRating() {
				this.ratingShow = false;
			},
			//关闭借阅流程
			hidesetpage() {
				this.showProcess = false;
			},
			//查询预约车是否有相同isbn
			sameIsbn() {
				this.$http.get(baseUrl + '/bookLendingManagement/borrow/seachShoppingCart.shtml').then((response) => {
					response.data.forEach( item => {
						if(item.isbn == this.id) {
							this.sameisbn = true;
						}else {
							this.sameisbn = false;
						}
					})
				})
			},
			//我要借阅
			Iwill() {
				if(this.loadingShow == true || this.items.borrowFlag != 1){
					return ;
				}else if(this.sameisbn == true) {
					MessageBox('提示', '不可以借阅相同ISBN号的图书哦！');
					return
				}else {
					this.showProcess = true;
				}
			},
			//去我的订单列表
			toMyorder() {
				let filePath = this.$route.path.substr(this.$route.path.lastIndexOf('/')+1);
				if( filePath == 'allOrder' || filePath == 'completed') {
					this.$router.replace('/my/AcceptedList');
				    window.location.reload();
				}else {
					this.$router.push('/my/AcceptedList');
				}
			},
			//是否已经借阅
			borrowed() {
				this.$http.get(baseUrl + '/bookLendingManagement/borrow/findByISBN.shtml', {
					params: {
						ISBN: this.id
					}
				}).then((response) => {
					//0未借 1预约 2受理 3完成 4归还
					this.status = response.data.handle_state;//订单状态
					this.creatTime=response.data.create_time; //下单时间
					this.reserveTime=response.data.reserve_time;//取书时间
					this.expectReturnTime=response.data.expect_return_time;//还书时间
					this.mark = response.data.remark;//备注
				}).catch(function(err) {
					this.loadingShow = false;
					console.log(err);
				});
			},
			//订单状态status
			statusT() {
				if(this.status == 0) {
					this.statusText = '未借阅';
				}else if(this.status == 1) {
					this.statusText = '已预约';
				}else if(this.status == 2) {
					this.statusText = '受理中...';
				}else if(this.status == 3) {
					this.statusText = '已完成';
				}else if(this.status == 4) {
					this.statusText = '已归还';
				}
			},
			//是否已经预约
			/*reservation() {
				this.loading = true;
				this.$http.get(baseUrl + '/bookLendingManagement/borrow/seachShoppingCart.shtml', {
					params: {
						userId: 14
					}
				}).then((response) => {
					response.data.forEach( item => {
						if(item.isbn == this.id) {
							this.status = 1;
							this.creatTime = item.createTime;
						}else {
							this.status = 0;
						}
					})
				})
			}*/
		}
	}
</script>
<style scoped>
	.survey {
		position: absolute;
		z-index: 101;
		top: 0;
		left: 0;
		right: 0;
		background: #fff;
		padding-bottom: 0 !important;
	}
	
	.survey .close {
		position: absolute;
		right: .5rem;
		top: .5rem;
	}
	
	.survey .close .icon {
		font-size: 1.3rem;
		color: #FF7903;
	}
	
	.survey ul {
		margin-top: 1.5rem;
	}
	
	.survey li {
		margin: 0 .8rem;
		height: 1.8rem;
		line-height: 1.8rem;
		border-bottom: 1px solid #ddd;
		font-size: .55rem;
		color: #555555;
	}
	
	.survey li:last-child {
		border: none
	}
	
	.bookdescript {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 999;
		background: #F2F2F2;
	}
	
	.bookdescript .title {
		padding: .6rem;
		align-items: baseline;
	}
	
	.bookdescript .title span {
		font-size: .7rem;
		font-weight: bold;
	}
	
	.bookdescript .title span.more {
		color: #6FAED7;
		font-weight: normal;
		font-size: .6rem;
	}
	
	.bookdescript .title span.more .icon {
		color: #6FAED7;
	}
	
	.bookdescript .head {
		position: fixed;
		background: #F2F2F2;
		top: 0;
		left: 0;
		right: 0;
		z-index: 99;
	}
	
	.bookdescript .head .headtitle {
		position: absolute;
		z-index: 0;
		left: 0;
		right: 0;
		top: 0;
		background: #fff;
		height: 2rem;
		line-height: 2rem;
		text-align: center;
		font-size: .7rem;
		padding: 0 2rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.bookdescript .head .tabHead {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 2rem;
		line-height: 2rem;
		background: #fff;
		border-bottom: 1px solid #ddd;
		text-align: center;
	}
	
	.bookdescript .head .icon {
		font-size: 1rem;
	}
	
	.bookdescript .head .goBack {
		position: absolute;
		left: .5rem;
		top: .3rem;
		z-index: 1;
	}
	
	.bookdescript .head .opear {
		position: absolute;
		right: .5rem;
		top: .3rem;
		z-index: 1;
	}
	
	.deswrap {
		background:#F2F2F2;
		position: absolute;
		top: 2rem;
		left: 0;
		bottom: 2rem;
		width: 100%;
		overflow-y: auto;
	}
	.deswrap.pros {
		bottom: 0rem;
		z-index: 101;
	}
	.bookshow {
		background: #F2F2F2;
		padding: .5rem .2rem 1rem 1rem;
	}
	
	.bookshow .bookimg {
		margin-right: .6rem;
		width: 4rem;
		height: 5.5rem;
		border: 1px solid #ddd;
	}
	
	.bookshow .bookimg img {
		width: 100%;
		height: 100%;
	}
	
	.bookshow .bookinfo {
		flex: auto;
	}
	
	.bookshow .bookinfo h1 {
		font-size: .7rem;
		margin-bottom: .3rem;
	}
	
	.author {
		margin-top: .2rem;
		color: #6AA7D3;
		font-size: .55rem;
	}
	
	.author .wordnum {
		color: #666;
		margin-left: .5rem;
	}
	/*星星*/
	
	.star {
		font-size: .55rem;
		margin-top: .2rem;
	}
	
	.star .ratingstar {
		display: inline-block;
		vertical-align: middle;
	}
	
	.star .ratingstar .icon {
		color: #FF7903;
		font-size: .6rem;
	}
	
	.star .ratingstar .icon:last-child {
		color: #999;
	}
	
	.bookshow .bookinfo p {
		font-size: .6rem;
		color: #666;
		margin-top: .2rem;
	}
	
	.bookshow .bookinfo .borrow {
		font-size: .6rem;
		color: #666;
		margin-top: .2rem;
	}
	
	.bookshow .bookinfo .borrow span {
		color: #f90;
	}
	
	.howbuy {
		color: #FF7903;
		font-size: .55rem;
		margin-top: .5rem;
	}
	
	.introduction {
		background: #fff;
		padding: .3rem .6rem;
	}
	
	.introduction p {
		overflow: hidden;
		font-size: .6rem;
		line-height: 1.3rem;
		color: #666;
	}
	
	.introduction p.hideContent {
		max-height: 4em;
	}
	
	.introduction p.show {
		max-height: inherit !important;
		height: auto !important;
	}
	
	.introduction .more {
		text-align: center;
	}
	/*更新目录*/
	
	.Updated {
		background: #fff;
		border-top: 1px solid #ddd;
		height: 2rem;
		line-height: 2rem;
		align-items: baseline;
		padding: 0 .6rem;
	}
	
	.Updated p {
		flex: 1;
		font-size: .55rem;
	}
	
	.Updated p.chapter {
		text-align: left;
		font-size: .7rem;
		color: #333;
		font-weight: 700;
	}
	
	.Updated p.chapter span {
		color: #595959;
		font-size: .55rem;
		margin-left: .2rem;
	}
	
	.Updated p.datetime {
		text-align: right;
	}
	/*评价列表*/
	
	.ratings {
		background: #fff;
	}
	
	.ratings li {
		padding: .3rem .6rem;
	}
	
	.ratings li .flex {
		font-size: .5rem;
		color: #898989;
	}
	
	.ratings li .ratingstar .icon {
		color: #FF7903
	}
	
	.ratingdate span {
		margin-right: .2rem;
	}
	
	.ratingContent {
		margin-top: .5rem;
		font-size: .55rem;
		color: #575757;
		line-height: 1.3rem;
	}
	
	footer.flex {
		background: #fff;
		position: fixed;
		z-index: 100;
		bottom: 0;
		left: 0;
		right: 0;
	}
	
	.addShelf,
	.beginRead {
		flex: 1;
		height: 2rem;
		line-height: 2rem;
		text-align: center;
		font-size: .7rem;
	}
	/*.addShelf{
	color:#FF7903;
}
.addShelf .icon {
	color:#FF7903;
	margin-right:.1rem;
}*/
	
	.beginRead {
		background: #FF7903;
		color: #fff;
	}
	
	.noBorrow {
		background: #FFCB9B;
		color: #999;
	}
	/*类别标签*/
	
	.Category {
		background: #fff;
	}
	
	.Category ul {
		padding: .5rem;
	}
	
	.Category li {
		background: #FCEAE6;
		display: inline-block;
		margin: 0 .2rem .3rem 0;
		padding: .3rem .8rem;
		border: 1px solid #ddd;
		border-radius: .3rem;
		font-size: .6rem;
		color: #7A6D64;
	}
	
	.Category li:nth-child(2n) {
		background: #FCEDDA;
	}
	
	.Category li:nth-child(3n) {
		background: #E6F9DB;
	}
	/*正文推荐*/
	
	.menuBottom .mainText,
	.menuBottom .Author,
	.menuBottom .recommend {
		padding: .5rem 1rem;
	}
	
	.menuBottom .mainText {
		font-size: .65rem;
		color: #565656;
		line-height: 2rem;
	}
	
	.menuBottom .mainText p {
		line-height: 1.5rem;
		overflow: hidden;
	}
	
	.menuBottom .mainText p.hideText {
		max-height: 9rem;
	}
	
	.menuBottom .mainText p.show {
		max-height: inherit !important;
		height: auto !important;
	}
	
	.mainText .more {
		line-height: normal;
	}
	
	.menuBottom h4 {
		font-weight: bold;
		margin-bottom: .5rem;
		font-size: .7rem;
		color: #000;
	}
	
	.menuBottom .Author,
	.menuBottom .recommend {
		background: #fff;
	}
	
	.menuBottom .Author ul,
	.menuBottom .recommend ul {
		display: flex;
		justify-content: space-around;
		align-items: flex-start;
	}
	
	.menuBottom .recommend {
		margin-top: .6rem;
	}
	
	.more {
		padding: .5rem 0;
		text-align: center;
		font-size: .55rem;
		color: #57A6A4;
	}
	/*更多评价*/
	
	.ratingMore {
		position: fixed;
		z-index: 101;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: #fff;
		overflow-y: auto;
	}
	/*备注*/
	.remark{
		padding:.6rem;
		font-size: .7rem;
		color:#666;
		line-height:1rem;
		word-break:break-all;
	}
	.remark span {
		display: block;
		margin-bottom:.3rem;
		font-size: .7rem;
		color:#f90;
	}
	/*流程节点*/
	
	.ystep-container {
		display: inline-block;
		position: relative;
		color: #000;
		margin: .6rem;
		margin-top: 1rem;
	}
	
	.ystep-container ul {
		list-style: none;
	}
	
	.ystep-container ul,
	.ystep-container li,
	.ystep-container p {
		margin: 0;
		padding: 0;
	}
	/*size css*/
	
	.ystep-lg {
		width: 100%;
		height: 60px;
		font-size: 18px;
		line-height: .3;
		margin-left: 1.5rem;
	}
	/*large size css*/
	
	.ystep-lg .ystep-container-steps {
		display: flex;
		position: absolute;
		top: 2px;
		cursor: pointer;
		z-index: 10;
		width: 100%
	}
	
	.ystep-lg li {
		flex: 1;
		height: 85px;
		font-size: .6rem;
	}
	
	.ystep-lg li em {
		display: block;
		width: .8rem;
		height: .8rem;
		border-radius: 50%;
		background: #ddd;
		margin-top: .8rem;
	}
	
	.ystep-lg .ystep-step-undone em {
		background: #ddd;
	}
	
	.ystep-lg .ystep-step-done em {
		background: #60baff;
	}
	
	.ystep-lg .ystep-step-active em {
		background: #008DF7;
	}
	
	.ystep-lg .ystep-progress {
		width: 75%;
		height: .3rem;
		position: absolute;
		top: 1.3rem;
		left: .5rem;
		float: left;
		margin-right: 10px;
		overflow: hidden;
	}
	
	.ystep-lg .ystep-progress-bar {
		width: 400px;
		height: 20px;
		background: #e4e4e4;
		display: inline-block;
		float: left;
	}
	
	.ystep-lg .ystep-progress-highlight {
		height: 20px;
		display: block;
		background: #60baff;
	}
	
	.ystep-blue .ystep-step-undone {
		color: #9c9a9b;
	}
	
	.ystep-blue .ystep-step-active {
		color: #3276b1;
	}
	
	.ystep-blue .ystep-progress-highlight {
		background: #60baff;
	}
	
	.toMyorder {
		background: #f90;
		display: block;
		width: 80%;
		margin: 0 auto;
		height: 1.5rem;
		font-size: .6rem;
		color: #fff;
		border-radius: 5px;
	}
	
	.slideLeft-enter-active,
	.slideLeft-leave-active {
		transition: all .4s
	}
	
	.slideLeft-enter,
	.slideLeft-leave-active {
		transform: translateX(100%);
	}
	
	.slideTop-enter-active,
	.slideTop-leave-active {
		transition: all .3s
	}
	
	.slideTop-enter,
	.slideTop-leave-active {
		transform: translateY(-100%);
	}
	
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity .3s
	}
	
	.fade-enter,
	.fade-leave-active {
		opacity: 0;
	}
</style>