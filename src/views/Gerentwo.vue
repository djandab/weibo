<template>
	<div>
		<Photo :zhepic='zhepic' :zhes="zhes" @ends="ends" @xiaos="xiaos"></Photo>
		<div class="gerentwo">
			<div @click="returns">
				<返回</div>
			</div>
			<div ref="bgbox" class="gerentwo-top">
				<div class="bg">
					<img :src="renarr.avatar_hd" />
					<div class="gname">{{renarr.screen_name}}</div>
					<div class="gfen">
						<p>关注 {{renarr.follow_count}}</p>|
						<p>粉丝 {{renarr.followers_count}}</p>
					</div>
					<div v-if="!renarr.verified_reason" class="gexing">
						{{renarr.description}}
					</div>
					<div v-if="renarr.verified_reason" class="gexing">
						微博认证: {{renarr.verified_reason}}
					</div>
				</div>
			</div>
			<div class="daohan">
				<div @click="tags(i)" :class="{tagact:acit == i}" v-for="(tagit,i) in tag.tabs" :key="i">
					{{tagit.title}}
				</div>
			</div>
			<div class="to"></div>
			<div v-if="acit == 1">
				<div v-for="(weiboit,i) in weiboarr">
					<div class="to"></div>
					<div v-if="weiboit.card_type == 9">
						<div v-if="weiboit.mblog.title" class="zonghearr-title">{{weiboit.mblog.title.text}}</div>
						<div class="zonghepan">
							<div @click="geren(weiboit.mblog.user.id)" class="zonghepan-top">
								<img :src="weiboit.mblog.user.profile_image_url">
								<div>
									<p class="name">{{weiboit.mblog.user.screen_name}}</p>
									<p class="form">{{weiboit.mblog.created_at}}</p>
								</div>
							</div>

						</div>
						<div @click="details(weiboit.mblog)">
							<div class="text" v-html="weiboit.mblog.text"></div>
							<div v-if='weiboit.mblog.pics' class="pic-box">
								<div v-for="(pic,ins) in weiboit.mblog.pics" class="pic">
									<div @click.stop="zhe(weiboit.mblog.pics)">
										<img :src="pic.url">
										<div class="dontu" v-if="sub(pic.url) == 'gif'">动图</div>
									</div>
								</div>
							</div>
						</div>
						<div v-if="weiboit.mblog.page_info && !weiboit.mblog.pics" class="page">
							<a :href="weiboit.mblog.page_info.page_url">
								<img :src="weiboit.mblog.page_info.page_pic.url">
							</a>
						</div>
						<div class="retweeted" v-if="weiboit.mblog.retweeted_status">
							<div class="text" v-html="weiboit.mblog.retweeted_status.text">
							</div>
							<div v-if='weiboit.mblog.retweeted_status.pics' class="pic-box">
								<div v-for="(pic,ins) in weiboit.mblog.retweeted_status.pics" class="pic">
									<div @click.stop="zhe(weiboit.mblog.retweeted_status.pics)">
										<img :src="pic.url">
										<div class="dontu" v-if="sub(pic.url) == 'gif'">动图</div>
									</div>
								</div>
							</div>
							<div v-if="weiboit.mblog.retweeted_status.page_info && !weiboit.mblog.retweeted_status.pics" class="page">
								<a :href="weiboit.mblog.retweeted_status.page_info.page_url">
									<img :src="weiboit.mblog.retweeted_status.page_info.page_pic.url">
								</a>
							</div>
						</div>
						<div class="zonghepan-but">
							<div class="iconfont icon-zhuanfa">{{zhuang(weiboit.mblog.reposts_count)}}</div>
							<div class="iconfont icon-pinglun">{{zhuang(weiboit.mblog.comments_count)}}</div>
							<div class="iconfont icon-dianzan">{{zhuang(weiboit.mblog.attitudes_count)}}</div>
						</div>
					</div>
					<div v-if="weiboit.card_type == 11">
						<div v-for="(it,i) in weiboit.card_group">
							<div v-if="it.card_type == 42">
								<div class="word-title">
									{{it.desc}}
								</div>

							</div>
							<div v-if="it.card_type == 24">
								<div class="user-box">
									<div v-for="(userit,i) in it.users" :key="i">
										<img :src="userit.profile_image_url">
									</div>
								</div>
							</div>
							<div class="butt" v-if="it.card_type == 6">
								{{it.desc}}
							</div>
						</div>
					</div>
				</div>
			</div>

			<div v-if="acit == 0">
				<div v-for="(zhuyeid,i) in zhuye" :key="i">
					<div v-if="zhuyeid.card_type ==11">
						<div v-for="(zhi,index) in zhuyeid.card_group">
							<div class="dizhi" v-if="zhi.card_type == 41">{{zhi.item_name}} <span>{{zhi.item_content}}</span></div>
							<div class="gengudo" v-if="zhi.card_type == 6">{{zhi.card_type_name}}</div>
						</div>
						<div class="to"></div>
					</div>
					<div class="zhuyebut" v-if="zhuyeid.card_type == 7">
						{{zhuyeid.desc}}
					</div>
				</div>
			</div>

			<div v-if="acit == length-1">
				<div v-for="(phid,i) in xiangpian" :key="i">
					<div class="ph-title">{{phid.title}}</div>
					<div class="ph-cont" v-if="phid.card_group[0].card_type == 47">
						<div v-for="(it,i) in phid.card_group" :key="i+8">
							<img v-for="(tu,index) in it.pics" :src="tu.pic_small">
						</div>
					</div>
					<div class="ph-but" v-if="phid.buttontitle">{{phid.buttontitle}}</div>
					<div v-if="phid.card_group[0].card_type == 8">
						<div class="twen" v-for="(it,i) in phid.card_group" :key="i">
							<img :src="it.pic" />
							<div>
								<p>{{it.title_sub}}</p>
								<p>{{it.desc1}}</p>
								<div>{{it.desc2}}</div>
							</div>
							<div>></div>
						</div>
					</div>
				</div>
			</div>

			<div v-if="(length == 5 && acit == 3)||(length == 4 &&tag.tabs[2].title == '超话')">
				<div v-for="(chit , i ) in chaohua">
					<div v-if="chit.card_type == 8">
						<div class="chatop">
							<img class="chtou" :src="chit.pic" />
							<div class="chcont-box">
								<p class="chcont">{{chit.title_sub}}<img :src="chit.title_flag_pic" /></p>
								<p class="chdesc1">{{chit.desc1}}</p>
								<p class="chdesc2">{{chit.desc2}}</p>
							</div>
							<div class="chjin">
								<img :src="chit.buttons[0].pic" />
								<p>{{chit.buttons[0].name}}</p>
							</div>
						</div>
						<div class="to"></div>
					</div>
					<div v-if="chit.card_type == 11">
						<div v-for="(reit, i) in chit.card_group" :key="i">
							<div class="word-title" v-if="reit.card_type == 42">
								{{reit.desc}}
							</div>
							<div v-if="reit.card_type == 9">

								<div class="zonghepan">
									<div @click="geren(reit.mblog.user.id)" class="zonghepan-top">
										<img :src="reit.mblog.user.profile_image_url">
										<div>
											<p class="name">{{reit.mblog.user.screen_name}}</p>
											<p class="form">{{reit.mblog.created_at}}</p>
										</div>
									</div>

								</div>
								<div @click="details(reit.mblog)">
									<div class="text" v-html="reit.mblog.text"></div>
									<div v-if='reit.mblog.pics' class="pic-box">
										<div v-for="(pic,ins) in reit.mblog.pics" class="pic">
											<div @click.stop="zhe(reit.mblog.pics)">
												<img :src="pic.url">
												<div class="dontu" v-if="sub(pic.url) == 'gif'">动图</div>
											</div>
										</div>
									</div>
								</div>
								<div v-if="reit.mblog.page_info && !reit.mblog.pics" class="page">
									<a :href="reit.mblog.page_info.page_url">
										<img :src="reit.mblog.page_info.page_pic.url">
									</a>
								</div>
								<div class="zonghepan-but">
									<div class="iconfont icon-zhuanfa">{{zhuang(reit.mblog.reposts_count)}}</div>
									<div class="iconfont icon-pinglun">{{zhuang(reit.mblog.comments_count)}}</div>
									<div class="iconfont icon-dianzan">{{zhuang(reit.mblog.attitudes_count)}}</div>
								</div>
								<div class="to"></div>
							</div>
						</div>
					</div>
					<div v-if="chit.card_type == 9">
						<div class="zonghepan">
							<div @click="geren(chit.mblog.user.id)" class="zonghepan-top">
								<img :src="chit.mblog.user.profile_image_url">
								<div>
									<p class="name">{{chit.mblog.user.screen_name}}</p>
									<p class="form">{{chit.mblog.created_at}}</p>
								</div>
							</div>

						</div>
						<div @click="details(chit.mblog)">
							<div class="text" v-html="chit.mblog.text"></div>
							<div v-if='chit.mblog.pics' class="pic-box">
								<div v-for="(pic,ins) in chit.mblog.pics" class="pic">
									<div @click.stop="zhe(chit.mblog.pics)">
										<img :src="pic.url">
										<div class="dontu" v-if="sub(pic.url) == 'gif'">动图</div>
									</div>
								</div>
							</div>
						</div>
						<div v-if="chit.mblog.page_info && !chit.mblog.pics" class="page">
							<a :href="chit.mblog.page_info.page_url">
								<img :src="chit.mblog.page_info.page_pic.url">
							</a>
						</div>
						<div class="zonghepan-but">
							<div class="iconfont icon-zhuanfa">{{zhuang(chit.mblog.reposts_count)}}</div>
							<div class="iconfont icon-pinglun">{{zhuang(chit.mblog.comments_count)}}</div>
							<div class="iconfont icon-dianzan">{{zhuang(chit.mblog.attitudes_count)}}</div>
						</div>
						<div class="to"></div>
					</div>
				</div>
			</div>
			<div class="gerenvid" v-if="(length == 5 && acit == 2)||(length == 4 &&tag.tabs[2].title == '视频')">
				没有内容
			</div>

		</div>
