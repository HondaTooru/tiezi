const app = {
	state: {
		navList: [],
		cityList: [],
		rule: {}
	},
	mutations: {
		SET_RULE: (state, rule) => {
			state.rule = rule
		},
		SET_NAV: (state, navList) => {
			state.navList = navList
		},
		SET_CITY: (state, cityList) => {
			state.cityList = cityList
		}
	}
}

export default app