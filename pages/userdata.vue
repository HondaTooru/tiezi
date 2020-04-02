<template>
	<view>个人信息</view>
</template>

<script>
	export default {
		data () {
			return {
				
			}
		},
		created() {
			this.$store.dispatch('SeeMyData')
		}
	}
</script>

<style>
</style>