</template>

<script>
	import Photo from '../components/Photo.vue'
	var y, Y;
	var body = document.getElementsByTagName('body')
	export default {
		name: 'Gerentwo',
		data() {
			return {
				renarr: [],
				tag: [],
				acit: 1,
				weiboarr: [],
				zhes: false,
				zhepic: [],
				zhuye: [],
				xiangpian: [],
				length: 0,
				chaohua: []
			}
		},
		methods: {
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
			geren(id) {
				this.$router.push({
					name: 'geren',
					query: {
						id
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
			returns() {
				this.$router.go(-1)
			},
			tags(i) {
				this.acit = i
			}
		},
		components: {
			Photo
		},
		mounted() {

			this.$http.get('api/container/getIndex?uid=' + this.$route.query.id + '&luicode=10000011&lfid=100103type%3D1%26q%3D' + this.$route.query.name, {
					params: {
						type: 'uid',
						value: this.$route.query.id,
						containerid: 107603 + this.$route.query.id
					}
				}).then(res => {
					this.weiboarr = res.data.data.cards
				}),
				this.$http.get('api/container/getIndex?uid=' + this.$route.query.id + '&luicode=10000011&lfid=100103type%3D1%26q%3D' + this.$route.query.name, {
					params: {
						type: 'uid',
						value: this.$route.query.id,
						containerid: 100505 + this.$route.query.id
					}
				}).then(res => {
					if(res.data.data == undefined) {
						this.$router.go(0)
					}
					this.$refs.bgbox.style.background = 'url(' + res.data.data.userInfo.cover_image_phone + ') center center no-repeat'
					this.$refs.bgbox.style.backgroundSize = 'cover'
					this.renarr = res.data.data.userInfo
					this.tag = res.data.data.tabsInfo
					this.length = res.data.data.tabsInfo.tabs.length

				}),

				this.$http.get('api/container/getIndex?uid=' + this.$route.query.id + '&luicode=10000011&lfid=100103type%3D1%26q%3D' + this.$route.query.name, {
					params: {
						featurecode: 20000345,
						type: 'uid',
						value: this.$route.query.id,
						containerid: 230283 + this.$route.query.id
					}
				}).then(res => {
					this.zhuye = res.data.data.cards
				}),

				this.$http.get('api/container/getIndex?uid=' + this.$route.query.id + '&luicode=10000011&lfid=100103type%3D1%26q%3D' + this.$route.query.name, {
					params: {
						type: 'uid',
						value: this.$route.query.id,
						containerid: 107803 + this.$route.query.id
					}
				}).then(res => {
					this.xiangpian = res.data.data.cards
				}),

				//https://m.weibo.cn/api/container/getIndex?uid=5187664653&luicode=10000011&lfid=100103type%3D1%26q%3D%E9%82%93%E8%B6%85%26t%3D0&type=uid&value=5187664653&containerid=2314755187664653	
				this.$http.get('api/container/getIndex?uid=' + this.$route.query.id + '&luicode=10000011&lfid=100103type%3D1%26q%3D' + this.$route.query.name, {
					params: {
						containerid: 231475 + this.$route.query.id
					}
				}).then(res => {
					console.log(res.data.data.cards)
					this.chaohua = res.data.data.cards
				})

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
	
	.chatop {
		display: flex;
	}
	
	.dizhi {
		padding-left: 10px;
		text-align: left;
		line-height: 40px;
		height: 40px;
		font-size: .27rem;
		color: #CCCCCC;
		border-bottom: .3px solid #E6E6E6;
	}
	
	.gengudo {
		text-align: center;
		height: 40px;
		line-height: 40px;
		font-size: .27rem;
		border-bottom: .3px solid #E6E6E6;
	}
	
	.dizhi>span {
		margin-left: 10px;
		color: black;
	}
	
	.butt {
		padding-top: 10px;
		padding-bottom: 10px;
		font-size: .25rem;
		color: #FF8200;
		border-top: .5px solid #E6E6E6;
		border-bottom: .5px solid #E6E6E6;
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
		width: .7rem;
		height: .7rem;
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
	
	.zonghepan-but {
		display: flex;
		justify-content: space-around;
		margin-top: 20px;
		border-top: .3px solid #CCCCCC;
		padding-top: 10px;
		padding-bottom: 10px;
		border-bottom: .3px solid #CCCCCC;
	}
	
	.to {
		background: #ebebec;
		height: 10px;
	}
	
	.gerentwo {
		height: 40px;
		background: #f5f5f5;
		position: relative;
		line-height: 40px;
	}
	
	.gerentwo>div {
		position: absolute;
		left: 10px;
		font-size: .28rem;
	}
	
	.gerentwo-top {
		width: 100%;
		position: relative;
		height: 3rem;
		overflow: hidden;
	}
	
	.gerentwo-top img {
		width: 1.1rem;
		height: 1.1rem;
		display: inline-block;
		position: absolute;
		top: .3rem;
		left: 50%;
		margin-left: -.6rem;
		border-radius: 50%;
		border: 5px solid rgba(255, 255, 255, .4);
	}
	
	.gname {
		color: white;
		font-size: .3rem;
		width: 100%;
		text-align: center;
		top: 1rem;
		margin-top: 1.7rem;
	}
	
	.gfen {
		margin-top: 10px;
		display: flex;
		font-size: .22rem;
		color: white;
		justify-content: center;
	}
	
	.gfen>p:first-of-type {
		margin-right: 5px;
	}
	
	.gfen>p:last-of-type {
		margin-left: 5px;
	}
	
	.gexing {
		margin-top: 10px;
		font-size: .22rem;
		color: white;
	}
	
	.bg {
		height: 1.5rem;
		background: -webkit-gradient(linear, left top, left bottom, color-stop(40%, rgba(0, 0, 0, .01)), to(rgba(0, 0, 0, .95)));
	}
	
	.daohan {
		font-size: .25rem;
		line-height: 40px;
		height: 40px;
		display: flex;
		justify-content: center;
		border-bottom: .3px solid #E6E6E6;
	}
	
	.daohan>div {
		margin-left: 15px;
	}
	
	.daohan>div:first-of-type {
		margin-left: 0px;
	}
	
	.tagact {
		border-bottom: 2px solid #FF8200;
	}
	
	.zonghearr-title {
		font-size: .25rem;
		padding-top: 10px;
		padding-bottom: 10px;
		text-align: left;
		padding-left: 10px;
		border-bottom: .5px solid #E6E6E6;
	}
	
	.zonghepan-top {
		text-align: left;
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
	
	.zhuyebut {
		font-size: .27rem;
		height: 40px;
		line-height: 40px;
		border-bottom: .3px solid #EBEBEC;
	}
	
	.ph-title {
		height: 20px;
		background: #EBEBEC;
		font-size: .25rem;
		text-align: left;
		padding-left: 10px;
		line-height: 20px;
	}
	
	.ph-cont {
		padding-bottom: 10px;
		border-bottom: .3px solid #E6E6E6;
		padding-top: 10px;
		background: white;
		display: flex;
		justify-content: space-around;
	}
	
	.ph-cont>div>img {
		width: 1.9rem;
		height: 1.9rem;
	}
	
	.ph-but {
		font-size: .27rem;
		height: 40px;
		line-height: 40px;
		border-bottom: .3px solid #E6E6E6;
	}
	
	.twen {
		display: flex;
		align-items: center;
		padding-top: 10px;
		padding-bottom: 10px;
		border-bottom: .5px solid #E6E6E6;
	}
	
	.twen>img {
		width: 1.3rem;
		height: 1.3rem;
		margin-left: 10px;
		margin-right: 10px;
	}
	
	.twen>div:nth-of-type(1) {
		width: 65%;
		text-align: left;
	}
	
	.twen>div:nth-of-type(1)>p:first-of-type {
		font-size: .27rem;
	}
	
	.twen>div:nth-of-type(1)>p:last-of-type {
		font-size: .22rem;
		margin-top: 10px;
		color: #636363;
	}
	
	.twen>div:nth-of-type(1)>div {
		font-size: .22rem;
		margin-top: 10px;
		color: #939393;
	}
	
	.twen>div:last-of-type {
		font-size: .3rem;
	}
	
	.gerenvid {
		height: 40px;
		font-size: .27rem;
		line-height: 40px;
	}
	
	.chatop {
		padding-top: 10px;
		padding-bottom: 10px;
		border-bottom: .5px solid #E6E6E6;
	}
	
	.chtou {
		width: 1.3rem;
		height: 1.3rem;
		margin-left: 10px;
		margin-right: 10px;
	}
	
	.chcont {
		font-size: .27rem;
		text-align: left;
		margin-top: 5px;
	}
	
	.chcont>img {
		margin-left: 10px;
		width: .4rem;
		height: .2rem;
	}
	
	.chdesc1 {
		font-size: .22rem;
		text-align: left;
		margin-top: 10px;
		color: #636363;
	}
	
	.chdesc2 {
		font-size: .22rem;
		text-align: left;
		margin-top: 10px;
		color: #939393;
	}
	
	.chcont-box {
		width: 60%;
	}
	
	.chjin {
		font-size: .22rem;
		color: #507DAF;
	}
	
	.chjin>img {
		width: .4rem;
		height: .4rem;
		margin-top: .4rem;
	}
</style>