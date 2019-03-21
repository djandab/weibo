<template>
	<div>
		<router-view></router-view>
		<Photo :zhepic='zhepic' :zhes="zhes" @ends="ends" @xiaos="xiaos"></Photo>
		<div class="nav-box">
			<div ref="nav" class="nav">
				<span ref="navlist" @click="click(index)" :class="{active: active == index}" class="nav-list" v-for="(item,index) in nav" :key="index">
				{{item.name}}
			</span>
			</div>
			<div @click="navBox" class="jiantou iconfont icon-iconfontjiantou">
			</div>

		</div>
		<div ref="navbox" class="nav-list-box">
			<div @click="clicks(i)" :class="{act: active == i}" class="navbox-list" v-for="(it,i) in nav" :key='i'>
				{{it.name}}
			</div>
		</div>
		<div class="pannelwrap">
			<div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">

				<div v-if="pit.mblog" class="pan" v-for="(pit,i) in arr" :key='i'>
					<div class="pan-header">
						<div @click="geren(pit.mblog.user.id)" class="pan-left">
							<img :src="pit.mblog.user.avatar_hd" />
							<div class="name-box">
								<span class="name">{{pit.mblog.user.screen_name}}</span>
								<p>{{pit.mblog.created_at}}<span v-if="pit.mblog.source!=''" style="padding-left: .1rem;">来自:{{pit.mblog.source}}</span></p>
							</div>

						</div>
						<div class="pan-right">
							<button>+ 关注</button>
						</div>

					</div>
					<div @click="details(pit.mblog)">
					<div class="text" v-html='pit.mblog.text'></div>
					<div v-if='pit.mblog.pics' class="pic-box">
						<div v-for="(pic,ins) in pit.mblog.pics" class="pic">
							<div @click.stop="zhe(pit.mblog.pics)"><img :src="pic.url">
								<div class="dontu" v-if="sub(pic.url) == 'gif'">动图</div>
							</div>

						</div>
					</div>
					</div>
					<div v-if="pit.mblog.page_info && !pit.mblog.pics" class="page">
						<a :href="pit.mblog.page_info.page_url">
							<img :src="pit.mblog.page_info.page_pic.url">
						</a>
					</div>
					<div class="but">
						<div class="zhuang"><span class="iconfont icon-zhuanfa"></span>{{zhuang(pit.mblog.reposts_count)}}</div>
						<div @click="details(pit.mblog)" class="ping"><span class="iconfont icon-pinglun"></span>{{zhuang(pit.mblog.comments_count)}}</div>
						<div class="dian"><span class="iconfont icon-dianzan"></span>{{zhuang(pit.mblog.attitudes_count)}}</div>
					</div>
				</div>

				<div v-if='pit.user' class="pan" v-for="(pit,i) in arr" :key='i'>
					<div class="pan-header">
						<div @click="geren(pit.user.id)" class="pan-left">
							<img :src="pit.user.avatar_hd" />

							<div class="name-box">
								<span class="name">{{pit.user.screen_name}}</span>

					

								<p>{{pit.created_at}}<span v-if="pit.source!=''" style="padding-left: .1rem;">来自:{{pit.source}}</span></p>
							</div>

						</div>
						<div class="pan-right">
							<button>+ 关注</button>
						</div>

					</div>
					<div @click="details(pit)">
					<div class="text" v-html='pit.text'>
					</div>
					<div v-if='pit.pics' class="pic-box">
						<div v-for="(pic,ins) in pit.pics" class="pic">
							<div @click.stop="zhe(pit.pics)"><img :src="pic.url">
								<div class="dontu" v-if="sub(pic.url) == 'gif'">动图</div>
							</div>

						</div>
					</div>
					</div>
					<div v-if="pit.page_info && !pit.pics" class="page">
						<a :href="pit.page_info.page_url">
							<img :src="pit.page_info.page_pic.url">
						</a>
					</div>
					<div class="but">
						<div class="zhuang"><span class="iconfont icon-zhuanfa"></span>{{zhuang(pit.reposts_count)}}</div>
						<div @click="details(pit)" class="ping"><span class="iconfont icon-pinglun"></span>{{zhuang(pit.comments_count)}}</div>
						<div class="dian"><span class="iconfont icon-dianzan"></span>{{zhuang(pit.attitudes_count)}}</div>
					</div>
				</div>

			</div>
		</div>
	</div>

</template>

