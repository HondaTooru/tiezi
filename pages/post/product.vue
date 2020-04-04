<template>
<view class="product-post">
	<com-share></com-share>
	<AuthModal/>
	<form @submit="submit">
		<view class="cu-form-group">
			<view class="title">类型</view>
			<picker @change="PickerChange" :value="index" :range="type" range-key="cate_name">
				<view class="picker">
					{{type[index].cate_name}}
				</view>
			</picker>				
		</view>			
		<view class="cu-bar bg-white margin-top-xs">
			<view class="action">图片上传</view>
			<view class="action">{{ imgList.length }}/3</view>
		</view>
		<view class="cu-form-group">
			<view class="grid col-4 grid-square flex-sub">
				<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
				 <image :src="item" mode="aspectFill"></image>
					<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
						<text class='cuIcon-close'></text>
					</view>
				</view>
				<view class="solids" @tap="ChooseImage" v-if="imgList.length<3">
					<text class='cuIcon-cameraadd'></text>
				</view>
			</view>
		</view>
		<view class="cu-form-group">
			<view class="title">产品名称</view>
			<input type="text" v-model="params.name" name="name" placeholder="请输入产品名称" />
		</view>
		<view class="cu-form-group">
			<button class="cu-btn bg-red" form-type="submit">{{ params.id ? '更新' : '发布' }}</button>
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
				index: 0,
				type: [],
				params: {
					type: -2,
					store_id: '',
					name: '',
					attribute_id: '',
					imgurl: [],
					region: ''
				}
			}
		},
		onLoad(option) {
			const details = uni.getStorageSync('details')
			const type = uni.getStorageSync('cate')
			this.params.store_id = option.id
			this.params.attribute_id = type[this.index].id
			this.params.region = uni.getStorageSync('region')
			this.type = type
			if (details.id !== void 0) {
				this.params.id = details.id
				this.imgList = details.imgurl
				this.params.name = details.name
			}
		},
		methods: {
			...mapActions(['uploadImage', 'postContent']),
			submit (e) {
				const rule = [
					{name:"name", checkType : "notnull",  errorMsg: "请输入产品名称"}
				]
				const formData = e.detail.value
				const checkRes = graceChecker.check(formData, rule)
				if (checkRes) {
					this.params.imgurl = this.imgList.join(',')
					if (this.imgList.length >= 3) {
						this.postContent(this.params)
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
				this.index = e.detail.value
				this.params.attribute_id = this.type[this.index].id
			}	
		}
	}
</script>

<style lang="scss">
.product-post {
	background-color:#f1f1f1;
	.type {
		width: 230rpx;
	}
}	
</style>
