<template>
<view :class="['cu-modal', {show: showModal}]">
	<view class="cu-dialog">
		<view class="cu-bar bg-white justify-end">
			<view class="content">用户使用协议</view>
			<view class="action" @tap="closeModal">
				<text class="cuIcon-close text-red"></text>
			</view>
		</view>
		<view class="padding-xs">
			<scroll-view class="srx" scroll-y>
				<rich-text :nodes="rule.rule"></rich-text>
			</scroll-view>
		</view>
		<view class="cu-bar bg-white flex flex-direction justify-center align-center">
			<view @tap="change" class="margin-top-sm"><checkbox :class="{checked}" :checked="checked" value="A"></checkbox><text class="padding-left-sm">已阅读并同意</text></view>
			<button class="cu-btn bg-white btn" hover-class="none" @tap="confirmRead">知道了</button>
		</view>
	</view>
</view>	
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		data () {
			return {
				checked: false
			}
		},
		computed: {
			...mapGetters(['showModal', 'rule'])
		},
		methods: {
			change () {
				this.checked = !this.checked
				this.$store.commit('SET_ISREAD', this.checked)
			},
			closeModal () {
				this.$store.commit('SET_SHOWMODAL', false)
				this.$store.commit('SET_ISREAD', false)
			},
			confirmRead () {
				this.$store.commit('SET_SHOWMODAL', false)
			}
		}
	}
</script>

<style scoped>
	.srx {
		height: 400rpx;
	}
	.btn {
		width: 100%;
		border: 0 none;
		background-color: #e54d42;
		margin-top: 8px;
		color: white;
		border-radius: 0;
		height: 100rpx;
	}
</style>
