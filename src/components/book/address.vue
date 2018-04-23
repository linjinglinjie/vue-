<template>
	<div class="address">
		<section class="headTitle">
			<vHead :title="title" @hidesetpage="hidesetpage"></vHead>
		</section>
		<section class="content">
			<mt-radio
			  v-model="value"
			  :options="options">
			</mt-radio>
		</section>
	</div>
</template>
<script>
import Vue from 'vue'
import vHead from '@/components/common/head'
export default {
	data() {
		return {
			title:'地址选择',
			value:'',
			// radio的选项  
            options : []  
		}
	},
	components: {
		vHead
	},
	props:['library'],
	created() {
		//this.data();
	},
	mounted() {
		this.data();
		//console.log(this.library[0].split(':')[0])
	},
	watch: {
		value() {
			this.check()
		}
	},
	methods: {
		data() {
    		Object.keys(this.library).forEach(key => this.options.push({value: key, label: this.library[key]}));
		},
		//选择图书馆传给父组件
	    check(){  
            this.$emit('checkVal',this.value);
        },
        //返回
        hidesetpage() {
        	this.$emit('hidesetpage');
        }
	}
}
</script>
<style scoped>
.address {
	position: fixed;
	top:0;
	bottom:0;
	left:0;
	right:0;
	z-index: 1000;
	background:#fff;
}
.headTitle {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
}
.content {
	margin-top:2rem;
}
</style>
<!--<style>
.mint-cell{
	min-height: 1.8rem;
}
.mint-cell-wrapper {
	font-size: .55rem;
	padding:0;
	background-image: none;
}
.mint-cell:last-child{
	background-image: none;
}
</style>-->