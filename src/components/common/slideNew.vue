<template>
	<div class="slideNew swiper-slideNew">
		<div class="title"><i class="icon iconfont">&#xe681;</i></div>
		<div class="swiper-container">
	        <div class="swiper-wrapper">
	            <div class="swiper-slide" v-for="(item, index) in newList" :key="index" @click="openDes(item.ISBN)">{{item.book_name}}</div>
	        </div>
	    </div>
	</div>
</template>
<script>
import '../../assets/plugins/swiper.min.js'
import '../../assets/style/swiper.min.css'
import {baseUrl} from '@/assets/plugins/env.js'
export default {
	data() {
		return {
			newList: ''
		}
	},
	created() {
		this._initdata();
	},
	methods: {
		_initdata() {
			this.$http.get(baseUrl+'/bookLendingManagement/homePage/getNoticeInfo.shtml').then((response) => {
				this.newList = response.data.bookInfo;
				this.$nextTick(function () {
					new Swiper('.swiper-slideNew .swiper-container', {
						autoplay: 3000,//可选选项，自动滑动
				        pagination: '.swiper-slideNew .swiper-pagination',
				        paginationClickable: true,
				        direction: 'vertical',
				        onlyExternal : true,
				        loop: true
				    })
				})
			}).catch(function(err){
				
			});
		},
		openDes(id) {
			this.$emit('openDes',id);
		}
	}
}
</script>
<style scoped>
.slideNew{
	display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    background: #fff;
}
.slideNew .title {
	flex: 0 0 0 2rem;
	padding:0 .6rem;
	text-align: center;
}
.slideNew .title .icon {
	color: #FD9430;
	font-size: 1rem;
}
.swiper-container {
	flex: 1;
    width: 100%;
    height:2rem;
}
.swiper-slide {
	height: 2rem !important;
	line-height: 2rem;
    font-size: .6rem;
    font-weight: bold;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>