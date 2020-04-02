<template>
	<view>
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">姓名</view>
				<input placeholder="请输入昵称" name="name"></input>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">性别</view>
				<picker @change="sexChange" :value="index" :range="sex">
					<view class="picker">
						{{sex[s_value]}}
					</view>
				</picker>				
			</view>			
		</form>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				s_value: 0,
				sex: ['保密','男', '女'],
				params: {
					name: '',
					gender: 0,
					height: '',
					weight: '',
					native_place: '',
					occupation: '',
					income: '',
					culture: '',
					marital: '',
					birth: '',
					qq: '',
					wechat: '',
					phone: '',
					cardId: ''
				}
			}
		},
		methods: {
			sexChange (e) {
				this.s_value = e.detail.value
				this.params.gender = e.detail.value
			}
		}
	}
</script>

<style>
</style>
