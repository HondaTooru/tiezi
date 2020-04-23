const app = {
	state: {
		navList: [],
		cityList: [],
		rule: {},
		current: -1,
		postTab: -1
	},
	mutations: {
		SET_RULE: (state, rule) => {
			state.rule = rule
		},
		SET_CURRENT: (state, current) => {
			state.current = current
		},
		SET_POSTTAP: (state, postTab) => {
			state.postTab = postTab
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