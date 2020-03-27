import Vue from 'vue'
import App from './App'
import store from '@/store'

import userAuth from '@/components/auth'
import comTop from '@/components/top'
import tabBar from '@/components/tabBar'
import EmptyData from '@/components/emptydata'
import PublicPage from '@/pages/comPage'
import AuthModal from '@/components/authModal'
import ComShare from '@/components/share'

Vue.config.productionTip = false
Vue.component('userAuth', userAuth)
Vue.component('comTop', comTop)
Vue.component('tabBar', tabBar)
Vue.component('EmptyData', EmptyData)
Vue.component('ComPage', PublicPage)
Vue.component('AuthModal', AuthModal)
Vue.component('ComShare', ComShare)

App.mpType = 'app'
Vue.prototype.$store = store

function getTime(type) {
	const date = new Date();
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();
	if (type === 'start') {
		year = year - 60;
	} else if (type === 'end') {
		year = year + 2;
	}
	month = month > 9 ? month : '0' + month;;
	day = day > 9 ? day : '0' + day;
	return `${year}-${month}-${day}`;
}
Vue.prototype.$getTime = getTime()
const app = new Vue({
    ...App
})
app.$mount()
