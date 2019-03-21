<template>
	<div>
		<div class="ping-de-header">
			<span @click="returns"><</span>
			<div>{{pingarr.total_number}}条回复</div>
			<div class="ping-top-box top-act">
				<div>
					<img class="logo" :src="pingarr.rootComment[0].user.profile_image_url" />
				</div>
				<div class="ping-top-right">
					<p class="name">{{pingarr.rootComment[0].user.screen_name}}</p>
					<div class="ping-text" v-html="pingarr.rootComment[0].text"></div>
					<div class="ping-but">
						<div>
							<p>{{time(pingarr.rootComment[0].created_at)}}</p>
							<a class="ckan" @click="returns">查看原微博</a>
						</div>
						<div>
							<span class="iconfont icon-dianzan ic">{{pingarr.rootComment[0].like_count}}</span>
							&nbsp;&nbsp;
							<span class="iconfont icon-pinglun ic"></span>
						</div>
						
					</div>
					
				</div>
			</div>
			<div class="ping-cont" v-for="(pit,i) in pingarr.data">
				<div class="ping-top-box">
				<div>
					<img class="logo" :src="pit.user.profile_image_url" />
				</div>
				<div class="ping-top-right">
					<p class="name">{{pit.user.screen_name}}</p>
					<div class="ping-text" v-html="pit.text"></div>
					<div class="avit">
						<div>
							<p>{{time(pit.created_at)}}</p>
						</div>
						<div>
							<span class="iconfont icon-dianzan ic">{{pit.like_count}}</span>
						</div>
						
					</div>
					
				</div>
			</div>
			</div>
		</div>
	</div> 
</template>

<script>
	export default{
		name:'Pingdetail',
		data(){
			return{
				pingarr:[]
			}
		},
		mounted(){
			//https://m.weibo.cn/comments/hotFlowChild?cid=4349848180477984&max_id=0&max_id_type=0
			this.$http.get('api/comments/hotFlowChild',{
				params:{
					cid:this.$route.query.id,
					max_id:0,
					max_id_type:0
				}
			}).then(res => {
				console.log(res.data)
				this.pingarr = res.data
			})
		},
		methods:{
			returns(){
				this.$router.go(-1)
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
		}
	}
</script>

<style>
	.ping-de-header{
		height: 50px;
		background: #FAFAFA;
		border-bottom: .5px solid #e6e6e6;
		font-size: .3rem;
		line-height: 50px;
		position: relative;
	}
	.ping-de-header>span{
		position: absolute;
		left: 20px;
		line-height: 50px;
	}
	.ping-top-box{
		display: flex;
	}
	.top-act{
		border-bottom: .5px solid #CCCCCC;
	}
	.ping-top-box .logo{
		margin-left: 15px;
		width: .6rem;
	    height: .6rem;
	    border-radius: 50%;
	    float: left;
	    margin-top: 20px;
	    margin-right: 10px;
	}
	.ping-top-right{
		width: 80%;	
		text-align: left;
	}
	.ping-top-right>.name{
		margin-top: 10px;
	}
	.ping-text{
		    overflow: hidden;
    		width: 90%;
    		line-height: .35rem;
    		font-size: .27rem;
    		text-align: left;
	}
	.ping-but{
		display: flex;
		font-size: .23rem!important;
		color: #CCCCCC;
		padding-bottom: 20px;
	}
	.ping-but>div:first-of-type,.avit>div:first-of-type{
		position: relative;
		width: 70%;
	}
	.ckan{
		position: absolute;
		top: 30px;
		font-size: .27rem;
	}
	.ping-cont{
		background: #f7f7f7;
	}
	.avit{
		display: flex;
		font-size: .23rem !important;
		color: #CCCCCC;
		border-bottom: .5px solid #CCCCCC;
	}
	.ic{
		font-size: .23rem !important;
	}
</style>