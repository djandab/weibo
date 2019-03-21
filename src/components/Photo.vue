<template>
	<div ref='zhes' @touchstart.capture="star" @touchmove.capture="move"  @touchend.capture="end" class="zhe" v-show="zhes"  @click="xiao">
			<swiper  v-if='zhepic.length!=0' :options="swiperOption" class="img-bigbox" ref="mySwiper">
				<swiper-slide class="img-box" v-for="(item,index) in zhepic" :key="index">
					<img v-if="item.large" :src="item.large.url">
					<img v-else :src="item">
				</swiper-slide>
			</swiper>
	</div>
</template>

<script>
	var y, Y;
	var body = document.getElementsByTagName('body')
	export default{
		name:'Photo',
		props:['zhes','zhepic'],
		data(){
			return{
				swiperOption: {
					effect: 'fade',
					slidesPerView: 3,
					centeredSlides: true,
					slideActiveClass: 'swper-img',
					spaceBetween: 60,
					slideToClickedSlide: true,
				},
			}
		},
		methods:{
			star() {
				y = event.changedTouches[0].pageY;
			},
			move() {
				Y = event.changedTouches[0].pageY
				let top = Y - y
				if(Y - y >= 10) {
					this.$refs.zhes.style.top = top + 'px'
				}
			},
			end() {
				if(Y - y >= 100) {
					this.$emit('ends',false)
					this.$refs.zhes.style.top = -50 + 'px'
					body[0].style.overflow = ''
				} else {
					this.$refs.zhes.style.transaction = 'all .5s'
					this.$refs.zhes.style.top = -50 + 'px'
				}
			},
			xiao() {
				this.$emit('xiaos',false)
//				this.zhes = false
				body[0].style.overflow = ''
			},
		}
	}
</script>

<style>
	.img-bigbox>div{
		overflow-y: scroll;
	}

</style>