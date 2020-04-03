<template>
	<view class="home">
		<view class="top">
			<navBar :type="is_show === 1 ? true : false"/>
			<MyCity @change="cityChange" />
		</view>
		<view class="box padding-top-xs">
			<swiper :indicator-dots="false" class="screen-swiper round-dot" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item v-for="(item, index) in s" :key="index">
					<image :src="item.pic" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
			<view class="list margin-top-sm padding-bottom-xs margin-bottom-sm">
				<view class="item solid-bottom" v-for="(item, index) in x" :key="index" v-if="item.column_id !== 14">
					<block v-if="item.imgurl">
						<swiper previous-margin="20rpx" :indicator-dots="false" :autoplay="true" :display-multiple-items="3" :interval="4000" :duration="1500">
							<swiper-item v-for="(img, idx) in item.imgurl" :key="idx" @tap="viewImg(idx, item.imgurl)">
								<view :style="{ backgroundImage: 'url('+img+')' }"></view>
							</swiper-item>				
						</swiper>						
					</block>
					<view class="margin-sm btm">
						<view class="tool" v-if="item.show">
							<userAuth @tap.stop=""></userAuth>
							<view class="el" @tap.stop="moreAction(0, item)"><text class="cuIcon-likefill padding-right-xs"></text><text class="text-sm">收藏</text></view>
							<view class="el" @tap.stop="moreAction(1, item)"><text class="cuIcon-appreciatefill padding-right-xs"></text><text class="text-sm">点赞</text></view>
							<view class="el" @tap.stop="moreAction(2, item)"><text class="cuIcon-messagefill padding-right-xs"></text><text class="text-sm">评论</text></view>
							<view class="el" @tap.stop="moreAction(3, item)"><text class="cuIcon-fork padding-right-xs"></text><button open-type="share" hover-class="none" class="share">转发</button></view>
						</view>
						<view class="flex align-center justify-between"><view class="cu-tag bg-red margin-right-xs">{{ item.cate_name }}</view><view class="flex-sub text-cut" @tap="toDetail" :data-item="item" @longpress.stop="LongPress(index)">{{ item.title }}</view>
						<view class="more" @tap.stop="tapAction(item, index)"></view>
						</view>
						<view v-if="!item.imgurl">
							<view class="padding-xs text-df">{{ item.content || item.describe }}</view>
						</view>
						<view class="flex justify-between margin-top-xs text-gray padding-bottom-xs">
							<view class="flex align-center"><text class="cuIcon-location padding-right-xs"></text><text class="text-xs">{{ item.region }}</text></view>
							<view class="flex align-center" v-if="item.phone"><text class="cuIcon-phone padding-right-xs"></text><text class="text-xs">{{ item.phone }}</text></view>
						</view>
					</view>
				</view>
				<view class="item margin-tb-sm padding-sm bg-white solid-bottom" v-else @tap="toDetail" :data-item="item">
					<view class="flex justify-between">
						<view class="cu-tag bg-grey">{{ item.cate_name }}</view>
						<view class="cu-steps steps-arrow">
							<view class="cu-item padding-lr">
								<view class="cu-tag bg-sea padding-lr">{{ item.address_start }}</view>
							</view>
							<view class="cu-item padding-left">
								<view class="cu-tag bg-sea padding-lr">{{ item.address_end }}</view>
							</view>							
						</view>
					</view>
					<view class="flex justify-end margin-tb-xs">
						<view class="margin-tb-xs flex align-center">
							<text class="cuIcon-time padding-right-xs"></text>
							<text class="text-xs">{{ item.top_starttime }}</text>
						</view>
					</view>
					<view class="flex justify-between align-center">
						<view class="cu-tag line-gray">{{ item.state === '0' ? '正常' : item.stete === '1' ? '已找车' : '车已满' }}</view>
						<view class="flex align-center">
							<view class="cu-capsule radius">
								<view class="cu-tag bg-grey"><text class="cuIcon-phone"></text></view>
								<view class="cu-tag line-grey">{{ item.phone }}</view>
							</view>
							<view class="padding-left-sm" @tap.stop="moreAction(2, item)"><text class="cuIcon-messagefill text-sea"></text></view>
						</view>
					</view>
				</view>				
			</view>
		</view>
		<view class="cu-modal" :class="{ show }">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">评论</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-top-xs">
					<form>
						<view class="cu-form-group text-left">
							<view style="height: 175rpx;color:#999" v-if="!show" class="padding-tb-sm">请输入评论内容</view>
							<textarea fixed placeholder="请输入评论内容" v-model="params.content" v-else/>
						</view>
						<view class="cu-form-group">
							<button class="cu-btn bg-red sm" @tap="Publish">发表</button>
						</view>
					</form>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import NavBar from '@/components/nav'
	import MyCity from '@/components/mycity'
	import qqMap from '@/utils/qqmap-wx-jssdk.min'
	import { getIndexCate, placardList } from '@/api'
	import { mapActions } from 'vuex'
	const qqMapSdk = new qqMap({ key: 'TEDBZ-3JWEX-TRZ45-76W7H-BPKXV-E6BAS' })
	export default {
		name: 'home',
		onShareAppMessage (res) {},
		async onPullDownRefresh () {
			uni.showLoading({ title: '请稍后' })
			await this.getIndex()
			uni.hideLoading()
			uni.stopPullDownRefresh()
		},
		data () {
			return {
				shareItem: {},
				show: false,
				action: false,
				cItem: {},
				is_show: 1,
				currentIndex: 0,
				itemList: ['复制文本', '收藏', '举报'],
				reason: ['色情/暴力', '反动/诈骗', '内容虚假', '货品质量差', '服务态度差'],
				tabulation: [],
				params: {
					first_id: 0,
					pid: -1,
					content: '',
					receive_uid: ''
				},
				s: [], //轮播图
				x: [], // 列表
			}
		},
		components: { NavBar, MyCity },
		onShow () {
			this.getIndex()
		},
		methods: {
			...mapActions(['actionTool', 'replay']),
			viewImg(current, urls) {
				uni.previewImage({
					current,
					urls,
					indicator: 'number'
				})
			},
			Publish () {
				if (this.params.content) {
					uni.showLoading({ mask: true, title: '请稍后' })
					const data = {...this.params, placard_id: this.cItem.id, column_id: this.cItem.column_id}
					this.replay(data).then(res => {
						if(res.code === 200) {
							this.show = false
							this.params.content = ''
							uni.showToast({
								icon: 'none',
								title: res.msg
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: res.msg
							})
						}
					})
				}
			},
			noEvent() {}, // 废弃的
			async cityChange (region) {
				uni.showLoading({ title: '加载中' })
				await this.getPlaCardList(region)
				uni.hideLoading()
			},
			hideModal () { this.show = false },
			toDetail (e) {
				const item = e.currentTarget.dataset.item
				if (item.column_id !== 13) {
					uni.navigateTo({
						url: `/pages/detail?placard_id=${item.id}&column_id=${item.column_id}`
					})
				} else {
					uni.navigateTo({
						url: `/pages/productlist?id=${item.id}`
					})
				}
			},
			tapAction (item, index) {
				this.x = this.x.map((t, _) => {
					t.show = index === _ ? !item.show : false
					return t
				})
			},
			async moreAction(type, item) {
				const placard_id = item.id
				const column_id = item.column_id
				if (![2, 3].includes(type)) {
					await this.actionTool({data:{ placard_id, column_id }, type})
				} else {
					if (type !== 3) {
						this.show = true
						this.cItem = item
						this.params.receive_uid = item.uid
					}
				}
				item.show = false
			},
			LongPress (e) { // 帖子长按事件
				this.currentIndex = e
				uni.showActionSheet({
					itemList: this.itemList,
					success: (tap) => {
						switch (tap.tapIndex){
							case 0:
							uni.setClipboardData({
								data: this.x[this.currentIndex].title,
								success: _ => {
									this.action = false
									uni.showToast({
										title: '复制成功'
									})
								}
							})
							break;
							case 1:
							uni.showToast({
								title: '收藏成功',
								success: () => {
									this.action = false
								}
							})
							break;
							case 2:
							uni.showActionSheet({
								itemList: this.reason,
								success: (e) => {
									console.log(e.tapIndex)
									uni.showToast({
										title: '举报成功',
										success: () => {
											this.action = false
										}
									})
								},
								fail: (e) => {
									console.log(e)
								}
							})
							break;
						}
					}
				})
			},
			async getIndex () {
				const region = await this.getPlaCardIndex()
				await this.getPlaCardList(region)
				uni.getLocation({
					altitude: false,
					success: rst => {
						const latitude = rst.latitude
						const longitude = rst.longitude
						qqMapSdk.reverseGeocoder({
							location: {
								latitude,
								longitude
							},
							success: addr => {
								const address = addr.result
								this.$store.commit('SET_ADDR', address.address_component)
							}
						})
					}
				})
			},
			getPlaCardIndex () {
				return new Promise(resolve => {
					getIndexCate().then(res => {
						const data = res.data
						this.$store.commit('SET_NAV', data.cate_name)
						this.$store.commit('SET_CITY', data.region)
						this.$store.commit('SET_RULE', data.rule)
						this.s = data.roll
						this.is_show = data.is_show
						const region = uni.getStorageSync('region')
						this.$store.commit('SET_CONTACT', {phone: data.phone, address: data.address})					
						if (!region) {
							uni.setStorageSync('region', data.region[0])
							this.$store.commit('SET_TAP', uni.getStorageSync('Tap') || 0)
						} else {
							this.$store.commit('SET_TAP', uni.getStorageSync('currentTab') || 0)
						}
						resolve(region ? region : data.region[0])
					})
				})
			},
			getPlaCardList (region) {
				return new Promise(resolve => {
					placardList({ region }).then(res => {
						this.x = res.data.map(item => {
							item.column_id = +item.column_id
							item.show = false
							if (item.column_id !== 14 && item.imageUrl) while (item.imgurl.length < 3) item.imgurl.push('/static/no_pic.png')
							return item
						})
						resolve()
					})
				})
			},
			actionSheet (e) {
				switch(+e.currentTarget.dataset.index) {
					default:
					this.action = false
				}				
			}
		}
	}
