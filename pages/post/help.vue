<template>
	<view class="post-help">
		<com-share></com-share>
		<AuthModal @submit="post"/>
		<form @submit="submit">		
			<view class="cu-form-group" v-if="type.length">
				<view class="title">类型</view>
				<picker @change="PickerChange" :value="index" :range="type" range-key="cate_name">
					<view class="picker">
						{{index === -1 ? '请选择' : type[index].cate_name}}
					</view>
				</picker>				
			</view>
			<view class="cu-form-group" v-if="region === '其他城市'">
				<view class="title">所在城市</view>
				<input type="text" placeholder="请输入城市名称" v-model="params.region">
			</view>			
			<view class="cu-form-group">
				<view class="title">标题</view>
				<input type="text" v-model="params.title" placeholder="请输入标题" name="title" />
			</view>
			<view class="cu-form-group align-start">
				<view class="title">内容</view>
				<textarea placeholder="请输入帖子内容" v-show="!showModal" v-model="params.content" name="content"/>
			</view>
			<view class="cu-form-group">
				<button class="cu-btn bg-red" form-type="submit">{{ params.id ? '更新' : '发表' }}</button>
				<userAuth></userAuth>
			</view>
		</form>
	</view>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex'
	import graceChecker from '@/utils/graceChecker'
	export default {
		data () {
			return {
				type: [],
				index: -1,
				currentTab: 0,
				region: uni.getStorageSync('region'),
				params: {
					category_id: '',
					column_id: '',
					title: '',
					content: '',
					region: '',
				}
			}
		},
		onLoad() {
			const details = uni.getStorageSync('details')
			const type = uni.getStorageSync('cate')
			this.type = type
			this.params.column_id = uni.getStorageSync('nav').id
			this.params.region = uni.getStorageSync('region')
			if (details.id !== void 0) {
				this.params.title = details.title
				this.params.content = details.content
				this.params.id = details.id
				this.params.region = details.region
				this.params.column_id = details.column_id
			}
		},
		computed: {
			...mapGetters(['showModal'])
		},
		methods: {
			...mapActions(['postContent']),
			post () {
				this.postContent(this.params)
			},
			submit (e) {
				const rule = [
					{name:"title", checkType : "notnull", errorMsg:"请输入标题"},
					{name:"content", checkType : "notnull", errorMsg:"请输入内容"},
				]
				const formData = e.detail.value
				const checkRes = graceChecker.check(formData, rule)
				if (checkRes) {
					if (this.params.category_id !== '') {
						this.postContent(this.params)
					} else {
						uni.showToast({ title: '请选择分类', icon: 'none' })
					}
				} else {
					uni.showToast({ title: graceChecker.error, icon: "none" })
				}
			},			
			change(e) {
				const index = e.currentTarget.dataset.index
				this.currentTab = index
			},
			PickerChange (e) {
				this.index = +e.detail.value
				if (this.index !== -1) this.params.category_id = this.type[this.index].id
			}										
		}
	}
</script>

<style lang="scss">
.post-help {
	background-color: #f1f1f1;
	.type {
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
				font-size: 20rpx;
				box-sizing: border-box;
				border: 1px solid #6B69D6;
				&.active {
					color: white;
					background-color:#6B69D6;
				}
			}
		}
	}
}	
</style>
