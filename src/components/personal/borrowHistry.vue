<template>
	<div>
		<section class="headtitle">
			<i class="icon iconfont" @click="goBack">&#xe607;</i>
			<section class="tab">
				<p :class="{'active':tabIndex == 0}" @click="changeId(0)">已借阅</p>
				<p :class="{'active':tabIndex == 1}" @click="changeId(1)">已预约</p>
				<p :class="{'active':tabIndex == 2}" @click="changeId(2)">已返还</p>
			</section>
		</section>
		<section class="history">
				<mt-loadmore :top-method="loadTop" ref="loadmore">
				<section class="innerwrap">
					<section class="listSelect" v-if="tabIndex == 0">
						<p :class="{'active':SelectIndex == 0}" v-if="tabIndex == 0" @click="selectfly(tabIndex,0)">按时间</p>
						<p :class="{'active':SelectIndex == 1}" v-if="tabIndex != 1" @click="selectfly(tabIndex,1)">已逾期</p>
						<!--<p :class="{'active':SelectIndex == 2}" @click="selectfly(this.tabIndex,2)">按类别</p>-->
					</section>
					<section class="historyList" :class="{'browList': tabIndex == 0}" v-if="selectList.length != 0">
						<ul>
							<li v-for="(item, index) in selectList" :key="index" @click="openDes(item.iSBN)">
								<section class="coverImg">
									<img v-if="item.cover_path && item.cover_path != ''" :src="item.cover_path" />
									<img v-if="item.cover_path && item.cover_path == ''" src="../../assets/img/moren.jpg" />
									<img v-if="!item.cover_path" src="../../assets/img/moren.jpg" />
								</section>
								<section class="des">
									<h1 class="bookName">{{item.bookName}}</h1><!--书名-->
									<p class="departmentname"><span>借书处:</span> {{item.borrow_department_name}}</p><!--借书处名称-->
									<p v-if="tabIndex == 0"><span>预计还书日期：</span>{{item.expect_return_time}}</p>
									<p class="returnTime" v-if="tabIndex == 2">{{item.returnTime}}</p><!--返还时间-->
									<p class="dateTime"><span>借书日期:</span> {{item.createTime}}</p><!--借书日期-->
									<p class="overdue" v-if="tabIndex != 1"><span>是否逾期：</span><span class="not" :class="{'red':item.is_overdue != 0}">{{item.is_overdue == 0? "未逾期":"已逾期"}}</span></p>
								</section>
							</li>
						</ul>
					</section>
					<section class="nothing" v-if="selectList.length == 0">
						<section>
							<i class="icon iconfont">&#xe624;</i>
							<p class="nobook">还没有书哦</p>
							<p class="warning">书山有路勤为径，学海无涯苦做舟</p>
						</section>
					</section>
				</section>
				</mt-loadmore>
			</section>
		<!--图书详情页展示-->
		<transition name="slideLeft">
			<bookDes v-if="showDes" @close="close" :num="id"></bookDes>
		</transition>
		<loadding name="loading" v-if="loadingShow"></loadding>
	</div>
