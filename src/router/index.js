import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import test from '@/components/test'
import demo4 from '@/components/demo4'
import Loading from '@/components/loading'
import echarts from '@/components/echarts'

import elementIndex from '@/components/elementUI/index'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'elementIndex',
      component: elementIndex
    },
    {
      path: '/demo4',
      name: 'HelloWorld',
      component: demo4
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/echarts',
      name: 'echarts',
      component: echarts
    },
    {
      path: '/index',
      name: 'index',
      component: HelloWorld,
      children: [
        // loadingView will be rendered inside HelloWorld's <router-view>
        // when /index/loading is matched
        { path: 'loading', component: Loading },
        // ...other sub routes
      ]
    },
    {
      path:'/loading',
      name:'loading',
      component:Loading
    }
  ]
})
