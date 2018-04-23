<template>
	<div>
		<section  class="fixedTop">
			<section class="topsearch" :class="{'border':operatShow || styleShow}">
				<i class="icon iconfont" @click="goBack">&#xe607;</i>
				<section class="search">
					<search @showHistroy="showSearch"></search>
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
					<p class="title">书架风格</p>
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
		<section class="shelf">
			<!--编辑图书  删除-->
			<section class="editBook">
				<p v-if="this.edict == false" class="edict" @click="edictbk">编辑图书</p>
				<p v-if="this.edict == true" class="edict" @click="edictok">完成</p>
			</section>
			<section v-if="this.shelflist.length != 0">
				<!--{{ checkedNames }}-->
				<ul v-if="StyleNum==0">
					<li class="shelfList shelfListqb" v-for="(item, index) in shelflist" :key="index">
						<div class="checks" slot="checks">
							<div>
								<input :id="item.isbn" :value="item.isbn" type="checkbox" v-model='checkedNames'>
								<label class="check" :for="item.isbn">
						            <i class="icon iconfont">&#xe677;</i>
						        </label>
							</div>
						</div>
						<shelfList :item="item" @openDes="openDes"></shelfList>
					</li>
				</ul>
				<ul v-if="StyleNum==1">
					<shelfListclassic class="shelfList" v-for="(item, index) in shelflist" :key="index" :item="item" @openDes="openDes">
						<section class="checks" slot="checks">
							<div>
								<input :id="item.isbn" :value="item.isbn" type="checkbox" v-model='checkedNames'>
								<label class="check" :for="item.isbn">
						            <i class="icon iconfont">&#xe677;</i>
						        </label>
							</div>
						</section>
					</shelfListclassic>
				</ul>
			</section>
			<section class="nothing" v-if="this.shelflist.length == 0">
				<section>
					<i class="icon iconfont">&#xe624;</i>
					<p class="nobook">暂时还没有预约的图书哦！</p>
				</section>
			</section>
			<section class="recomend" v-if="this.classList.length!=0">
				<p class="wantRead">可能你想读</p>
				<ul class="booklist">
					<list v-for="(item, index) in this.classList" :key="index" :item="item" @openDes="openDes">
						<p class="classfiy" slot="classFiy">
							<span v-if="item.score && item.score == ''">连载中</span>
							<span v-if="item.score && item.score != ''" class="red">{{item.score}}分</span>
							<span v-if="!item.score" class="red">连载中</span>
							<span>{{item.label.replace(/(^\s*)|(\s*$)/g,"").split(' ')[0]}}</span>
						</p>
					</list>
				</ul>
			</section>

		</section>
		<transition name="fade">
			<section class="shadow" v-if="operatShow || styleShow" @click="allfalse"></section>
		</transition>
		<!--搜索记录-->
		<transition name="router-slide">
			<serchhistroy v-if="serchhistroy" @closesearch="closesearch"></serchhistroy>
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
		<section class="ToBook">
			<section class="allChose">
				<div class="checksAll checks" @click="selectAll">
					<input value="checkid" type="checkbox" v-model='checked'>
					<label class="check" for="checkid">
			            <i class="icon iconfont">&#xe677;</i>
			        </label>
					<span>全选</span>
				</div>
			</section>
			<section v-if="this.edict == false" class="ToBookBtn" @click="toBook">去预约<span>({{this.choseNum}}本)</span></section>
			<section v-if="this.edict == true" class="delectBook" @click="delectBook"><input type="button" value="删 除"></section>
		</section>
		<loading v-if="this.loading"></loading>
	</div>
