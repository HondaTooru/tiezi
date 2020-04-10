<template>
<view class="compage">
	<com-share v-if="column_id !== 13"></com-share>
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
	<comTop @on-change="cityChange">
		<view class="type" slot="head">
			<view class="item" v-for="(item ,index) in type" :key="index"><view @tap="change" :data-index="index" :class="['atx', { active: currentTab === index }, { dx: column_id === 16 && item.id === '39' }]">{{ item.cate_name }}</view></view>
		</view>		
	</comTop>
	<view class="box">
		<swiper :indicator-dots="false" class="screen-swiper round-dot banner" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item, index) in swiper" :key="index">
				<image :src="item.pic" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		<view class="list margin-xs" v-if="list.length" :class="{shop: column_id === 13, tx: column_id === 49}">
			<block v-if="column_id === 16">
				<navigator hover-class="none" :url="'/pages/detail?placard_id='+item.id+'&column_id='+item.column_id" class="item" v-for="(item, i) in list" :key="i">
					<swiper :indicator-dots="false" class="screen-swiper round-dot" :autoplay="true" :interval="3000" :duration="1000">
						<swiper-item v-for="(img, index) in item.imgurl" :key="index">
							<image :src="img" mode="aspectFill"></image>
						</swiper-item>
					</swiper>
					<view class="flex align-center margin-tb-sm btm justify-between">
						<view class="flex align-center"><view class="cu-tag margin-right-xs" :style="{backgroundColor: item.background, color: item.color, borderBottom: '4rpx solid #598bca'}">{{ item.category }}</view><view class="text-cut">{{ item.title }}</view></view>
						<view class="more" @tap.stop="tapAction(item, index)"></view>
						<view class="tool" v-if="item.show">
							<userAuth @tap.stop=""></userAuth>
							<view class="el" @tap.stop="moreAction(0, item)"><text class="cuIcon-likefill padding-right-xs"></text><text class="text-sm">收藏</text></view>
							<view class="el" @tap.stop="moreAction(1, item)"><text class="cuIcon-appreciatefill padding-right-xs"></text><text class="text-sm">点赞</text></view>
							<view class="el" @tap.stop="moreAction(2, item)"><text class="cuIcon-messagefill padding-right-xs"></text><text class="text-sm">评论</text></view>
							<view class="el" @tap.stop="moreAction(3, item)"><text class="cuIcon-fork padding-right-xs"></text><button open-type="share" hover-class="none" class="share">转发</button></view>
						</view>
					</view>
				</navigator>
			</block>
			<block v-if="column_id === 14">
				<navigator hover-class="none" :url="'/pages/detail?placard_id='+item.id+'&column_id='+item.column_id" class="item margin-tb-sm padding-sm bg-white" :class="{'shadow': i !== list.length - 1}" v-for="(item, i) in list" :key="i">
					<view class="flex justify-between">
						<view class="cu-tag" :style="{backgroundColor: item.background, color: item.color, borderBottom: '4rpx solid #598bca'}">{{ item.category }}</view>
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
						<view class="cu-tag line-gray">{{ item.region }}</view>
						<view class="cu-capsule radius btm">
							<view class="tool" v-if="item.show">
								<userAuth @tap.stop=""></userAuth>
								<view class="el" @tap.stop="moreAction(0, item)"><text class="cuIcon-likefill padding-right-xs"></text><text class="text-sm">收藏</text></view>
								<view class="el" @tap.stop="moreAction(1, item)"><text class="cuIcon-appreciatefill padding-right-xs"></text><text class="text-sm">点赞</text></view>
								<view class="el" @tap.stop="moreAction(2, item)"><text class="cuIcon-messagefill padding-right-xs"></text><text class="text-sm">评论</text></view>
								<view class="el" @tap.stop="moreAction(3, item)"><text class="cuIcon-fork padding-right-xs"></text><button open-type="share" hover-class="none" class="share">转发</button></view>
							</view>							
							<view class="cu-tag bg-grey"><text class="cuIcon-phone"></text></view>
							<view class="flex">
								<view class="cu-tag line-grey" @tap.stop="makeCall(item.phone)">{{ item.phone }}</view>
								<view class="more margin-left-xs" @tap.stop="tapAction(item, index)"></view>
							</view>
						</view>
					</view>
				</navigator>
			</block>
			<block v-if="column_id === 13">
				<navigator hover-class="none" :url="'/pages/productlist?id='+item.id+'&phone='+item.phone" class="item" v-for="(item, i) in list" :key="i">
					<view class="el radius bg-red flex flex-direction justify-around">
						<view class="title text-xl text-bold text-center">{{ item.title }}</view>
						<view class="desc text-sm font text-center margin-tb-sm">{{ item.describe }}</view>
						<view class="text-black flex justify-between">
							<view class="margin-top-xs text-xs text-cut"><text class="cuIcon-location padding-right-xs"></text>{{ item.region }}</view>
							<view class="margin-top-xs text-xs" @tap.stop="makeCall(item.phone)"><text class="cuIcon-phone padding-right-xs"></text>{{ item.phone }}</view>
						</view>								
					</view>
				</navigator>				
			</block>
			<block v-if="column_id === 11">
				<navigator hover-class="none" :url="'/pages/detail?placard_id='+item.id+'&column_id='+item.column_id" class="item" v-for="(item, i) in list" :key="i">
					<swiper :indicator-dots="false" class="screen-swiper round-dot" :autoplay="true" :interval="3000" :duration="1000">
						<swiper-item v-for="(img, index) in item.imgurl" :key="index">
							<image :src="img" mode="aspectFill"></image>
						</swiper-item>
					</swiper>
					<view class="flex align-center margin-tb-xs">
						<view class="text-cut">{{ item.title }}</view>
						<view class="flex">
							<view class="cu-tag bg-sea margin-right-xs sm" v-for="(tag, x) in item.label" :key="x">{{ tag }}</view>
						</view>
					</view>
					<view class="flex margin-bottom-xs align-center justify-between btm">
						<view class="tool" v-if="item.show">
							<userAuth @tap.stop=""></userAuth>
							<view class="el" @tap.stop="moreAction(0, item)"><text class="cuIcon-likefill padding-right-xs"></text><text class="text-sm">收藏</text></view>
							<view class="el" @tap.stop="moreAction(1, item)"><text class="cuIcon-appreciatefill padding-right-xs"></text><text class="text-sm">点赞</text></view>
							<view class="el" @tap.stop="moreAction(2, item)"><text class="cuIcon-messagefill padding-right-xs"></text><text class="text-sm">评论</text></view>
							<view class="el" @tap.stop="moreAction(3, item)"><text class="cuIcon-fork padding-right-xs"></text><button open-type="share" hover-class="none" class="share">转发</button></view>
						</view>							
						<view class="flex justify-between">
							<view class="flex justify-between">
								<view class="margin-top-xs margin-right-xs"><text class="cuIcon-location padding-right-xs"></text>{{ item.region }}</view>
								<view class="margin-top-xs margin-right-xs" @tap.stop="makeCall(item.phone)"><text class="cuIcon-phone padding-right-xs"></text>{{ item.phone }}</view>
							</view>
						</view>
						<view class="more margin-left-xs" @tap.stop="tapAction(item, index)"></view>
					</view>				
				</navigator>				
			</block>
			<block v-if="column_id === 10">
				<navigator hover-class="none" :url="'/pages/detail?placard_id='+item.id+'&column_id='+item.column_id" class="item" v-for="(item, i) in list" :key="i">
					<swiper :indicator-dots="false" class="screen-swiper round-dot" :autoplay="true" :interval="3000" :duration="1000">
						<swiper-item v-for="(img, index) in item.imgurl" :key="index">
							<image :src="img" mode="aspectFill"></image>
						</swiper-item>
					</swiper>
					<view class="flex align-center margin-tb-sm btm justify-between">
						<view class="tool" v-if="item.show">
							<userAuth @tap.stop=""></userAuth>
							<view class="el" @tap.stop="moreAction(0, item)"><text class="cuIcon-likefill padding-right-xs"></text><text class="text-sm">收藏</text></view>
							<view class="el" @tap.stop="moreAction(1, item)"><text class="cuIcon-appreciatefill padding-right-xs"></text><text class="text-sm">点赞</text></view>
							<view class="el" @tap.stop="moreAction(2, item)"><text class="cuIcon-messagefill padding-right-xs"></text><text class="text-sm">评论</text></view>
							<view class="el" @tap.stop="moreAction(3, item)"><text class="cuIcon-fork padding-right-xs"></text><button open-type="share" hover-class="none" class="share">转发</button></view>
						</view>							
						<view class="flex"><view class="cu-tag margin-right-xs" :style="{backgroundColor: item.background, color: item.color, borderBottom: '4rpx solid #598bca'}">{{ item.column }}</view><view class="text-cut">{{ item.title }}</view></view>
						<view class="more margin-left-xs" @tap.stop="tapAction(item, index)"></view>
					</view>
				</navigator>				
			</block>
			<block v-if="column_id === 9">
				<navigator hover-class="none" :url="'/pages/detail?placard_id='+item.id+'&column_id='+item.column_id" class="flex align-center padding-tb-xs" v-for="(item, i) in list" :key="i">
					<view class="cu-tag" :style="{backgroundColor: item.background, color: item.color, borderBottom: '4rpx solid #598bca'}">{{ item.category }}</view>
					<view class="flex-sub text-cut padding-lr-xs">{{ item.title }}</view>
					<button class="cu-btn cuIcon" @tap.stop="makeCall(item.phone)">
						<text class="cuIcon-phone"></text>
					</button>
				<view class="btm flex justify-end">
					<view class="tool" v-if="item.show">
						<userAuth @tap.stop=""></userAuth>
						<view class="el" @tap.stop="moreAction(0, item)"><text class="cuIcon-likefill padding-right-xs"></text><text class="text-sm">收藏</text></view>
						<view class="el" @tap.stop="moreAction(1, item)"><text class="cuIcon-appreciatefill padding-right-xs"></text><text class="text-sm">点赞</text></view>
						<view class="el" @tap.stop="moreAction(2, item)"><text class="cuIcon-messagefill padding-right-xs"></text><text class="text-sm">评论</text></view>
						<view class="el" @tap.stop="moreAction(3, item)"><text class="cuIcon-fork padding-right-xs"></text><button open-type="share" hover-class="none" class="share">转发</button></view>
					</view>	
					<view class="more margin-left-xs" @tap.stop="tapAction(item, index)"></view>
				</view>					
				</navigator>

			</block>
			<block v-if="column_id === 58">
				<navigator hover-class="none" :url="'/pages/detail?placard_id='+item.id+'&column_id='+item.column_id" v-for="(item, i) in list" :key="i">
					<swiper :indicator-dots="false" class="screen-swiper round-dot" :autoplay="true" :interval="3000" :duration="1000">
							<swiper-item v-for="(img, index) in item.imgurl" :key="index">
								<image :src="img" mode="aspectFill"></image>
							</swiper-item>
					</swiper>
					<view class="flex align-center padding-tb-xs btm">
						<view class="cu-tag" :style="{backgroundColor: item.background, color: item.color, borderBottom: '4rpx solid #598bca'}">{{ item.category }}</view>
						<view class="flex-sub text-cut padding-lr-xs">{{ item.title }}</view>
						<button class="cu-btn cuIcon" @tap.stop="makeCall(item.phone)">
							<text class="cuIcon-phone"></text>
						</button>
						<view class="tool" v-if="item.show">
							<userAuth @tap.stop=""></userAuth>
							<view class="el" @tap.stop="moreAction(0, item)"><text class="cuIcon-likefill padding-right-xs"></text><text class="text-sm">收藏</text></view>
							<view class="el" @tap.stop="moreAction(1, item)"><text class="cuIcon-appreciatefill padding-right-xs"></text><text class="text-sm">点赞</text></view>
							<view class="el" @tap.stop="moreAction(2, item)"><text class="cuIcon-messagefill padding-right-xs"></text><text class="text-sm">评论</text></view>
							<view class="el" @tap.stop="moreAction(3, item)"><text class="cuIcon-fork padding-right-xs"></text><button open-type="share" hover-class="none" class="share">转发</button></view>
						</view>	
						<view class="more margin-left-xs" @tap.stop="tapAction(item, index)"></view>									
					</view>
				</navigator>
			</block>
			<block v-if="column_id === 1">
				<navigator hover-class="none" class="padding-bottom-xs" :url="'/pages/detail?placard_id='+item.id+'&column_id='+item.column_id" v-for="(item, i) in list" :key="i" :class="{ 'solid-bottom': i !== list.length - 1 }">
					<view class="flex align-center padding-tb-xs btm">
						<view class="cu-tag margin-right-xs" :style="{backgroundColor: item.background, color: item.color, borderBottom: '4rpx solid #598bca'}">{{ item.category }}</view>
						<view class="text-cut flex-sub">{{ item.title }}</view>
						<view class="flex justify-between margin-top-xs">
							<button class="cu-btn cuIcon sm" @tap.stop="makeCall(item.phone)">
								<text class="cuIcon-phone"></text>
							</button>
						</view>
						<view class="tool" v-if="item.show">
							<userAuth @tap.stop=""></userAuth>
							<view class="el" @tap.stop="moreAction(0, item)"><text class="cuIcon-likefill padding-right-xs"></text><text class="text-sm">收藏</text></view>
							<view class="el" @tap.stop="moreAction(1, item)"><text class="cuIcon-appreciatefill padding-right-xs"></text><text class="text-sm">点赞</text></view>
							<view class="el" @tap.stop="moreAction(2, item)"><text class="cuIcon-messagefill padding-right-xs"></text><text class="text-sm">评论</text></view>
							<view class="el" @tap.stop="moreAction(3, item)"><text class="cuIcon-fork padding-right-xs"></text><button open-type="share" hover-class="none" class="share">转发</button></view>
						</view>	
						<view class="more margin-left-xs" @tap.stop="tapAction(item, index)"></view>
					</view>
				</navigator>				
			</block>
			<block v-if="column_id === 6">
				<navigator hover-class="none" :url="'/pages/detail?placard_id='+item.id+'&column_id='+item.column_id" v-for="(item, i) in list" :key="i" class="padding-tb-sm" :class="{ 'solid-bottom': i !== list.length - 1 }">
					<view class="flex align-center btm">
						<view class="cu-tag" :style="{backgroundColor: item.background, color: item.color, borderBottom: '4rpx solid #598bca'}">{{ item.category }}</view>
						<view class="flex-sub text-cut padding-lr-xs">{{ item.title }}</view>
