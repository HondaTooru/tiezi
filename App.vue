<script>
	export default {
		onLaunch: function() {
			// #ifdef MP-WEIXIN
				uni.checkSession({
					success: res => {
						const u = uni.getStorageSync('u_key')
						const l = uni.getStorageSync('tiez')
						const c = uni.getStorageSync('collect')
						const s = uni.getStorageSync('usershop')
						const x = uni.getStorageSync('contact')
						const m = uni.getStorageSync('myData')
						if (x) this.$store.commit('SET_CONTACT', x)
						if (u) {
							this.$store.commit('SET_USERINFO', u)
							this.$store.commit('SET_TIEZ', l)
							this.$store.commit('SET_LIST', c)
							this.$store.commit('SET_USERSHOP', s)
							this.$store.commit('SET_LOGIN', true)
							this.$store.commit('SET_MYDATA', m)
						}
					},
					fail: err => {
						this.$store.commit('SET_USERINFO', {})
					}
				})
			// #endif			
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("/style/main.css");
	@import url("/style/icon.css");
</style>