</template>
<script>
	import search from '@/components/common/search'
	import allHead from '@/components/common/head'
	import serchhistroy from '@/components/common/searchhistroy'
	import shelfList from './shelfList'
	import shelfListclassic from './shelfListclassic'
	import loading from '@/components/common/loading'
	import borrowHistry from '@/components/personal/borrowHistry'
	import bookDes from '@/components/book/bookdescript'
	import list from '@/components/book/list'
	import { baseUrl } from '@/assets/plugins/env.js'
	import { MessageBox } from 'mint-ui';
	export default {
		data() {
			return {
				id: '',
				//userId:14,
				serchhistroy: false,
				shelflist: '',
				operatShow: false,
				styleShow: false,
				topnavHide: false,
				loading: true,
				direction: '',
				value: '',
				StyleNum: 0,
				showHistry: false,
				showDes: false,
				classList: '',
				choseNum: 0,
				checked: true,
				checkedNames: [],
				edict: false,
				idArr: []
			}
		},
		components: {
			search,
			allHead,
			loading,
			shelfList,
			shelfListclassic,
			serchhistroy,
			borrowHistry,
			bookDes,
			list
		},
		created() {
			this.initData();
			this.getNum();
			this.recomend();
		},
		mounted() {
			this.righthandle();
		},
		watch: { //深度 watcher
			'checkedNames': {
				handler: function(val, oldVal) {
					//console.log(this.checkedNames.length)
					if(this.checkedNames.length === this.shelflist.length) {
						this.checked = true;
						this.choseNum = this.checkedNames.length;
					} else {
						this.checked = false;
						this.choseNum = this.checkedNames.length;
					}
				},
				deep: true
			},
			shelflist(val, oldVal) {
				//this.initData();
			}
		},
		methods: {
			initData() {
				this.loading = true;
				this.$http.get(baseUrl + '/bookLendingManagement/borrow/seachShoppingCart.shtml').then((response) => {
					this.checkedNames = [];
					this.shelflist = response.data;
					this.choseNum = 0;
					this.shelflist.forEach( item => {
						this.checkedNames.push(item.isbn);
						this.choseNum = this.choseNum + 1;
					})
					this.loading = false;
				})
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
			showSearch() {
				this.serchhistroy = true;
			},
			closesearch() {
				this.serchhistroy = false;
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
			//右滑动隐藏弹层
			righthandle() {
				this.hideHistry();
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
			//请求后台数据之前转换入参
			transformRequest: function(data) {
				let ret = ''
				for(let it in data) {
					ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
				}
				return ret
			},
			transformRequestOther: function(data) {
				let ret = ''
				for(let it in data) {
					ret += encodeURIComponent(it) + '=' + encodeURIComponent(JSON.stringify(data[it])) + '&'
				}
				return ret
			},
			recomend() {
				this.$http.post(baseUrl + '/bookLendingManagement/bookprofession/getPerfectSelection.shtml', this.transformRequest({
					label: '重磅推荐'
				}), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
					}
				}).then((response) => {
					if(response.data.msgcode == 'success') {
						this.classList = response.data.result_data.slice(0, 5);
					}
					this.loadingShow = false;
				}).catch(function(err) {
					console.log(err);
				});
			},
			//选中所有check
			/*allName() {
				var _this = this;
				_this.choseNum = 0;
				_this.shelflist.forEach(function(item, i) {
					_this.checkedNames.push(item.isbn);
					_this.choseNum = _this.choseNum + 1;
				});
			},*/
			//全选反选
			selectAll() {
				var _this = this;
				if(_this.checked) {
					_this.checked = false;
					_this.checkedNames = [];
					_this.choseNum = 0;
				} else { //实现全选
					_this.checked = true;
					_this.checkedNames = [];
					_this.shelflist.forEach(function(item, i) {
						_this.checkedNames.push(item.isbn);
						_this.choseNum = _this.choseNum + 1;
					});
				}
			},
			/*去预约*/
			toBook() {
				let ISBNS = '';
				this.checkedNames.forEach( item => {
					if(ISBNS == '') {
						ISBNS = item
					}else {
						ISBNS = ISBNS + '-' + item
					}
				});
				let valarr = ISBNS.split('-');
				this.$http.get(baseUrl + '/bookLendingManagement/borrow/seachShoppingCart.shtml').then((response) => {
					for(let i=0;i<valarr.length;i++) {
						response.data.forEach(item => {
							if(item.isbn == valarr[i]) {
								this.idArr.push({
							 		"borrow_department_id": item.borrow_department_id,
							 		"isbn": item.isbn
							 	})
							}
						})
					}
					if(this.idArr.length == 0) {
						MessageBox('提示', '您还没有预约的图书！');
					}else {
						this.$http.post(baseUrl + '/bookLendingManagement/borrow/batchBorrow.shtml',this.transformRequestOther({
							ISBNS:this.idArr
						}), {
							headers: {
								'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
							}
						}).then((response) => {
							//console.log(response)
							this.initData();
							this.$router.push({
								path: '/my/AcceptedList'
							})
						}).catch(function(err) {
							console.log(err);
						});
					}
				})
			},
			//编辑图书
			edictbk() {
				this.edict = true;
				this.checked = false;
				this.checkedNames = [];
				this.choseNum = 0;
			},
			edictok() {
				this.edict = false;
			},
			//删除图书
			delectBook() {
				let bookCar = '';
				this.checkedNames.forEach( item => {
					if(bookCar == '') {
						bookCar = item
					}else {
						bookCar = bookCar + '-' + item
					}
				})
				if(this.checkedNames.length == 0){
					MessageBox('提示', '没有需要删除的图书！');
					this.$nextTick(() => {
						this.initData();
						this.edict = false;
					})
				}else {
					this.$http.post(baseUrl + '/bookLendingManagement/borrow/delShoppingCart.shtml', this.transformRequest({
						bookcar:bookCar
					}), {
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
						}
					}).then((response) => {
						this.initData();
						this.edict = false;
					}).catch(function(err) {
						console.log(err);
					});
				}
			},
			goBack() {
				this.$router.go(-1);
			}
		}
	}
