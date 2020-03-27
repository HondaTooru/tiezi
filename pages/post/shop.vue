<template>
	<form @submit="submit">
		<AuthModal/>
		<view class="cu-form-group">
			<view class="title">类型</view>
			<picker @change="PickerChange" :value="index" :range="type" range-key="cate_name">
				<view class="picker">
					{{type[index].cate_name}}
				</view>
			</picker>				
		</view>
		<view class="cu-form-group" v-if="region === '其他城市'">
			<view class="title">所在城市</view>
			<input type="text" placeholder="请输入城市名称" v-model="params.region">
		</view>					
		<view class="cu-form-group">
			<view class="title">店铺名称</view>
			<input type="text" placeholder="请输入店铺名称" v-model="params.title" name="title" />
		</view>
		<view class="cu-form-group align-start">
			<view class="title">店铺描述</view>
			<textarea value="" placeholder="请输入描述内容" v-model="params.describe" name="describe" />
		</view>
		<view class="cu-form-group">
			<view class="title">联系方式</view>
			<input type="text" placeholder="请输入联系方式" v-model="params.phone" name="phone" />
		</view>
		<view class="cu-form-group">
			<view class="title">地址</view>
			<input type="text" placeholder="请输入地址" name="address" v-model="params.address" />
		</view>
		<view class="cu-form-group">
			<button class="cu-btn bg-red" form-type="submit">{{ params.id ? '更新' : '发布' }}</button>
			<userAuth></userAuth>
		</view>
	</form>
</template>

<script>
	import { mapActions } from 'vuex'
	import graceChecker from '@/utils/graceChecker'
	export default {
		data () {
			return {
				type:[],
				index: 0,
				region: uni.getStorageSync('region'),
				params: {
					region: '',
					column_id: '',
					category_id: '',
					title: '',
					describe: '',
					phone: '',
					address: ''
				}					
			}
		},
		onLoad (options) {
			const details = uni.getStorageSync('details')
			const type = uni.getStorageSync('cate')
			this.type = type			
		
			this.params.column_id = uni.getStorageSync('nav').id
			this.params.region = uni.getStorageSync('region')
			this.params.category_id = this.type.length ? type[0].id : this.params.column_id
			if (details.id !== void 0) {
				this.params.id = details.id
				this.params.title = details.title
				this.params.describe = details.describe
				this.params.phone = details.phone
				this.params.address = details.address
				this.params.region = details.region
				this.params.column_id = details.column_id
			}
		},
		methods: {
			...mapActions(['postContent']),
			submit (e) {
				const rule = [
					{name:"title", checkType : "notnull", errorMsg:"请输入店铺名称"},
					{name:"describe", checkType : "notnull",  errorMsg: "请输入店铺描述"},
					{name:"phone", checkType : "notnull", errorMsg:"请输入联系方式"},
					{name:"address", checkType : "notnull", errorMsg:"请输店铺地址"},
				]
				const formData = e.detail.value
				const checkRes = graceChecker.check(formData, rule)
				if (checkRes) {
					this.postContent({...this.params})
				} else {
					uni.showToast({ title: graceChecker.error, icon: "none" })
				}
			},				
			PickerChange (e) {
				this.index = e.detail.value
				this.params.category_id = this.type[this.index].id
			}			
		}
	}
</script>