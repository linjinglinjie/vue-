<template>
	<div>
		<section class="menuTop" ref="wrapperMenu">
			<ul>
				<!--<li @click="chooseMenu(0)" :class="{'active':index === 0 }">正文</li>-->
				<li @click="chooseMenu(1)" :class="{'active':index === 1 }">作者</li>
				<!--<li @click="chooseMenu(2)" :class="{'active':index === 2 }">推荐</li>-->
			</ul>
		</section>
	</div>
</template>
<script>
export default {
	data () {
		return {
			index:0,
			IndexChange:''
		}
	},
	mouted() {
		
	},
	props: ["showIndex"],
	watch: {
		showIndex(curVal,oldVal) {
			this.index = curVal
		}
	},
	methods: {
		//点击列表标题，相应列表移动到最顶层
        chooseMenu(index){
        	this.index = index;
            this.$emit('indexScroll',index);
        }
	}
}
</script>
<style scoped>
	.menuTop {
		border-bottom:1px solid #ddd;
		background:#fff;
		text-align: center;
		height:2rem;
		line-height:2rem;
	}
	.menuTop ul {
		text-align: center;
	}
	.menuTop li {
		display: inline-block;
		padding:0 .8rem;
		font-size: .7rem;
	}
	.menuTop li.active {
		color:#f90;
	}
</style>