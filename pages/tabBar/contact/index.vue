<template>
	<view class="contact flex align-center justify-center">
		<view class="text-xsl text-sea flex flex-direction justify-center align-center">
			<text class="cuIcon-phone"></text>
			<text  class="text-sm">有什么疑问，请联系我们，并事先说明来源</text>
			<text class="text-sm">联系电话：{{ contact.phone }}</text>
			<text class="text-sm">联系电话：{{ contact.address }}</text>
			<text class="text-sm">电子邮箱：842185695@qq.com</text>
		</view>
	<com-share></com-share>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		computed: {
			...mapGetters(['contact'])
		},
		onShareAppMessage (res) {
			return {
				title: '联系我们',
				path: '/pages/tabBar/contact/index'
			}
		}
	}
</script>

<style>
	page, .contact {
		height: 100%;
	}
</style>
