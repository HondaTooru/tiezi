<template>
	<view class="top">
		<slot name="head"></slot>
		<MyCity @change="change" />
		<slot></slot>
	</view>
</template>

<script>
	import MyCity from '@/components/mycity'
	export default {
		components:{
			MyCity
		},
		methods: {
			change(e) {
				this.$emit('on-change', e)
			}
		}
	}
</script>

<style scoped>
.top {
	position: sticky;
	top: 0;
	/* #ifdef H5 */
	top: var(--window-top);
	/* #endif */
	background-color: white;
	box-shadow: 0px 0 40rpx 0px #dedede;
	z-index: 999;		
}	
</style>
