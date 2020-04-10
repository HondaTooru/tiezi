<template>
	<view class="post-car">
		<com-share></com-share>
		<form @submit="submit">
			<view class="cu-form-group">
				<view class="title">类型</view>
				<picker @change="PickerChange" :value="index" :range="picker" range-key="cate_name">
					<view class="picker">
						{{ index !== -1 ? picker[index].cate_name : '请选择' }}
					</view>
				</picker>				
			</view>
			<view class="cu-form-group" v-if="region === '其他城市'">
				<view class="title">所在城市</view>
				<input type="text" placeholder="请输入城市名称" v-model="params.region">
			</view>			
			<view class="cu-form-group">
				<view class="title">出发地址</view>
				<input type="text" v-model="params.address_start" placeholder="请输入出发地址" name="address_start" />
			</view>
			<view class="cu-form-group">
				<view class="title">目的地址</view>
				<input type="text" v-model="params.address_end" placeholder="请输入目的地址" name="address_end" />
			</view>
			<view class="cu-form-group">
				<view class="title">出发日期</view>
				<picker mode="date" :value="date" @change="DateChange">
					<view class="picker">
						{{date}}
					</view>
				</picker>				
			</view>
			<view class="cu-form-group">
				<view class="title">出发时间</view>
				<picker mode="time" :value="time" @change="TimeChange">
					<view class="picker">
						{{time}}
					</view>
				</picker>				
			</view>
			<view class="cu-form-group">
				<view class="title">联系方式</view>
				<input type="digit" placeholder="请输入联系方式" v-model="params.phone" name="phone" />
			</view>
			<view class="cu-form-group align-start">
				<view class="title">内容</view>
				<textarea placeholder="请输入帖子内容" v-model="params.content" name="content"  v-show="!showModal"/>
			</view>
			<view class="cu-form-group">
				<button class="cu-btn bg-red" form-type="submit">{{ params.id ? '更新' : '发表' }}</button>
				<userAuth></userAuth>
			</view>
		</form>
		<AuthModal/>
	</view>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex'
	import graceChecker from '@/utils/graceChecker'
	export default {
		data () {
			return {
				picker: [],
				index: -1,
				time: '12:00',
				region: uni.getStorageSync('region'),
				date: this.$getTime,
				params: {
					column_id: '',
					category_id: '',
					region: '',
					phone: '',
					address_start: '',
					address_end: '',
					content:''
				}
			}
		},
		onLoad() {
			const details = uni.getStorageSync('details')
			const type = uni.getStorageSync('cate')
			this.picker = type
			this.params.column_id = uni.getStorageSync('nav').id
			this.params.region = uni.getStorageSync('region')
			if (details.id !== void 0) {
				this.params.address_start = details.address_start
				this.params.address_end = details.address_end
				this.params.region = details.region
				this.params.phone = details.phone
				this.params.id = details.id
				this.params.content = details.content
				this.params.region = details.region
				this.params.column_id = details.column_id
			}			
		},
		computed: {
			start_time() {
				return `${this.date} ${this.time}`
			},
			...mapGetters(['showModal'])
		},
		methods: {
			...mapActions(['postContent']),			
			submit (e) {
				const rule = [
					{name:"address_start", checkType : "notnull", errorMsg:"请输入出发地址"},
					{name:"address_end", checkType : "notnull",  errorMsg: "请输入目的地址"},
					{name:"phone", checkType : "notnull", errorMsg:"请输入联系方式"},
					{name:"content", checkType : "notnull", errorMsg:"请输入内容"},
				]
				const formData = e.detail.value
				const checkRes = graceChecker.check(formData, rule)
				if (checkRes) {
					if (this.params.category_id !== '') {
						this.postContent({...this.params, start_time: this.start_time})
					} else {
						uni.showToast({ title: '请选择分类', icon: 'none' })
					}
				} else {
					uni.showToast({ title: graceChecker.error, icon: "none" })
				}
			},					
			PickerChange (e) {
				this.index = +e.detail.value
				console.log(this.type, this.index)
				this.params.category_id = this.picker[this.index].id
			},
			TimeChange(e) {
				this.time = e.detail.value
			},
			DateChange(e) {
				this.date = e.detail.value
			}			
		}
	}
</script>

<style lang="scss">
.post-car {
	.type {
		width: 230rpx;
	}
	.spt {
		border-bottom: 1px solid #eaeaea;
		padding-bottom: 15rpx;
	}
	.date {
		margin-left: 230rpx;
	}
	.contrainer {
		padding: 15rpx;
		border:1px solid #eaeaea;
		.ql-container {
			height: 400rpx;
		}
	}
}	
</style>
