<template>
<view>
	<view class="auth" v-if="!isLogin">
		<button class="cu-btn" hover-class="none" open-type="getUserInfo" @getuserinfo="getInfo"></button>
	</view>	
</view>	
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
	export default {
		methods: {
			...mapActions(['wxAuth']),
			getInfo (e) {
				if (e.detail.errMsg === 'getUserInfo:ok') {
					this.wxAuth(e.detail)
				}
			}
		},
		watch: {
			userInfo: {
				handler (val, oldval) {
					if (JSON.stringify(val) !== '{}') this.$store.commit('SET_LOGIN', true)
				},
				deep: true
			}
		},
		computed: {
			...mapGetters(['userInfo', 'isLogin'])
		}
	}
</script>

<style lang="scss" scoped>
	.auth {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 99;
		.cu-btn {
			background-color: transparent;
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			padding: 0;
		}
	}
</style>