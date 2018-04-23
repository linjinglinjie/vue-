<template>
	<div>
		<section class="headTitle">
			<vHead :title="title" @hidesetpage="hidesetpage"></vHead>
		</section>
		<nav class="fixedNav" v-if="tabHeadShow">
			<ul>
				<li @click="chooseMenu(0)" :class="{'active':showIndex === 0 }">玄幻修仙</li>
				<li @click="chooseMenu(1)" :class="{'active':showIndex === 1 }">都市异能</li>
				<li @click="chooseMenu(2)" :class="{'active':showIndex === 2 }">科幻悬疑</li>
				<li @click="chooseMenu(3)" :class="{'active':showIndex === 3 }">其他精品</li>
			</ul>
		</nav>
		<section class="freeContent" ref="freeContent">
			<section>
				<section class="todayFree">
					<section class="title">
						<h2>主编推荐</h2>
					</section>
					<ul class="todayList">
						<li v-for="(item, index) in reconmend" :key="index" @click="recomedOpen(item.ISBN)">
							<section class="conver">
								<img v-if="item.src && item.src != ''" :src="item.src" />
								<img v-if="item.src && item.src == '' || item.src == null" src="../../assets/img/moren.jpg" />
								<img v-if="!item.src" src="../../assets/img/moren.jpg" />
							</section>
							<section class="bookInfor">
								<h1>{{item.book_name}}</h1>
								<p>
									{{item.book_introduction}}
								</p>
							</section>
						</li>
					</ul>
				</section>
				<split></split>
				<!--分类-->
				<section class="Freeclassify" ref="Freeclassify">
					<nav>
						<ul>
							<li @click="chooseMenu(0)" :class="{'active':showIndex === 0 }">玄幻修仙</li>
							<li @click="chooseMenu(1)" :class="{'active':showIndex === 1 }">都市异能</li>
							<li @click="chooseMenu(2)" :class="{'active':showIndex === 2 }">科幻悬疑</li>
							<li @click="chooseMenu(3)" :class="{'active':showIndex === 3 }">其他精品</li>
						</ul>
					</nav>
					<section class="classifyList" ref="menuList">
						<section class="ThousandWords">
							<section class="title">
								<h2>玄幻修仙</h2>
							</section>
							<ul class="booklist" v-if="this.WordsList != ''">
								<bookList v-for="(item, index) in this.WordsList" :key="index" :item="item" @openDes="openDes">
				    				<p class="classfiy" slot="classFiy">
										<span v-for="(arr, index) in item.label.split(' ')" :key="index">{{arr}}</span>
									</p>
				    			</bookList>
						    </ul>
						    <p class="page-infinite-loading" v-if="this.WordsList == ''">
						      	<span class="spinner"><mt-spinner type="fading-circle" color="#26a2ff" :size="20"></mt-spinner></span>加载中...
						    </p>
						</section>
						<section class="TheWhole">
							<section class="title">
								<h2>都市异能</h2>
							</section>
							<ul class="booklist" v-if="this.WholeList != ''">
								<bookList v-for="(item, index) in this.WholeList" :key="index" :item="item" @openDes="openDes">
				    				<p class="classfiy" slot="classFiy">
										<span v-for="(arr, index) in item.label.split(' ')" :key="index">{{arr}}</span>
									</p>
				    			</bookList>
						    </ul>
						    <p class="page-infinite-loading" v-if="this.WholeList == ''">
						      	<span class="spinner"><mt-spinner type="fading-circle" color="#26a2ff" :size="20"></mt-spinner></span>加载中...
						    </p>
						</section>
						<section class="newBook">
							<section class="title">
								<h2>科幻悬疑</h2>
							</section>
							<ul class="booklist" v-if="this.newList != ''">
								<bookList v-for="(item, index) in this.newList" :key="index" :item="item" @openDes="openDes">
				    				<p class="classfiy" slot="classFiy">
										<span v-for="(arr, index) in item.label.split(' ')" :key="index">{{arr}}</span>
									</p>
				    			</bookList>
						    </ul>
						    <p class="page-infinite-loading" v-if="this.newList == ''">
						      	<span class="spinner"><mt-spinner type="fading-circle" color="#26a2ff" :size="20"></mt-spinner></span>加载中...
						    </p>
						</section>
						<section class="newBook">
							<section class="title">
								<h2>其他精品</h2>
							</section>
							<ul class="booklist" v-if="this.newList != ''">
								<bookList v-for="(item, index) in this.newList" :key="index" :item="item" @openDes="openDes">
				    				<p class="classfiy" slot="classFiy">
										<span v-for="(arr, index) in item.label.split(' ')" :key="index">{{arr}}</span>
									</p>
				    			</bookList>
						    </ul>
						    <p class="page-infinite-loading" v-if="this.newList == ''">
						      	<span class="spinner"><mt-spinner type="fading-circle" color="#26a2ff" :size="20"></mt-spinner></span>加载中...
						    </p>
						</section>
					</section>
				</section>
			</section>
		</section>
		<!--图书详情页展示-->
		<transition name="slide">
			<bookDes v-if="showDes" @close="close" :num="id"></bookDes>
		</transition>
		<loading v-if="this.showLoad"></loading>
	</div>
