<template>
	<view class="cu-bar tabbar bg-white solids-top">
		<view class="action" v-for="(item, index) in list" :key="index" @tap="change" :data-index="index">
			<view class="cuIcon-cu-image">
				<image :src="item.image"></image>
			</view>
			<view>{{ item.name }}</view>
		</view>					
	</view>
</template>

<script>
	export default {
		data () {
			return {
				list: [
					{ name: '首页', image:'/static/home.png' },
					{ name: '联系我们', image:'/static/contact.png' },
					{ name: this.name, image:'/static/post.png' },
					{ name: '我的', image:'/static/mine.png' }
				]
			}
		},
		props: {
			name: {
				type: String,
				default: '发帖'
			},
			url: String
		},
		methods: {
			change (e) {
				const index = e.currentTarget.dataset.index
				switch (index) {
					case 0:
					uni.switchTab({
						url: '/pages/tabBar/home/index'
					})
					break;
					case 1:
					uni.switchTab({
						url:'/pages/tabBar/contact/index'
					})
					break;
					case 2:
					uni.navigateTo({
						url: this.url,
						success: () => {
							uni.setStorageSync('details', {})
						}
					})
					break;
					case 3:
					uni.switchTab({
						url: '/pages/tabBar/my/index'
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.tabbar {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	z-index: 999;
}	
</style>
