import Vue from 'vue';
import VueRouter from 'vue-router';
import Foo from './components/Foo.vue';

Vue.use(VueRouter)

export default ()=>{
    const router = new VueRouter({
        mode:'history', // 使用history模式，因为hash不会发送到服务端
        routes:[
            {
                path:'/',
                redirect:'/foo'
            },
            {
                path:'/foo',
                component:Foo
            },
            {
                path:'/bar',
                component:()=>import('./components/Bar.vue')
            }
        ]
    })

    return router
}