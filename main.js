import Vue from 'vue'
import App from './App'
import store from './store/index.js'

Vue.prototype.$store = store

Vue.config.productionTip = false

App.mpType = 'app'

//引入全局组件(分割线组件)
import divider from './components/common/divider.vue'
Vue.component('divider',divider)
//引入缺省页组件
import nothing from './components/common/no-thing.vue'
Vue.component('nothing',nothing)

//引入配置文件
import $C from './common/config.js'
Vue.prototype.$C=$C
//引入助手函数库
import $U from './common/util.js'
Vue.prototype.$U=$U
//引入请求库
import $H from './common/request.js'
Vue.prototype.$H=$H

// 权限验证
Vue.prototype.checkAuth = (callback)=>{
	//通过登录状态进行判断
	if(!store.state.loginStatus){
		uni.showToast({
			icon:'none',
			title:'请先登录'
		})
		return uni.navigateTo({
			url:'/pages/login/login.vue'
		})
	}
	callback()
}
// 权限验证跳转
Vue.prototype.navigateTo = (options)=>{
	if(!store.state.loginStatus){
		uni.showToast({
			icon:'none',
			title:'请先登录'
		})
		return uni.navigateTo({
			url:'/pages/login/login.vue'
		})
	}
	uni.navigateTo(options)
}

const app = new Vue({
		store,
    ...App
})
app.$mount()
