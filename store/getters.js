const getters = {
	userInfo: state => state.user.userInfo,
	isLogin: state => state.user.isLogin,
	address: state => state.user.address,
	tiez: state => state.user.tiez,
	ship: state => state.user.shop,
	Tap: state => state.user.Tap,
	contact: state => state.user.contact,
	collect: state => state.user.collect,
	cityList: state => state.app.cityList,
	navList:state => state.app.navList,
	rule: state => state.app.rule,
	showModal: state => state.user.showModal,
	userShop: state => state.user.userShop
}
export default getters