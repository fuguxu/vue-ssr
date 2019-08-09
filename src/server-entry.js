import createApp from './main';

export default (context)=>{ //此上下文是在server.js中 renderToString方法传入的
    return new Promise((resolve,reject)=>{
        const {app,router,store} = createApp();
        router.push(context.url); //渲染当前页面

        //涉及到异步组件
        router.onReady(()=>{
            let matchs = router.getMatchedComponents(); //路由是否有匹配的
            console.log(matchs)
            if(matchs.length===0){
                reject({code:404})
            }
            // matchs匹配到所有组件，整个都在服务端执行的
            Promise.all(matchs.map(component=>{
                //需要在服务端获取数据 可以在此操作
                if(component.asyncData){
                   return component.asyncData(store)
                }
            })).then(()=>{
                //以上all中的方法会改变store中的状态
                //改变store中状态后 挂到上下文中 ，会将状态挂到window上  ,然后可以在客户端中去做拿数据
                context.state = store.state;
                resolve(app)
            })
        },reject)
    })
}