<script>
	import Photo from '../components/Photo.vue'
	var y, Y;
	var body = document.getElementsByTagName('body')
	export default {
		name: 'Navigation',
		props: ['nav'],
		data() {
			return {
				since: 0,
				pages: 1,
				active: 0,
				show: false,
				arr: [],
				zhes: false,
				zhepic: []
			}
		},
		components:{
			Photo
		},
		//https://m.weibo.cn/api/container/getIndex?containerid=102803&openApp=0&page=2
		//https://m.weibo.cn/api/container/getIndex?containerid=102803_ctg1_4388_-_ctg1_4388&openApp=0&since_id=1
		methods: {
			geren(id){
				this.$router.push({name:'geren',query:{id}})
			},
			details(pit){
				sessionStorage.removeItem('key')
				var str = JSON.stringify(pit)
				sessionStorage.setItem('key', str)
				this.$router.push({name:'details',query:{pit}})
			},
			loadMore() {
				this.loading = true;
				if(this.active <= 1) {
					this.pages++
						setTimeout(() => {
							this.$http.get('/api/api/container/getIndex', {
								params: {
									containerid: this.nav[this.active].gid,
									openApp: 0,
									page: this.pages
								}
							}).then(res => {
								for(let i = 0; i < res.data.data.cards.length; i++) {
									this.arr.push(res.data.data.cards[i])
								}
							})
						}, 200);
				} else {
					this.since++;
					setTimeout(() => {

						this.$http.get('/api/api/container/getIndex', {
							params: {
								containerid: this.nav[this.active].gid,
								openApp: 0,
								since_id: this.since
							}
						}).then(res => {
							for(let i = 0; i < res.data.data.cards.length; i++) {
								this.arr.push(res.data.data.cards[i])
							}
						})
					}, 200);
				}

			},
			ends(va){
				this.zhes = va
			},
			xiaos(va){
				this.zhes = va
			},
			zhe(zhe) {
				this.zhepic = [] 
				body[0].style.overflow = 'hidden'
				this.zhes = true
				if(zhe.constructor == Array){
					this.zhepic = zhe
				}else{
					this.zhepic.push(zhe)
				}
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
			sub(l) {
				return l.substring(l.length - 3)
			},
			click(i) {
				this.active = i
				this.show = false
				this.$refs.navbox.style.height = 0 + 'rem'
				if(this.nav[i].gid) {
					console.log(this.nav[i].gid)
					this.$indicator.open({
						text: '加载中...',
						spinnerType: 'fading-circle'
					});
					this.$http.get('api/api/container/getIndex', {
						params: {
							containerid: this.nav[i].gid,
							openApp: 0
						}
					}).then(res => {
						this.arr = res.data.data.cards
						this.arr.splice(0, 1)
						console.log(this.arr)
						this.$indicator.close();
					})
				} else {
					//https://m.weibo.cn/api/lbs/near?
					console.log(this.nav[i].url)
					this.$indicator.open({
						text: '加载中...',
						spinnerType: 'fading-circle'
					});
					this.$http.get('api/api/lbs/near').then(res => {
						console.log(res.data.data.statuses)
						this.arr = res.data.data.statuses
						this.$indicator.close();
					})
				}

			},
			clicks(i) {
				this.show = false
				this.$refs.navbox.style.height = 0 + 'rem'
				this.$refs.nav.scrollTo(this.$refs.navlist[i].offsetLeft - 15, 0)
				this.active = i
				if(this.nav[i].gid) {
					console.log(this.nav[i].gid)
					this.$indicator.open({
						text: '加载中...',
						spinnerType: 'fading-circle'
					});
					this.$http.get('api/api/container/getIndex', {
						params: {
							containerid: this.nav[i].gid,
							openApp: 0
						}
					}).then(res => {
						this.arr = res.data.data.cards
						this.arr.splice(0, 1)
						console.log(this.arr)
						this.$indicator.close();
					})
				} else {
					console.log(this.nav[i].url)
					this.$indicator.open({
						text: '加载中...',
						spinnerType: 'fading-circle'
					});
					this.$http.get('api/api/lbs/near').then(res => {
						console.log(res.data.data.statuses)
						this.arr = res.data.data.statuses
						this.$indicator.close();
					})
					
				}
			},
			navBox() {
				if(this.show == false) {
					this.$refs.navbox.style.height = 3 + 'rem'
					this.show = true
				} else {
					this.$refs.navbox.style.height = 0 + 'rem'
					this.show = false
				}

			}
		},
		//https://m.weibo.cn/api/container/getIndex?containerid=102803_ctg1_4388_-_ctg1_4388&openApp=0&since_id=1
		//https://m.weibo.cn/api/container/getIndex?containerid=102803&openApp=0&page=2
		//https://m.weibo.cn/api/container/getIndex?containerid=102803&openApp=0
		mounted() {
			this.$indicator.open({
				text: '加载中...',
				spinnerType: 'fading-circle'
			});
			this.$http.get('api/api/container/getIndex', {
				params: {
					containerid: '102803',
					openApp: 0
				}
			}).then(res => {
				console.log(res.data.data.cards)
				this.arr = res.data.data.cards
				this.arr.splice(0, 1)
				this.$indicator.close();
			})
		}
	}
</script>

<style>
	.img-bigbox {
		height: 100%;
		width: 100%;
	}
	
	.swper-img {
		width: 100%;
		height: 100%;
		background: black;
	}
	
	.img-box {
		display: flex;
		align-items: center;
		height: 100%;
		width: 100%;
	}
	
	.img-box>img {
		width: 100%;
		opacity: 1;
		/*width: 100%;
		height: 200px;*/
	}
	
	.zhe {
		width: 100%;
		height: 115%;
		position: fixed;
		top: -50px;
		background: black;
		overflow: hidden;
		z-index: 7;
		/*transition: all .5s;*/
	}
	
	.nav-box {
		top: 49px;
   		position: sticky;
		background: #FAFAFA;
		display: flex;
		z-index: 6;
		border-bottom: 1px solid #CCCCCC;
	}
	
	.nav {
		height: 40px;
		overflow-x: scroll;
		overflow-y: hidden;
		white-space: nowrap;
		line-height: 6px;
		width: 90%;
	}
	
	.nav::-webkit-scrollbar {
		display: none;
	}
	
	.nav-list {
		font-size: .28rem;
		margin-left: 10px;
		margin-right: 10px;
		display: inline-block;
		color: #cccccc;
		height: 25px;
	}
	
	.active {
		color: black;
		border-bottom: 2px solid black;
	}
	
	.jiantou {
		width: 10%;
		line-height: 35px;
		text-align: center;
	}
	
	.nav-list-box {
		z-index: 6;
		top: 89px;
   		position: sticky;
		/*padding-left: .2rem;*/
		height: 0rem;
		background: #FAFAFA;
		transition: all .5s;
		overflow: hidden;
		display: flex;
		width: 100%;
		flex-wrap: wrap;
		align-self: flex-end;
		/*	justify-content:space-around;*/
	}
	
	.navbox-list {
		background: #eee;
		height: .6rem;
		margin-top: 10px;
		width: 1.3rem;
		margin-left: .25rem;
		font-size: .25rem;
		line-height: .6rem;
		border-radius: 5px;
	}
	
	.act {
		color: #ff8200;
	}
	
	.pan {
		border-bottom: .5px solid #e6e6e6;
		background: white;
	}
	
	.pan-header {
		width: 100%;
		display: flex;
		justify-content: space-around;
	}
	
	.pan-left {
		width: 75%;
		padding-left: 20px;
	}
	
	.pan-right {
		width: 25%;
	}
	
	.pan-right>button {
		border-radius: 2px;
		background: white;
		color: #87909a;
		width: 1.2rem;
		padding-right: 10px;
		border: 1px solid #87909a;
	}
	
	.pan-left>img {
		width: .6rem;
		height: .6rem;
		border-radius: 50%;
		float: left;
		margin-top: 20px;
		margin-right: 10px;
	}
	
	.name {
		font-size: .25rem;
		margin-right: 5px;
	}
	
	.name-box {
		transform: translateY(-.22rem);
		height: 1rem;
		text-align: left;
		float: left;
	}
	
	.name-box>p {
		color: #CCCCCC;
		font-size: .2rem;
	}
	
	.n6a {
		display: inline-block;
		height: .5rem;
		width: .5rem;
		background: url(../../public/img/sprite.svg)no-repeat -.12rem -8.1rem;
		transform: scale(1.4);
	}
	
	.n5a {
		display: inline-block;
		height: .5rem;
		width: .5rem;
		background: url(../../public/img/sprite.svg)no-repeat -.12rem -7.6rem;
		transform: scale(1.4);
	}
	
	.n7a {
		display: inline-block;
		height: .5rem;
		width: .5rem;
		background: url(../../public/img/sprite.svg)no-repeat -.12rem -9.1rem;
		transform: scale(1.4);
	}
	
	a {
		text-decoration: none;
		color: #3c6e9e;
	}
	
	.text {
		overflow: hidden;
		margin-top: 10px;
		margin-left: 5%;
		width: 90%;
		line-height: .35rem;
		font-size: .27rem;
		text-align: left;
	}
	
	.url-icon>img {
		width: .3rem !important;
		height: .3rem !important;
	}
	
	.pic-box {
		margin-top: 5px;
		padding-left: 20px;
		display: flex;
		flex-wrap: wrap;
	}
	
	.pic {
		margin-top: 5px;
		margin-left: 5px;
		width: 1.8rem;
		height: 1.8rem;
		overflow: hidden;
	}
	
	.pic>div {
		position: relative;
		display: inline-block;
		width: 100%;
		padding-bottom: 100%;
		height: 0;
	}
	
	.pic>div>img {
		background-size: cover;
		background-repeat: no-repeat;
		background-position: 50%;
		position: absolute;
		width: 100%;
		height: 100%;
		vertical-align: top;
		object-fit: cover;
		left: 0;
	}
	
	.dontu {
		position: absolute;
		background: rgba(80, 125, 175, .75);
		color: white;
		font-size: .2rem;
		width: .5rem;
		height: .2rem;
		right: 0;
		bottom: 0;
	}
	
	.page {
		margin-top: 10px;
		width: 90%;
		margin-left: 5%;
	}
	
	.page>a {
		display: inline-block;
		width: 100%;
		height: 1.5rem;
		background: #FAFAFA;
		border: 1px solid #e6e6e6;
		position: relative;
	}
	
	.page>a>img {
		position: absolute;
		width: 1.8rem;
		height: 1.5rem;
		left: 0;
	}
	
	.but {
		width: 90%;
		display: flex;
		justify-content: flex-start;
		margin-left: 5%;
		font-size: .25rem;
		margin-top: 20px;
		padding-bottom: 25px;
	}
	
	.but>div {
		margin-left: 10px;
		margin-right: 10px;
	}
</style>