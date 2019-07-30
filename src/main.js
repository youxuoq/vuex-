import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 导入vuex插件
import Vuex from 'vuex'

// 使用vuex插件
Vue.use(Vuex)

// 注册仓库
const store = new Vuex.Store({
  // 声明数据
  state: {
    count: 10,
    name: 'app'
  },

  // 作用是修改state中的数据 要传入state作为形参
  mutations: {
    setCount (state, bayload) {
      console.log('setCount方法执行了', bayload)
      // 修改state中的count属性
      state.count = bayload
    }
  },

  // actions
  // 1. actions中的方法默认形参context
  // 2. context其实就是store
  actions: {
    acSetCount (context) {
      // 这里最常见的代码是ajax
      // 1. 为了写ajax 需要接口服务器和接口文档
      setInterval(() => {
        // 把20交给state.count
        const newCount = 20

        // 下面的代码是调用mutations中的setcount()
        context.commit('setCount', newCount)
      }, 1000)
    }
  }
})

Vue.config.productionTip = false

new Vue({
  router,

  // 使用仓库
  store,
  render: h => h(App)
}).$mount('#app')
