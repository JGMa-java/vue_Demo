import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import test from '@/components/test'
import demo4 from '@/components/demo4'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: demo4
    },
	  {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path:'/index',
      name:'index',
      component:HelloWorld
    }
  ]
})
