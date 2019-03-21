<template>
	<div>
		<Photo :zhepic='zhepic' :zhes="zhes" @ends="ends" @xiaos="xiaos"></Photo>
		<Videos :vid='vid' v-show="a" :a='a' @ends="ends" @xiaos="xiaos"></Videos>
		<div class="header ad">
			<div @click="returns">
				< </div>
					<div class="search">
						<div class="iconfont icon-sousuo sousuo"></div>
						<input @keydown.enter="sou" ref="inp" id="search-inp" />
					</div>
					<div class="right">
						<div class="iconfont icon-bi"></div>
					</div>
			</div>
			<div class="nav-box ad">
				<div ref="nav" class="nav">
					<span ref="navlist" @click="acts(index)" :class="{acts:activ == index}" class="nav-list nav-list-two" v-for="(item,index) in nav" :key="index">
				{{item.name}}
			</span>
				</div>
				<div @click="navBox" class="jiantou iconfont icon-iconfontjiantou">
				</div>

			</div>
			<div ref="navbox" class="nav-list-box">
				<div @click="acts(i)" class="navbox-list" :class="{act: activ == i}" v-for="(it,i) in nav" :key='i'>
					{{it.name}}
				</div>
			</div>
			<div v-if="!none.desc">

				<!--	0-->
				<Zonghe :zonghearr='zonghearr' v-if="activ == 0"></Zonghe>
				<!--	1-->
				<div v-if="activ == 1">
					<div class="users-box" v-for="(userit,i) in user" :key="i">
						<div v-if="userit.card_type == 4">
							<a :href="userit.scheme" class="saixuan">
								<img :src="userit.pic" />
								<div>{{userit.desc}}</div>
								<div>{{userit.desc_extr}}</div>
								<div>></div>
							</a>
							<div class="to"></div>
						</div>
						<div v-if="userit.card_type == 11">
							<div class="userge" v-for="(uit, i) in userit.card_group" :key="i">
								<div class="touxiang">
									<img :src="uit.user.profile_image_url" />
								</div>
								<div @click="gerentwo(uit.user.screen_name,uit.user.id)" class="user-cont">
									<p class="user-name">{{uit.user.screen_name}}</p>
									<p class="user-qian">{{uit.desc1}}</p>
									<p class="user-fen">{{uit.desc2}}</p>
								</div>

								<div class="guanzhu iconfont icon-guanzhu">
									<p>加关注</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!--	2-->
				<div v-if="activ == 2">
					<div v-for="(it,i) in weibo" :key="i">
						<div class="to"></div>
						<div class="zonghepan">
							<div @click="geren(it.mblog.user.id)" class="zonghepan-top">
								<img :src="it.mblog.user.profile_image_url">
								<div>
									<p class="name">{{it.mblog.user.screen_name}}</p>
									<p class="form">{{it.mblog.created_at}} <span>来自: {{it.mblog.source}}</span></p>
								</div>
							</div>

						</div>
						<div @click="details(it.mblog)">
							<div class="text" v-html="it.mblog.text"></div>
							<div v-if='it.mblog.pics' class="pic-box">
								<div v-for="(pic,ins) in it.mblog.pics" class="pic">
									<div @click.stop="zhe(it.mblog.pics)">
										<img :src="pic.url">
										<div class="dontu" v-if="sub(pic.url) == 'gif'">动图</div>
									</div>
								</div>
							</div>
						</div>
						<div v-if="it.mblog.page_info && !it.mblog.pics" class="page">
							<a :href="it.mblog.page_info.page_url">
								<img :src="it.mblog.page_info.page_pic.url">
							</a>
						</div>
						<div class="retweeted" v-if="it.mblog.retweeted_status">
							<div class="text" v-html="it.mblog.retweeted_status.text">
							</div>
							<div v-if="it.mblog.retweeted_status.page_info && !it.mblog.retweeted_status.pics" class="page">
								<a :href="it.mblog.retweeted_status.page_info.page_url">
									<img :src="it.mblog.retweeted_status.page_info.page_pic.url">
								</a>
							</div>
						</div>
						<div class="zonghepan-but">
							<div class="iconfont icon-zhuanfa">{{zhuang(it.mblog.reposts_count)}}</div>
							<div class="iconfont icon-pinglun">{{zhuang(it.mblog.comments_count)}}</div>
							<div class="iconfont icon-dianzan">{{zhuang(it.mblog.attitudes_count)}}</div>
						</div>
					</div>
				</div>

				<!--	3-->
				<div v-if="activ == 3">
					<div v-for="(it,i) in guanzhu" :key="i">
						<div class="to"></div>
						<div class="zonghepan">
							<div @click="geren(it.mblog.user.id)" class="zonghepan-top">
								<img :src="it.mblog.user.profile_image_url">
								<div>
									<p class="name">{{it.mblog.user.screen_name}}</p>
									<p class="form">{{it.mblog.created_at}} <span>来自: {{it.mblog.source}}</span></p>
								</div>
							</div>

						</div>
						<div @click="details(it.mblog)">
							<div class="text" v-html="it.mblog.text"></div>
							<div v-if='it.mblog.pics' class="pic-box">
								<div v-for="(pic,ins) in it.mblog.pics" class="pic">
									<div @click.stop="zhe(it.mblog.pics)">
										<img :src="pic.url">
										<div class="dontu" v-if="sub(pic.url) == 'gif'">动图</div>
									</div>
								</div>
							</div>
						</div>
						<div v-if="it.mblog.page_info && !it.mblog.pics" class="page">
							<a :href="it.mblog.page_info.page_url">
								<img :src="it.mblog.page_info.page_pic.url">
							</a>
						</div>
						<div class="retweeted" v-if="it.mblog.retweeted_status">
							<div class="text" v-html="it.mblog.retweeted_status.text">
							</div>
							<div v-if="it.mblog.retweeted_status.page_info && !it.mblog.retweeted_status.pics" class="page">
								<a :href="it.mblog.retweeted_status.page_info.page_url">
									<img :src="it.mblog.retweeted_status.page_info.page_pic.url">
								</a>
							</div>
						</div>
						<div class="zonghepan-but">
							<div class="iconfont icon-zhuanfa">{{zhuang(it.mblog.reposts_count)}}</div>
							<div class="iconfont icon-pinglun">{{zhuang(it.mblog.comments_count)}}</div>
							<div class="iconfont icon-dianzan">{{zhuang(it.mblog.attitudes_count)}}</div>
						</div>
					</div>
				</div>

				<!--	5-->
				<div style="background: #E6E6E6;" v-if="activ == 5">
					<div v-for="(vit, i) in video" :key="i">
						<div v-for="(videit,index) in vit.card_group" :key="index">
							<div style="background: white; margin-top: 10px;" v-if="videit.show_type==1">
								<div class="zonghepan">
									<div @click="geren(videit.mblog.user.id)" class="zonghepan-top">
										<img :src="videit.mblog.user.profile_image_url">
										<div>
											<p class="name">{{videit.mblog.user.screen_name}}</p>
											<p class="form">{{videit.mblog.created_at}} <span>来自: {{videit.mblog.source}}</span></p>
										</div>
									</div>
								</div>
								<div class="text" v-html="videit.mblog.text"></div>
								<div v-if="videit.mblog.page_info" @click="vi(videit.mblog.page_info.media_info.mp4_sd_url)" class="vid-box">
									<img v-if="videit.mblog.page_info" :src="videit.mblog.page_info.page_pic.url" />
									<div class="iconfont icon-bofang1 anniu"></div>
									<div class="num">{{videit.mblog.obj_ext}}</div>
								</div>
								<div class="zonghepan-but">
									<div class="iconfont icon-zhuanfa">{{zhuang(videit.mblog.reposts_count)}}</div>
									<div class="iconfont icon-pinglun">{{zhuang(videit.mblog.comments_count)}}</div>
									<div class="iconfont icon-dianzan">{{zhuang(videit.mblog.attitudes_count)}}</div>
								</div>
							</div>
							<div style="background: white; margin-top: 10px; font-size: .27rem;padding-top: 10px;padding-bottom: 10px;" v-if="videit.show_type==0">
								{{videit.desc}}>
							</div>
							<div class="ti" v-if="videit.card_type==42">
								{{videit.desc}}
							</div>
						</div>
					</div>
				</div>

				<!--6-->
				<div v-if="activ == 6">
					<div v-for="(weni,i) in wenzan" :key="i">
						<div class="word-top" v-if="weni.card_type==27">
							<div class="word-titles" v-html="weni.title_sub"></div>
							<img :src="weni.pic">
						</div>
						<div class="word-cont" v-if="weni.card_type == 8">
							<div class="word-cont-img">
								<img :src="weni.pic" />
							</div>
							<div class="word-cont-sub">
								<p class="word-titsub">{{weni.title_sub}}</p>
								<p class="word-desc">{{weni.desc1}}</p>
							</div>
						</div>

					</div>
				</div>

				<!--7-->
				<div style="background: #E6E6E6;" v-if="activ == 7">
					<div class="users-box" v-for="(userit,i) in tuwen" :key="i">
						<div style="background: white;" v-if="userit.card_type == 4">
							<a :href="userit.scheme" class="saixuan">
								<img :src="userit.pic" />
								<div>{{userit.desc}}</div>
								<div>{{userit.desc_extr}}</div>
								<div>></div>
							</a>
							<div class="to"></div>
						</div>

						<div style="background: white;" v-if="userit.card_type == 11">
							<div v-for="(it,i) in userit.card_group" :key="i">
								<div class="zonghepan">
									<div @click="geren(it.mblog.user.id)" class="zonghepan-top">
										<img :src="it.mblog.user.profile_image_url">
										<div>
											<p class="name">{{it.mblog.user.screen_name}}</p>
											<p class="form">{{it.mblog.created_at}} <span>来自: {{it.mblog.source}}</span></p>
										</div>
									</div>

								</div>
								<div @click="details(it.mblog)">
									<div class="text" v-html="it.mblog.text"></div>
									<div v-if='it.mblog.pics' class="pic-box">
										<div v-for="(pic,ins) in it.mblog.pics" class="pic">
											<div @click.stop="zhe(it.mblog.pics)">
												<img :src="pic.url">
												<div class="dontu" v-if="sub(pic.url) == 'gif'">动图</div>
											</div>
										</div>
									</div>
								</div>
								<div class="zonghepan-but">
									<div class="iconfont icon-zhuanfa">{{zhuang(it.mblog.reposts_count)}}</div>
									<div class="iconfont icon-pinglun">{{zhuang(it.mblog.comments_count)}}</div>
									<div class="iconfont icon-dianzan">{{zhuang(it.mblog.attitudes_count)}}</div>
								</div>
								<div class="to"></div>
							</div>

						</div>
					</div>
				</div>

				<!--8-->
				<div v-if="activ == 8">
					<div v-for="(it,i) in remen" :key="i">
						<div class="zonghepan">
							<div @click="geren(it.mblog.user.id)" class="zonghepan-top">
								<img :src="it.mblog.user.profile_image_url">
								<div>
									<p class="name">{{it.mblog.user.screen_name}}</p>
									<p class="form">{{it.mblog.created_at}} <span>来自: {{it.mblog.source}}</span></p>
								</div>
							</div>

						</div>
						<div @click="details(it.mblog)">
							<div class="text" v-html="it.mblog.text"></div>
							<div v-if='it.mblog.pics' class="pic-box">
								<div v-for="(pic,ins) in it.mblog.pics" class="pic">
									<div @click.stop="zhe(it.mblog.pics)">
										<img :src="pic.url">
										<div class="dontu" v-if="sub(pic.url) == 'gif'">动图</div>
									</div>
								</div>
							</div>
						</div>
						<div v-if="it.mblog.page_info && !it.mblog.pics" class="page">
							<a :href="it.mblog.page_info.page_url">
								<img :src="it.mblog.page_info.page_pic.url">
							</a>
						</div>
						<div class="retweeted" v-if="it.mblog.retweeted_status">
							<div class="text" v-html="it.mblog.retweeted_status.text">
							</div>
							<div v-if="it.mblog.retweeted_status.page_info && !it.mblog.retweeted_status.pics" class="page">
								<a :href="it.mblog.retweeted_status.page_info.page_url">
									<img :src="it.mblog.retweeted_status.page_info.page_pic.url">
								</a>
							</div>
						</div>
						<div class="zonghepan-but">
							<div class="iconfont icon-zhuanfa">{{zhuang(it.mblog.reposts_count)}}</div>
							<div class="iconfont icon-pinglun">{{zhuang(it.mblog.comments_count)}}</div>
							<div class="iconfont icon-dianzan">{{zhuang(it.mblog.attitudes_count)}}</div>
						</div>
						<div class="to"></div>
					</div>
				</div>

				<!--	9-->
				<div v-if="activ == 9">
					<div v-for="(it,i) in huati" :key="i">
						<div class="chatop">
							<img class="chtou" :src="it.pic" />
							<div class="chcont-box">
								<p class="chcont">{{it.title_sub}}</p>
								<p class="chdesc1">{{it.desc1}}</p>
								<p class="chdesc2">{{it.desc2}}</p>
							</div>
						</div>

					</div>
				</div>

				<!--10-->
				<div v-if="activ == 10">
					<div v-for="(it,i) in zhuye" :key="i">
						<div class="to"></div>
						<div v-for="(itid,index) in it.card_group" :key="index">
							<div class="vide-title" v-if="itid.card_type==42">
								{{itid.desc}}
							</div>
							<div v-if="itid.card_type==8">

								<div class="chatop">
									<img class="chtou" :src="itid.pic" />
									<div class="chcont-box">
										<p class="chcont">{{itid.title_sub}}</p>
										<p class="chdesc1">{{itid.desc1}}</p>
										<p class="chdesc2">{{itid.desc2}}</p>
									</div>
								</div>
							</div>
						</div>

					</div>

				</div>
					
				<!--	4-->
				<div v-if="activ == 4">
					<div v-for="(it,i) in wenda" :key="i">
						<div style="background: white;" v-if="it.card_type == 4">
							<a :href="it.scheme" class="saixuan">
								<img :src="it.pic" />
								<div>{{it.desc}}</div>
								<div>{{it.desc_extr}}</div>
								<div>></div>
							</a>
							<div class="to"></div>
						</div>
						<div v-if="it.card_type==11">
							<div v-for="(wenit,i) in it.card_group" :key="i">
								<div class="chatop">
									<img class="chtou" :src="wenit.pic" />
									<div class="chcont-box">
										<p class="chcont">{{wenit.title_sub}}</p>
										<p class="chdesc1">{{wenit.desc1}}</p>
										<p class="chdesc2">{{wenit.desc2}}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div style="font-size: .27rem;padding-top: 10px;" v-if="none.desc">
				<div>什么都没有</div>
			</div>
		</div>
