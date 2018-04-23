<template>
	<div class="borrowProcess">
		<section class="headTitle">
			<vHead :title="title" @hidesetpage="hidesetpage"></vHead>
		</section>
		<section class="information">
			<section class="bookshow flex">
				<section class="bookimg">
					<img v-if="item.src && item.src != ''" :src="item.src" />
					<img v-if="item.src && item.src == '' || item.src == null" src="../../assets/img/moren.jpg" />
					<img v-if="!item.src" src="../../assets/img/moren.jpg" />
				</section>
				<section class="bookinfo">
					<h1>{{item.book_name}}</h1>
					<p class="author">
						{{item.author}}
						<span class="wordnum">{{item.word_number}}</span>
					</p>
				</section>
			</section>
			<!--<section class="bookinfor">
				<img :src="item.src"  />
				<p>{{item.book_name}}</p>
			</section>-->
			<ul>
				<li>
					<label>借阅地点</label>
					<span class="adress" v-if="Object.keys(this.library).length<=1">
						<span>{{this.adsvalue}}</span>
					</span>
					<span class="adress" v-if="Object.keys(this.library).length>1" @click="showAddress">
						<span v-if="adsvalue==''">选择图书馆</span>
						<span v-if="adsvalue!=''">{{this.adsvalue}}</span>
						<i class="icon iconfont">&#xe60e;</i>
					</span>
				</li>
				<li>
					<label>借阅人</label>
					<span class="userName">{{this.userName}}</span>
				</li>
				<!--<li>
					<label>可否借阅</label>
					<span class="CanBorrow">{{borrow}}</span>
				</li>-->
			</ul>
		</section>
		<footer class="flex">
			<p class="Order" @click="myOrder"><span>我的订单<em class="num">{{ordernum}}</em></span></p>
			<p class="beginRead" @click="beginBorrow('many')"><i class="icon iconfont">&#xe61a;</i>预约车</p>
			<p class="" @click="beginBorrow('single')">立即预约</p>
		</footer>
		<transition name="slideLeft">
			<adress v-if="showAdess" :library="library" @hidesetpage="hideAdess" @checkVal="checkVal"></adress>
		</transition>
	</div>
</template>
<script>
	import vHead from '@/components/common/head'
	import adress from './address'
	import { MessageBox } from 'mint-ui';
	import { baseUrl } from '@/assets/plugins/env.js'
	export default {
		data() {
			return {
				userId: '',
				userName: '',
				department_id: '',
				title: '借阅资料',
				adsvalue: '',
				pickerVisible: '',
				showAdess: false,
				startDate: new Date(),
				library: '',
				ordernum:0
			}
		},
		props: ['item', 'borrow'],
		components: {
			vHead,
			adress
		},
		created() {
			this.fetchDate();
			this.orderNum();
		},
		computed: {

		},
		methods: {
			fetchDate() {
				this.$http.get(baseUrl + '/bookLendingManagement/homePage/getBookBorrowInfo.shtml', {
					params: {
						ISBN: this.item.ISBN
					}
				}).then((response) => {
					this.library = response.data.department;
					//console.log(Object.keys(this.library).length)
					if(Object.keys(this.library).length == 1) {
						Object.keys(this.library).forEach(key => {
							this.adsvalue = this.library[key];
							this.department_id = key;
						});
					} else if(Object.keys(this.library).length == 0) {
						this.adsvalue = '无图书馆';
						this.department_id = '';
					}
					this.userId = response.data.userId;
					this.userName = response.data.userName;
				}).catch(function(err) {
					console.log(err);
				});
			},
			//请求后台数据之前转换入参
			transformRequest: function(data) {
				let ret = ''
				for(let it in data) {
					ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
				}
				return ret
			},
			//转换时间
			parserDate(date) {
				var t = Date.parse(date);
				if(!isNaN(t)) {
					return new Date(Date.parse(date.replace(/-/g, "/")));
				} else {
					return new Date();
				}
			},
			//开始借阅
			beginBorrow(val) {
				if(this.adsvalue != '' && this.adsvalue != '无图书馆' && this.borrow == '可借阅') {
					/**预约时间  reserve_time**/
					/**借阅处ID borrow_department_id**/
					/**借阅人ID user_id **/
					if(val == 'many') {
						this.$http.post(baseUrl + '/bookLendingManagement/borrow/addShoppingCart.shtml', this.transformRequest({
							borrow_department_id: this.department_id,
							user_id: this.userId,
							ISBN: this.item.ISBN
						}), {
							headers: {
								'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
							}
						}).then((response) => {
							this.$router.push({
								path: '/bookshelf'
							})
						}).catch(function(err) {
							console.log(err);
						});
					}else if(val == 'single') {
						this.$http.post(baseUrl + '/bookLendingManagement/borrow/addBorrow.shtml', this.transformRequest({
							reserve_time: '',
							borrow_department_id: this.department_id,
							user_id: this.userId,
							ISBN: this.item.ISBN
						}), {
							headers: {
								'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
							}
						}).then((response) => {
							this.$router.push({
								path: '/my/AcceptedList'
							})
						}).catch(function(err) {
							console.log(err);
						});
					}
				} else {
					if(this.adsvalue == '') {
						MessageBox('提示', '图书馆不可为空');
					} else if(this.adsvalue == '无图书馆') {
						MessageBox('提示', '没有此书');
					} else if(this.borrow != '可借阅') {
						MessageBox('提示', '本图书不可借阅');
					}
				}
			},
			//我的订单
			myOrder() {
				this.$router.push({
					path: '/bookshelf'
				})
			},
			showAddress() {
				this.showAdess = true;
			},
			//关闭地址选择
			hideAdess() {
				this.showAdess = false;
			},
			hidesetpage() {
				this.$emit('hidesetpage');
			},
			//选中图书馆
			checkVal(val) {
				this.department_id = val;
				Object.keys(this.library).forEach(key => {
					if(key == val) {
						this.adsvalue = this.library[key];
					}
				});
			},
			//订单数
			orderNum() {
				this.$http.get(baseUrl + '/bookLendingManagement/borrow/seachShoppingCart.shtml').then((response) => {
					this.ordernum = response.data.length;
				}).catch(function(err){
				  console.log(err);
				});
			}
		}
	}
