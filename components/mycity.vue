<template>
	<view class="solid-top bg-white">
		<view class="city">
			<view v-for="(k, idx) in cityList" :key="idx" class="item" @tap="change" :data-index="idx">
				<view :class="['radio',{ act: Tap === idx }]">{{ k }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		computed: {
			...mapGetters(['cityList', 'Tap'])
		},
		watch: {
			Tap (val, oldval) {
				console.log(val)
			}
		},
		methods: {
			change (e) {
				const index = e.currentTarget.dataset.index
				this.$store.commit('SET_TAP', index)
				uni.setStorageSync('currentTab', index)
				uni.setStorageSync('region', this.cityList[this.Tap])
				this.$emit('change', this.cityList[index])
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
			font-size: 26rpx;
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
