<template>
	<view class="solid-top bg-white">
		<view class="city">
			<view v-for="(k, idx) in cityList" :key="idx" class="item" @tap="change" :data-index="idx">
				<view :class="['radio',{ act: index === idx }]">{{ k }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		props: {
			act: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			...mapGetters(['cityList', 'Tap', 'postTab']),
			index () {
				return this.act ? this.postTab : this.Tap
			}
		},
		methods: {
			change (e) {
				const index = e.currentTarget.dataset.index
				if (!this.act) {
					this.$store.commit('SET_TAP', index)
					uni.setStorageSync('currentTab', index)
					uni.setStorageSync('region', this.cityList[this.Tap])
					this.$emit('change', this.cityList[index])
				} else {
					this.$store.commit('SET_POSTTAP', index)
					uni.setStorageSync('post_region', this.cityList[this.postTab])
				}

			}
		}
	}
</script>

<style lang="scss" scoped>
.city {
	display: flex;
	flex-wrap: wrap;
	padding: 8rpx;
	.item {
		flex-basis: 25%;
		overflow: hidden;
		.radio {
			margin: 8rpx;
		    text-align: center;
			padding: 15rpx 0;
			font-size: 36rpx;
			box-sizing: border-box;
			border: 1px solid black;
			background-color: white;
			border-radius: 10rpx;
			&.act {
				color: black;
				background-color:#acf6ab;				
			}
		}
	}
}	
</style>