</script>
<style scoped>
	.borrowProcess {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 101;
		background: #fff;
	}
	
	.headTitle {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 998;
	}
	/*图书基本信心*/
	
	.bookshow {
		padding: .5rem .2rem 1rem 1rem;
		border-bottom: 1px solid #ddd;
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
	
	.information {
		position: absolute;
		top: 2rem;
		bottom: 2rem;
		left: 0;
		right: 0;
		padding: .6rem;
		overflow-y: auto;
	}
	
	.information ul li {
		font-size: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 2rem;
		border-bottom: 1px solid #ddd;
	}
	
	.information ul li label {
		font-size: .6rem;
	}
	
	.information ul li input {
		border: 1px solid #ddd;
		border-radius: 4px;
		line-height: 1.2rem;
		padding-left: .2rem;
	}
	
	.information>ul>li>label {
		/*display: inline-block;
	width:4.2rem;*/
	}
	
	.bookinfor section {
		flex: auto;
	}
	
	.bookinfor section img {
		width: 4rem;
		height: 5.5rem;
	}
	
	.bookinfor section p {
		font-size: .55rem;
		margin-top: .2rem;
	}
	
	.adress {
		font-size: .55rem;
	}
	
	.CanBorrow {
		font-size: .6rem;
		color: #f90;
	}
	
	.userName {
		font-size: .6rem;
	}
	
	footer.flex {
		background: #fff;
		position: fixed;
		z-index: 100;
		bottom: 0;
		left: 0;
		right: 0;
		box-shadow: 0 0 5px rgba(0, 0, 0, .1);
	}
	
	footer.flex p,
	footer.flex p span {
		flex: 1;
		height: 2rem;
		line-height: 2rem;
		text-align: center;
		font-size: .55rem;
		color: #f90;
	}
	
	footer.flex p.Order span {
		position: relative;
	}
	
	footer.flex p.Order span .num {
		position: absolute;
		left: 2.3rem;
		top: -.3rem;
		background: #f00;
		height: .7rem;
		line-height: .7rem;
		color: #FFF;
		border-radius: 6px 6px 6px 0;
		padding: 0 .2rem;
		font-size: .5rem;
		font-style: normal;
	}
	
	footer.flex p.beginRead {
		background: #FF7903;
		color: #fff;
	}
	
	footer.flex p.beginRead .icon {
		margin-right: .1rem;
		color: #fff;
		font-size: .8rem;
		vertical-align: middle;
	}
	
	.slideLeft-enter-active,
	.slideLeft-leave-active {
		transition: all .4s
	}
	
	.slideLeft-enter,
	.slideLeft-leave-active {
		transform: translateX(100%);
	}
</style>