</template>
<script>
import {baseUrl} from '@/assets/plugins/env.js'
import loadding from '@/components/common/loading'
import {aa} from '@/assets/plugins/touchDrect.js'
import bookDes from '@/components/book/bookdescript'
export default {
	data() {
		return {
			id: '',
			loadingShow:true,
			tabIndex:-1,
			SelectIndex:-1,
			historyList:'',
			saveList:'',
			selectList:[],//
			showDes: false,
		}
	},
	components: {
		loadding,
		bookDes
	},
	created() {
		this._initDate();
	},
	mounted(){
		this.$nextTick(() => {
			this.changeId(0)
		})
	},
	methods: {
		_initDate() {
			this.loadingShow = true;
			this.$http.get(baseUrl + '/bookLendingManagement/borrow/findByUserId.shtml').then((response) => {
				this.historyList = response.data;
				this.changeId(0)
			}).catch(function(err){
			  console.log(err);
			});
			this.loadingShow = false;
		},
		loadTop() {
			//this.offset = 1;
			//this.touchend = false;
			/*this.$http.post(baseUrl+'/bookLendingManagement/bookprofession/getHomeList.shtml',this.transformRequest({pageNum:1}),{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            }).then((response) => {
				if(response.data.msgcode == 'success') {
				   this.classList = response.data.result_data;
				   this.$refs.loadmore.onTopLoaded();
				   if(response.data.result_data.length < this.limit) {
						this.touchend = true;
				   }
				}
			}).catch(function(err){
			  console.log(err);
			  this.$refs.loadmore.onTopLoaded();
			});*/
			 this.$refs.loadmore.onTopLoaded();
		},
		changeId(num) {
			this.tabIndex = num;
			this.SelectIndex = -1;
			if(num == 0) {//已经借阅
				this._Borrow();
				this.selectfly(0, 0)
			}else if( num == 1) {//预约借阅
				this._reservation();
			}else if( num== 2) {//已返还
				this._Return();
			}
		},
		_Borrow() {
			this.loadingShow = true;
			this.selectList = [];
			//console.log(this.historyList)
			for(let i=0;i<this.historyList.length;i++) {
				if(this.historyList[i].handle_state == 3) {
					if(this.selectList.length == 0){
						this.selectList[0] = this.historyList[i]
					}else {
						this.selectList = this.selectList.concat(this.historyList[i]);
					}
				}
			}
			this.saveList = this.selectList;
			this.loadingShow = false;
			return this.selectList;
		},
		_reservation() {
			this.loadingShow = true;
			this.selectList = [];
			for(let i=0;i<this.historyList.length;i++) {
				if(this.historyList[i].handle_state == 1) {
					if(this.selectList.length == 0){
						this.selectList[0] = this.historyList[i]
					}else {
						this.selectList = this.selectList.concat(this.historyList[i]);
					}
				}
			}
			this.saveList = this.selectList;
			this.loadingShow = false;
			return this.selectList;
		},
		_Return() {
			this.loadingShow = true;
			this.selectList = [];
			for(let i=0;i<this.historyList.length;i++) {
				if(this.historyList[i].handle_state == 0) {
					if(this.selectList.length == 0){
						this.selectList[0] = this.historyList[i]
					}else {
						this.selectList = this.selectList.concat(this.historyList[i]);
					}
				}
			}
			this.saveList = this.selectList;
			this.loadingShow = false;
			return this.selectList;
		},
		//帅选
		selectfly(index,num) {
			this.SelectIndex = num;
			this.selectList = this.saveList;
			if(index == 0) {
				if(num == 0) {
					//按时间排序
					this.selectList.sort(function(a,b){
						return Date.parse(b.createTime) - Date.parse(a.createTime);
					})
				}else if(num == 1) {
					let arr = [];
					for(let i=0; i<this.selectList.length; i++) {
						if(this.selectList[i].is_overdue == 1) {
							if(arr.length == 0) {
								arr[0] = this.selectList[i]
							}else {
								arr = arr.concat(this.selectList[i]);
							}
						}
					}
					this.selectList = arr;
				}
			}else if(index == 2) {
				
			}
		},
		goBack() {
			this.$emit('hidesetpage');
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
	}
}
</script>
<style scoped>
.headtitle {
	position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 998;
}
.headtitle .icon {
	position: absolute;
	left:.5rem;
	top: .4rem;
	z-index: 2;
	font-size: 1rem;
	vertical-align: top;
}	
.history {
	position: absolute;
	top:2rem;
	bottom:0;
	left:0;
	right:0;
	overflow-y: auto;
	z-index: 2;
}
.tab {
	padding-left:2rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom:1px solid #ddd;
}
.tab p {
	flex: 1;
	text-align: center;
	font-size: .65rem;
	height:1.8rem;
	line-height:1.8rem;
}
.tab p.active {
	color:#f90;
}
/*帅选*/
.listSelect {
	display: flex;
	justify-content: space-around;
	align-items: center;
	width:86%;
	margin:0 auto;
	margin-top:.3rem;
	border:1px solid #ddd;
	border-radius:6px;
	position: absolute;
	top:0;
	left:7%;
	right:7%;
	z-index: 2;
}
.listSelect p {
	flex: 1;
	font-size: .55rem;
	padding:.2rem .6rem;
	border-right:1px solid #ddd;
	text-align: center;
	color:#999;
}
.listSelect p.active {
	background:#f1f1f1;
	color:#333;
}
.listSelect p:last-child {
	border:none;
}
.innerwrap {
	position: relative;
	/*padding-top:1.8rem;*/
}
.browList {
	padding-top:1.6rem;
}
.historyList{
	margin-top:.5rem;
}
.historyList li {
	display: flex;
	justify-content: space-between;
	align-items: center;
	background:#fff;
	padding:.3rem .6rem;
	border-bottom:1px solid #f1f1f1;
}
.historyList li .coverImg {
	width:3.5rem;
	margin-right: .5rem;
}
.historyList li .coverImg img {
	width:100%;
}
.historyList li .des {
	flex: auto;
}
.des .bookName {
	font-size: .65rem;
    color: #373737;
    margin-bottom: .3rem;
    width: 220px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.historyList li p {
	font-size: .6rem;
    color: #666;
    margin-bottom: .2rem;
}
.overdue .not {
	color:#6AA7D3;
}
.overdue .red {
	color:#f00;
}
.nothing {
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	padding:50% 0;
}
.nothing .icon {
	font-size: 4rem;
	color:#666;
}
.nothing .nobook {
	font-size: .7rem;
	color:#333;
	margin-bottom:.2rem;
}
.nothing .warning {
	font-size: .6rem;
	color:#999;
}
.slideLeft-enter-active,
.slideLeft-leave-active {
	transition: all .4s;
}
.slideLeft-enter,
.slideLeft-leave-active {
	transform: translateX(100%);
}
</style>