<template>
	<div>
		

	</div>
</template>

<script>
	import Photo from '../components/Photo.vue'
	var y, Y;
	var body = document.getElementsByTagName('body')
	export default {
		name: 'Zonghetwo',
		props: ['zonghearr'],
		data() {
			return {
//				zhes: false,
//				zhepic: []
			}
		},
		components: {
			Photo
		},
		methods: {
//			details(pit) {
//				sessionStorage.removeItem('key')
//				var str = JSON.stringify(pit)
//				sessionStorage.setItem('key', str)
//				this.$router.push({
//					name: 'details',
//					query: {
//						pit
//					}
//				})
//			},
//			geren(id) {
//				this.$router.push({
//					name: 'geren',
//					query: {
//						id
//					}
//				})
//			},
//			zhuang(l) {
//				if(l >= 10000) {
//					var a = (l / 10000).toString()
//					a = a.substring(0, a.length - 3)
//					return a + '万'
//				} else {
//					return l
//				}
//			},
//			sub(l) {
//				return l.substring(l.length - 3)
//			},
//			ends(va) {
//				this.zhes = va
//			},
//			xiaos(va) {
//				this.zhes = va
//			},
//			zhe(zhe) {
//				this.zhepic = []
//				body[0].style.overflow = 'hidden'
//				this.zhes = true
//				if(zhe.constructor == Array) {
//					this.zhepic = zhe
//				} else {
//					this.zhepic.push(zhe)
//				}
			},
		
	}
</script>

<style>
	.retweeted {
		margin-top: 10px;
		padding-top: 10px;
		background: #f7f7f7;
		padding-bottom: 10px;
	}
	
	.zonghearr-title {
		background: #ebebec;
		text-align: left;
		font-size: .25rem;
		padding-left: 10px;
		padding-top: 5px;
	}
	
	.zonghepan-top {
		display: flex;
	}
	
	.zonghepan-top>img {
		width: .6rem;
		height: .6rem;
		border-radius: 50%;
		margin-top: 20px;
		margin-right: 10px;
		margin-left: 10px;
	}
	
	.form {
		font-size: .2rem;
		color: #CCCCCC;
	}
	
	.to {
		background: #ebebec;
		height: 10px;
	}
	
	.zonghepan-top>div>.name {
		text-align: left;
		margin-top: 22px;
		color: #FF8200;
	}
	
	.zonghepan-top>div>p {
		margin-top: 5px;
	}
	
	.zonghepan-but {
		display: flex;
		justify-content: space-around;
		margin-top: 20px;
		border-top: .3px solid #CCCCCC;
		padding-top: 10px;
		padding-bottom: 10px;
		border-bottom: .3px solid #CCCCCC;
	}
	
	.fivetitle {
		font-size: .25rem;
		padding-top: 10px;
		padding-bottom: 10px;
		text-align: left;
		padding-left: 10px;
		border-bottom: .5px solid #CCCCCC;
	}
	
	.more {
		padding-top: 10px;
		padding-bottom: 10px;
		font-size: .25rem;
		border-bottom: 10px solid #EBEBEC;
	}
	
	.vide-title {
		font-size: .25rem;
		height: 30px;
		line-height: 30px;
		text-align: left;
		border-left: 3px solid #FF8200;
		padding-left: 5px;
		border-top: .5px solid #CCCCCC;
		border-bottom: .5px solid #CCCCCC;
	}
	
	.vide {
		display: flex;
		justify-content: space-around;
	}
	
	.vide-box {
		width: 50%;
	}
	
	.vide-box>img {
		margin-top: 10px;
		width: 90%;
	}
	
	.vide-titles {
		font-size: .28rem;
		line-height: 25px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
	
	.vide-but {
		font-size: .22rem;
		color: #939393;
		text-align: left;
		padding-bottom: 10px;
	}
	
	.videos {
		border-bottom: 1px solid #CCCCCC;
	}
	
	.word-title {
		font-size: .25rem;
		height: 30px;
		line-height: 30px;
		text-align: left;
		border-left: 3px solid #FF8200;
		padding-left: 5px;
		border-top: .5px solid #CCCCCC;
		border-bottom: .5px solid #CCCCCC;
	}
	
	.word-titles {
		margin-top: 10px;
		padding-bottom: 10px;
		font-size: .26rem;
		text-align: left;
		padding-left: 5px;
		padding-right: 5px;
	}
	
	.word-cont {
		padding-top: 10px;
		padding-bottom: 10px;
		border-bottom: .3px solid #E6E6E6;
		display: flex;
		align-items: center;
	}
	
	.word-top {
		border-bottom: .3px solid #EBEBEC;
	}
	
	.word-top>img {
		width: 90%;
	}
	
	.word-cont-img {
		width: 30%;
	}
	
	.word-cont-img>img {
		width: 1.5rem;
		height: 1.5rem;
	}
	
	.word-titsub {
		font-size: .28rem;
		padding-bottom: 5px;
	}
	
	.word-desc {
		font-size: .22rem;
		color: #CCCCCC;
	}
	
	.word-cont-sub {
		width: 65%;
		text-align: left;
	}
	
	.weibo-title {
		background: #ebebec;
		text-align: left;
		font-size: .25rem;
		padding-left: 10px;
		padding-top: 5px;
	}
</style>