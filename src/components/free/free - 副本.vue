<template>
	<div>
		<section class="headTitle">
			<vHead :title="title" @hidesetpage="hidesetpage"></vHead>
		</section>
		<nav class="fixedNav" v-if="tabHeadShow">
			<ul>
				<li @click="chooseMenu(0)" :class="{'active':showIndex === 0 }">千字特价</li>
				<li @click="chooseMenu(1)" :class="{'active':showIndex === 1 }">全本特价</li>
				<li @click="chooseMenu(2)" :class="{'active':showIndex === 2 }">新书畅读</li>
			</ul>
		</nav>
		<section class="freeContent" ref="freeContent">
			<section>
				<section class="todayFree">
					<section class="title">
						<h2>今日限免</h2>
						<p class="des">精品好书限时免费中...</p>
					</section>
					<ul class="todayList">
						<shelfList v-for="(item, index) in shelflist" :key="index" :item="item"></shelfList>
					</ul>
				</section>
				<split></split>
				<!--分类-->
				<section class="Freeclassify" ref="Freeclassify">
					<nav>
						<ul>
							<li @click="chooseMenu(0)" :class="{'active':showIndex === 0 }">千字特价</li>
							<li @click="chooseMenu(1)" :class="{'active':showIndex === 1 }">全本特价</li>
							<li @click="chooseMenu(2)" :class="{'active':showIndex === 2 }">新书畅读</li>
						</ul>
					</nav>
					<section class="classifyList" ref="menuList">
						<section class="ThousandWords">
							<section class="title">
								<h2>千字特价</h2>
								<p class="des">编辑热推佳作，每章低至2-3折...</p>
							</section>
							<ul class="booklist" v-if="this.WordsList != ''">
								<bookList v-for="(item, index) in this.WordsList" :key="index" :item="item" @openDes="openDes">
				    				<p class="classfiy" slot="classFiy">
										<span v-for="(arr, index) in item.label.split(' ')" :key="index">{{arr}}</span>
									</p>
				    			</bookList>
						    </ul>
						    <p class="page-infinite-loading" v-if="this.WordsList == ''">
						      	<span class="spinner"><mt-spinner type="fading-circle" color="#26a2ff" :size="20"></mt-spinner></span>加载中
						    </p>
						</section>
						<section class="TheWhole">
							<section class="title">
								<h2>全本特价</h2>
								<p class="des">编辑热推佳作，每章低至2-3折...</p>
							</section>
							<ul class="booklist" v-if="this.WholeList != ''">
								<bookList v-for="(item, index) in this.WholeList" :key="index" :item="item" @openDes="openDes">
				    				<p class="classfiy" slot="classFiy">
										<span v-for="(arr, index) in item.label.split(' ')" :key="index">{{arr}}</span>
									</p>
				    			</bookList>
						    </ul>
						     <p class="page-infinite-loading" v-if="this.WholeList == ''">
						      	<span class="spinner"><mt-spinner type="fading-circle" color="#26a2ff" :size="20"></mt-spinner></span>加载中
						    </p>
						</section>
						<section class="newBook">
							<section class="title">
								<h2>新书畅读</h2>
								<p class="des">编辑热推佳作，每章低至2-3折...</p>
							</section>
							<ul class="booklist" v-if="this.newList != ''">
								<bookList v-for="(item, index) in this.newList" :key="index" :item="item" @openDes="openDes">
				    				<p class="classfiy" slot="classFiy">
										<span v-for="(arr, index) in item.label.split(' ')" :key="index">{{arr}}</span>
									</p>
				    			</bookList>
						    </ul>
						     <p class="page-infinite-loading" v-if="this.newList == ''">
						      	<span class="spinner"><mt-spinner type="fading-circle" color="#26a2ff" :size="20"></mt-spinner></span>加载中
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
import shelfList from '@/components/bookshelf/shelfList'
import bookList from '@/components/book/list'
import bookDes from '@/components/book/bookdescript'
import loading from '@/components/common/loading'
import split from '@/components/common/split'
export default {
	data() {
		return {
			title:'免费特价专区',
			shelflist: '',
			WordsList:'',
			WholeList:'',
			newList:'',
			tabList:[],
			showDes: false,
			id:'',
			NavTop:'',
			showIndex:'',
			menuIndexChange:true,
			tabHeadShow: false,
			showLoad: false,
			size:''
		}
	},
	created() {
		this.initData();
		this.loadList();
		this.loadWhole();
		this.loadnew();
	},
	mounted() {
		this.$nextTick(() => {
			this.getBookListHeight();
			this._initScroll();
		});
	},
	watch: {
		showIndex(curVal,oldVal) {
			this.menuIndexChange = false;
			this.scroll.scrollTo(0, -this.tabList[curVal]+this.size, 400);
        	this.scroll.on('scrollEnd', () => {
                this.menuIndexChange = true;
            })
		},
		shelflist() {
			this.$nextTick(() => {
				this.getBookListHeight();
				this._initScroll();
			})
		},
		WordsList() {
			this.$nextTick(() => {
				this.getBookListHeight();
				this._initScroll();
			})
		},
		WholeList() {
			this.$nextTick(() => {
				this.getBookListHeight();
				this._initScroll();
			})
		},
		newList() {
			this.$nextTick(() => {
				this.getBookListHeight();
				this._initScroll();
			})
		},
	},
	components: {
		vHead,
		shelfList,
		bookList,
		split,
		loading,
		bookDes
	},
	methods: {
		initData() {
			this.$http.get('/api/bookShelf').then((response) => {
				response = response.data;
				const ERR_OK = 0;
				if(response.errno === ERR_OK) {
					this.shelflist = response.data.splice(0, 6);
					this.$nextTick(() => {
						this._initScroll();
					})
				}
			})
		},
		loadList() {
			this.$http.get('/api/bookLendingManagement/homePage/getBookList.shtml',{
			  params:{
			    pageNo:1
			  }
			}).then((response) => {
				this.WordsList = response.data.bookInfo;
				this.$nextTick(() => {
					this._initScroll();
				})
			}).catch(function(err){
			  console.log(err);
			});
		},
		loadWhole() {
			this.$http.get('/api/bookLendingManagement/homePage/getBookList.shtml',{
			  params:{
			    pageNo:1
			  }
			}).then((response) => {
				this.WholeList = response.data.bookInfo;
				this.$nextTick(() => {
					this._initScroll();
				})
			}).catch(function(err){
			  console.log(err);
			});
		},
		loadnew() {
			this.$http.get('/api/bookLendingManagement/homePage/getBookList.shtml',{
			  params:{
			    pageNo:1
			  }
			}).then((response) => {
				this.newList = response.data.bookInfo;
				this.$nextTick(() => {
					this._initScroll();
				})
			}).catch(function(err){
			  console.log(err);
			});
		},
		//滚动
		_initScroll() {
			if(!this.scroll) {
				this.scroll = new BScroll(this.$refs.freeContent, {
	                probeType: 3,
                    click: true
	           });
	           this.scroll.on('scroll', (pos) => {
  	           		this.getNavTop();
	           		const size = document.documentElement.style.fontSize.substring(0,document.documentElement.style.fontSize.indexOf('px'))*2;
	           		this.size = size;
                    if(Math.abs(Math.round(pos.y)) >= parseInt(this.NavTop)) {
                    	this.tabHeadShow = true;
                    }else {
                    	this.tabHeadShow = false;
                    	this.showIndex = ''
                    }
                      /*滚动监听导航*/
                    this.tabList.forEach((item, index) => {
		                if (this.menuIndexChange && Math.abs(Math.round(pos.y)) >= (item-5*size)) {
		                    this.showIndex = index
		                }
		            })
               })
			}else {
				this.scroll.refresh()
			}
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
        },
        openDes(val) {
			this.showDes = true;
			this.id = val;
		},
		close() {
			this.showDes = false;
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
	position: absolute;
	top:2rem;
	left:0;
	bottom:0;
	width:100%;
	background: #fff;
	overflow-y: auto;
}
.title {
	padding: 0.5rem;
}
.title h2 {
	font-size:.7rem;
	color:#292929;
}
.title .des {
	font-size:.55rem;
	color:#9C9C9C;
	margin-top:.3rem;
}
.todayList{
	background: #fff;
	display: flex;
	justify-content: space-between;
	flex-flow: row wrap;
	padding:0 .5rem .5rem .5rem;
}
.Freeclassify {
	
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
	font-size: .7rem;
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