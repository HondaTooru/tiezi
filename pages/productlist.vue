<template>
	<view class="product">
		<view class="list" v-if="list.length">
			<view class="margin-top-sm padding-bottom-xs margin-bottom-sm">
				<view class="item solid-bottom" v-for="(item, index) in list" :key="index">
					<swiper previous-margin="20rpx" :indicator-dots="false" :autoplay="true" :display-multiple-items="3" :interval="4000" :duration="1500">
						<swiper-item v-for="(img, idx) in item.imgurl" :key="idx">
							<view :style="{ backgroundImage: 'url('+img+')' }"  @tap="viewImg(idx, item.imgurl)"></view>
						</swiper-item>				
					</swiper>
					<view class="margin-sm">
						<view class="flex align-center padding-bottom-xs"><view class="text-cut">{{ item.name }}</view></view>
<!-- 						<view class="flex justify-between padding-tb-xs text-gray">
							<view class="flex align-center"><text class="cuIcon-location padding-right-xs"></text><text class="text-xs">{{ item.region }}</text></view>
						</view> -->
					</view>
				</view>
			</view>			
		</view>
		<empty-data v-else></empty-data>
		<tabBar :url="'/pages/post/product?id='+id" name="发布"></tabBar>
		<view class="share radius">
			<view class="padding-sm" @tap="callPhone">
				<text class="lg text-white cuIcon-phone"></text>
				<text class="text-white padding-lr-xs">联系方式</text>
			</view>	
		</view>
		<com-share></com-share>		
	</view>
</template>

<script>
	import { MyProductList } from '@/api'
	export default {
		data () {
			return {
				list: [],
				id: '',
				phone: ''
			}
		},
		onLoad (option) {
			this.id = option.id
			this.phone = option.phone
			this.getList(this.id)
		},
		onPullDownRefresh () {
			this.getList(this.id, 1)
		},		
		methods: {
			viewImg(current, urls) {
				uni.previewImage({
					current,
					urls,
					indicator: 'number'
				})
			},
			callPhone () {
				uni.makePhoneCall({
					phoneNumber: this.phone
				})
			},						
			getList (store_id, type) {
				uni.showLoading({ title: '加载中' })
				MyProductList({ store_id }).then(res => {
					uni.hideLoading()
					this.list = res.data.data
					if (type) uni.stopPullDownRefresh()
				})
			}
		}
	}
</script>

<style lang="scss">
	.product {
		padding-bottom: calc(100rpx + env(safe-area-inset-bottom) / 2);
		.list {
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
		.share {
			position: fixed;
			top: 60%;
			background-color: rgba(223, 66, 54, .9);
			right: 5rpx;
			z-index: 9999;
		}
	}
</style>
