import { 
	SetCode, 
	login, 
	getMy, 
	readyFab, 
	addfavorite, 
	addCom, 
	delComment, 
	uploadImg, 
	MakeFriends, 
	lookCar, 
	postShop, 
	postVillage, 
	postRent, 
	postInvite, 
	postUsed, 
	postService, 
	postHelp, 
	postTaxi, 
	postSkill, 
	postLove, 
	MyData, 
	MyList,
	delCollect, 
	delPost,
	UserShop,
	DelProdcut,
	SubmitProduct } from '@/api'

const user = {
	state:{
		userInfo: {},
		isLogin: false,
		showModal: false,
		isRead: uni.getStorageSync('isRead') || false,
		address: {},
		contact: {},
		tiez: [],
		shop: [],
		Tap: 0,
		collect: [],
		userShop: [],
		x: {
			page: 1,
			limit: 10
		}
		
	},
	mutations: {
		SET_USERINFO: (state, userInfo) => {
			state.userInfo = userInfo
		},
		SET_USERSHOP: (state, userShop) => {
			state.userShop = userShop
		},
		SET_ISREAD: (state, isRead) => {
			state.isRead = isRead
		},
		SET_CONTACT: (state, contact) => {
			state.contact = contact
		},
		SET_LOGIN: (state, isLogin) => {
			state.isLogin = isLogin
		},
		SET_ADDR: (state, address) => {
			state.address = address
		},
		SET_SHOWMODAL: (state, showModal) => {
			state.showModal = showModal
		},
		SET_TIEZ: (state, tiez) => {
			state.tiez = tiez
		},
		SET_TAP: (state, Tap) => {
			state.Tap = Tap
		},
		SET_PAGE: (state, page) => {
			state.x.page = page
		},
		SET_LIST: (state, collect) => {
			state.collect = collect
		}
	},
	actions: {
		delPro ({ state, commit }, { store_id, id }) {
			return new Promise(resolve => {
				uni.showLoading({ title: '删除中' })
				DelProdcut({ id }, { header: { token: state.userInfo.token } }).then(res => {
					uni.hideLoading()
					const list = state.userShop.map(item => {
						if (item.id === store_id) {
							item.product_list = item.product_list.filter(p => p.id !== id)
						}
						return item
					})
					uni.setStorageSync('usershop', list)
					commit('SET_USERSHOP', list)
				})
			})
		},
		postContent ({ state, commit }, data) {
			if (state.showModal || state.isRead) {
				return new Promise(async resolve => {
					uni.showLoading({ title: '请稍后' })
					 const result = await (() => {
						 return new Promise(rst => {
							 let action = MakeFriends
							 const column_id = uni.getStorageSync('nav').id
							 console.log(uni.getStorageSync('nav'))
							 if (column_id === 14) action = lookCar
							 if (column_id === 13 && data.type === void 0) action = postShop
							 if (column_id === 11) action = postVillage
							 if (column_id === 10) action = postRent
							 if (column_id === 9) action = postInvite
							 if (column_id === 58) action = postUsed
							 if (column_id === 1) action = postService
							 if (column_id === 6) action = postHelp
							 if (column_id === 30) action = postTaxi
							 if (column_id === 49) action = postSkill
							 if (column_id === 74) action = postLove
							 if (column_id === 13 && data.type === -2) action = SubmitProduct
							 action(data, { header: { token: state.userInfo.token } }).then(res => {
								 uni.showModal({
									content: res.msg,
									showCancel: false,
									success: () => {
										uni.navigateBack()
									}
								 })
							 })
							 rst()
						 })
					})()
					 uni.hideLoading()
					 resolve(result)
				})
			} else {
				commit('SET_SHOWMODAL', true)
			}
		},
		uploadImage ({ state }, fileList) { // 上传图片
			return new Promise(async (resolve, reject) => {
				uni.showLoading({ title: '上传中', mask: true })
				let imgList = []
				const maxSize = 1024 * 1024
				for (let i = 0;i < fileList.length;i++) {
					if (fileList[i].size < maxSize) {
						const img = await (() => {
							return new Promise((rst, reject) => {
								uni.uploadFile({
									url: 'https://www.dxcf.xyz/ebapi/placard_api/upload',
									filePath: fileList[i].path,
									name: 'filename',
									success: res => {
										rst(JSON.parse(res.data))
									},fail: err => {
										reject(err)
										console.log(err)
									}
								})
							})
						})()
						imgList.push(img.msg)
					} else {
						uni.hideLoading()
						uni.showModal({
							content: '你选择的图片大于1MB',
							showCancel: false
						})
						reject('你选择的图片大于1MB')
						return
					}
				}
				uni.hideLoading()
				resolve(imgList)
			})
		},
		deleteComment ({ state }, data) { // 删除评论
			return new Promise(async resolve => {
				uni.showLoading({ title: '请稍后' })
				 const result = await (() => {
					 return new Promise(resolve => {
						 delComment(data, { header: { token: state.userInfo.token } }).then(res => {
							 resolve(res)
						 })
					 })
				 })()
				 uni.hideLoading()
				 resolve(result)
			})
		},
		 replay ({ state }, data) { // 回复
			 return new Promise(async resolve => {
				 uni.showLoading({ mask: true, title: '请稍后' })
				 const result = await (() => {
					 return new Promise(resolve => {
						 addCom(data, { header: { token: state.userInfo.token } }).then(res => {
							 resolve(res)
						 })
					 })
				 })()
				 uni.hideLoading()
				 resolve(result)
			 })
		 },
		 actionTool ({ state, dispatch }, { data, type }) { // 点赞, 收藏
			return new Promise(async resolve => {
				uni.showLoading({ mask:true, title: '加载中' })
				let action = readyFab
				if (type === 0) action = addfavorite
				await (() => {
					return new Promise(resolve=> {
						action(data, { header: { token: state.userInfo.token } }).then(res => {
							uni.showToast({
								icon: 'none',
								title: res.msg,
								success: () => {
									if (type === 0) dispatch('getList', 'get')
								}
							})
							resolve()
						})
					})				
				})()
				uni.hideLoading()
				resolve()
			})
		},
		wxAuth ({ dispatch }, info) { //授权登录
		   return new Promise(resolve => {
				uni.login({
					provider: 'weixin',
					success: result => {
						if (result.errMsg === 'login:ok') dispatch('wxlogin', { code: result.code, info }).then(_ => {
							resolve()
						})
					}
				})			   
		   })
		},
		wxlogin ({ dispatch }, {code, info}) {
			return new Promise(async resolve => {
				const iv = info.iv
				const encryptedData = info.encryptedData
				uni.showLoading({ mask: true, title: '授权中' })
				const cache_key = await dispatch('login',code)
				const result = await dispatch('getUserInfo', {cache_key, iv, encryptedData})
				await dispatch('getMyInfo', result)
				await dispatch('getData')
				await dispatch('getList')
				await dispatch('getUserShop')
				uni.hideLoading()
				resolve()
			})
		},
		login ({}, code) {
			return new Promise(resolve => {
				SetCode({ code }).then(res => {
					if (res.code === 200) {
						resolve(res.data.cache_key)
					} else {
						uni.showToast({
							icon: 'none',
							title:'授权失败,请重试'
						})
					}
				})
			})
		},
		getUserInfo ({ commit }, {cache_key, iv, encryptedData}) {
			return new Promise(resolve => {
				login({ cache_key, iv, encryptedData }).then(res => {
					resolve(res.data)
				})
			})
		},
		async reFresh ({ state, dispatch, commit }) {
			uni.showLoading({ title: '请稍后' })
			commit('SET_PAGE', 1)
			if (state.isLogin) {
				await dispatch('getData', 'refresh')
				await dispatch('getList', 'refresh')
				await dispatch('getUserShop', 'refresh')
			}
			uni.stopPullDownRefresh()
			uni.hideLoading()
		},
		getData ({ state, commit }, type) { // 获取发表的帖子
			return new Promise(resolve => {
				MyData({ }, { header: { token: state.userInfo.token } }).then(res => {
					const result = res.data
					if (type !== void 0) commit('SET_TIEZ', [])
					for (const item in result) {
						if (item !== 'shop') {
							state.tiez = [...state.tiez, ...result[item].data]
						} else {
							state.shop = result[item].data
						}
					}
					uni.setStorageSync('tiez', state.tiez)
					resolve()
				})
			}) 
		},
		getUserShop ({ state, commit }, type) {
			return new Promise(resolve => {
				UserShop({}, { header: { token: state.userInfo.token } }).then(res => {
					if (type === void 0 ) commit('SET_USERSHOP', [])
					commit('SET_USERSHOP', res.data)
					uni.setStorageSync('usershop', state.userShop)
					resolve()
				})
			})
		},
		getList ({ commit, state }, type) { // 获取收藏的帖子
			return new Promise(resolve => {
				MyList(state.x, { header: { token: state.userInfo.token } }).then(res => {
					const list = res.data
					if (state.x.page === 1) uni.setStorageSync('collect',list)
					if (type === void 0) {
						if (list.length < state.x.limit && state.x.page !== 1) {
							uni.showToast({
								icon: 'none',
								title: '没有更多了~'
							})
						}						
					} else {
						commit('SET_LIST', [])
					}
					commit('SET_LIST', [...state.collect, ...list])
					resolve()
				})
			})
		},
		delMyPost ({ state, commit }, {data, idx}) { // 删除帖子
			return new Promise(resolve => {
				uni.showLoading({ title: '请稍后', mask: true })
				delPost(data, { header: { token: state.userInfo.token } }).then(res => {
					if (res.code === 200) {
						if (data.column_id !== '13') {
							const tiez = uni.getStorageSync('tiez')
							uni.setStorageSync('tiez', tiez.filter((item, index) => index !== idx))
							commit('SET_TIEZ', state.tiez.filter((item, index) => index !== idx))
						} else {
							const shop = uni.getStorageSync('usershop')
							uni.setStorageSync('usershop', shop.filter((item, index) => item.id !== data.placard_id))
							commit('SET_USERSHOP', state.userShop.filter((item, index) => item.id !== data.placard_id))							
						}
					} else {
						uni.showToast({
							icon: 'none',
							title: res.msg
						})
					}					
					uni.hideLoading()
				})
			})
		},		
		delMyCollect ({ state, commit }, id) { // 删除收藏
			return new Promise(resolve => {
				uni.showLoading({ title: '请稍后', mask: true })
				delCollect({id}, { header: { token: state.userInfo.token } }).then(res => {
					if (res.code === 200) {
						const collect = uni.getStorageSync('collect')
						uni.setStorageSync('collect', collect.filter(item => item.id !== id))
						commit('SET_LIST', state.collect.filter(item => item.id !== id))
					} else {
						uni.showToast({
							icon: 'none',
							title: res.msg
						})
					}
					uni.hideLoading()
				})
			})
		},
		getMyInfo ({ commit }, result) {
			return new Promise(resolve => {
				if (result.status === '401') {
					uni.showToast({ icon: 'none', title: '授权失败,请重试' })
					resolve()
				} else {
					const token = result.token
					getMy({}, { header: { token } }).then(res => {
						if (res.code === 200) {
							const userData = {...res.data, token}
							uni.setStorageSync('u_key', userData)
							commit('SET_USERINFO', userData)
							commit('SET_LOGIN', true)
						} else {
							uni.showToast({ icon: 'none', title: '授权失败,请重试' })
						}
						resolve()
					})					
				}
			})
		}
	}
}

export default user