</template>

<script>
	import Videos from '../components/Videos.vue'
	import Photo from '../components/Photo.vue'
	var y, Y;
	var body = document.getElementsByTagName('body')
	import Zonghe from '../components/Zonghe.vue'
	export default {
		name: 'Searchtwo',
		data() {
			return {
				nav: [],
				activ: 0,
				show: false,
				zonghearr: [],
				none: [],
				user: [],
				weibo: [],
				zhes: false,
				zhepic: [],
				guanzhu: [],
				video: [],
				vid: '',
				val: this.$route.query.val,
				a: false,
				wenzan: [],
				tuwen: [],
				remen: [],
				huati: [],
				zhuye: [],
				wenda:[]
			}
		},
		components: {
			Zonghe,
			Photo,
			Videos
		},
		//https://m.weibo.cn/api/container/getIndex?containerid=100103type%3D1%26q%3Done%26t%3D0&page_type=searchall
		mounted() {
			this.$http.get('api/api/container/getIndex?containerid=100103type%3D1%26q%3D' + this.$route.query.val, {
					params: {
						page_type: 'searchall'
					}
				}).then(res => {

					this.nav = res.data.data.cardlistInfo.cardlist_head_cards[0].channel_list
					this.none = res.data.data.cards[0]
					this.$refs.inp.value = this.$route.query.val
				}),
				this.$http.get('api/container/getIndex?containerid=100103type%3D1%26q%3D' + this.$route.query.val + '%26t%3D0', {
					params: {
						page_type: 'searchall'
					}
				}).then(res => {
					console.log(res.data.data.cards)
					this.zonghearr = res.data.data.cards
				}),
				this.$http.get('api/container/getIndex?containerid=100103type%3D3%26q%3D' + this.val, {
					params: {
						page_type: 'searchall'
					}
				}).then(res => {
					this.user = res.data.data.cards
				})
			this.$http.get('api/container/getIndex?containerid=100103type%3D61%26q%3D' + this.val, {
					params: {
						page_type: 'searchall'
					}
				}).then(res => {

					this.weibo = res.data.data.cards[0].card_group
				}),

				this.$http.get('api/container/getIndex?containerid=100103type%3D62%26q%3D' + this.val, {
					params: {
						page_type: 'searchall'
					}
				}).then(res => {
					this.guanzhu = res.data.data.cards[0].card_group
				}),

				this.$http.get('api/container/getIndex?containerid=100103type%3D64%26q%3D' + this.val, {
					params: {
						page_type: 'searchall'
					}
				}).then(res => {
					if(res.data.data != undefined) {
						this.video = res.data.data.cards
					}

				})
			this.$http.get('api/container/getIndex?containerid=100103type%3D21%26q%3D' + this.val, {
				params: {
					page_type: 'searchall'
				}
			}).then(res => {
				if(res.data.data != undefined) {
					this.wenzan = res.data.data.cards[0].card_group
				}
			})

			this.$http.get('api/container/getIndex?containerid=100103type%3D63%26q%3D' + this.val, {
				params: {
					page_type: 'searchall'
				}
			}).then(res => {
				this.tuwen = res.data.data.cards
			})
			this.$http.get('api/container/getIndex?containerid=100103type%3D60%26q%3D' + this.val, {
				params: {
					page_type: 'searchall'
				}
			}).then(res => {

				if(res.data.data != undefined) {
					this.remen = res.data.data.cards[0].card_group
				}
			})

			this.$http.get('api/container/getIndex?containerid=100103type%3D38%26q%3D' + this.val, {
				params: {
					page_type: 'searchall'
				}
			}).then(res => {
				if(res.data.data != undefined) {
					this.huati = res.data.data.cards[0].card_group
				}
			})
			this.$http.get('api/container/getIndex?containerid=100103type%3D32%26q%3D' + this.val, {
				params: {
					page_type: 'searchall'
				}
			}).then(res => {
				
				this.zhuye = res.data.data.cards
			})
			
			
			https://m.weibo.cn/api/container/getIndex?containerid=100103type%3D58%26q%3D%E5%AE%8B%E4%BC%8A%E4%BA%BA%26t%3D0&page_type=searchall
			this.$http.get('api/container/getIndex?containerid=100103type%3D58%26q%3D' + this.val, {
				params: {
					page_type: 'searchall'
				}
			}).then(res => {
				this.wenda = res.data.data.cards
			})
		},
		methods: {
			vi(i) {
				this.vid = i
				this.a = true
				body[0].style.overflow = 'hidden'
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
			sub(l) {
				return l.substring(l.length - 3)
			},
			ends(va) {
				this.a = va
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
			geren(id) {
				this.$router.push({
					name: 'geren',
					query: {
						id
					}
				})
			},
			gerentwo(name, id) {
				this.$router.push({
					name: 'gerentwo',
					query: {
						name,
						id
					}
				})
			},
			sou() {
				this.$http.get('api/api/container/getIndex?containerid=100103type%3D1%26q%3D' + this.$refs.inp.value, {
					params: {
						page_type: 'searchall'
					}
				}).then(res => {
					console.log(res.data.data)
					this.nav = res.data.data.cardlistInfo.cardlist_head_cards[0].channel_list
					this.none = res.data.data.cards[0]
					this.zonghearr = res.data.data.cards
					this.$refs.inp.value = this.$refs.inp.value
					this.val = this.$refs.inp.value

					this.$router.replace({
							query: {
								val: this.$refs.inp.value
							}
						}),
						this.$router.go(0)
				})

			},
			acts(i) {
				this.activ = i
				this.$refs.navbox.style.height = 0 + 'rem'
				this.$refs.nav.scrollTo(this.$refs.navlist[i].offsetLeft - 15, 0)
				this.show = false
			},
			navBox() {
				if(this.show == false) {
					this.$refs.navbox.style.height = 3 + 'rem'
					this.show = true
				} else {
					this.$refs.navbox.style.height = 0 + 'rem'
					this.show = false
				}

			},
			returns() {
				this.$router.go(-1)
			},
		}
	}
</script>

<style>
	.ad {
		font-size: .3rem;
		background: white;
	}
	
	#search-inp {
		transform: translateY(0px);
	}
	
	.nav-list-two {
		font-size: .25rem;
		color: #939393;
		transform: translateY(.23rem);
	}
	
	.acts {
		border-bottom: 2px solid #FF8200;
		color: #333;
		display: inline-block;
	}
	
	.saixuan {
		width: 100%;
		display: flex;
		height: 40px;
		line-height: 40px;
		text-align: left;
		border-bottom: .3px solid #E6E6E6;
		justify-content: space-around;
	}
	
	.saixuan>img {
		margin-top: .1rem;
		width: .5rem;
		height: .5rem;
	}
	
	.saixuan>div:first-of-type {
		font-size: .27rem;
	}
	
	.saixuan>div:nth-of-type(2) {
		font-size: .22rem;
		color: #CCCCCC;
	}
	
	.saixuan>div:last-of-type {
		padding-right: 10px;
		text-align: right;
		width: 40%;
		font-size: .3rem;
	}
	
	.users-box>div {
		width: 100%;
	}
	
	.users-box {
		width: 100%;
	}
	
	.retweeted {
		margin-top: 10px;
		padding-top: 10px;
		background: #f7f7f7;
		padding-bottom: 10px;
	}
	
	.vid-box {
		margin-top: 10px;
		width: 90%;
		margin-left: 5%;
		height: 3.5rem;
		overflow: hidden;
		position: relative;
		display: block;
		padding-bottom: 10px;
	}
	
	.vid-box>img {
		width: 100%;
		height: 100%;
		vertical-align: top;
		object-fit: cover;
	}
	
	.anniu {
		position: absolute;
		top: 65px;
		left: 2.3rem;
		font-size: 1.2rem!important;
		color: white;
	}
	
	.num {
		position: absolute;
		color: white;
		font-size: .22rem;
		bottom: 10px;
		left: 5px;
	}
	
	.ti {
		font-size: .27rem;
		text-align: left;
		background: white;
		padding-left: 10px;
		border-left: 3px solid #FF8200;
		height: 30px;
		margin-top: 15px;
		transform: translateY(10px);
		line-height: 30px;
		border-top: .5px solid #CCCCCC;
		border-bottom: .5px solid #E6E6E6;
	}
	
	.chdesc1,.chcont {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>