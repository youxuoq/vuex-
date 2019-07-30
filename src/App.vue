<template>
    <div>
        <h3>vuex练习</h3>
        <span>这是vuex的声明数据</span>

        <!-- <span>{{this.$store.state.count}}</span> -->

        <!-- 使用mapState辅助函数后的使用方法 -->
        <span>{{ count }}</span>
        <!-- 使用 child组件-->
        <child></child>
        <button @click="setCount">按钮1</button>
        <button @click="acSetCount">按钮2</button>
    </div>
</template>

<script>
// 导入 Child组件
import Child from './Child'
// 为了能方便使用state的数据count, vuex提供了很多辅助函数, 比如mapState
// 1. 导入vuex
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'app',

  // 注册child组件
  components: {
    Child
  },
  data () {
    return {
      age: 10

    }
  },

  // 把vuex额state的数据映射(更改)为当前组件的computed (计算属性)
  computed: {
    // ...(展开 辅助函数)
    ...mapState(['count'])
  },

  methods: {
    // 定义按钮的点击事件的处理函数
    // fn1 () {
    //     //调用mutations方法
    //     this.$store.commit('setCount')
    // }
    //

    ...mapMutations(['setCount']),

    ...mapActions(['acSetCount'])
  }

}
</script>

<style>
</style>
