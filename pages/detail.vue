<template>
<view class="detail">
	<view class="flex padding top">
		<view class="flex-sub">
			<view class="flex align-center">
				<view class="cu-tag bg-red margin-right-sm">{{ u.category }}</view>
				<view class="flex-sub text-cut text-white">{{ u.title }}</view>
			</view>
			<view class="flex margin-top-sm align-center">
				<view class="margin-right-sm text-gray text-xs">{{ u.diff }}</view>
				<view class=" text-xs text-gray">来自{{ u.region }}</view>
			</view>
		</view>
	</view>
	<view class="margin-tb-xs bg-white flex justify-between padding-tb-sm padding-lr">
		<view>地区</view>
		<view>{{ u.region }}</view>
	</view>
	<block v-if="u.column_id === '14'">
		<view class="margin-bottom-xs">
			<form>
				<view class="cu-form-group">
					<view class="title">出发地</view>
					<view>{{ u.address_start }}</view>
				</view>
				<view class="cu-form-group">
					<view class="title">目的地</view>
					<view>{{ u.address_end }}</view>
				</view>
				<view class="cu-form-group">
					<view class="title">出发时间</view>
					<view>{{ u.start_time }}</view>
				</view>
				<view class="cu-form-group">
					<view class="title">联系方式</view>
					<view class="call" @tap="callPhone">{{ u.phone }}<text class="margin-left-sm text-sea cuIcon-phone"></text></view>
				</view>
			</form>			
		</view>
	</block>
	<view class="padding-sm bg-white">
		<view class="cu-tag bg-red light margin-bottom-xs solid-bottom">{{ u.category }}</view>
		<view class="padding-tb-xs">
			{{ u.content || u.describe || '' }}
		</view>
		<view class="flex justify-between text-gray">
			<view class="flex align-center" @tap="toTap"><text class="cuIcon-appreciate text-xl padding-right-xs" :class="{ 'text-red': isLike }"></text><text class="text-xs" :class="{ 'text-red': isLike }">{{ u.fabulous_count }}</text></view>
			<view class="text-xs">
				<text class="padding-right-xs">{{ u.browse }}人浏览</text>
			</view>
		</view>
	</view>
	<block v-if="u.imgurl && u.imgurl.length">
		<view class="cu-bar bg-white solid-bottom margin-top-xs">
			<view class="action">
				<text class="cuIcon-titles text-red"></text>
				<text>图片浏览</text>
			</view>		
		</view>		
		<view class="bg-white padding-tb-xs">
			<swiper previous-margin="20rpx" :indicator-dots="false" :autoplay="true" :display-multiple-items="3" :interval="4000" :duration="1500">
				<swiper-item v-for="(img, idx) in u.imgurl" :key="idx" @tap="viewImg(idx, u.imgurl)">
					<view :style="{ backgroundImage: 'url('+img+')' }"></view>
				</swiper-item>				
			</swiper>						
		</view>			
	</block>
	<view class="cu-bar bg-white solid-bottom margin-top-xs">
		<view class="action">
			<text class="cuIcon-titles text-red"></text>
			<text>评论列表</text>
		</view>
		<view class="action">
			<button class="bg-sea cu-btn sm" @tap="moreAction({})">发表</button>
		</view>
	</view>	
	<view class="bg-white padding-sm">
		<view class="list" v-if="list.length">
			<view class="padding-tb-xs flex flex-direction" :class="{ 'solid-bottom': index !== list.length - 1 }" v-for="(item, index) in list" :key="index">
				<view class="flex justify-start">
					<view class="cu-avatar sm round margin-right-sm" :style="{ backgroundImage: 'url('+item.avatar+')' }"></view>
					<view class="flex flex-sub flex-direction">
						<view class="flex justify-between text-gray text-sm">
							<view>{{ item.reply_nickname }}</view>
							<view class="flex">
								<view>{{ item.created_at }}</view>
								<view @tap="deleteItem(item)" class=" margin-left-sm cuIcon-delete text-red" v-if="userInfo.uid === item.uid"></view>
							</view>
						</view>
						<view class="margin-top-sm margin-bottom-xs">{{ item.content }}</view>
					</view>					
				</view>
				<view class="flex justify-end text-gray">
					<!-- <view class="flex align-center"><text class="cuIcon-appreciate text-xl padding-right-xs"></text><text class="text-xs">{{ item.fabulous }}</text></view> -->
                    <view class="padding-left-sm" @tap.stop="moreAction(item)"><text class="cuIcon-messagefill text-sea"></text></view>
				</view>
				<view class="margin-left-lg text-sm margin-top-sm bg-gray padding-sm" v-if="item._childList.length">
					<view class="flex flex-direction" :class="{ 'margin-bottom-sm': idx !== item._childList.length - 1 }" v-for="(r, idx) in item._childList" :key="idx">
						<view>
							<text class="text-sea">{{ r.reply_nickname }}</text>
						    <block v-if="r.receive_nickname !== r.reply_nickname">回复<text class="text-sea">{{ r.receive_nickname }}</text></block>：{{ r.content }}</view>
						<view class="flex justify-between margin-top-xs"><view class="flex"><view class="text-xs">{{ r.created_at }}</view><view @tap="deleteItem(r)" class="margin-left-sm cuIcon-delete text-red" v-if="userInfo.uid === r.uid"></view></view><view v-if="userInfo.uid !== r.uid" class="padding-left-sm" @tap.stop="moreAction(item, r)"><text class="cuIcon-messagefill text-sea"></text></view></view>
					</view>
				</view>
			</view>
		</view>
		<view class="noComent flex align-center justify-center" v-else>
			<view class="cx">
				<image class="img" src="/static/images/nocom.png"></image>
				<view class="margin-top-xs txt text-xs">还没有评论~_~</view>
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
						<textarea placeholder="请输入评论内容" v-model="query.content" v-else />
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
	import { placardInfo, getComment } from '@/api'
	import { mapActions, mapGetters } from 'vuex'
	export default {
		data () {
			return {
				show: false,
				u: {},
				list: [],
				query: {
					first_id: 0,
					pid: -1,
					content: '',
					receive_uid: ''
				},
				cItem: {},
				rItem: {},
				params: {
					limit: 10,
					page: 1
				},
				placard_id: '',
				column_id: ''
			}
		},
		onPullDownRefresh () {
			this.loadDetail(this.placard_id, this.column_id, 1)
		},		
		onLoad (options) {
			this.placard_id = options.placard_id
			this.column_id = options.column_id
			this.loadDetail(options.placard_id, options.column_id)
		},
		computed: {
			...mapGetters(['userInfo']),
			isLike () {
				return  JSON.stringify(this.u) !== '{}' ? this.u.fabulous.some(item => item.nickname === this.userInfo.nickname) : false
			}
		},
		methods: {
			...mapActions(['actionTool', 'replay', 'deleteComment']),
			viewImg(current, urls) {
				uni.previewImage({
					current,
					urls,
					indicator: 'number'
				})
			},			
			deleteItem(item) {
				this.deleteComment({comment_id: item.id}).then(res => {
					if (res.code === 200) {
						uni.showToast({
							icon: 'none',
							title: res.msg,
							success: async () => {
								uni.hideLoading({ title: '加载中' })
								await this.getList(this.placard_id, this.column_id)
								uni.hideLoading()								
							}
						})
					} else {
						uni.showToast({
							icon: 'none',
							title: res.msg
						})
					}
				})
			},
			Publish () {
				if (this.query.content) {
					uni.showLoading({ mask: true, title: '请稍后' })
					if(JSON.stringify(this.cItem) === '{}') {
						this.query.first_id = 0
						this.query.pid = -1
						this.query.receive_uid = this.u.uid
					} else {
						this.query.first_id = this.cItem.id
						this.query.pid = this.rItem.id
						this.query.receive_uid = this.rItem.uid
					}
					const data = {...this.query, placard_id: this.u.id, column_id: this.u.column_id}
					this.replay(data).then(res => {
						if(res.code === 200) {
							this.show = false
							this.query.content = ''
							uni.showToast({
								icon: 'none',
								title: res.msg,
								success: async () => {
									uni.hideLoading({ title: '加载中' })
									await this.getList(this.placard_id, this.column_id)
									uni.hideLoading()
								}
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
			hideModal () {
				this.show = false
			},
			moreAction(item = {}, r) {
				this.cItem = this.rItem =  item
				this.show = true
				if (r) this.rItem = r
			},
			toTap () {
				const placard_id = this.u.id
				const column_id = this.u.column_id
				this.actionTool({data:{ placard_id, column_id }, type: 1}).then(_ => {
					 if (this.isLike) {
						 this.u.fabulous_count--
						 this.u.fabulous = this.u.fabulous.map(item => item.nickname !== this.userInfo.nickname)
					 } else {
						 this.u.fabulous_count++
						 this.u.fabulous.push({
							 avatar: this.userInfo.avatar,
							 nickname: this.userInfo.nickname,
							 created_at: null
						 })
					 }
				})
			},	
			async loadDetail (placard_id, column_id, type) {
				uni.showLoading({ title: '加载中' })
				await this.getDetail(placard_id, column_id)
				await this.getList(placard_id, column_id)
				uni.hideLoading()
				if (type) uni.stopPullDownRefresh()
			},
			getDetail(placard_id, column_id) {
				return new Promise(resolve => {
					placardInfo({ placard_id, column_id }).then(res => {
						if (res.code === 200) {
							this.u = res.data
						} else {
							uni.showToast({
								icon: 'none',
								title: res.msg
							})
						}
						resolve()
					})					
				})
			},
			callPhone () {
				uni.makePhoneCall({
					phoneNumber: this.u.phone
				})
			},
			getList (placard_id, column_id) {
				return new Promise(resolve => {
					const data = {...this.params, placard_id, column_id }
					getComment(data).then(res => {
						if (res.code === 200) {
							this.list = res.data.list
						} else {
							uni.showToast({
								icon: 'none',
								title: res.msg
							})
						}
						resolve()
					})
				})
			}
		}
	}
</script>

<style lang="scss">
.detail {
	background-color:#f1f1f1;
	.top {
		background-color:#516a04
	}
	.noComent {
		height: 300rpx;
		.cx {
			.img {
				display: flex;
				width: 150rpx;
				height: 150rpx;
			}
			.txt {
				color:#bfbfbf
			}
		}
	}
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
</style>