<!-- 						<button class="cu-btn cuIcon" @tap.stop="makeCall(item.phone)">
							<text class="cuIcon-phone"></text>
						</button> -->
						<view class="tool" v-if="item.show">
							<userAuth @tap.stop=""></userAuth>
							<view class="el" @tap.stop="moreAction(0, item)"><text class="cuIcon-likefill padding-right-xs"></text><text class="text-sm">收藏</text></view>
							<view class="el" @tap.stop="moreAction(1, item)"><text class="cuIcon-appreciatefill padding-right-xs"></text><text class="text-sm">点赞</text></view>
							<view class="el" @tap.stop="moreAction(2, item)"><text class="cuIcon-messagefill padding-right-xs"></text><text class="text-sm">评论</text></view>
							<view class="el" @tap.stop="moreAction(3, item)"><text class="cuIcon-fork padding-right-xs"></text><button open-type="share" hover-class="none" class="share">转发</button></view>
						</view>	
						<view class="more margin-left-xs" @tap.stop="tapAction(item, index)"></view>						
					</view>
				</navigator>
			</block>
			<block v-if="column_id === 30 || column_id === 74">
				<navigator hover-class="none" :url="'/pages/detail?placard_id='+item.id+'&column_id='+item.column_id" class="item" v-for="(item, i) in list" :key="i">
					<swiper :indicator-dots="false" class="screen-swiper round-dot" :autoplay="true" :interval="3000" :duration="1000">
						<swiper-item v-for="(img, index) in item.imgurl" :key="index">
							<image :src="img" mode="aspectFill"></image>
						</swiper-item>
					</swiper>
					<view class="flex align-center margin-tb-xs">
						<view class="cu-tag margin-right-xs" :style="{backgroundColor: item.background, color: item.color, borderBottom: '4rpx solid #598bca'}">{{ item.category }}</view>
						<view class="text-cut">{{ item.title }}</view>
					</view>
					<view class="flex btm margin-bottom-xs align-center justify-between">
						<view class="flex">
							<view class="margin-top-xs margin-right-xs"><text class="cuIcon-location padding-right-xs"></text>{{ item.region }}</view>
							<view v-if="item.phone" class="margin-top-xs margin-right-xs" @tap.stop="makeCall(item.phone)"><text class="cuIcon-phone padding-right-xs"></text>{{ item.phone }}</view>
						</view>
						<view class="tool" v-if="item.show">
							<userAuth @tap.stop=""></userAuth>
							<view class="el" @tap.stop="moreAction(0, item)"><text class="cuIcon-likefill padding-right-xs"></text><text class="text-sm">收藏</text></view>
							<view class="el" @tap.stop="moreAction(1, item)"><text class="cuIcon-appreciatefill padding-right-xs"></text><text class="text-sm">点赞</text></view>
							<view class="el" @tap.stop="moreAction(2, item)"><text class="cuIcon-messagefill padding-right-xs"></text><text class="text-sm">评论</text></view>
							<view class="el" @tap.stop="moreAction(3, item)"><text class="cuIcon-fork padding-right-xs"></text><button open-type="share" hover-class="none" class="share">转发</button></view>
						</view>	
						<view class="more margin-left-xs" @tap.stop="tapAction(item, index)"></view>						
					</view>				
				</navigator>				
			</block>
			<block v-if="column_id === 49">
				<navigator hover-class="none" :url="'/pages/detail?placard_id='+item.id+'&column_id='+item.column_id" class="item" v-for="(item, index) in list" :key="index">
					<swiper previous-margin="20rpx" :indicator-dots="false" :autoplay="true" :display-multiple-items="3" :interval="4000" :duration="1500">
						<swiper-item v-for="(img, idx) in item.imgurl" :key="idx">
							<view :style="{ backgroundImage: 'url('+img+')' }"></view>
						</swiper-item>				
					</swiper>
					<view class="margin-sm">
						<view class="flex align-center justify-between btm">
							<view class="flex flex-sub">
								<view class="cu-tag margin-right-xs" :style="{backgroundColor: item.background, color: item.color, borderBottom: '4rpx solid #598bca'}">{{ item.category }}</view>
								<view class="text-cut">{{ item.title }}</view>
							</view>
							<view class="tool" v-if="item.show">
								<userAuth @tap.stop=""></userAuth>
								<view class="el" @tap.stop="moreAction(0, item)"><text class="cuIcon-likefill padding-right-xs"></text><text class="text-sm">收藏</text></view>
								<view class="el" @tap.stop="moreAction(1, item)"><text class="cuIcon-appreciatefill padding-right-xs"></text><text class="text-sm">点赞</text></view>
								<view class="el" @tap.stop="moreAction(2, item)"><text class="cuIcon-messagefill padding-right-xs"></text><text class="text-sm">评论</text></view>
								<view class="el" @tap.stop="moreAction(3, item)"><text class="cuIcon-fork padding-right-xs"></text><button open-type="share" hover-class="none" class="share">转发</button></view>
							</view>	
							<view class="more margin-left-xs" @tap.stop="tapAction(item, index)"></view>
						</view>
						<view class="flex justify-between margin-top-xs text-gray">
							<view class="flex align-center"><text class="cuIcon-location padding-right-xs"></text><text class="text-xs">{{ item.region }}</text></view>
							<view class="flex align-center"><text class="cuIcon-phone padding-right-xs"></text><text class="text-df" @tap.stop="makeCall(item.phone)">{{ item.phone }}</text></view>
						</view>
					</view>
				</navigator>
			</block>
		</view>
		<EmptyData v-else></EmptyData>
	</view>
	<tabBar :url="url" :name="name"></tabBar>	
