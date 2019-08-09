const path =require('path');
const base = require('./webpack.base.config');
const merge = require('webpack-merge');
const HtmlWebpackPlugin  =require('html-webpack-plugin');
const ServerRender  =require('vue-server-renderer/server-plugin');
const resolve = (dir)=>{
    return path.resolve(__dirname,dir)
}

module.exports = merge(base,{
    target:'node',//给node使用
    entry:{
        server:resolve('../src/server-entry.js')
    },
    output:{
        libraryTarget:'commonjs2',//打包后 把最终结果挂在molue.exports上
    },
    plugins:[
        new ServerRender(),
        new HtmlWebpackPlugin({
            filename:'index.ssr.html',
            template:resolve('../public/index.ssr.html'),
            excludeChunks:['server'],//不引入服务端打包后的代码(entry的key)  而是客户端的打包后的代码
        })
    ]
})

