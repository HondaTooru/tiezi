<template>
	<view class="bg-white">
		<swiper class="swiper" :indicator-dots="false" :autoplay="false" :duration="1000" :display-multiple-items="4" v-if="type">
			<swiper-item v-for="(item, index) in navList" :key="index" class="vx" @tap="change" :data-index="index" :data-id="item.id" :data-name="item.cate_name">
				<view class="src">
					<image :src="item.pic" class="image"></image>
					<text class="text-xs txt">{{ item.cate_name }}</text>
				</view>
			</swiper-item>					
		</swiper>
		<view v-else class="list">
			<view class="item" v-for="(item, index) in navList" :key="index" @tap="change" :data-index="index" :data-id="item.id" :data-name="item.cate_name">
				<view :class="['atx',{ active: act ? act : cuurent === index }]">{{ item.cate_name }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		data () {
			return {
				cuurent: 0
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
		created () {
			if (!this.act) {
				const name = this.navList[this.cuurent].cate_name
				const id = +this.navList[this.cuurent].id
				uni.setStorageSync('nav', { name, id })				
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
					this.cuurent = index
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
	height: 220rpx;
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
			.txt {font-size: 30rpx;color:black;margin-top: 10rpx;}
			.image {
				width: 120rpx;
				height: 120rpx;
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
