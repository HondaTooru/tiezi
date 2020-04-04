<template>
	<view class="cu-list menu">
		<view class="cu-item">
			<view class="content">
				<text class="text-gray">姓名</text>
			</view>
			<view class="action">
				<view class="text-grey text-sm">{{ myData.name }}
				<navigator open-type="redirect" url="/pages/addData" hover-class="none" class="cu-tag round bg-red margin-left-sm">编辑资料</navigator>
				</view>
			</view>
		</view>
		<view class="cu-item">
			<view class="content">
				<text class="text-gray">性别</text>
			</view>
			<view class="action">
				<view class="cu-tag round bg-orange light">{{ myData.name ? '保密' : myData.name === 1 ? '男' : '女' }}</view>
			</view>			
		</view>
		<view class="cu-item">
			<view class="content">
				<text class="text-gray">身高</text>
			</view>
			<view class="action">
				<view class="text-grey text-sm">{{ myData.height }}cm</view>
			</view>			
		</view>
		<view class="cu-item">
			<view class="content">
				<text class="text-gray">体重</text>
			</view>
			<view class="action">
				<view class="text-grey text-sm">{{ myData.weight }}kg</view>
			</view>			
		</view>
		<view class="cu-item">
			<view class="content">
				<text class="text-gray">QQ</text>
			</view>
			<view class="action">
				<view class="text-grey text-sm">{{ myData.qq }}</view>
			</view>				
		</view>	
		<view class="cu-item">
			<view class="content">
				<text class="text-gray">微信</text>
			</view>
			<view class="action">
				<view class="text-grey text-sm">{{ myData.wechat }}</view>
			</view>				
		</view>	
		<view class="cu-item">
			<view class="content">
				<text class="text-gray">手机号码</text>
			</view>
			<view class="action">
				<view class="text-grey text-sm">{{ myData.phone }}</view>
			</view>				
		</view>
		<view class="cu-item">
			<view class="content">
				<text class="text-gray">籍贯</text>
			</view>
			<view class="action">
				<view class="cu-tag round bg-black light">{{ myData.native_place }}</view>
			</view>				
		</view>
		<view class="cu-item">
			<view class="content">
				<text class="text-gray">职业</text>
			</view>
			<view class="action">
				<view class="cu-tag light bg-brown">{{ myData.occupation }}</view>
			</view>			
		</view>
		<view class="cu-item">
			<view class="content">
				<text class="text-gray">身份证号码</text>
			</view>
			<view class="action">
				<view class="text-grey text-sm">{{ myData.cardId }}</view>
			</view>				
		</view>
		<view class="cu-item">
			<view class="content">
				<text class="text-gray">年收入</text>
			</view>
			<view class="action">
				<view class="cu-tag light bg-yellow">{{ myData.income }}万元</view>
			</view>				
		</view>
		<view class="cu-item">
			<view class="content">
				<text class="text-gray">文化程度</text>
			</view>
			<view class="action">
				<view class="cu-tag bg-cyan">{{ myData.culture }}</view>
			</view>				
		</view>
		<view class="cu-item">
			<view class="content">
				<text class="text-gray">婚姻状况</text>
			</view>
			<view class="action">
				<view class="cu-tag light bg-pink">{{ myData.marital }}</view>
			</view>			
		</view>
		<view class="cu-item">
			<view class="content">
				<text class="text-gray">出生日期</text>
			</view>
			<view class="text-grey text-sm">{{ myData.birth }}</view>
		</view>		
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		computed: {
			...mapGetters(['myData'])
		}
	}
</script>

<style>
</style>