</template>
<script>
import BScroll from 'better-scroll'
import vHead from '@/components/common/head'
import bookList from '@/components/book/list'
import bookDes from '@/components/book/bookdescript'
import loading from '@/components/common/loading'
import split from '@/components/common/split'
import {baseUrl} from '@/assets/plugins/env.js'
export default {
	data() {
		return {
			title:'女生专区',
			reconmend:'',
			WordsList:'',
			WholeList:'',
			newList:'',
			tabList:[],
			showDes: false,
			id:'',
			NavTop:'',
			showIndex:0,
			menuIndexChange:true,
			tabHeadShow: false,
			showLoad: false,
			size: document.documentElement.style.fontSize.substring(0,document.documentElement.style.fontSize.indexOf('px'))*2,
			scroll:''
		}
	},
	created() {
		//this.initData();
		this.loadList();
		this.loadWhole();
		this.loadnew();
		this._reconmend();
	},
	mounted() {
		this.$nextTick(() => {
			this.getBookListHeight();
		});
		window.addEventListener('scroll', this.scrollMethod);
	},
	watch: {
		scroll(curval, oldval) {
			if(curval >= this.NavTop-this.size) {
				this.tabHeadShow = true;
				this.tabList.forEach((item, index) => {
	                if (this.menuIndexChange && curval >= (item-2*this.size)) {
	                    this.showIndex = index
	                }
	            })
			}else {
				this.tabHeadShow = false;
				this.showIndex = 0;
			}
		},
		WordsList() {
			this.$nextTick(() => {
				this.getBookListHeight();
			})
		},
		WholeList() {
			this.$nextTick(() => {
				this.getBookListHeight();
			})
		},
		newList() {
			this.$nextTick(() => {
				this.getBookListHeight();
			})
		},
		reconmend() {
			this.$nextTick(() => {
				this.getNavTop();
				this.getBookListHeight();
			})
		}
	},
	components: {
		vHead,
		bookList,
		split,
		loading,
		bookDes
	},
	methods: {
		//请求后台数据之前转换入参
		transformRequest: function (data) {
		    let ret = ''
		    for (let it in data) {
		    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
		        }
		    return ret
		},
		initData() {
			this.$http.get('/api/bookShelf').then((response) => {
				response = response.data;
				const ERR_OK = 0;
				if(response.errno === ERR_OK) {
					//this.shelflist = response.data.splice(0, 6);
					this.$nextTick(() => {
						this.getBookListHeight();
					})
				}
			})
		},
		loadList() {
			this.$http.post(baseUrl+'/bookLendingManagement/bookprofession/getPerfectSelection.shtml',this.transformRequest({label:'完美精选',pageNum:1}),{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            }).then((response) => {
            	if(response.data.msgcode == 'success') {
            		this.WordsList = response.data.result_data;
					this.$nextTick(() => {
						this.getBookListHeight();
					})
            	}
			}).catch(function(err){
			  console.log(err);
			});
		},
		loadWhole() {
			this.$http.post(baseUrl+'/bookLendingManagement/bookprofession/getPerfectSelection.shtml',this.transformRequest({label:'重磅推荐',pageNum:1}),{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            }).then((response) => {
            	if(response.data.msgcode == 'success') {
					this.WholeList = response.data.result_data;
					this.$nextTick(() => {
						this.getBookListHeight();
					})
				}
			}).catch(function(err){
			  console.log(err);
			});
		},
		loadnew() {
			this.$http.post(baseUrl+'/bookLendingManagement/bookprofession/getPerfectSelection.shtml',this.transformRequest({label:'完美精选',pageNum:1}),{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            }).then((response) => {
            	if(response.data.msgcode == 'success') {
					this.newList = response.data.result_data;
					this.$nextTick(() => {
						this.getBookListHeight();
					})
				}
			}).catch(function(err){
			  console.log(err);
			});
		},
		//推荐
		_reconmend() {
			this.$http.post(baseUrl+'/bookLendingManagement/bookprofession/getHomeList.shtml',this.transformRequest({pageNum:1}),{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            }).then((response) => {
				if(response.data.msgcode == 'success') {
				 	this.reconmend = response.data.result_data.splice(0,4);
				 	this.$nextTick(() => {
						this.getBookListHeight();
					})
				}
			}).catch(function(err){
			  console.log(err);
			  this.$refs.loadmore.onTopLoaded();
			});
		},
		/*获取滚动高度*/
		scrollMethod() {
		    this.scroll = document.documentElement.scrollTop || document.body.scrollTop;
		},
		//正文坐着推荐距顶部距离
		getNavTop(){
           this.NavTop = this.$refs.Freeclassify.offsetTop;
        },
		//获取列表的高度，存入navListTop
        getBookListHeight(){
            const listContainer = this.$refs.menuList;
            const listArr = Array.from(listContainer.children);
            listArr.forEach((item, index) => {
                this.tabList[index] = item.offsetTop;
            });
        },
        //点击列表标题，相应列表移动到最顶层
        chooseMenu(index){
        	this.showIndex = index;
        	this.menuIndexChange = false;
        	window.scrollTo(100,this.tabList[index]-2*this.size+1); 
        	this.menuIndexChange = true;
        },
        openDes(val) {
			this.showDes = true;
			this.id = val;
		},
		close() {
			this.showDes = false;
		},
		recomedOpen(val) {
			this.showDes = true;
			this.id = val;
		},
		hidesetpage() {
			this.$router.go(-1);
		}
	}
}
</script>
<style scoped>
.headTitle {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 998;
}	
.freeContent {
	margin-top:2rem;
	background: #fff;
}
.title {
	padding: 0.5rem;
}
.title h2 {
	font-size:.7rem;
	color:#292929;
}
.todayList{
	background: #fff;
	display: flex;
	justify-content: space-between;
	flex-flow: row wrap;
	padding:0 .5rem .5rem .5rem;
}
.todayList li {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width:50%;
	margin:.3rem 0;
	padding-right: .3rem;
}
.todayList li .conver {
	flex: 1;
	height:3rem;
	margin-right: .2rem;
}
.todayList li .conver img {
	width:100%;
	height:100%;
}
.todayList li .bookInfor {
	flex: 2;
}
.todayList li .bookInfor h1 {
	color:#373737;
	font-size: .6rem;
	margin-bottom:.2rem;
	width:4rem;
	overflow: hidden;
	white-space:nowrap ;
	text-overflow: ellipsis;
}
.todayList li .bookInfor p {
	overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    font-size: .5rem;
    color: #9C9C9C;
    line-height: .9rem;
    height: 1.8rem;
}
.fixedNav {
	position: fixed;
	top:2rem;
	left:0;
	right:0;
	z-index: 9;
	background: #fff;
}
nav ul {
	display: flex;
	justify-content: space-around;
	align-items: center;
	border-bottom:1px solid #ddd;
}
nav ul li {
	height:2rem;
	line-height: 2rem;
	font-size: .65rem;
	color:#292929;
}
nav ul li.active {
	color:#f90;
}
.page-infinite-loading{
	height:50px;
	line-height:50px;
	text-align: center;
	font-size: .55rem;
}
.spinner{
	display: inline-block;
	vertical-align: middle;
	margin-right: .2rem;
}
.slide-enter-active, .slide-leave-active {
	transition:all .4s
}	
.slide-enter, .slide-leave-active{
	transform: translateX(100%);
}
</style>