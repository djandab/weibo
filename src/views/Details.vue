<template>
	<div class="details">
		<Photo :zhepic='zhepic' :zhes="zhes" @ends="ends" @xiaos="xiaos"></Photo>
		<div class="dteails-header">
				<span @click="returns"><</span>微博正文
		</div>
			<div  class="pan">
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
			<div class="text" v-html='pit.text'></div>
			<div v-if='pit.pics' class="pic-box">
				<div v-for="(pic,ins) in pit.pics" class="pic">
					<div @click="zhe(pit.pics)"><img :src="pic.url">
						<div class="dontu" v-if="sub(pic.url) == 'gif'">动图</div>
					</div>
				</div>
			</div>
			<div v-if="pit.page_info && !pit.pics" class="page">
				<a :href="pit.page_info.page_url">
					<img :src="pit.page_info.page_pic.url">
				</a>
			</div>
		</div>
		<div class="lite-page-tab">
			<div @click="z" :class="zhuangs?'tabavt':''" class="tab-zhuang">转发{{zhuang(pit.reposts_count)}}</div>
			<div @click="ping" :class="pings?'tabavt':''" class="tab-ping">评论{{zhuang(pit.comments_count)}}</div>
			<div @click="zanb"  :class="zans?'tabavt':''" class="tab-zang">赞{{zhuang(pit.attitudes_count)}}</div>
		</div>
		
		
		<div v-if="pings" class="deta-box" v-for="(pinit,i) in pingsarr" :key="i">
			<div class="pan-left">
				<img :src="pinit.user.profile_image_url" />
				<div class="detaname">{{pinit.user.screen_name}}</div>
			</div>
			<div class="text deta-text" v-html="pinit.text">
				
			</div>
			<div class="pinit-pic"  v-if="pinit.pic">
				<img @click="zhe(pinit.pic.large.url)" :src="pinit.pic.url" />
			</div>
			<div class="deta-ping">
				<div v-for="(pingit,i) in pinit.comments" :key="i" >
					<a :href="pingit.user.profile_url">{{pingit.user.screen_name}}:</a>
					<span v-html="pingit.text"></span>
				</div>
				<a @click="pingdetail(pinit.id)">共{{pinit.total_number}}条回复></a>
			</div>
			<div class="time">
				{{time(pinit.created_at)}}
			</div>
		</div>
		
		<div v-if="zans" v-for="(zanit,i) in zansarr" :key="i+2" class="zans-box">
			<img class="logo" :src="zanit.user.profile_image_url" />
			<div class="name">{{zanit.user.screen_name}}</div>
		</div>
		<div v-if="zhuangs" v-for="(zhuanit,i) in zhuangsarr" :key="i+1" class="zhuang-box">
			<div class="logo">
				<img :src="zhuanit.user.profile_image_url" />
			</div>
			<div class="zhuanit-right">
				<p class="name">{{zhuanit.user.screen_name}}</p>
				<div class="text" v-html="zhuanit.text"></div>
				<p class="time">{{zhuanit.created_at}}</p>
			</div>
		</div>
	</div>
</template>

