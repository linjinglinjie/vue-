<template>
	<div class="classifypage">
		<header class="header" ref="head" :class="{'touxhup': touxhup}">
			<section class="search">
				<search @showHistroy="showHistroy"></search>
			</section>
			<section class="menuTop" ref="wrapperMenu">
				<ul>
					<li v-for="(item,index) in menuList" :key="index" :class="{activity_menu: index == menuIndex}" @click="chooseMenu(index)">{{item.text}}</li>
				</ul>
			</section>
		</header>	
		<section class="bottom">
			<section class="menuBottom" ref="menuBookList">
				<ul>
					<li v-for="(item,index) in menuList" :key="index">
						<header class="menu_detail_header" >
                            <i class="icon iconfont" :style="{color: color[index]}">&#xe76f;</i>
                            <span>{{item.text}}</span>
                        </header>
                        <section class="menu_detail_list">
                        	<router-link tag="div" :to="{path:'/classify/classfiyList', query: { level:menu.level,id: menu.id,title:menu.text}}"  v-for="(menu,bookindex) in item.nodes" :key="bookindex" class="menu_detail_link">
                        		<bookClassfiy :book="menu" :style="{backgroundColor: activeColor[index]}"></bookClassfiy>
                        	</router-link>
                        </section>
					</li>
				</ul>
			</section>
		</section>
		
		<transition name="router-slide">
			<router-view @goBack="goBack"></router-view>
		</transition>
		<!--搜索记录-->
		<transition name="router-slide">
			<serchhistroy v-if="serchhistroy" @closesearch="closesearch"></serchhistroy>
		</transition>
		<loading v-if="showLoading"></loading>
		<vfoot></vfoot>
	</div>
