 <template>
	<div class="star-cont">
        <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
    </div>
</template>

<script>
	const LENGTH = 5;
	const CLS_ON = 'on';
	const CLS_HALF = 'half';
	const CLS_OFF = 'off';
	
    export default {
    	data(){
            return{
               
            }
        },
        props:['rating'],
        computed: {
        	itemClasses() {
        		let result = [];
        		let score = Math.round(this.rating) / 2;
        		let hasDecimal = score % 1 !== 0;
        		let integer = Math.floor(score);
        		for(let i = 0; i < integer; i++) {
        			result.push(CLS_ON);
        		}
        		if(hasDecimal) {
        			result.push(CLS_HALF);
        		}
        		while(result.length < LENGTH) {
        			result.push(CLS_OFF)
        		}
        		return result
        	}
        }
    }
</script>

<style scoped>
.star-cont .star-item {
	display: inline-block;
	width:.8rem;
	height:.8rem;
	background-size: 100% 100%;
}
.star-cont .on {
  background-image: url('../../assets/img/star.png');	
}
.star-cont .half {
  background-image: url('../../assets/img/starhalf.png');
}
.star-cont .off {
  background-image: url('../../assets/img/staroff.png');
}
</style>
