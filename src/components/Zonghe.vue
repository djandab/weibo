<template>
	<div style="background: #E6E6E6;">
		<Videos :vid='vid' v-show="a" :a='a' @ends="ends" @xiaos="xiaos"></Videos>
		<Photo :zhepic='zhepic' :zhes="zhes" @ends="ends" @xiaos="xiaos"></Photo>
		<div v-for="(it,i) in zonghearr" :key="i">
			<div v-if="it.card_type == 11">
				<div v-if="it.title" style="font-size: .25rem; text-align: left; padding-top: 5px; padding-left: 10px;">{{it.title}}</div>
				<div style="background: white;" v-for="(oit,i) in it.card_group" :key="i">

					<div class="userge" v-if="oit.card_type == 10">
						<div class="touxiang">
							<img :src="oit.user.profile_image_url" />
						</div>
						<div @click="gerentwo(oit.user.screen_name,oit.user.id)" class="user-cont">
							<p class="user-name">{{oit.user.screen_name}}</p>
							<p class="user-qian">{{oit.desc1}}</p>
							<p class="user-fen">{{oit.desc2}}</p>
						</div>

						<div class="guanzhu iconfont icon-guanzhu">
							<p>加关注</p>
						</div>
					</div>
					<div class="user" v-if="oit.card_type == 24">
						<span>{{oit.title}}</span>
						<div class="user-box">
							<div v-for="(userit,i) in oit.users" :key="i">
								<img :src="userit.profile_image_url">
							</div>
						</div>
					</div>
					<div style="margin-bottom: 10px;" class="three-but" v-if="oit.card_type == 19">
						<a :href="three.scheme" style="display: inline-block;" v-for="(three,i) in oit.group" :key="i">
							<img :src="three.pic" />
						</a>
					</div>
					<a :href="oit.scheme" v-if="oit.card_type == 4" class="zonghearr-top-cont">
						<img v-if="oit.pic" :src="oit.pic" />
						<span class="desc">{{oit.desc}}</span>
						<span class="desc-extr" v-if="oit.desc_extr">{{oit.desc_extr}}</span>
						<span>></span>
					</a>
					<div v-if="oit.card_type == 8">
						<a :href="oit.scheme" class="chatop">
							<img class="chtou" :src="oit.pic" />
							<div class="chcont-box">
								<p class="chcont">{{oit.title_sub}}</p>
								<p class="chdesc1">{{oit.desc1}}</p>
								<p class="chdesc2">{{oit.desc2}}</p>
							</div>
						</a>
					</div>
					<div  class="pin" v-if="oit.card_type == 16">
						<div v-for="(moit,i) in oit.group" :key="i">
							<img :src="moit.buttons[0].pic" />{{moit.buttons[0].name}}
						</div>
					</div>
					<div  style="margin-top: 10px;" v-if="oit.card_type == 9">
						<div class="zonghearr-title" v-if="oit.mblog.title">{{oit.mblog.title.text}} </div>
						<div class="zonghepan">
							<div @click="geren(oit.mblog.user.id)" class="zonghepan-top">
								<img :src="oit.mblog.user.profile_image_url">
								<div>
									<p class="name">{{oit.mblog.user.screen_name}}</p>
									<p class="form">{{oit.mblog.created_at}} <span>来自: {{oit.mblog.source}}</span></p>
								</div>
							</div>
						</div>

						<div @click="details(oit.mblog)">
							<div class="text" v-html="oit.mblog.text"></div>
							<div v-if='oit.mblog.pics' class="pic-box">
								<div v-for="(pic,ins) in oit.mblog.pics" class="pic">
									<div @click.stop="zhe(oit.mblog.pics)">
										<img :src="pic.url">
										<div class="dontu" v-if="sub(pic.url) == 'gif'">动图</div>
									</div>
								</div>
							</div>
						</div>
						<div v-if="oit.mblog.page_info && !oit.mblog.pics" class="page">
							<a :href="oit.mblog.page_info.page_url">
								<img :src="oit.mblog.page_info.page_pic.url">
							</a>
						</div>

						<div class="retweeted" v-if="oit.mblog.retweeted_status">
							<div class="text" v-html="oit.mblog.retweeted_status.text">
							</div>
							<div v-if='oit.mblog.retweeted_status.pics' class="pic-box">
								<div v-for="(pic,ins) in oit.mblog.retweeted_status.pics" class="pic">
									<div @click.stop="zhe(oit.mblog.retweeted_status.pics)">
										<img :src="pic.url">
										<div class="dontu" v-if="sub(pic.url) == 'gif'">动图</div>
									</div>
								</div>
							</div>
							<div v-if="oit.mblog.retweeted_status.page_info && !oit.mblog.retweeted_status.pics" class="page">
								<a :href="oit.mblog.retweeted_status.page_info.page_url">
									<img :src="oit.mblog.retweeted_status.page_info.page_pic.url">
								</a>
							</div>
						</div>

						<div class="zonghepan-but">
							<div class="iconfont icon-zhuanfa">{{zhuang(oit.mblog.reposts_count)}}</div>
							<div class="iconfont icon-pinglun">{{zhuang(oit.mblog.comments_count)}}</div>
							<div class="iconfont icon-dianzan">{{zhuang(oit.mblog.attitudes_count)}}</div>
						</div>
						
					</div>

					<a :href="oit.scheme" id="zonghe-but" v-if="oit.card_type == 6">
						{{oit.desc}}>
					</a>
					<div style="margin-top: 10px;" v-if="oit.card_type==42">
						<a style="display: block; color: #939393;" :href="oit.scheme" class="vide-title">{{oit.desc}}></a>
					</div>
					<div style="margin-bottom: 10px" class="vide" v-if="oit.card_type==52">
						<a :href="vit.scheme" style="display: block;"  class="vide-box" v-for="(vit,i) in oit.items" :key="i">
							<img :src="vit.pic">
							<p class="vide-titles" v-html="vit.title"></p>
							<p class="vide-but">{{vit.desc1}}</p>
						</a>
						
					</div>
					<a :href="oit.scheme" v-if="oit.card_type == 27">
						<div style="margin-top: 0px; padding-top: 5px;" class="word-top">
							<div class="word-titles" v-html="oit.title_sub"></div>
							<img :src="oit.pic" />
						</div>
					</a>
				</div>
			</div>

		</div>
	</div>
	</div>