</script>
<style scoped>
	.fixedTop{
		position: fixed;
		z-index: 102;
		top: 0;
		left: 0;
		right: 0;
	}
	.topsearch {
		background: #fff;
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
		margin-top:.5rem;
		margin-left:.5rem;
	}
	.search {
		flex: auto;
		padding: .3rem 0;
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
	
	.shelfList .borrow {
		position: absolute;
		top: 0;
		left: 10%;
		width: 1rem;
		height: 1.7rem;
		line-height: .6rem;
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
		padding: 1rem 0 .3rem 0;
	}
	
	.style .title {
		font-size: .8rem;
		margin-bottom: .3rem;
		text-align: center;
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
		padding-top:2rem;
		padding-bottom: 2.6rem;
	}
	/*编辑图书*/
	
	.editBook {
		height: 1.5rem;
		line-height: 1.5rem;
		border-bottom: 1px solid #ddd;
		background: #fff;
	}
	
	.editBook .edict {
		color: #f00;
		font-size: .6rem;
		text-align: right;
		padding-right: .6rem;
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
		padding: 10% 0;
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
	
	.recomend .wantRead {
		padding: .6rem 0;
		text-align: center;
		font-size: .55rem;
		color: #999;
	}
	/*底部去预约*/
	
	.ToBook {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		align-items: center;
		background: rgba(255, 255, 255, 1);
		height: 2rem;
		line-height: 2rem;
	}
	
	.ToBook .allChose {
		flex: 2;
		padding-left: .5rem;
	}
	
	.allChose .checksAll {
		display: inline-block;
		vertical-align: middle;
	}
	
	.allChose span {
		font-size: .6rem;
		color: #999;
	}
	
	.ToBookBtn {
		flex: 1;
		background: #f90;
		font-size: .7rem;
		color: #fff;
		text-align: center;
	}
	
	.ToBookBtn span {
		color: #fff;
		font-size: .55rem;
		margin-left: .1rem;
	}
	
	.delectBook input {
		margin-right: .6rem;
		padding: .15rem .5rem;
		background: #f90;
		color: #fff;
		font-size: .6rem;
	}
	
	.shelfListqb {
		position: relative;
		width: 33.33%;
	}
	
	.shelfListqb .checks {
		position: absolute;
		top: 0;
		left: 10%;
		z-index: 10;
	}
	
	.checks input {
		display: none;
	}
	
	.checks label {
		display: inline-block;
		position: relative;
		vertical-align: middle;
		width: .85rem;
		height: .85rem;
		margin: .3rem;
		margin-right: 0;
		background: #fff;
		border: 1px solid #ddd;
		transition: all 0.3s ease-in-out;
		font-size: 1rem;
		color: #FFF;
		-webkit-font-smoothing: antialiased;
	}
	
	.checks label.check {
		border-radius: 5px;
	}
	
	.checks label .icon {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		opacity: 0;
		font-size: .6rem;
		-webkit-transform: scale(0);
		transition: all 0.3s ease-in-out;
		line-height: .85rem;
		text-align: center;
	}
	
	.checks input:checked+label {
		background: #26A2FF;
		border: 1px solid #26A2FF;
	}
	
	.checks input:checked+label .icon {
		opacity: 1;
		-webkit-transform: scale(1);
		color: #fff;
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