<script>
	import Photo from '../components/Photo.vue'
	var y, Y;
	var body = document.getElementsByTagName('body')
	export default {
		name: 'Details',
		data(){
			return{
				k:'',
				zhepic:[],
				zhes: false,
				pings:true,
				zhuangs:false,
				zans:false,
				pingsarr:[],
				zhuangsarr:[],
				zansarr:[],
				pit:JSON.parse(this.k)
			}
		},
		beforeCreate() {
			this.k = sessionStorage.getItem('key')
		},
		mounted() {
		
		
				this.$http.get('api/comments/hotflow', {
					params: {
						id: this.pit.id,
						mid: this.pit.mid,
					}
				}).then(res => {
					console.log(res.data)
					
					this.pingsarr = res.data.data.data
				})
	
//https://m.weibo.cn/comments/hotFlowChild?cid=4349848180477984&max_id=0&max_id_type=0

		},
		components:{
			Photo
		},
		methods:{
			geren(id){
				this.$router.push({name:'geren',query:{id}})
			},
			pingdetail(id){
				this.$router.push({name:'pingdetail',query:{id}})
			},
			time(l){
			 	var a = new Date(l).getTime()
				var b = new Date().getTime()
				if( b-a >= 86400000){
					return '昨天' + new Date(l).getHours()+':'+new Date(l).getMinutes()
				}else if(b-a < 86400000){
					let c = b-a
					return parseInt(c/3600000)+'小时前'
				}
			},
			//https://m.weibo.cn/api/statuses/repostTimeline?id=4349513634439667&page=1
			//https://m.weibo.cn/api/attitudes/show?id=4349804245002097&page=1
			zanb(){
				this.pings = false
				this.zhuangs = false
				this.zans = true
				this.$http.get('api/api/attitudes/show',{
					params:{
						id:this.pit.id,
						page:1
					}
				}).then(res=>{
					console.log(res.data.data.data)
					this.zansarr = res.data.data.data
				})
			},
			z(){
				this.pings = false
				this.zhuangs = true
				this.zans = false
				this.$http.get('api/api/statuses/repostTimeline',{
					params:{
						id: this.pit.id,
						page:1
					}
				}).then(res=>{
					this.zhuangsarr = res.data.data.data
					console.log(this.zhuangsarr)
				})
			},
			ping(){
				this.$http.get('api/comments/hotflow', {
					params: {
						id: this.pit.id,
						mid: this.pit.mid,
					}
				}).then(res => {
					console.log(res.data)
					this.pingsarr = res.data.data.data
				})
				this.pings = true
				this.zhuangs = false
				this.zans = false
			},
			returns(){
				this.$router.go(-1)
			},
			sub(l) {
				return l.substring(l.length - 3)
			},
			ends(va){
				this.zhes = va
			},
			xiaos(va){
				this.zhes = va
			},
			zhe(zhe) {
				this.zhepic = []
				console.log(body)
				body[0].style.overflow = 'hidden'
				this.zhes = true
				if(zhe.constructor == Array){
					this.zhepic = zhe
				}else{
					this.zhepic.push(zhe)
				}
				
				console.log(this.zhepic)
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
		}
	}
	//https://m.weibo.cn/api/statuses/repostTimeline?id=4349513634439667&page=1
	//https://m.weibo.cn/comments/hotflow?id=4349513634439667&mid=4349513634439667&max_id_type=0
</script>

<style>
.dteails-header{
	height: 50px;
	background: #FAFAFA;
	border-bottom: .5px solid #e6e6e6;
	font-size: .3rem;
	line-height: 50px;
	position: relative;
}
.dteails-header>span{
	position: absolute;
	left: 20px;
	line-height: 50px;
}
.pic-box{
	padding-bottom: 10px;
}
.lite-page-tab{
	border-top: 5px solid #f2f2f2;
}
.lite-page-tab{
	height: .8rem;
	border-bottom: .5px solid #e6e6e6;
	display: flex;
	justify-content: flex-start;
	font-size: .25rem;
	line-height: .8rem;
}
.lite-page-tab>div{
	width: 1.5rem;
}
.tabavt{
	border-bottom: 2px solid black;
}
.deta-box{
	width: 100%;
}
.detaname{
	overflow: hidden;
	font-size: .25rem;
	height: .25rem;
	text-align: left;
	width: 70%;
	transform: translateY(.45rem);
}
.deta-text{
	padding-left: 40px;
	width: 80%;
	
	transform: translateY(-.2rem);
}
.deta-ping{
	width: 75%;
	margin-left: 15%;
	background: #f7f7f7;
	font-size: .25rem;
	text-align: left;
	padding-top: 5px;
	padding-bottom: 5px;
	padding-right: 5px;
}
.deta-ping>div{
	margin-left: 5px;
	margin-top: 5px;
	margin-bottom: 5px;
}
.time{
	margin-top: 20px;
	color: #CCCCCC;
	font-size: .2rem;
	width: 75%;
	text-align: left;
	margin-left: 15%;
	padding-bottom: 20px;
	border-bottom: .5px solid #e6e6e6
}
.pinit-pic{
	width: 80%;
	margin-left: 20%;
}
.pinit-pic>img{
	width: 2rem;
	margin-left: -70%;
}
.zhuang-box{
	display: flex;
}
.zhuang-box>.logo img{
	width: .6rem;
    height: .6rem;
    border-radius: 50%;
    margin-top: 20px;
    margin-right: 10px;
}
.zhuanit-right{
	padding-left: 20px;
	text-align: left;
	width: 90%;
}
.zhuanit-right>.name{
	margin-top: 20px;
}
.zhuanit-right>.time{
	width: 100%;
	margin-left: 0;
}
.zans-box{
	display: flex;
	height: 50px;
	line-height: 50px;
	border-bottom: .5px solid #E6E6E6;
}
.zans-box>.logo{
	width: .5rem;
    height: .5rem;
    border-radius: 50%;
	margin-top: 10px;
    margin-right: 10px;
    margin-left: 20px;
}
.zans-box>.name{

}
</style>