<template>
	<nav class="nav">
		<input type="checkbox" class="nav__cb" id="menu-cb" v-model="checked">
		<div class="nav__content">
			<ul class="nav__items">
				<li class="nav__item" @click="toIndex"><span class="nav__item-text"> 首页 </span> </li>
				<li class="nav__item" @click="toClass"><span class="nav__item-text"> 分类 </span> </li>
				<li class="nav__item" @click="toMy"><span class="nav__item-text"> 我的 </span> </li>
				<li class="nav__item" @click="toborrow"><span class="nav__item-text"> 借阅记录 </span> </li>
			</ul>
		</div>
		<label class="nav__btn" for="menu-cb">
			<i v-if="this.checked" class="icon iconfont">&#xe656;</i>
			<i v-if="!this.checked" class="icon iconfont">&#xe617;</i>
			{{this.navtitle}}
		</label>
	</nav>
</template>
<script>
export default {
	data() {
		return {
			checked:false,
			navtitle:'快速导航'
		}
	},
	watch: {
		checked(val, oldval) {
			if(val == true) {
				this.navtitle = '收起导航'
			}else {
				this.navtitle = '快速导航'
			}
		}
	},
	methods: {
		toIndex() {
			this.$router.push('/home');
		},
		toClass() {
			this.$router.push('/classify');
		},
		toMy() {
			this.$router.push('/my');
		},
		toborrow() {
			this.$router.push('/my');
		}
	}
}
</script>
<style scoped>
.nav {
  overflow: hidden;
  position: absolute;
  z-index: 99999;
  right: 0;
  top: 50%;
  width: auto;
  height: 2rem;
  margin-top: -1rem;
  border-radius: 5px 0 0 5px;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.2);
}
.nav__cb {
  z-index: -1000;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  pointer-events: none;
}
.nav__content {
  position: relative;
  width: 2.2rem;
  height: 100%;
  -webkit-transition: width 1s cubic-bezier(0.49, -0.3, 0.68, 1.23);
  transition: width 1s cubic-bezier(0.49, -0.3, 0.68, 1.23);
}
.nav__cb:checked ~ .nav__content {
  -webkit-transition: width 1s cubic-bezier(0.48, 0.43, 0.29, 1.3);
  transition: width 1s cubic-bezier(0.48, 0.43, 0.29, 1.3);
  width: 13rem;
}
.nav__items {
  background: #26A2FF;
  position: relative;
  width: auto;
  height: 100%;
  margin-right: 2.2rem;
  list-style-type: none;
  font-size: 0;
}
.nav__item {
  display: inline-block;
  vertical-align: top;
  width: auto;
  padding: 0 .5rem;
  text-align: center;
  color: #fff;
  font-size: .6rem;
  line-height: 2rem;
  font-family: Helvetica, Arial, sans-serif;
  font-weight: bold;
  -webkit-perspective: 1000px;
          perspective: 1000px;
  -webkit-transition: color 0.3s;
  transition: color 0.3s;
  cursor: pointer;
}
.nav__item span {
	color:#fff;
}
.nav__item:hover {
  color: #00bdea;
}
.nav__item-text {
  display: block;
  height: 100%;
  -webkit-transform: rotateY(-70deg);
          transform: rotateY(-70deg);
  opacity: 0;
  -webkit-transition: opacity 0.7s, -webkit-transform 0.7s cubic-bezier(0.48, 0.43, 0.7, 2.5);
  transition: opacity 0.7s, -webkit-transform 0.7s cubic-bezier(0.48, 0.43, 0.7, 2.5);
  transition: transform 0.7s cubic-bezier(0.48, 0.43, 0.7, 2.5), opacity 0.7s;
  transition: transform 0.7s cubic-bezier(0.48, 0.43, 0.7, 2.5), opacity 0.7s, -webkit-transform 0.7s cubic-bezier(0.48, 0.43, 0.7, 2.5);
}
.nav__cb:checked ~ .nav__content .nav__item-text {
  -webkit-transform: rotateY(0);
          transform: rotateY(0);
  opacity: 1;
  -webkit-transition: opacity 0.2s, -webkit-transform 0.7s cubic-bezier(0.48, 0.43, 0.7, 2.5);
  transition: opacity 0.2s, -webkit-transform 0.7s cubic-bezier(0.48, 0.43, 0.7, 2.5);
  transition: transform 0.7s cubic-bezier(0.48, 0.43, 0.7, 2.5), opacity 0.2s;
  transition: transform 0.7s cubic-bezier(0.48, 0.43, 0.7, 2.5), opacity 0.2s, -webkit-transform 0.7s cubic-bezier(0.48, 0.43, 0.7, 2.5);
}
.nav__item:nth-child(1) .nav__item-text {
  -webkit-transition-delay: 0.3s;
          transition-delay: 0.3s;
}
.nav__cb:checked ~ .nav__content .nav__item:nth-child(1) .nav__item-text {
  -webkit-transition-delay: 0s;
          transition-delay: 0s;
}
.nav__item:nth-child(2) .nav__item-text {
  -webkit-transition-delay: 0.2s;
          transition-delay: 0.2s;
}
.nav__cb:checked ~ .nav__content .nav__item:nth-child(2) .nav__item-text {
  -webkit-transition-delay: 0.1s;
          transition-delay: 0.1s;
}
.nav__item:nth-child(3) .nav__item-text {
  -webkit-transition-delay: 0.1s;
          transition-delay: 0.1s;
}
.nav__cb:checked ~ .nav__content .nav__item:nth-child(3) .nav__item-text {
  -webkit-transition-delay: 0.2s;
          transition-delay: 0.2s;
}
.nav__item:nth-child(4) .nav__item-text {
  -webkit-transition-delay: 0s;
          transition-delay: 0s;
}
.nav__cb:checked ~ .nav__content .nav__item:nth-child(4) .nav__item-text {
  -webkit-transition-delay: 0.3s;
          transition-delay: 0.3s;
}
.nav__btn {
  background:rgba(38, 162, 255, .7);
  position: absolute;
  right: 0;
  top: 0;
  width: 1.1rem;
  height: 1.4rem;
  padding:.3rem; 
  padding-left:.8rem;
  font-size: .4rem;
  color:#fff;
  border-radius:0;
}
.nav__btn .icon {
	position: absolute;
	left:0;
	top:.6rem;
	color:#fff;
	font-size: .7rem;
}
</style>