</template>
<script>
import vfoot from '@/components/footer/foot'
import BScroll from 'better-scroll'
import search from '../common/search'
import bookClassfiy from './list'
/*import ClassfiyList from './classfiyList'*/
import loading from '../common/loading'
import serchhistroy from '../common/searchhistroy'
import {baseUrl} from '@/assets/plugins/env.js'
export default {
	name:'classify',
	data() {
		return {
			serchhistroy: false,
			touxhup: false,
			startY: 0,
			currentY:'',
			direction:'',
			menuList:'',
			classListTop: [], //图书列表的高度集合，
			bookScroll: null,  //图书列表scroll
			menuIndexChange: true,//解决选中index时，scroll监听事件重复判断设置index的bug
			menuIndex: 0, //已选菜单索引值，默认为0
			showLoading: true, //显示加载动画
			activeColor:['#EDEDED','#F3EEE8','#E5EFE4','#EDEDED','#F3EEE8','#E5EFE4'],
			color:['#4878C7','#31B126','#f90','#4878C7','#31B126','#f90'],
			bookList:''
		}
	},
	components: {
		search,
		bookClassfiy,
		loading,
		serchhistroy,
		vfoot
	},
	computed: {
		
	},
	created() {
		this.initData();
	},
	mounted() {
		this.bindTouchEvents();
		this.$nextTick(() => {
			//this.bookScroll.refresh()
		});
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
		initData(){
			this.$http.get(baseUrl+'/bookLendingManagement/booksort/searchForMove.shtml').then((response) => {
				this.menuList = response.data.list;
		        this.showLoading = false;
			}).catch(function(err){
			  console.log(err);
			});
		},
		//获取列表的高度，存入shopListTop
            getBookListHeight(){
                const listContainer = this.$refs.menuBookList;
                const listArr = Array.from(listContainer.children[0].children);
                listArr.forEach((item, index) => {
                    this.classListTop[index] = item.offsetTop;
                });
                this.listenScroll(listContainer)
            },
            //当滑动图书列表时，监听其scrollTop值来设置对应的图书列表标题的样式
            listenScroll(element){
                this.bookScroll = new BScroll(element, {
                    probeType: 3,
                    deceleration: 0.001,
                    bounce: false,
                    swipeTime: 2000,
                    click: true,
                });
				//const Containertop = document.documentElement.style.fontSize;
                this.bookScroll.on('scroll', (pos) => {
                    if (!this.$refs.wrapperMenu) {
                        return 
                    }
                    this.classListTop.forEach((item, index) => {
                        if (this.menuIndexChange && Math.abs(Math.round(pos.y)) >= item) {
                            this.menuIndex = index;
                        }
                    })
                })
            },
            //点击列表标题，相应列表移动到最顶层
            chooseMenu(index){
                this.menuIndex = index;
                //menuIndexChange解决运动时listenScroll依然监听的bug
                this.menuIndexChange = false;
                this.bookScroll.scrollTo(0, -this.classListTop[index], 400);
                this.bookScroll.on('scrollEnd', () => {
                    this.menuIndexChange = true;
                })
            },
            bindTouchEvents() {
		        this.$el.addEventListener('touchstart', this.handleTouchStart);
		        this.$el.addEventListener('touchmove', this.handleTouchMove);
		        this.$el.addEventListener('touchend', this.handleTouchEnd);
		      },
            handleTouchStart(event) {
		        this.startY = event.touches[0].clientY;
		        //console.log(event)
		      },
		    handleTouchMove(event) {
		    	if (this.startY < this.$el.getBoundingClientRect().top && this.startY > this.$el.getBoundingClientRect().bottom) {
		          return;
		        }
		        this.currentY = event.touches[0].clientY;
		        let distance = (this.currentY - this.startY) / 2;
		        this.direction = distance > 0 ? 'down' : 'up';
		        if(this.direction == 'up'){
		        	this.touxhup = true;	
		        }else{
		        	this.touxhup = false;
		        }
		    },
		    showHistroy() {
		    	this.serchhistroy = true
		    },
		    closesearch() {
		    	this.serchhistroy = false
		    },
		    pushinfor(value) {
		    	alert(1)
		    	this.bookList = value.booklist;
		    	alert(2)
		    },
		    goBack() {
		    	this.$router.go(-1);
		    }
	},
	watch: {
		 showLoading: function (value){
            if (!value) {
                this.$nextTick(() => {
                    this.getBookListHeight();
                })
            }
       },
       menuIndex: function(value, oldvalue){
       	const Containertop = document.documentElement.style.fontSize;
       		if( value > oldvalue ) {
       			this.touxhup = true;
       		}else {
       			this.touxhup = false;
       		}
       }
	}
}
</script>
<style scoped>
.header {
	background: #fff;
	position: fixed;
	top:0;
	left: 0;
	right: 0;
	z-index: 998;
	transition: all .4s;
	border-bottom: 1px solid #EFEFEF;
}
.touxhup{
	top:-2rem;
}
.bottom{
	position: absolute;
	top:1.9rem;
	bottom:2.6rem;
	left:0;
	width: 100%;
}
.search {
	padding:.3rem .6rem;
}
.menuTop ul{
	display: flex;
	justify-content: center;
	align-items: center;
	background: #fff;
}
.menuTop ul li {
	flex: 1;
	font-size: 0.65rem;
	height:2rem;
	line-height: 2rem;
	text-align: center;
}
.activity_menu{
	color:#f90;
}
.menuBottom{
	background: #fff;
	height:100%;
	width: 100%;
	overflow-y: auto;
	padding:.2rem;
	padding-top:2rem;
}
.menuBottom ul {
	padding-bottom:2rem;
}
.menuBottom li{
	padding-bottom:.5rem;
}
.menu_detail_header{
	height:1.8rem;
	line-height: 1.8rem;
	padding:0 .2rem;
	margin-bottom: .2rem;
	font-size: .7rem;
	color:#868686;
	border-bottom: 1px solid #EFEFEF;
}
.menu_detail_header .icon {
	margin-right:.2rem;
	vertical-align: middle;
	font-size: .8rem;
}
.menu_detail_list {
	display: flex;
	justify-content: space-between;
	flex-flow:row wrap;
}
.menu_detail_link{
	width:48%;
	height:3.5rem;
	margin:1%;
}
.router-slide-enter-active, .router-slide-leave-active {
    transition: all .4s;
}
.router-slide-enter, .router-slide-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
}
</style>