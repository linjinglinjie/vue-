<template>
	<div>
		<input :id="checkid" :value="checkid" type="checkbox" v-model='checkedNames' @click="checkItem"> 
        <label class="check" :for="checkid">
            <i class="icon iconfont">&#xe677;</i>
        </label>
	</div>
</template>
<script>
export default {
	data() {
		return {
		}
	},
	props:['checkid'],
	created() {
		
	},
	mounted() {
		
	},
	methods: {
		checkItem() {
			//console.log(this.checkedNames)
		}
	}
}
</script>
<style scoped>
.checks input {
    display: none;
}
.checks label {
	display: block;
    position: relative;
    width: .85rem;
    height: .85rem;
    margin: .3rem;
    background: #fff;
    border:1px solid #ddd;
    transition: all 0.3s ease-in-out;
    font-size: 1rem;
    color: #FFF;
    -webkit-font-smoothing: antialiased;
}
.checks label.check {
    border-radius: 5px;
}
.checks label .icon {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    font-size: .6rem;
    -webkit-transform: scale(0);
    transition: all 0.3s ease-in-out;
    line-height: .85rem;
    text-align: center;
}
.checks input:checked + label {
    background: #26A2FF;
    border:1px solid #26A2FF;
}
.checks input:checked + label .icon {
    opacity: 1;
    -webkit-transform: scale(1);
    color:#fff;
}
</style>