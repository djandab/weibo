<template>
	<div>
		<div class="top">
			<span @click="returns"><</span>
			<div class="search">
				<div class="iconfont icon-sousuo sou"></div>
				<input ref="inp" @keydown.enter="sou" type="text" :placeholder="'大家都在搜:'+ hotwords" />
			</div>
		</div>

		<div>
			<div v-for="(it,i) in card" :key="i">
				<div class="on-box" v-if="it.card_type==17">
					<a :href="tid.scheme" style="color: #939393;" class="on" v-for="(tid,i) in it.group" :key="i">
						{{tid.title_sub}}<img v-if="tid.icon" :src="tid.icon" />
					</a>
				</div>
				<div class="b-box" v-if="it.card_type==19">
					<a :href="bid.scheme" style="color: #939393;" class="b" v-for="(bid,i) in it.group" :key="i">
						<img :src="bid.pic" />
						<p>{{bid.title_sub}}</p>
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	//https://m.weibo.cn/api/container/getIndex?containerid=231583&page_type=searchall
	//https://m.weibo.cn/api/container/getIndex?containerid=100103type=1&q=one&page_type=searchall
	//https://m.weibo.cn/api/container/getIndex?containerid=100103type%3D1%26q%3Dqfqvqwdfb&page_type=searchall
	export default {
		name: 'Searchzhu',
		data() {
			return {
				hotwords: '',
				card: []
			}
		},
		mounted() {
			this.$http.get('api/api/container/getIndex', {
				params: {
					containerid: 231583,
					page_type: 'searchall'
				}
			}).then(res => {
				console.log(res.data)
				this.hotwords = res.data.data.hotwords[0].note
				console.log(this.hotwords)
				this.card = res.data.data.cards[0].card_group
			})
		},
		methods: {
			returns() {
				this.$router.go(-1)
			},
			sou() {
				console.log(this.$refs.inp.value)
				this.$router.push({
					name: 'searchtwo',
					query: {
						val: this.$refs.inp.value
					}
				})
				//				this.$http.get('api/api/container/getIndex?containerid=100103type%3D1%26q%3D'+this.$refs.inp.value,{
				//					params:{
				//						page_type :'searchall'
				//					}	
				//				}).then(res =>{
				//					console.log(res.data)
				//				})
			}
		}
	}
</script>

<style scoped>
	.top {
		height: 40px;
		font-size: .3rem;
		text-align: left;
		line-height: 40px;
		padding-left: 10px;
		border-bottom: .5px solid #EBEBEC;
	}
	
	.search {
		top: -25px;
		position: relative;
		left: 30px;
	}
	
	.sou {
		position: absolute;
		left: 8px;
		z-index: 1;
		top: -13px;
	}
	
	.search input {
		border-radius: 3px;
		width: 100%;
	}
	
	.on-box ,.b-box{
		display: flex;
		flex-wrap: wrap;
	}
	
	.on {
		padding-top: 10px;
		padding-bottom: 10px;
		font-size: .25rem;
		width: 45%;
		padding-left: 10px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		text-align: left;
	}
	.on>img{
		width: .2rem;
		height: .2rem;
	}
	.b{
		margin-top: 10px;
		width: 20%;
		font-size: .22rem;
	}
	.b>img{
		width: .7rem;
		height: .7rem;
	}
</style>