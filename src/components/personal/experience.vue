<template>
	<div class="experience">
		<header>
			<section class="goback"><i class="icon iconfont" @click="goBack">&#xe607;</i></section>
			<section class="userCenter">
				<img v-if="userImg != '' && userImg" :src="userImg" />
				<img v-if="userImg == '' && userImg" src="../../assets/img/user.png" />
				<img v-if="!userImg" src="../../assets/img/user.png" />
				<!--<p class="hint">您读的书太少了，请努力吧！</p>-->
			</section>
		</header>
		<section class="ReadRecently">
			<ul>
				<li class="userinfor"><label>昵称</label><p>{{userName}}</p></li>
			</ul>
			<split></split>
			<a class="loginOut" type="button" :href="urlFile">退出账号</a>
		</section>
		<loadding name="loading" v-if="loadingShow" @click="loginout"></loadding>
	</div>
</template>
<script>
import split from '@/components/common/split'	
import loadding from '@/components/common/loading'
import { baseUrl } from '@/assets/plugins/env.js'
export default {
	data() {
		return {
			urlFile:'',
			userName:'',//用户名
			userImg:'',//头像
			loadingShow: false  //加载动画
		}
	},
	components: {
		split,
		loadding,
	},
	created() {
		this.reputateScore();
		this.urlFile = baseUrl+'/u/logout.shtml';
	},
	methods: {
		reputateScore() {
			this.$http.get(baseUrl+'/bookLendingManagement/borrow/userBorrowInfo.shtml').then((response) => {
				this.userName = response.data.userName;
				this.userImg = response.data.userHead;
				this.loadingShow = false;
			}).catch(function(err){
			  console.log(err);
			  this.loadingShow = false;
			});
		},
		goBack() {
			this.$emit('goBack');
		}
	}
}
</script>
<style scoped>
header {
	background: url(../../assets/img/bjbj.jpg) no-repeat top left;
	padding:.5rem;
}	
.goback .icon{
	font-size: 1rem;
	color:#000;
}
.userCenter {
	padding:.5rem 0;
	text-align: center;
}
.userCenter img {
	width:3rem;
	height:3rem;
	border-radius:50%;
}
.userCenter .name {
	font-size: .8rem;
	color:#000;
	margin:.3rem 0;
}
.userCenter .hint {
	font-size: .65rem;
	color:#808080;
}
.ReadRecently .userinfor {
	padding:.5rem;
	border-bottom:1px solid #ddd;
	height:2rem;
	line-height: 2rem;
	display: flex;
	align-items: center;
	justify-content: space-around;
}
.ReadRecently .userinfor label {
	font-size: .6rem;
	color:#333;
	width:3rem;
}
.ReadRecently .userinfor p {
	flex: auto;
	font-size: .6rem;
	color:#333;
}
.loginOut {
	display: block;
	width:100%;
	padding:.5rem;
	background:#fff;
	border-top:1px solid #ddd;
	border-bottom:1px solid #ddd;
	color:#f00;
	font-size: .6rem;
	text-align: center;
}
</style>