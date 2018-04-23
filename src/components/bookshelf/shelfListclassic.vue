<template>
	<li class="shelfList">
		<slot name="checks" class="checks"></slot>
		<section class="book" @click="openDes(item.isbn)">
			<section>
				<img v-if="item.bookImg && item.bookImg != ''" :src="item.bookImg" />
				<img v-if="item.bookImg && item.bookImg == '' || item.bookImg == null" src="../../assets/img/moren.jpg"/>
				<img v-if="!item.bookImg" src="../../assets/img/moren.jpg" />
			</section>
			<section class="des">
				<p class="shelfName">{{item.bookName}}</p>
				<p class="Author">创建日期：<span>{{item.createTime}}</span></p>
				<p class="borwdres">借阅处：<span>{{item.borrow_department_name}}</span></p>
				<slot name="status"></slot>
				<slot name="hotsearch"></slot>
			</section>
		</section>
	</li>
</template>
<script>
import checks from '@/components/common/checkbox'
export default {
	data() {
		return {
			/*checkboxData:1,
			checked:false*/
		}
	},
	components: {
		checks
	},
	props: ['item'],
	/*watch: {//深度 watcher
	  'checkboxModel': {
	    handler: function (val, oldVal) { 
	      if (this.checkboxModel.length === this.checkboxData) {
	        this.checked=true;
	      }else{
	        this.checked=false;
	      }
	    },
	    deep: true
	  }
	},*/
	methods: {
		/*checkedAll() {
		    if (this.checked) {//实现反选
		      	this.checkboxModel = [];
		      	this.checkboxData.forEach(function(item) {
		      		this.checkboxModel.push(item.id);
		      	});
		      	}
		      	else {//实现全选
		        this.checkboxModel = [];
		    }
		  },*/
		openDes(id) {
			this.$emit('openDes',id);
		}
	}
}
</script>
<style scoped>
.shelfList {
	width:100%;
	display: flex;
	justify-content: space-around;
	align-items: center;
	padding:.5rem 0;
	border-bottom:1px solid #ddd;
}
.shelfList:last-child {
	border-bottom:none;
}
.shelfList .checks
 {
	width:2rem;
}
.shelfList .book {
	flex:auto;
	display: flex;
}
.shelfList section img {
	width:3.8rem;
	height:4.8rem;
	display: block;
	margin-right: 0.5rem;
}
.shelfList .des {
	flex: auto;
}
.shelfList p {
	margin-top: .3rem;
	font-size: .6rem;
	color:#9C9C9C;
}
.shelfList p.shelfName {
	margin:0 0 .3rem 0;
	font-size: .7rem;
	color:#373737;
	overflow:hidden; 
	text-overflow:ellipsis;
	display:-webkit-box; 
	-webkit-box-orient:vertical;
	-webkit-line-clamp:2; 
}
.shelfList p.Author span {
	color:#f90;
}
.shelfList p.borwdres span {
	color:#6AA7D3;
}


</style>