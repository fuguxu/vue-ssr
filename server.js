const Koa =require('koa');
const Router =require('koa-router');
const path =require('path');
const static =require('koa-static');
const VueServerRender = require('vue-server-renderer');
const fs = require('fs');

let ServerBundle = require('./dist/vue-ssr-server-bundle');

//客户端的manifest.json 
let clientManifest = require('./dist/vue-ssr-client-manifest');
const template = fs.readFileSync('./dist/index.ssr.html','utf8');

//渲染打包后的结果
let render = VueServerRender.createBundleRenderer(ServerBundle,{
    template,
    clientManifest, //渲染的时候 可以找到客户端代码 插入到html中
})
const app = new Koa();
const router = new Router();


router.get('/',async (ctx)=>{
    ctx.body = await new Promise((resolve,reject)=>{
    //会调server-entry的实例方法
        render.renderToString({url:'/'},(err,data)=>{ //写成回调的形式 不然样式不生效
            if(err) reject(err);
            resolve(data);
        })
    })
})


app.use(router.routes());

app.use(static(path.resolve(__dirname,'dist')));
//如果匹配不到 会执行此中间件
app.use(async ctx=>{
    console.log(ctx.url)
    try{
        ctx.body = await new Promise((resolve,reject)=>{
                //会调server-entry的实例方法
                render.renderToString({url:ctx.url},(err,data)=>{ //写成回调的形式 不然样式不生效
                    if(err) reject(err);
                    resolve(data);
                })
            })
    }catch(e){
        ctx.body = '404'
    }
    
})
app.listen(3333)