</template>

<script>
	import Videos from '../components/Videos.vue'
	import Photo from '../components/Photo.vue'
	var y, Y;
	var body = document.getElementsByTagName('body')
	export default {
		name: 'Zonghe',
		props: ['zonghearr'],
		data() {
			return {
				a: false,
				vid: '',
				zhes: false,
				zhepic: [],
			}
		},
		components: {
			Photo,
			Videos
		},
		methods: {
			geren(id) {
				this.$router.push({
					name: 'geren',
					query: {
						id
					}
				})
			},
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
			sub(l) {
				return l.substring(l.length - 3)
			},
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
			zhuang(l) {
				if(l >= 10000) {
					var a = (l / 10000).toString()
					a = a.substring(0, a.length - 3)
					return a + '万'
				} else {
					return l
				}
			},
			vi(i) {
				this.vid = i
				this.a = true
				body[0].style.overflow = 'hidden'
			},
			gerentwo(name, id) {
				this.$router.push({
					name: 'gerentwo',
					query: {
						name,
						id
					}
				})
			}
		}
	}
</script>

<style>
	.pin {
		display: flex;
		border-bottom: 1px solid #E6E6E6;
		justify-content: space-around;
		height: 40px;
	}
	
	.pin>div {
		font-size: .25rem;
	}
	
	.pin>div>img {
		width: .5rem;
		height: .5rem;
		transform: translateY(.1rem);
	}
	
	.user {
		font-size: .28rem;
		text-align: left;
		padding-top: 10px;
		padding-bottom: 10px;
		border-bottom: .5px solid #CCCCCC;
	}
	
	.user>span {
		padding-left: 20px;
	}
	
	.user-box {
		display: flex;
		overflow-x: scroll;
		overflow-y: hidden;
		margin-top: 10px;
		padding-left: 15px;
	}
	
	.user-box::-webkit-scrollbar {
		display: none;
	}
	
	.user-box>div {
		margin-left: 5px;
	}
	
	.user-box>div>img {
		border-radius: 50%;
	}
	
	.userge {
		display: flex;
		border-bottom: .5px solid #CCCCCC;
	}
	
	.touxiang {
		padding-top: 5px;
		width: 30%;
	}
	
	.touxiang>img {
		border: 1px solid #CCCCCC;
		width: 1.3rem;
		height: 1.3rem;
		border-radius: 50%;
	}
	
	.user-cont {
		padding-top: 5px;
		text-align: left;
		width: 50%;
		font-size: .22rem;
	}
	
	.user-name {
		font-size: .28rem;
		color: #FF8200;
	}
	
	.user-fen {
		color: #CCCCCC;
	}
	
	.user-cont>p {
		margin-top: 10px;
	}
	
	.guanzhu {
		margin-top: .5rem;
		font-size: .3rem !important;
		color: #FF8200;
	}
	
	.guanzhu>p {
		font-size: .25rem;
	}
	
	.zonghearr-top-cont {
		line-height: 45%;
		padding-left: 15px;
		padding-top: 10px;
		display: flex;
		justify-content: space-around;
		padding-bottom: 10px;
		border-bottom: .5px solid #CCCCCC;
	}
	
	.zonghearr-top-cont>img {
		width: .4rem;
		height: .4rem;
	}
	
	.zonghearr-top-cont>.desc {
		font-size: .28rem;
		display: inline-block;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.desc-extr {
		font-size: .22rem;
		color: #CCCCCC;
		display: inline-block;
	}
	
	.zonghearr-top-cont>span:last-of-type {
		font-size: .3rem;
		text-align: right;
	}
	
	.threetou {
		width: .7rem;
		height: .7rem;
	}
	
	.three-but {
		padding-top: .3rem;
		display: flex;
		padding-bottom: .3rem;
		border-bottom: .5px solid #CCCCCC;
	}
	
	.three-but>a:first-of-type {
		border-right: .5px solid #CCCCCC;
	}
	
	.three-but>a {
		display: inline-block;
		width: 50%;
		height: 30px;
	}
	
	.three-but>a>img {
		transform: translateY(-.25rem);
		width: .7rem;
		height: .7rem;
	}
	
	.user-qian {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
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
	
	#zonghe-but {
		display: block;
		color: #939393;
		border-top: .5px solid #E6E6E6;
		border-bottom: .5px solid #E6E6E6;
		font-size: .27rem;
		padding-top: 10px;
		padding-bottom: 10px;
		margin-top: 5px;
		margin-bottom: 5px;
	}
</style>