<template>
	<view class="post">
		<com-share></com-share>
		<view class="cu-bar bg-white margin-bottom-xs">
			<view class="action">
				<view class="cuIcon-titles text-red"></view>
				<view>选择要发布的栏目</view>
			</view>
		</view>
		<NavBar :act="false" @change="change"/>
		<view class="cu-bar bg-white margin-tb-xs">
			<view class="action">
				<view class="cuIcon-titles text-red"></view>
				<view>选择要展示的地区</view>
			</view>
		</view>		
		<MyCity act />
		<view class="margin-top-xs bg-white padding-lr-sm padding-top-sm">
			<button class="cu-btn bg-sea" @tap="toPost">下一步</button>
		</view>
	</view>
</template>

<script>
	import NavBar from '@/components/nav'
	import MyCity from '@/components/mycity'
	import { mapGetters } from 'vuex'
	import { placardCate } from '@/api'
	export default {
		components: {
			NavBar,
			MyCity
		},
		data () {
			return {
				column_id: ''
			}
		},
		onShareAppMessage (res) {
			return {
				title: '发帖',
				path: 'pages/tabBar/post/index'
			}
		},
		onLoad() {
			const option = uni.getStorageSync('nav')
			this.column_id = option.id
		},
		methods: {
			change (e) {
				this.column_id = e
			},
			async toPost () {
				if (this.current !== -1) {
					if (this.postTab !== -1) {
						uni.showLoading({ mask: true, title: '请稍后' })
						await this.getCate()
						uni.hideLoading()
						uni.navigateTo({
							url: `${this.url}?type=0`,
							success: () => {
								uni.setStorageSync('details', {})
							}
						})
					} else {
						uni.showToast({
							icon: 'none',
							title: '请选择发布的地区'
						})						
					}
				}  else {
					uni.showToast({
						icon: 'none',
						title: '请选择发布栏目'
					})
				}
			},
			getCate () {
				return new Promise(resolve => {
					placardCate({ column_id: this.column_id }).then(res => {
						uni.setStorageSync('cate', res.data.cate_name)
						resolve()
					})
				})
			}
		},
		computed: {
			...mapGetters(['current', 'postTab']),
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
			}		
		}
	}
</script>

<style lang="scss">
.post {
	background-color:#f1f1f1;
}	
</style>
