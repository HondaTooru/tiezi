<template>
	<form @submit="submit">
		<AuthModal @submit="post"/>
		<view class="cu-form-group">
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
			<view class="title">店铺名称</view>
			<input type="text" placeholder="请输入店铺名称" v-model="params.title" name="title" />
		</view>
		<view class="cu-form-group align-start">
			<view class="title">店铺描述</view>
			<textarea value="" placeholder="请输入描述内容" v-show="!showModal" v-model="params.describe" name="describe" />
		</view>
		<view class="cu-form-group">
			<view class="title">联系方式</view>
			<input type="text" placeholder="请输入联系方式" v-model="params.phone" name="phone" />
		</view>
		<view class="cu-form-group">
			<view class="title">地址</view>
			<input type="text" placeholder="请输入地址" name="address" v-model="params.address" />
		</view>
		<block v-if="act === -1">
			<view class="cu-form-group">
				<view class="title">产品名称</view>
				<input type="text" placeholder="请输入产品名称" name="name" v-model="params.name" />
			</view>
			<view class="cu-bar bg-white margin-top-xs solid-top">
				<view class="action">产品图片</view>
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
		</block>
		<view class="cu-form-group">
			<button class="cu-btn bg-red" form-type="submit">{{ params.id ? '更新' : '发布' }}</button>
			<userAuth></userAuth>
		</view>
	</form>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex'
	import graceChecker from '@/utils/graceChecker'
	export default {
		data () {
			return {
				type:[],
				imgList: [],
				index: -1,
				act: -1, 
				params: {
					region: '',
					column_id: '',
					category_id: '',
					title: '',
					describe: '',
					phone: '',
					address: '',
					name: '',
					imgurl: ''
				}					
			}
		},
		onLoad (option) {
			const details = uni.getStorageSync('details')
			const type = uni.getStorageSync('cate')
			this.type = type			
			this.params.column_id = uni.getStorageSync('nav').id
			this.params.region = option.type === void 0 ? uni.getStorageSync('region') : uni.getStorageSync('post_region')
			this.act = option.act !== void 0 ? 0 : -1
			if (details.id !== void 0) {
				this.params.id = details.id
				this.params.title = details.title
				this.params.describe = details.describe
				this.params.phone = details.phone
				this.params.address = details.address
				this.params.region = details.region
				this.params.column_id = details.column_id
				this.params.category_id = details.category_id
				this.index = this.type.findIndex(item => item.id === details.category_id)
				console.log(this.index)
			}
		},
		computed: {
			...mapGetters(['showModal'])
		},
		methods: {
			...mapActions(['postContent', 'uploadImage']),
			post () {
				this.postContent({...this.params})
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
			submit (e) {
				const t1 = [
					{name:"title", checkType : "notnull", errorMsg:"请输入店铺名称"},
					{name:"describe", checkType : "notnull",  errorMsg: "请输入店铺描述"},
					{name:"phone", checkType : "notnull", errorMsg:"请输入联系方式"},
					{name:"address", checkType : "notnull", errorMsg:"请输店铺地址"}
				]
				const t2 = [
					{name:"name", checkType : "notnull", errorMsg:"请输入产品名称"}
				]
				const rule = this.act === -1 ? t1.concat(t2) : t1
				const formData = e.detail.value
				const checkRes = graceChecker.check(formData, rule)
				if (checkRes) {
					if (this.act === -1) {
						if (this.imgList.length >= 3) {
							if (this.params.category_id !== '') {
								this.params.imgurl = this.imgList.join(',')
								this.postContent({...this.params})
							} else {
								uni.showToast({ title: '请选择分类', icon: 'none' })
							}						
						} else {
							uni.showModal({
								content: '请上传3张产品图片',
								showCancel: false
							})						
						}
					} else {
						if (this.params.category_id !== '') {
							this.params.imgurl = this.imgList.join(',')
							this.postContent({...this.params})
						} else {
							uni.showToast({ title: '请选择分类', icon: 'none' })
						}
					}
				} else {
					uni.showToast({ title: graceChecker.error, icon: "none" })
				}
			},				
			PickerChange (e) {
				this.index = +e.detail.value
				if (this.index !== -1) this.params.category_id = this.type[this.index].id
			}			
		}
	}
</script>