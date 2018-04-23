<template>
	<div>
		<section class="persontop">
			<section class="head">
				<section class="Set" @click="showsetpage('1','设置')">
					<i class="icon iconfont">&#xe62e;</i>
				</section>
				<section class="headConver">
					<img v-if="userImg != '' && userImg" :src="userImg" />
					<img v-if="userImg == '' && userImg" src="../../assets/img/user.png" />
					<img v-if="!userImg" src="../../assets/img/user.png" />
				</section>
				<section class="Reputation">
					<p class="name">{{userName}}</p>
					<p class="value"><span>信誉值：</span>{{Score}}<i class="icon iconfont" @click="reputationList">&#xe674;</i></p>
				</section>
			</section>
			<ul class="personnav">
				<router-link to="/my/AcceptedList" tag="li">
					<i class="icon iconfont">&#xe694;</i>
					<span>订单受理中</span>
				</router-link>
				<router-link to="/my/completed" tag="li">
					<i class="icon iconfont">&#xe652;</i>
					<span>借阅中订单</span>
				</router-link>
				<router-link to="/my/allOrder" tag="li">
					<i class="icon iconfont">&#xe6ac;</i>
					<span>全部订单</span>
				</router-link>
			</ul>
		</section>
		<section class="personlist">
			<ul>
				<li @click="showsetpage('2','借阅历史')">
					<i class="icon iconfont sign red">&#xe60f;</i>
					<span class="title">借阅历史</span>
					<em><i class="icon iconfont">&#xe60e;</i></em>
				</li>
				<li @click="showsetpage('3','提书笔记')" v-if="this.isAdmin == true">
					<i class="icon iconfont sign blue">&#xe61b;</i>
					<span class="title">开始提书</span>
					<em><i class="icon iconfont">&#xe60e;</i></em>
				</li>
			</ul>
		</section>
		<transition name="slide">
			<section class="setpage" v-if="setpage == true">
				<experience v-if="showId == 1" @goBack="goBack"></experience>
				<borrowHistry v-if="showId == 2" @hidesetpage="goBack" :title="title"></borrowHistry>
				<MentionBook v-if="showId == 3" @hidesetpage="goBack" :title="title"></MentionBook>
			</section>
		</transition>
		<transition name="slide">
			<reputation v-if="showTation" @closeTation="closeTation"></reputation>
		</transition>
		<transition name="slideLeft">
			<router-view></router-view>
		</transition>
		<loadding name="loading" v-if="loadingShow"></loadding>
		<vfoot></vfoot>
	</div>
</template>
<script>
import vfoot from '@/components/footer/foot'
import experience from './experience'
import borrowHistry from './borrowHistry'
import MentionBook from './MentionBook'
import reputation from './Reputation'
import loadding from '@/components/common/loading'
import { baseUrl } from '@/assets/plugins/env.js'
export default {
	data() {
		return {
			setpage: false,
			title:'',
			showId:'',
			showTation: false,
			userName:'',//用户名
			userImg:'',//头像
			Score:100,//信誉值
			isAdmin:false,
			loadingShow: false  //加载动画
		}
	},
	components: {
		borrowHistry,
		vfoot,
		experience,
		MentionBook,
		reputation,
		loadding
	},
	created() {
		this.reputateScore();
		this.adminurl();
	},
	methods: {
		reputateScore() {
			this.$http.get(baseUrl+'/bookLendingManagement/borrow/userBorrowInfo.shtml').then((response) => {
				//console.log(response)
				this.Score = response.data.userGlory;
				this.userName = response.data.userName;
				this.userImg = response.data.userHead;
				this.loadingShow = false;
			}).catch(function(err){
			  console.log(err);
			  this.loadingShow = false;
			});
		},
		adminurl() {
			this.$http.get(baseUrl+'/bookLendingManagement/permission/getPermission.shtml').then((response) => {
				if(response.data.status == 200) {
					console.log(response)
					for(let item of response.data.entity) {
						if(item == '/borrow/borrowList.shtml') {
							this.isAdmin = true;
						}
					}
				}else {
					console.log(response.data.status);
				}
				this.loadingShow = false;
			}).catch(function(err){
			  console.log(err);
			  this.loadingShow = false;
			});
		},
		showsetpage(num,value) {
			this.setpage = true;
			this.title = value;
			this.showId = num
		},
		goBack() {
			this.setpage = false;
			this.title = '';
			this.showId = ''
		},
		reputationList() {
			this.showTation = true
		},
		closeTation() {
			this.showTation = false
		}
	}
}
</script>
<style scoped>
.head {
	height:7rem;
	background: url(../../assets/img/personbj.jpg) no-repeat top left;
	background-size:100%;
	position:relative;
	display: flex;
	align-items: center;
	padding:1rem;
}
.Set {
	position: absolute;
	top:1rem;
	right:1rem;
}
.Set .icon {
	font-size: 1rem;
	color: #fff;
}
.headConver {
	width:2.5rem;
	height:2.5rem;
	border-radius:50%;
	overflow: hidden;
	margin-right:.8rem;
	border:3px solid #A00DF8;
}
.headConver img {
	width:100%;
	height:100%;
}
.Reputation {
	flex: auto;
	font-size: .65rem;
}
.Reputation .name {
	margin-bottom:.3rem;
	font-size: .7rem;
	color:#fff;
}
.Reputation .value span, .Reputation .value{
	color:#fff;
}
.Reputation .value .icon {
	margin-left:.3rem;
	font-size: .8rem;
	vertical-align: middle;
	color:#6841DD;
}
.personnav {
	display: flex;
	justify-content: center;
	align-content: center;
}
.personnav li {
	background: #fff;
	flex: 1;
	text-align: center;
	padding: .5rem 0;
	font-size: .55rem;
	color:#7C7C7C;
}
.personnav li .icon {
	display: block;
	font-size: .8rem;
	margin-bottom:.1rem;
	color:#7C7C7C;
}
.personnav li.list .icon {
}
.personlist {
	background: #fff;
	margin-top:.6rem;
}
.personlist li{
	padding:0 .8rem;
	height:1.8rem;
	line-height: 1.8rem;
	border-bottom:1px solid #ddd;
	font-size: .55rem;
}
.personlist li .sign {
	margin-right:.3rem;
	font-size: .75rem;
}
.personlist li em {
	float: right;
}
.personlist li em .icon {
	font-size: .7rem;
}
.setpage{
	min-height: 100%;
	position: absolute;
	z-index: 999;
	top:0;
	left: 0;
	right:0;
	background: #fff;
}
.red {
	color: #f00;
}
.blue {
	color:#0080FF;
}
.slide-enter-active, .slide-leave-active{
	transition: all .5s;
}
.slide-enter, .slide-leave-active{
	transform: translateX(100%);
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