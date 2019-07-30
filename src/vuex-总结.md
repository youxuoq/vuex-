vuex-笔记
	1. 基础-vuex-介绍-特点-场景
		回顾: 组件通信
			1. 父子组件 props
			2. 子传夫 this.on 和 this.emit
			3. 不相关组件 eventbus.js
		
		Vuex-是什么和特点
			1. Vuex是Vue的插件Vue.user()
			2. Vuex作用: 状态管理 组件通信 组件传值 不相关组件数据共享
			3. 使用场景: 
				适合于大型的SPA项目 (40+数量的组件)
				如果使用所学的父传子 子传父 不相关组件的通信 能满足需求 就不需要使用vuex
				
	2. 基础-vuex-管理流程
		目的: 了解知道vuex插件管理数据的流程是什么
		
		流程:
			state: 声明多个组件共享数据, 该数据是响应式
			actions: 和后台交互, 发送请求获取新的数据
			mutations: 接收action传递的新数据, 修改state
			
		注意:
			1. Vuex的核心组成部分: state / actions / mutations
			2. state / actions / mutions 都是对象
			3. vuex的管理流程非常重要, 要用自己的语言进行描述
						组件		     派遣		   行为		   提交        转变            变化		状态         渲染          vue组件 
				Vue Compnents ===>(Dispatch)===> Actions ===>(Commit)===>Mutations ===>(Mutate)===> State ===>(Render)===> Vue Components
				   vue 组件						用户的行为的处理			  方法					   声明数据						组件使用数据 
											   发送请求获取后台返的数据   接收新的数据 修改数据         响应式的
											   
			
	3. 基础-vuex-配置
		目的: 在vue项目中配置vue插件
		步骤:
			1. 安装 npm i vuex
			2. 配置
					1.引入和配置插件
					2. 实例化store
					3. 注册store
				
				// 导入
				import Vue from 'vue'
				import App from './App.vue'
				import Vuex from 'vuex'
				// 挂载
				Vue.use(Vuex)
				
				const store = new Vuex.Store({
                    // 声明数据
					state: {
						count: 0
					},
					mutations: {
						increment(state) {
							state.count++
						}
					}
				})
				Vue.config.productionTip = false
				
				new Vue ({
					render: h => (App),
					store
				}). $mount('#app')
                
    4. 基础-vuex-state和mapState
        目的: 研究vuex中的核心组合组成部分的state的用法
        vuex/main.js中
            const store = new Vuex.Store({
                state: {
                    count: 10,
                    name: 'abc'
                }
            })
           
        组件中 App.vue
            import {mapState} from 'vuex'
            
            export default {
                name: 'app',
                components: {
                    Child
                },
                data () {
                    return {
                        
                    }
                },
                // 把vuex的state的数据映射(更改)为当前组建的computed
                computed: {
                    count () {
                        return this.$store.state.count
                    }
                    
                    // 简化语法
                    ...mapState(['count'])
                }
            }
            
        注意: 
            1. state的使用有很多写法, 这里推荐使用mapState()
            2. state中的数据修改为组建的计算属性数据
    
        总结:
            1. 在main.js中注册 vuex插件
                导入vuex
                    import vuex from 'vuex'
                使用vuex
                     Vue.use('vuex')
                注册仓库
                    const store = new Vuex.Store ({
                        声明数据
                        store: {
                            count: 10,
                            name: vuex
                        }
                    })
                使用仓库
                new Vue ({
                    // 使用仓库
                    store,
                    render: h=> h('app')
                })$mount('#app')
                
            2. App.vue 组件中使用 store中的数据
                1. 通过差值表达式使用
                    {{this.$Store.store.count}}
                    
                2. 将store中的数据映射为当前omputed中的数据
                    方法一:
                        computed: {
                            count () {
                                this.$Store.store.count
                            }
                        }
                        视图中的使用方法
                            {{count}}
                            
                    方法二: 使用mapState辅助函数 (推荐使用)
                        computed: {
                            展开辅助函数
                            ...mapSate(['count'])
                        }
                        在试图中的使用
                            {{count}}
        
    5. 基础-vuex-mutations和mapMutations
        目的: 研究vuex核组成部分中mutation的用法
        步骤:
            1. 在main.js中声明 mutations方法
            2. 在组件中使用 mutations方法
            
            代码:
                main.js中
                    mutations: {
                        // 传入state作为形参
                        setCount (state) {
                            // 查看状态
                            console.log('方法调用了')
                            // 修改state中的数据
                            state.count++
                        }
                    }
                
                组件中 
                    <!-- 注册点击事件 触发mutations方法-->
                    <button @click="setCount">按钮</button>
                    
                    <!-- 导入mapMutations辅助函数 -->
                    import {mpState, mapMutations} from 'vuex'
                    
                    <!-- 定义处理数据的方法 -->
                    methods: {
                            
                            <!--
                                setCount () {
                                    // 参数1: 是在main.js中定义的修改state属性的方法
                                    // 参数2: 是传入的自定义实参
                                   this.$store.commit('setCount', 200)
                                }
                            -->
                            
                            // 下面的代码是上面的代码的内部原理 (但目前不能传入实参)
                            ...mapMutations(['setCount'])
                    }
                    
        注意:
            1. mutations作用是修改state的
            2. mutations中的方法默认形参state
            3. mutaitons中的方法对应的是组件method
         
        总结:
            1. 在main.js中
                使用mutaitons修改state中的属性
                    mutations: {
                        // 传入state作为形参
                        setCount (state, '自定义形参') {
                            // 修改state中的count属性  自定义形参可以在修改count属性是使用
                            state.count++
                        }
                    }
                    
            2. 在组件中导入mapMtations辅助函数
                import {mapState, mapMutations} from 'vuex'
                
            3. 在组件中添加事件 触发mapMutations辅助函数
                <button @click="setCount"></button>
                
            4. 在组件中点击事件的处理函数 触发mapMutations辅助函数
                方法一: 代码少 (推荐使用)
                    methods: {
                        ...mapMutations(['setCount'])
                    }
                    
                方法二: 可传入实参 (不推荐)
                    methods: {
                        setCount () {
                            this.$store.commit('setCount', 传入的实参)
                        }
                    }
     
    6. 基础-vuex-actions和mapActions
        目的: 研究vuex核心组成部分转给你的actions方法
        步骤:
            1. 在actions中声明方法
            2. actions中的方法作用: 适合后台交互, 把新数据提交给mutations
            3. 在组件中使用actions方法
            
        main.js中
        组件中
            <button @click="scSetCount">按钮</button>
            
            import { mapState, mapMutations, mapActions } from 'vuex'
            
            methods: {
                ...mapActions(['scSetCount'])
            }
            
            注意:
                1. mutations和actions写的都是方法
                2. mutations写的是同步方法
                3. actions中的方法是异步的
                    在actions中最应该写 ajax / axios
                    常见的异步
                        1. ajax
                        2. 定时器
                        3. 事件
                        4. 操作数库
                
            总结: 
                1. main.js中 声明actions
                    actions: {
                        acSetCount(context) {
                            // 声明数据
                            const newCount = 20
                            
                            // 调用mutations中的setCount方法 并传入实参
                        }
                    }
                2. 组件中 使用actions 
            
    7. 基础-vuex-总结
        vuex的重点
            1. vuex适用于管理复杂vue的SPA项目的数据的插件
            2. vuex适用于大型vue开发SPA的项目
            3. 核心组成部分: state/mutations/actions
            4. state 声明数据 对应组件的computed
            5. mutations 同步的修改state的方法 对应组件的methods
            6. actions 异步的和后台交互的方法 对应组件的methods
            7. 利用辅助函数mapState/mapMutations/mapActions可以简化使用
            8. vuex管理流程
        
        