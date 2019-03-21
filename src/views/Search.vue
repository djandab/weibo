<template>
	<div>
	<div class="header">
		<div class="logo">
			<img src="../../public/img/logo.svg" />
		</div>
		<div @click="search" class="search">
			<div class="iconfont icon-sousuo sousuo"></div>
			<input  :placeholder="'大家都在搜:'+ hot" />
		</div>
		<div class="right">
			<div class="iconfont icon-bi"></div>
		</div>
	</div>
	<div class="navigation">
		<Navigation :nav="navigation"></Navigation>
	</div>
	</div>
</template>
<router-view></router-view>
<script>
	import Navigation from '../components/Navigation.vue'
	export default{
		name:'Search',
		data(){
			return{
				hot:'',
				navigation:[]
			}
		},
		mounted(){
			this.$http.get('/api/api/config/list')
			.then(res => {
				console.log(res.data.data.channel)
				console.log(res.data.data.hot.hotWord)
				this.hot = res.data.data.hot.hotWord
				this.navigation = res.data.data.channel
			})
		},
		methods:{
			search(){
				this.$router.push({name:'searchzhu'})
			}
		},
		components:{
			Navigation
		}
	}
</script>

<style>
.header{
	position: sticky;
	top: 0px;
	z-index: 6;
	background: #fafafa;
	display: flex;
	height: 50px;
	justify-content: space-around;
	line-height: 50px;
}
.logo>img{
	width: .5rem;
	height: .5rem;
	transform: translateY(-.1rem);
	margin-left: .25rem;
}
.logo,.right{
	width: 10%;
}
.search{
	position: relative;
	width: 80%;
}
.search>.sousuo{
	position: absolute;
	left: .4rem;
	z-index: 1;
}
.search>input{
	border: none;
	background: #ebebec;
	width: 80%;
	height: .45rem;
	transform: translateY(-.25rem);
	padding-left: .5rem;
	outline-style: none;
	font-size: .25rem;
}
.right{
	padding-right: .2rem;
}
</style>