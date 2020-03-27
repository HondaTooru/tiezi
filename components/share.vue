<template>
	<view class="share radius">
		<view class="padding-sm" @tap="callPhone">
			<text class="lg text-white cuIcon-phone"></text>
			<text class="text-white padding-lr-xs">电话</text>
		</view>
		<view class="padding-sm solid-top" @tap="Address">
			<text class="lg text-white cuIcon-locationfill"></text>
			<text class="text-white padding-lr-xs">地址</text>
		</view>		
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		computed: {
			...mapGetters(['contact'])
		},
		methods: {
			callPhone () {
				uni.makePhoneCall({
					phoneNumber: this.contact.phone
				})
			},
			Address () {
				console.log(this.contact.location.lat, this.contact.location.lng, this.contact.address)
				uni.openLocation({
					latitude: this.contact.location.lat,
					longitude: this.contact.location.lng,
					address: this.contact.address
				})
			}
		}
	}
</script>

<style scoped lang="scss">
.share {
	position: fixed;
	top: 60%;
	background-color: rgba(223, 66, 54, .9);
	right: 5rpx;
	z-index: 9999;
}	
</style>
