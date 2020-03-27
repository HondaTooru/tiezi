<template>
<view class="compage">
	<comTop @on-change="cityChange">
		<view class="type" slot="head">
			<view class="item" v-for="(item ,index) in type" :key="index"><view @tap="change" :data-index="index" :class="['atx', { active: currentTab === index }]">{{ item.cate_name }}</view></view>
		</view>		
	</comTop>
	<view class="box">
		<swiper :indicator-dots="false" class="screen-swiper round-dot banner" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item, index) in swiper" :key="index">
				<image :src="item.pic" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		<view class="list margin-xs" v-if="list.length">
			<navigator hover-class="none" :url="'/pages/detail?placard_id='+item.id+'&column_id='+item.column_id" class="item" v-for="(item, i) in list" :key="i">
				<swiper :indicator-dots="false" class="screen-swiper round-dot" :autoplay="true" :interval="3000" :duration="1000">
					<swiper-item v-for="(img, index) in item.imgurl" :key="index">
						<image :src="img" mode="aspectFill"></image>
					</swiper-item>
				</swiper>
				<view class="flex align-center margin-tb-sm"><view class="cu-tag bg-red margin-right-xs">{{ item.category }}</view><view class="text-cut">{{ item.title }}</view></view>
			</navigator>			
		</view>
		<EmptyData v-else></EmptyData>
	</view>
	<tabBar :url="url"></tabBar>	
</view>	
</template>

<script>
import { placardCate, placardRanking } from '@/api'
import { mapGetters } from 'vuex'
export default {
	props: {
		url: String
	},
	data () {
		return {
			column_id: '',
			region: '',
			query: {
				limit: 10,
				page:1
			},
			list: [],
			type: [],
			swiper: [],
			currentTab: 0,
			category_id: ''
		}
	},
	computed: {
		...mapGetters(['cityList'])
	},
	watch: {
		query: {
			async handler (val, oldval) {
				uni.showLoading({ mask:true, title: '加载中' })
				console.log(this.category_id)
				await this.getList(this.category_id)
				uni.hideLoading()
			},
			deep: true
		}
	},
	created () {
		const option = uni.getStorageSync('nav')
		const name = option.name
		this.column_id = option.id
		uni.setNavigationBarTitle({
			title: name
		})
		this.region = this.cityList[0]
		this.loadDetails()
		uni.$on('onBottom', () => {
			this.query.page++
		})
	},
	destroyed() {
		uni.$off('onBottom')
	},
	methods: {
		toDetail (e) {
			const item = e.currentTarget.dataset.item
			uni.navigateTo({
				url: `/pages/detail?placard_id=${item.id}&column_id=${item.column_id}`
			})
		},		
		change(e) {
			const index = e.currentTarget.dataset.index
			this.category_id = this.type[index].id
			this.query.page = 1
			this.getList(this.category_id).then(res => {
				this.currentTab = index
				console.log(this.list)
			})
		},
		cityChange (e) {
			this.region = e
			this.query.page = 1
			this.getList(this.category_id)
		},
		async loadDetails () {
			uni.showLoading({ title: '加载中' })
			await this.getCate()
			await this.getList(this.type[0].id)
			uni.hideLoading()
		},
		getCate () {
			return new Promise(resolve => {
				placardCate({ column_id: this.column_id }).then(res => {
					this.type = res.data.cate_name
					uni.setStorageSync('cate', res.data.cate_name)
					this.category_id = this.type[0].id
					this.swiper = res.data.roll
					resolve()
				})
			})
		},
		getList (category_id) {
			return new Promise(resolve => {
				placardRanking({ column_id: this.column_id, category_id, ...this.query, region: this.region }).then(res =>{
					if (this.query.page === 1) this.list = []
					this.list = [...this.list, ...res.data.data]
					if (this.query.page !== 1 && res.data.data.length < this.query.limit) {
						uni.showToast({
							icon: 'none',
							title: '没有更多数据了~'
						})
					}
					resolve()
				})
			})
		}
	}
}	
</script>

<style lang="scss" scoped>
.compage {
	padding-bottom: calc(100rpx + env(safe-area-inset-bottom) / 2);	
	.box {
		.banner {
			min-height: 200rpx;
		}
		.list {
			.screen-swiper {
				min-height: 100vw;
			}
		}
	}
	.type {
		display: flex;
		flex-wrap: wrap;
		padding: 8rpx;
		.item {
			flex-basis: 25%;
			overflow: hidden;
			.atx {
				margin: 8rpx;
				text-align: center;
				padding: 15rpx 0;
				font-size: 20rpx;
				box-sizing: border-box;
				border: 1px solid #6B69D6;
				&.active {
					color: white;
					background-color:#516a04;
				}
			}
		}
	}	
}	
</style>
