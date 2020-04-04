<template>
	<view>
		<form @submit="submit">
			<view class="cu-form-group">
				<view class="title">姓名</view>
				<input placeholder="请输入昵称" v-model="params.name" name="name"></input>
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
				<view class="title">身高</view>
				<input type="text" placeholder="请输入身高(cm)" v-model="params.height" name="height">
				<view class="cu-tag bg-cyan">cm</view>
			</view>
			<view class="cu-form-group">
				<view class="title">体重</view>
				<input type="text" placeholder="请输入体重(kg)" v-model="params.weight" name="weight">
				<view class="cu-tag bg-cyan">kg</view>
			</view>
			<view class="cu-form-group">
				<view class="title">QQ</view>
				<input type="text" placeholder="请输入QQ号码" v-model="params.qq" name="qq">
			</view>
			<view class="cu-form-group">
				<view class="title">微信</view>
				<input type="text" placeholder="请输入微信号码" v-model="params.wechat" name="wechat">
			</view>
			<view class="cu-form-group">
				<view class="title">手机号码</view>
				<input type="digit" placeholder="请输入手机号码" v-model="params.phone" name="phone">
			</view>						
			<view class="cu-form-group">
				<view class="title">籍贯</view>
				<input type="text" placeholder="请输入籍贯" v-model="params.native_place" name="native_place">
			</view>
			<view class="cu-form-group">
				<view class="title">职业</view>
				<input type="text" placeholder="请输入职业名称" v-model="params.occupation" name="occupation">
			</view>	
			<view class="cu-form-group">
				<view class="title">身份证号码</view>
				<input type="text" placeholder="请输入身份证号码" v-model="params.cardId" name="cardId">
			</view>						
			<view class="cu-form-group">
				<view class="title">年收入</view>
				<input type="text" placeholder="请输入年收入" v-model="params.income" name="income">
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
			<view class="cu-form-group">
				<button class="cu-btn bg-red" form-type="submit">提交</button>
			</view>
		</form>
	</view>
</template>

<script>
	import graceChecker from '@/utils/graceChecker'
	import { mapGetters } from 'vuex'
	export default {
		data () {
			return {
				s_value: 0,
				c_value: 0,
				m_value: 0,
				sex: ['保密','男', '女'],
				married: ['已婚', '未婚', '保密'],
				culture: ['小学', '中学', '高中','中专','大专', '本科', '研究生', '硕士'],
				params: {
					name: '',
					gender: 0,
					height: '',
					weight: '',
					qq: '',
					wechat: '',
					phone: '',
					native_place: '',
					cardId: '',
					occupation: '',
					income: '',
					culture: '小学',
					marital: '已婚',
					birth: '2019-01-01'
				}
			}
		},
		onShow() {
			if (this.myData.id !== void 0) {
				uni.setNavigationBarTitle({
					title: '编辑资料'
				})
				this.params = this.myData
				const m_value = this.married.findIndex(item => item === this.myData.marital)
				const c_value = this.culture.findIndex(item => item === this.myData.culture)
				this.m_value = m_value !== -1 ? m_value : 0
				this.c_value = c_value !== -1 ? c_value : 0
			}
		},
		computed: {
			...mapGetters(['myData'])
		},
		methods: {
			submit (e) {
				const rule = [
					{name:"name", checkType : "notnull", errorMsg:"请输入姓名"},
					{name:"height", checkType : "notnull",  errorMsg: "请输入身高"},
					{name:"weight", checkType : "notnull", errorMsg:"请输入体重"},
					{name:"qq", checkType : "notnull", errorMsg:"请输入QQ号码"},
					{name:"wechat", checkType : "notnull", errorMsg:"请输入微信号"},
					{name:"phone", checkType : "notnull", errorMsg:"请输入手机号码"},
					{name:"native_place", checkType : "notnull", errorMsg:"请输入籍贯地址"},
					{name:"occupation", checkType : "notnull", errorMsg:"请输入职业名称"},
					{name:"cardId", checkType : "notnull", errorMsg:"请输入身份证号码"},
					{name:"income", checkType : "notnull", errorMsg:"请输入年收入"}
				]
				const formData = e.detail.value
				const checkRes = graceChecker.check(formData, rule)
				if (checkRes) {
					uni.showLoading({ mask:true, title: '请稍后' })
					this.$store.dispatch('addMyData', this.params).then(async res => {
						if (res.code === 200) {
							uni.hideLoading()
							this.$store.dispatch('SeeMyData')
							uni.showModal({
								content: this.myData.id !== void 0 ? '更新成功' : '添加成功',
								showCancel: false,
								success: rst => {
									if (rst.confirm) uni.redirectTo({ url: '/pages/userdata' })
								}
							})
						} else {
							uni.hideLoading()
							uni.showToast({
								icon: 'none',
								title: '未知错误，请重试'
							})
						}
					})
				} else {
					uni.showToast({ title: graceChecker.error, icon: "none" })
				}
			},
			sexChange (e) {
				this.s_value = e.detail.value
				this.params.gender = e.detail.value
			},
			DateChange(e) {
				this.params.birth = e.detail.value
			},				
			marriedChange(e) {
				this.m_value = e.detail.value
				this.params.married = this.married[+e.detail.value]
			},			
			cChange (e) {
				this.c_value = e.detail.value
				this.params.culture = this.culture[+e.detail.value]
			}
		}
	}
</script>

<style>
</style>