</view>	
</template>

<script>
import { placardCate, placardRanking } from '@/api'
import { mapGetters, mapActions } from 'vuex'
	const colors = [
		{
			id: 1,
			arr: [
				{ background: '#fa0101', color: '#000', name: '上门帮忙' },
				{ background: '#ff7b41', color: '#000', name: '小时工' },
				{ background: '#ff8000', color: '#000', name: '安装维修' }
			]
		},	
		{
			id: 16,
			arr: [
				{ background: '#edc494', color: '#ae2d25', name: '本地交友' },
				{ background: '#e4630a', color: '#000', name: '实名相亲' },
			]
		},
		{
			id: 14,
			arr: [
				{ background: '#ff6503', color: '#fff', name: '车找人' },
				{ background: '#b9cde3', color: '#000', name: '人找车' },
				{ background: '#568dd7', color: '#000', name: '货找车' }
			]
		},
		{
			id: 11,
			arr: [
				{ background: '#1f438c', color: '#000', name: '水产畜牧' },
				{ background: '#a37e0a', color: '#000', name: '小吃零食' },
				{ background: '#259322', color: '#000', name: '农家干货' },
				{ background: '#3b9703', color: '#000', name: '绿色水果' }
			]
		},
		{
			id: 49,
			arr: [
				{ background: '#1446be', color: '#fff', name: '独特技能' },
				{ background: '#3362eb', color: '#fff', name: '祖传秘方' }
			]
		},
		{
			id: 10,
			arr: [
				{ background: '#c7e8f1', color: '#000', name: '转让' },
				{ background: '#c77625', color: '#000', name: '出租' }
			]
		},
		{
			id: 9,
			arr: [
				{ background: '#0403ff', color: '#fff', name: '求职' },
				{ background: '#3a61ff', color: '#000', name: '招聘' },
				{ background: '#588cd6', color: '#000', name: '招生' }
			]
		},
		{
			id: 58,
			arr: [
				{ background: '#03fefb', color: '#000', name: '二手市场' },
				{ background: '#8100ff', color: '#fff', name: '供应' },
				{ background: '#ff7ffd', color: '#000', name: '需求' }
			]
		},
		{
			id: 30,
			arr: [
				{ background: '#cad7f2', color: '#000', name: '求租' },
				{ background: '#c1752b', color: '#000', name: '出租' }
			]
		}							
	]	

