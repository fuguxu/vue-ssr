const path =require('path');
const VueLoader = require('vue-loader/lib/plugin');
const resolve = (dir)=>{
    return path.resolve(__dirname,dir)
}
module.exports = {
    output:{
        filename:'[name].bundle.js',
        path:resolve('../dist')
    },
    // watch: true,
    // watchOptions: {
    //     poll: 1000, // 每秒询问1000次
    //     aggregateTimeout: 500, // 防抖，输入完成500毫秒后再打包，持续输入不会打包
    //     ignored: /node_modules/ // 不需要进行监控的文件夹
    // },
    resolve:{
        extensions:['.js','.vue']
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:["@babel/preset-env"]
                    }
                },
                exclude:/node_modules/
            },
            {
                test:/\.css$/,
                use:[
                    'vue-style-loader',
                    'css-loader'
                ]
            },
            {
                test:/\.vue$/,
                use:'vue-loader'
            }
        ]
    },
    plugins:[
        new VueLoader(),
    ]
}