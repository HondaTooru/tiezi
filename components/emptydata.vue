<template>
	<view class="noData bg-white flex align-center justify-center">
		<view class="cx flex flex-direction justify-center align-center">
			<image class="img" :src="src"></image>
			<view class="margin-top-xs txt text-xs">
				<slot>什么也没有~_~</slot>
			</view>
		</view>
	</view>
</template>

<script>
	import NoData from '@/static/images/empty.png'
	export default {
		props: {
			src: {
				type: String,
				default: NoData
			}
		}
	}
</script>

<style lang="scss" scoped>
.noData {
	height: 500rpx;
	.cx {
		.img {
			display: block;
			width: 150rpx;
			height: 150rpx;
		}
		.txt {
			color:#bfbfbf
		}
	}
}
</style>
