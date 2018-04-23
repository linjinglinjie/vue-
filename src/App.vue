<template>
  <div id="app">
  <!--	<vhead></vhead>-->
    <transition name="router-fade" mode="out-in">
			<keep-alive>
			    <router-view v-if="$route.meta.keepAlive"></router-view>
			</keep-alive>
    </transition>
    <transition name="router-fade" mode="out-in">
			<router-view v-if="!$route.meta.keepAlive"></router-view>
		</transition>
	 <!-- <vfoot></vfoot>-->
  </div>
</template>

<script>
import vhead from './components/header/head'
import vfoot from './components/footer/foot'

export default {
  name: 'app',
  components: {
  	vhead,
  	vfoot
  }
}
</script>
<style lang="scss">
  @import './assets/style/common';
	.router-fade-enter-active, .router-fade-leave-active {
	  	transition: opacity .2s;
	}
	.router-fade-enter, .router-fade-leave-active {
	  	opacity: 0;
	}
</style>
<style>
	.mint-loadmore{
		overflow: initial !important;
	}
</style>