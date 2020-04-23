<template>
	<view class="post-taxi">
		<com-share></com-share>
		<AuthModal @submit="post"/>
		<form @submit="submit">	
			<view class="cu-bar bg-white margin-top-xs">
				<view class="action">图片上传</view>
				<view class="action">{{ imgList.length }}/3</view>
			</view>
			<view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
					 <image :src="imgList[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImage" v-if="imgList.length<3">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>		
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
			<view class="cu-form-group">
				<button class="cu-btn bg-red" form-type="submit">{{ params.id ? '更新' : '发表' }}</button>
				<userAuth></userAuth>
			</view>
		</form>
	</view>
</template>

<script>
	import { mapActions } from 'vuex'
	import graceChecker from '@/utils/graceChecker'
	export default {
		data () {
			return {
				imgList: [],
				type: [],
				index: -1,
				currentTab: 0,
				params: {
					category_id: '',
					column_id: '',
					title: '',
					imgurl: '',
					region: ''
				}
			}
		},
		onLoad(option) {
			const details = uni.getStorageSync('details')
			const type = uni.getStorageSync('cate')
			this.type = type
			this.params.column_id = uni.getStorageSync('nav').id
			this.params.region = option.type === void 0 ? uni.getStorageSync('region') : uni.getStorageSync('post_region')
			if (details.id !== void 0) {
				this.params.id = details.id
				this.params.title = details.title
				this.imgList = details.imgurl
				this.params.imgurl = details.imgurl.join(',')
				this.params.region = details.region
				this.params.column_id = this.params.category_id = details.column_id
			}
		},
		methods: {
			...mapActions(['postContent','uploadImage']),
			post () {
				this.postContent(this.params)
			},			
			submit (e) {
				const rule = [
					{name:"title", checkType : "notnull", errorMsg:"请输入标题"}
				]
				const formData = e.detail.value
				const checkRes = graceChecker.check(formData, rule)
				if (checkRes) {
					this.params.imgurl = this.imgList.join(',')
					if (this.imgList.length >= 3) {
						if (this.params.category_id !== '') {
							this.postContent(this.params)
						} else {
							uni.showToast({ title: '请选择分类', icon: 'none' })
						}
					} else {
						uni.showModal({
							content: '请上传至少3张图片',
							showCancel: false
						})
					}
				} else {
					uni.showToast({ title: graceChecker.error, icon: "none" })
				}
			},			
			change(e) {
				const index = e.currentTarget.dataset.index
				this.currentTab = index
			},
			ChooseImage() {
				uni.chooseImage({
					count: 3, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
					   const list = res.tempFiles
					   if ((list.length + this.imgList.length) <= 3) {
						   this.uploadImage(list).then(res => {
						   	 this.imgList = [...this.imgList, ...res]
						   })
					   } else {
						   uni.showModal({
						   	content: '最多上传3张图片',
							showCancel: false
						   })
					   }
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '提示',
					content: '你确定删除吗？',
					cancelText: '再想想',
					confirmText: '再见',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},			
			PickerChange (e) {
				this.index = +e.detail.value
				if (this.index !== -1) this.params.category_id = this.type[this.index].id
			}										
		}
	}
</script>

<style lang="scss">
.post-taxi {
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
