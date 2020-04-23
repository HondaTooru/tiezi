<template>
<view class="shop-post">
	<com-share></com-share>
	<AuthModal @submit="post"/>
	<form>
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
		<view class="cu-form-group">
			<view class="title">产品类型</view>
			<view class="type cu-form-group">
				<picker @change="typeChange" :value="index" :range="type"  range-key="cate_name">
					<view class="picker">
						{{type[t_value].cate_name}}
					</view>
				</picker>			
			</view>		
		</view>
		<view class="cu-form-group">
			<view class="title">产品名称</view>
			<input type="text" placeholder="请输入产品名称" />
		</view>
		<view class="cu-form-group">
			<button class="cu-btn bg-red">{{ params.id ? '更新' : '发布' }}</button>
		</view>
	</form>	
</view>	
</template>

<script>
	import graceChecker from '@/utils/graceChecker'
	import { mapActions } from 'vuex'
	export default {
		data () {
			return {
				imgList: [],
				type: [],
				t_value: 0,
				params: {
					column_id: '',
					category_id: '',
					region: ''
				}
			}
		},
		onLoad(option) {
			const type = uni.getStorageSync('cate')
			this.type = type
			this.params.column_id = uni.getStorageSync('nav').id
			this.params.region = option.type === void 0 ? uni.getStorageSync('region') : uni.getStorageSync('post_region')
			this.params.category_id = type[0].id		
		},
		methods: {
			...mapActions(['postContent']),
			post () {
				this.postContent({...this.params, start_time: this.start_time})
			},
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
					this.postContent({...this.params, start_time: this.start_time})
				} else {
					uni.showToast({ title: graceChecker.error, icon: "none" })
				}
			},				
			typeChange (e) {
				this.t_value = +e.detail.value
				if (this.t_value !== -1) this.params.category_id = this.type[this.t_value].id
			},
			ChooseImage() {
				uni.chooseImage({
					count: 3, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
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
			}									
		}
	}
</script>

<style lang="scss">
.shop-post {
	background-color:#f1f1f1;
	.type {
		width: 230rpx;
	}
}	
</style>
