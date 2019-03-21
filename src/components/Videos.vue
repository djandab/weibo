<template>
	<div class="vidzhe" ref="zhes" @touchstart="star" @touchmove="move" @touchend="end">
		<video ref='vi' style="width: 100%;height: 100%;" :src="vid" controls autoplay></video>
	</div>
</template>

<script>
	var y, Y;
	var body = document.getElementsByTagName('body')
	export default {
		name: 'Videos',
		props: ['a','vid'],
		methods: {
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
					this.$refs.vi.pause()
					this.$emit('ends', false)
					this.$refs.zhes.style.top = 0 + 'px'
					body[0].style.overflow = ''
				} else {
					this.$refs.zhes.style.top = 0 + 'px'
				}
			},
		}
	}
</script>

<style>
	.vidzhe {
		width: 100%;
		height: 100%;
		background: black;
		position: fixed;
		z-index: 7;
	}
</style>