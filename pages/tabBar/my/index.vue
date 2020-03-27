<template>
	<view class="my">
		<com-share></com-share>
		<view class="bg-sea padding-lr-sm padding-tb-xl">
			<userAuth></userAuth>
			<view class="flex align-center">
				<view class="cu-avatar xl round" :style="{backgroundImage: 'url('+uAvatar+')'}"></view>
				<view class="margin-left flex flex-direction" v-if="isLogin">
					<view>
						<view class="cu-tag bg-white">钱包: {{ userInfo.now_money }}</view>
						<view class="cu-tag bg-red">积分: {{ userInfo.integral }}</view>
						<view class="cu-tag bg-orange" v-if="userInfo.vip">VIP</view>						
					</view>
					<view>
						<view class="margin-top-xs" v-if="address.city"><text class="cuIcon-location padding-right-xs"></text>{{ address.city }}</view>
					</view>
				</view>
				<view v-else class="margin-left text-lg">
					点击微信授权登录
				</view>
			</view>
		</view>
		<block v-if="isLogin">
			<view class="box margin-top-sm">
				<view class="tabs solid-bottom">
					<view :class="['tab text-sm', { act: act === index }]" v-for="(item, index) in tabs" :key="index" @tap="change(index)">{{ item }}</view>
				</view>
				<view class="scrollbox bg-white">
					<scroll-view scroll-y class="srx" @scrolltolower="loadMore" v-if="list.length">
						<view class="cu-list menu">
							<view class="cu-item" v-for="(item, i) in list" :key="i">
								<view class="content">
									<navigator class="text-sm text-cut" :url="'/pages/detail?placard_id='+item.id+'&column_id='+item.column_id">{{ item.title || item.content }}</navigator>
								</view>
								<view class="action">
									<view class="cu-tag round bg-red" @tap="toTop(item)" v-if="!act">置顶</view>
									<view class="cu-tag round bg-olive light" @tap="Edit(item)" v-if="!act">编辑</view>
									<view class="cu-tag round bg-red light" @tap="delItem(item, i)">{{ !act ? '删除' : '取消' }}</view>
								</view>
							</view>
						</view>
					</scroll-view>
					<EmptyData v-else :src="src">{{ act ? '你还没有收藏的帖子' : '你还没有发表帖子' }}</EmptyData>
				</view>
			</view>
			<block v-for="(item, index) in userShop" :key="index">
				<view class="margin-top-sm bg-sea padding-sm shop-name">
					<view class="shop text-center text-df">{{ item.title }}</view>
					<view class="text-xs">{{ item.describe }}</view>
					<view class="flex justify-between">
						<view class="margin-top-xs"><text class="cuIcon-location padding-right-xs"></text>{{ item.address }}</view>
						<view class="margin-top-xs"><text class="cuIcon-phone padding-right-xs"></text>{{ item.phone }}</view>
					</view>
				</view>
				<view class="tx margin-top-sm padding-bottom-xs margin-bottom-sm">
					<view class="flex justify-end padding-sm">
						<view class="flex">
							<view class="cu-btn bg-red sm">置顶店铺</view>
							<navigator :url="'/pages/post/product?id='+item.id" hover-class="none" class="cu-btn bg-orange sm margin-left-sm" @tap="toProductList(item)">发布产品</navigator>
							<view class="cu-btn bg-yellow sm margin-left-sm" @tap="toProductList(item)">更多产品</view>
							<view class="action margin-left-sm">
								<view class="cu-btn bg-sea sm" @tap="editShop(item)">编辑店铺</view>
								<view class="cu-btn bg-black sm margin-left-sm" @tap="delShop({ data: { placard_id: item.id, column_id: item.column_id }, index })">删除店铺</view>
							</view>								
						</view>
					</view>
					<view class="item" v-for="(pro, idx) in item.product_list" :key="idx">
						<swiper previous-margin="20rpx" :indicator-dots="false" :autoplay="true" :display-multiple-items="3" :interval="4000" :duration="1500">
							<swiper-item v-for="(img, i) in pro.imgurl" :key="i">
								<view :style="{ backgroundImage: 'url('+img+')' }" @tap="viewImg(i, pro.imgurl)"></view>
							</swiper-item>				
						</swiper>
						<view class="margin-sm">
							<view class="flex justify-between">
								<view class="text-cut">{{ pro.name }}</view>
								<view class="action">
									<view class="cu-btn bg-sea sm" @tap="editPro(item, pro)">编辑</view>
									<view class="cu-btn bg-black sm margin-left-sm" @tap="delProduct(item.id, pro.id)">删除</view>
								</view>
							</view>
						</view>
					</view>
				</view>					
			</block>
		</block>
		<EmptyData src="/static/images/wxlogin.png" v-if="!isLogin">您还没登录</EmptyData>
	</view>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
	import { placardCate } from '@/api'
	import AVATAR from '@/static/images/avatar.png'
	export default {
		onShareAppMessage (res) {
			return {
				title: '个人中心',
				path: '/pages/tabBar/my/index'
			}
		},
		data () {
			return {
				tabs: ['发表的帖子', '收藏的帖子'],
				act: 0,
				page: 1,
				column_id: ''
			}
		},
		onPullDownRefresh () {
			this.page = 1
			this.reFresh()
		},
		methods: {
			...mapActions(['reFresh', 'getList', 'delMyCollect', 'delMyPost', 'delPro']),
			change (idx) {
				this.act = idx
			},
			async editPro(item, pro) {
				uni.showLoading({ title: '请稍后' })
				this.column_id = +item.column_id
				await this.getCate()
				uni.navigateTo({
					url: `/pages/post/product?id=${pro.store_id}`,
					success: () => {
						uni.setStorageSync('details', {...pro, type: -2})
						uni.setStorageSync('nav', { name: '本地店铺', id: +item.column_id })
					}
				})
				uni.hideLoading()					
				
			},
			async editShop (item) {
				uni.showLoading({ title: '请稍后' })
				this.column_id = +item.column_id
				await this.getCate()
				uni.navigateTo({
					url: `/pages/post/shop`,
					success: () => {
						uni.setStorageSync('details', item)
					}
				})
				uni.hideLoading()				
			},
			async toProductList (item) {
				uni.showLoading({ title: '请稍后' })
				this.column_id = +item.column_id
				await this.getCate()
				uni.navigateTo({
					url: `/pages/productlist?id=${item.id}`
				})
				uni.hideLoading()
			},
			delShop ({data, idx}) {
				uni.showModal({
					content: '你确认删除吗？',
					success: rst => {
						if (rst.confirm) this.delMyPost({data, idx})
					}
				})
			},
			delProduct (store_id, id) {
				uni.showModal({
					content: '你确认删除吗？',
					success: rst => {
						if (rst.confirm) this.delPro({ store_id, id })
					}
				})
			},
			loadMore () {
				if (this.act) {
					this.page++
					this.$store.commit('SET_PAGE', this.page)
					this.getList()
				}
			},
			viewImg(current, urls) {
				uni.previewImage({
					current,
					urls,
					indicator: 'number'
				})
			},			
			delItem (item, idx) {
				uni.showModal({
					content: `你确定${!this.act ? '删除' : '取消'}`,
					success: rst => {
						if(rst.confirm) !this.act ? this.delMyPost({ data: { placard_id: item.id, column_id: item.column_id }, idx }) : this.delMyCollect(item.id)
					}
				})
			},
			getCate () {
				return new Promise(resolve => {
					placardCate({ column_id: this.column_id }).then(res => {
						uni.setStorageSync('cate', res.data.cate_name)
						resolve()
					})
				})
			},			
			async Edit (item) {
				uni.showLoading({ mask: true, title: '请稍后' })
				this.column_id = +item.column_id
				await this.getCate()
				uni.hideLoading()
				uni.navigateTo({
					url: `${this.url}`,
					success: () => {
						uni.setStorageSync('details', item)
					}
				})
			}
		},
		computed: {
			...mapGetters(['isLogin', 'userInfo', 'address', 'tiez', 'collect', 'userShop']),
			url () {
				let url = '/pages/post/'
				if (this.column_id === 16) url += 'nav'
				if (this.column_id === 14) url += 'fdcar'
				if (this.column_id === 13) url += 'shop'
				if (this.column_id === 11) url +='village'
				if (this.column_id === 10) url += 'rent'
				if (this.column_id === 9) url += 'invite'
				if (this.column_id === 58) url += 'used'
				if (this.column_id === 1) url += 'serivces'
				if (this.column_id === 6) url += 'help'
				if (this.column_id === 30) url += 'taxi'
				if (this.column_id === 49) url += 'skill'
				if (this.column_id === 74) url += 'love'
				return url
			},
			list () {
				return !this.act ? this.tiez : this.collect 
			},
			src () {
				return !this.act ? '/static/images/post.png' : '/static/images/favorite.png'
			},
			uAvatar () {
				return this.isLogin ? this.userInfo.avatar : AVATAR
			}
		}
	}
</script>

<style lang="scss" scoped>
.my {
	background-color:#f1f1f1;
	.bg-sea {position: relative;}
	.shop-name {
		position: sticky;
		top: 0;
		box-shadow: 0px 0 40rpx 0px #dedede;
		z-index: 999;
	}
	.tabs {
		  display: flex;
		  height: 80rpx;
		  padding: 0 15rpx;
		  background-color: white;
		  & > .tab {
			  display: flex;
			  align-items: center;
			  padding: 0 15rpx;
			  height: 100%;
			  position: relative;
			  &.act {
				  font-weight: bold;
				  color: #6B69D6;
				  &::after {
					  position: absolute;
					  left: 0;
					  bottom: 0;
					  width: 100%;
					  content: '';
					  height: 4rpx;
					  background-color: #6B69D6;
				  }
			  }
		  }
	}
	.tx {
		background-color: white;
		.item {
			swiper {
				height: 230rpx;
				swiper-item {
					view {
						height: 100%;
						margin-right:20rpx;
						background-repeat: no-repeat;
						background-size: cover;
						background-position: center top;
					}
				}
			}
		}
	}
	.scrollbox {
		height: 620rpx;
		overflow: hidden;
		.srx {
			height: 100%;
		}
	}
}	
</style>
