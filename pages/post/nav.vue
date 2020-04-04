<template>
	<view class="nav-post">
		<com-share></com-share>
		<AuthModal/>
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
			<view class="cu-form-group" v-if="region === '其他城市'">
				<view class="title">所在城市</view>
				<input type="text" placeholder="请输入城市名称" v-model="params.region">
			</view>
			<view class="cu-form-group">
				<view class="title">选择类型</view>
				<picker @change="PickerChange" :value="index" :range="type" range-key="cate_name">
					<view class="picker">
						{{type[index].cate_name}}
					</view>
				</picker>				
			</view>
			<view class="cu-form-group">
				<view class="title">标题</view>
				<input type="text" placeholder="请输入标题" v-model="params.title" name="title">
			</view>
			<view class="cu-form-group">
				<view class="title">姓名</view>
				<input type="text" placeholder="请输入姓名" v-model="params.name" name="name">
			</view>
			<view class="cu-form-group">
				<view class="title">身高</view>
				<input type="text" placeholder="请输入身高" v-model="params.height">
				<view class="cu-tag bg-cyan">cm</view>
			</view>
			<view class="cu-form-group">
				<view class="title">性别</view>
				<picker @change="sexChange" :value="index" :range="sex">
					<view class="picker">
						{{sex[s_value]}}
					</view>
				</picker>				
			</view>
			<view class="cu-form-group">
				<view class="title">体重</view>
				<input type="text" placeholder="请输入体重" v-model="params.weight">
				<view class="cu-tag bg-cyan">kg</view>
			</view>
			<view class="cu-form-group">
				<view class="title">QQ</view>
				<input type="text" placeholder="请输入QQ号码" v-model="params.qq">
			</view>
			<view class="cu-form-group">
				<view class="title">微信</view>
				<input type="text" placeholder="请输入微信号码" v-model="params.wechat">
			</view>
			<view class="cu-form-group">
				<view class="title">手机号码</view>
				<input type="text" placeholder="请输入手机号码" v-model="params.phone">
			</view>						
			<view class="cu-form-group">
				<view class="title">籍贯</view>
				<input type="text" placeholder="请输入籍贯" v-model="params.native_place">
			</view>
			<view class="cu-form-group">
				<view class="title">职业</view>
				<input type="text" placeholder="请输入职业名称" v-model="params.occupation">
			</view>	
			<view class="cu-form-group">
				<view class="title">身份证号码</view>
				<input type="text" placeholder="请输入身份证号码" v-model="params.cardId">
			</view>						
			<view class="cu-form-group">
				<view class="title">年收入</view>
				<input type="text" placeholder="请输入年收入" v-model="params.income">
				<view class="cu-tag bg-cyan">万元</view>
			</view>
			<view class="cu-form-group">
				<view class="title">文化程度</view>
				<picker @change="cChange" :value="index" :range="culture">
					<view class="picker">
						{{culture[c_value]}}
					</view>
				</picker>				
			</view>
			<view class="cu-form-group">
				<view class="title">婚姻状况</view>
				<picker @change="marriedChange" :value="index" :range="married">
					<view class="picker">
						{{married[m_value]}}
					</view>
				</picker>				
			</view>
			<view class="cu-form-group">
				<view class="title">出生日期</view>
				<picker mode="date" :value="params.birth" @change="DateChange">
					<view class="picker">
						{{params.birth}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group align-start">
				<view class="title">内容</view>
				<textarea placeholder="请输入内容" v-show="!showModal" v-model="params.content" name="content" />
			</view>
			<view class="cu-form-group">
				<button class="cu-btn bg-red" form-type="submit">{{ params.id ? '更新' : '发表' }}</button>
				<userAuth></userAuth>
			</view>
		</form>
	</view>
</template>

<script>
	import graceChecker from '@/utils/graceChecker'
	import { mapActions, mapGetters } from 'vuex'
	export default {
		data () {
			return {
				imgList: [],
				type: [],
				culture: ['小学', '中学', '高中','中专','大专', '本科', '研究生', '硕士'],
				married: ['已婚', '未婚', '保密'],
				m_value: 0,
				c_value: 0,
				sex: ['保密','男', '女'],
				index: 0,
				s_value: 0,
				currentTab: 0,
				region: uni.getStorageSync('region'),
				params: {
					title:'',
					imgurl: '',
					column_id: '',
					category_id: '',
					name: '',
					region: '',
					height: '',
					weight: '',
					gender: 0,
					native_place: '',
					occupation: '',
					income: '',
					culture: '',
					marital: '',
					birth: '2019-01-01',
					qq: '',
					wechat: '',
					phone: '',
					cardId: '',
					content: ''
				}
			}
		},
		onLoad(options) {
			const getStorege = uni.getStorageSync('details')
			let details = {}
			if (getStorege && JSON.stringify(getStorege) !== '{}') {
				details = getStorege
			} else {
				details = uni.getStorageSync('myData')
				delete details.id
			}
			const type = uni.getStorageSync('cate')
			this.type = type
			this.params.region = uni.getStorageSync('region')
			this.params.column_id = uni.getStorageSync('nav').id
			this.params.category_id = this.type.length ? type[0].id : this.params.column_id
			if (details && JSON.stringify(details) !== '{}') {
				if (details.id !== void 0) this.params.id = details.id
				this.params.title = details.title
				this.params.name = details.name
				this.params.height = details.height
				this.params.weight = details.weight
				this.params.native_place = details.native_place
				this.params.occupation = details.occupation
				this.params.income = details.income
				this.c_value = this.culture.indexOf(details.culture) || 0
				this.m_value = this.married.indexOf(details.marital) || 0
				this.params.qq = details.qq
				this.params.wechat = details.wechat
				this.params.phone = details.phone
				this.params.cardId = details.cardId
				this.params.content = details.content
				if (details.imgurl !== void 0) {
					this.params.imgurl = details.imgurl instanceof Array ? details.imgurl.join(',') : details.imgurl
					this.imgList = details.imgurl instanceof Array ? details.imgurl : details.imgurl.split(',')
				}
				this.params.region = details.region
				this.params.column_id = details.column_id
			}
			this.params.culture = this.culture[this.c_value]
			this.params.marital = this.married[this.m_value]
		},
		computed: {
			...mapGetters(['showModal'])
		},
		methods: {
			...mapActions(['uploadImage', 'postContent']),
			submit (e) {
				const rule = [
					{name:"title", checkType : "notnull", errorMsg:"请输入标题"},
					{name:"name", checkType : "notnull",  errorMsg: "请输入姓名"},
					{name:"content", checkType : "notnull", errorMsg:"请输入帖子内容"}
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
			DateChange(e) {
				this.params.birth = e.detail.value
			},			
			marriedChange(e) {
				this.m_value = e.detail.value
			},
			cChange (e) {
				this.c_value = e.detail.value
			},
			PickerChange(e) {
				this.index = e.detail.value
				this.params.category_id = this.type[this.index].id
			},
			sexChange (e) {
				this.s_value = e.detail.value
				this.params.gender = e.detail.value
			},
			typeChange (e) {
				this.c_value = e.detail.value
			}
		}
	}	
</script>

<style lang="scss" scoped>
.nav-post {
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
					background-color:#516a04;
				}
			}
		}
	}	
}	
</style>