</script>

<style lang="scss" scoped>
.home {
	.top {
		// position: sticky;
		// top: 0;
		// /* #ifdef H5 */
		// top: var(--window-top);
		// /* #endif */
		background-color: white;
		box-shadow: 0px 0 40rpx 0px #dedede;
		z-index: 999;
	}
	.box {
		overflow: hidden;
		.list {
			.item {
				margin-bottom: 10rpx;
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
				.more {
					width: 80rpx;
					height: 50rpx;
					background:url(../../../static/images/more.png) no-repeat center center/contain;
				}
				.btm {
					position: relative;
					.tool {
						position: absolute;
						background-color:#516a04;
						color: white;
						z-index: 99;
						display: flex;
						padding: 18rpx 15rpx;
						border-radius: 10rpx;
						overflow: hidden;
						right: 90rpx;
						top: 10rpx;
						.share {
							background-color:transparent;
							border: 0 none;
							height: auto;
							padding: 0;
							margin: 0;
							font-size: 24rpx;
							display: inline;
							color: white;
							line-height: 1;
							&::after {
								border: 0 none;
								display: none;
							}
						}
						.el {
							&:not(:last-of-type) {
								padding-right: 10rpx;
								margin-right: 10rpx;
								border-right: 1rpx solid #5961d6;
							}
						}
					}
				}
			}
		}
	}
}	
</style>