export default {
	data () {
		return {
			column_id: '',
			query: {
				limit: 10,
				page:1
			},
			params: {
				first_id: 0,
				pid: -1,
				content: '',
				receive_uid: ''
			},			
			show: false,
			cItem: {},
			list: [],
			type: [],
			swiper: [],
			currentTab: 0,
			category_id: ''
		}
	},		
	async onPullDownRefresh () {
		uni.showLoading({ title: '请稍后' })
		this.query.page = 1
		await this.loadDetails()
		uni.hideLoading()
		uni.stopPullDownRefresh()
	},	
	computed: {
		...mapGetters(['cityList']),
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
		name () {
			return this.column_id === 13 ? '发布' : '发帖'
		}
	},
	watch: {
		query: {
			async handler (val, oldval) {
				uni.showLoading({ mask:true, title: '加载中' })
				await this.getList(this.category_id)
				uni.hideLoading()
			},
			deep: true
		}
	},
	onLoad () {
		const option = uni.getStorageSync('nav')
		const name = option.name
		this.column_id = option.id
		uni.setNavigationBarTitle({
			title: name
		})
		this.loadDetails()
		uni.$on('onBottom', () => {
			this.query.page++
		})
	},
	onUnload() {
		uni.$off('onBottom')
	},
	onReachBottom () {
		uni.$emit('onBottom')
	},	
	methods: {
		...mapActions(['actionTool', 'replay']),
		hideModal () { this.show = false },
		toDetail (e) {
			const item = e.currentTarget.dataset.item
			uni.navigateTo({
				url: `/pages/detail?placard_id=${item.id}&column_id=${item.column_id}`
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
		tapAction (item, index) {
			item.show = !item.show
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
		makeCall (phone) {
			uni.makePhoneCall({
				phoneNumber: phone
			})
		},
		change(e) {
			const index = e.currentTarget.dataset.index
			this.category_id = +this.type[index].id === -1 ? '' : this.type[index].id
			this.query.page = 1
			uni.showLoading({ mask: true, title: '加载中' })
			this.getList(this.category_id).then(res => {
				uni.hideLoading()
				this.currentTab = index
			})
		},
		cityChange (e) {
			this.query.page = 1
			this.getList(this.category_id)
		},
		async loadDetails () {
			uni.showLoading({ title: '加载中' })
			await this.getCate()
			await this.getList(this.category_id)
			uni.hideLoading()
		},
		getCate () {
			return new Promise(resolve => {
				placardCate({ column_id: this.column_id }).then(res => {
					const cate = [
						{ id: '-1', cate_name: '所有分类' }
					]
					const shop_cate = [
						{ id: '-2', cate_name: '开店' }
					]
					const c_cate = +this.column_id === 13 ? cate.concat(shop_cate) : cate
					this.type = res.data.cate_name.concat(c_cate)
					uni.setStorageSync('cate', res.data.cate_name)
					if(!this.category_id) this.category_id = this.type.length ? this.type[0].id : this.column_id
					this.swiper = res.data.roll
					resolve()
				})
			})
		},
		getList (category_id) {
			return new Promise(resolve => {
				placardRanking({ column_id: this.column_id, category_id, ...this.query, region: uni.getStorageSync('region') }).then(res =>{
					if (this.query.page === 1) this.list = []
					const list = res.data.data.map(item => {
						item.column_id = +item.column_id
						item.show = false
						const el = colors.find(k => k.id === item.column_id)
						if (el !== void 0) {
							const o = el.arr.find(a => a.name === item.category)
							item.background = o !== void 0 ? o.background : '#467acf'
							item.color = o !== void 0 ? o.color : '#000'
						} else {
							item.background = '#467acf'
							item.color = '#000'
						}						
						return item
					})
					this.list = [...this.list, ...list]
					if (this.query.page !== 1 && list.length < this.query.limit) {
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
	.more {
		width: 80rpx;
		height: 50rpx;
		background:url(../static/images/more.png) no-repeat center center/contain;
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
			text, button {
				white-space: nowrap;
			}
			&:not(:last-of-type) {
				padding-right: 10rpx;
				margin-right: 10rpx;
				border-right: 1rpx solid #5961d6;
			}
		}
	}			
	}
	.list {
		&.shop {
		padding: 20rpx 20rpx 0;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
			.item {
				flex-basis: 50%;
				box-sizing: border-box;
				margin-bottom: 15rpx;
				&:nth-of-type(2n+1) {
					padding-right: 15rpx;
				}
				& > .el {
					height: 100%;
					box-sizing: border-box;
					padding: 15rpx;
					color: white;
					.font {
						color: #FEC92C
					}
					.desc {
						text-overflow: -o-ellipsis-lastline;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}					
				}
			}			
		}
	&.tx {
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
				font-size: 28rpx;
				box-sizing: border-box;
				border: 2rpx solid #5b8bc1;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				&.dx {
					color: #eaeaea;
					background-color: #c1c1c1;
					border: 0 none;
				}
				&.active {
					color: white;
					background-color:#516a04;
				}
			}
		}
	}	
}	
</style>
