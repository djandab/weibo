<template>
	<div>
		<Photo :zhepic='zhepic' :zhes="zhes" @ends="ends" @xiaos="xiaos"></Photo>
		<div class="geren-header">
			<span @click="returns"><</span>
		</div>
		<div class="geren-top">
			<div class="geren-top-one">
				<div class="geren-topleft">
					<img :src="pit.profile_image_url" />
				</div>
				<div class="geren-topright">
					<p class="geren-name">
						{{pit.screen_name}}
						<span v-if="pit.gender == 'f'" class="iconfont icon-nv"></span>
						<span v-if="pit.gender == 'm'" class="iconfont icon-nan"></span>
					</p>
					<p>微博认证: {{pit.verified_reason}}</p>
				</div>
			</div>
			<div class="geren-top-two">
				<div>{{pit.follow_count}}
					<p>关注</p>
				</div>
				<div>{{zhuang(pit.followers_count)}}
					<p>粉丝</p>
				</div>
				<div class="guan"><button>+ 关注</button></div>
				<div class="xin"><button><span class="iconfont icon-xin"></span></button></div>
			</div>
		</div>
		<div class="geren-cont" v-for="(it,i) in pitcont">
			<div class="title" v-if='it.title'>{{it.title.text}}</div>
			<div class="pan-header">
				<div class="pan-left ac">
					<img :src="it.user.profile_image_url" />
					<div class="name-box">
						<span class="name">{{it.user.screen_name}}</span>
						<p>{{time(it.created_at)}}<span v-if="it.source!=''" style="padding-left: .1rem;">来自:{{it.source}}</span></p>
					</div>

				</div>

			</div>
			<div  @click="details(it)">
			<div class="text" v-html='it.text'></div>
			<div v-if='it.pics' class="pic-box">
				<div v-for="(pic,ins) in it.pics" class="pic">
					<div @click.stop="zhe(it.pics)"><img :src="pic.url">
						<div class="dontu" v-if="sub(pic.url) == 'gif'">动图</div>
					</div>

				</div>
			</div>
			</div>
			<div v-if="it.page_info && !it.pics" class="page">
				<a :href="it.page_info.page_url">
					<img :src="it.page_info.page_pic.url">
				</a>
			</div>
			<div class="but">
				<div class="zhuang"><span class="iconfont icon-zhuanfa"></span>{{zhuang(it.reposts_count)}}</div>
				<div @click="details(it)" class="ping"><span class="iconfont icon-pinglun"></span>{{zhuang(it.comments_count)}}</div>
				<div class="dian"><span class="iconfont icon-dianzan"></span>{{zhuang(it.attitudes_count)}}</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Photo from '../components/Photo.vue'
	var y, Y;
	var body = document.getElementsByTagName('body')
	export default {
		name: 'Geren',
		data() {
			return {
				pit: [],
				pitcont: [],
				zhes: false,
				zhepic: []
			}
		},
		methods: {
			details(pit) {
				sessionStorage.removeItem('key')
				var str = JSON.stringify(pit)
				sessionStorage.setItem('key', str)
				this.$router.push({
					name: 'details',
					query: {
						pit
					}
				})
			},
			returns() {
				this.$router.go(-1)
			},
			zhuang(l) {
				if(l >= 10000) {
					var a = (l / 10000).toString()
					a = a.substring(0, a.length - 3)
					return a + '万'
				} else {
					return l
				}
			},
			time(l) {
				var a = new Date(l).getTime()
				var moun = new Date(l).getMonth()+1
				var yea = new Date(l).getFullYear()
				var da = new Date(l).getDate()
				var b = new Date().getTime()
				if(b - a >= 86400000 & b-a <= 86400000*2) {
					return '昨天' + new Date(l).getHours() + ':' + new Date(l).getMinutes()
				} else if(b - a < 86400000) {
					let c = b - a
					return parseInt(c / 3600000) + '小时前'
				} else {
					return yea+'年'+moun+'月'+da+'日'
				}
			},
			sub(l) {
				return l.substring(l.length - 3)
			},
			ends(va) {
				this.zhes = va
			},
			xiaos(va) {
				this.zhes = va
			},
			zhe(zhe) {
				this.zhepic = []
				body[0].style.overflow = 'hidden'
				this.zhes = true
				if(zhe.constructor == Array) {
					this.zhepic = zhe
				} else {
					this.zhepic.push(zhe)
				}
			},
		},
		mounted() {
			this.$http.get('api/profile/info', {
				params: {
					uid: this.$route.query.id
				}
			}).then(res => {
				console.log(res.data.data)
				this.pitcont = res.data.data.statuses
				this.pit = res.data.data.user
			})
		},
		components: {
			Photo
		},
	}
</script>

<style>
	.geren-header {
		padding-left: 20px;
		height: 40px;
		font-size: .4rem;
		line-height: 40px;
		text-align: left;
	}
	
	.geren-top-one {
		display: flex;
	}
	
	.geren-topleft>img {
		margin-top: 20px;
		margin-left: 20px;
		margin-right: 15px;
		width: 1.3rem;
		height: 1.3rem;
		border-radius: 50%;
	}
	
	.geren-topright {
		text-align: left;
		width: 80%;
		font-size: .23rem;
		color: #999;
	}
	
	.geren-name {
		color: black;
		margin-top: 30px;
		margin-bottom: 20px;
		font-size: .4rem;
	}
	
	.geren-top-two {
		padding-bottom: 20px;
		margin-top: 10px;
		display: flex;
		font-size: .25rem;
		justify-content: space-around;
		border-bottom: .5px solid #CCCCCC;
	}
	
	.guan>button {
		width: 2.5rem;
		height: 30px;
		background: #5290CC;
		color: white;
		border: none;
		border-radius: 3px;
	}
	
	.xin>button {
		width: .8rem;
		height: 30px;
		background: white;
		border: 1px solid #999;
	}
	
	.title {
		text-align: left;
		font-size: .23rem;
		padding-top: 20px;
		padding-left: 20px;
	}
	
	.ac {
		width: 100%;
		padding-left: 20px;
	}
	
	.geren-cont {
		border-bottom: .5px solid #CCCCCC;
	}
</style>