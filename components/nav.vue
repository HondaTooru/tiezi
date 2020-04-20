<template>
	<view class="bg-white">
		<swiper class="swiper" :interval="3000" :indicator-dots="false" :autoplay="true" :duration="1000" :display-multiple-items="4" previous-margin="5rpx" next-margin="5rpx" v-if="type">
			<swiper-item v-for="(item, index) in navList" :key="index" class="vx" @tap="change" :data-index="index" :data-id="item.id" :data-name="item.cate_name">
				<view class="src">
					<image :src="item.pic" class="image"></image>
				</view>
			</swiper-item>					
		</swiper>
		<view v-else class="list">
			<view class="item" v-for="(item, index) in navList" :key="index" @tap="change" :data-index="index" :data-id="item.id" :data-name="item.cate_name">
				<view :class="['atx',{ active: act ? act : current === index }]">{{ item.cate_name }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		data () {
			return {
				current: -1
			}
		},
		props: {
			act: {
				type: Boolean,
				default: true
			},
			type: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			change (e) {
				const index = e.currentTarget.dataset.index
				const name = e.currentTarget.dataset.name
				const id = +e.currentTarget.dataset.id
				uni.setStorageSync('nav', { name, id })
				if (this.act) {
					uni.navigateTo({
						url: `/pages/list?name=${name}&id=${id}`
					})
				} else {
					this.current = index
					console.log(index)
					this.$emit('change', id)
				}
			} 
		},
		computed: {
			...mapGetters(['navList'])
		}
	}
</script>

<style lang="scss" scoped>
.swiper {
	height: 188rpx;
	.vx {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 10rpx;
		box-sizing: border-box;
		& > .src {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			width: 100%;
			height: 100%;
			color:white;
			.txt {font-size: 34rpx;color:black;margin-top: 10rpx; font-weight: 600;color:#516a04}
			.image {
				width: 168rpx;
				height: 168rpx;
				display: block;
			}		
		}
	}	
}
.list {
	display: flex;
	flex-wrap: wrap;
	padding: 8rpx;
	.item {
		flex-basis: 25%;
		overflow: hidden;
		.atx {
			margin: 8rpx;
		    text-align: center;
			padding: 15rpx 0;
			font-size: 28rpx;
			box-sizing: border-box;
			border: 1px solid #6B69D6;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			&.active {
				color: white;
				background-color:#516a04;
			}
		}
	}
}
</style>
