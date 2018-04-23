<template>
	<section class="banner">
	    <div class="swiper-container">
	        <div class="swiper-wrapper">
	            <div class="swiper-slide" v-if="imgArr != null && imgArr.length != 0" v-for="(item,index) in imgArr" :key="index">
	            		<img v-if="item != '' || item != null" :src="item" />
	            		<img v-if="item == '' || item == null" src="../../assets/img/banner.jpg" />
	            </div>
	            <div v-if="imgArr == null" class="swiper-slide"><img src="../../assets/img/banner.jpg" /></div>
	        </div>
	        <div class="swiper-pagination swiper-pagination-white"></div>
	    </div>
    </section>
</template>
<script>
import '../../assets/plugins/swiper.min.js'
import '../../assets/style/swiper.min.css'
import {baseUrl} from '@/assets/plugins/env.js'
export default {
  data () {
    return {
    	imgArr:''
    }
  },
  created() {
  	this._initDate()
  },
  mounted() {
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
  	_initDate() {
  		this.$http.post(baseUrl+'/bookLendingManagement/pictureUpload/findFile.shtml',this.transformRequest(),{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            }).then((response) => {
				if(response.data.msgcode == 'success'){
					this.imgArr = response.data.resultMap;
					this.$nextTick(function () {
						new Swiper('.banner .swiper-container', {
					        autoplay: 5000,//可选选项，自动滑动
					        pagination: '.banner .swiper-pagination',
					        slidesPerView: 1,
					        paginationClickable: true,
					        spaceBetween: 30,
					        loop: true
					    });
					})
				}else {
					this.imgArr = null
				}
			}).catch(function(err){
			  console.log(err);
			});
  	}
  }
}
</script>
<style scoped>
	.swiper-container {
        width: 100%;
        height: 7rem;
        margin-left: auto;
        margin-right: auto;
    }
    .swiper-slide {
        text-align: center;
        font-size: 18px;
        background: #ddd;
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
    }
    .swiper-slide img{
    	width:100%;
    	height:100%;
    }
</style>