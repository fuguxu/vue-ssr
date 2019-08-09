const path =require('path');
const base = require('./webpack.base.config');
const merge = require('webpack-merge');
const ClientRender  =require('vue-server-renderer/client-plugin');
const HtmlWebpackPlugin  =require('html-webpack-plugin');

const resolve = (dir)=>{
    return path.resolve(__dirname,dir)
}

module.exports = merge(base,{
    entry:{
        client:resolve('../src/client-entry.js')
    },
    // watch: true,
    // watchOptions: {
    //     poll: 1000, // 每秒询问1000次
    //     aggregateTimeout: 500, // 防抖，输入完成500毫秒后再打包，持续输入不会打包
    //     ignored: /node_modules/ // 不需要进行监控的文件夹
    // },
    plugins:[
        new ClientRender(),
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:resolve('../public/index.html')
        })
    ]
})

