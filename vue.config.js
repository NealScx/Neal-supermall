const path = require('path');
module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                'assets': path.resolve(__dirname, 'src/assets'),
                'common': path.resolve(__dirname, 'src/common'),
                'components': path.resolve(__dirname, 'src/components'),
                'network': path.resolve(__dirname, 'src/network'),
                'views': path.resolve(__dirname, 'src/views'),
            }
        }
    }
}

// module.exports = {
//     publicPath: '/',   //这个必须，引入静态资源需要从根路径引入，否则会找不到静态资源
//     devServer: {
//         // history模式下的url会请求到服务器端，但是服务器端并没有这一个资源文件，就会返回404，所以需要配置这一项
//         historyApiFallback: {
//             index: '/index.html' //与output的publicPath
//         },
//     },
// }


// const path = require('path');        //引入path模块
// function resolve(dir) {
//     return path.join(__dirname, dir)  //path.join(__dirname)设置绝对路径
// }
// module.exports = {
//     chainWebpack: (config) => {
//         config.resolve.alias
//             //set第一个参数：设置的别名，第二个参数：设置的路径
//             .set('@', resolve('./src'))
//             .set('assets', resolve('./src/assets'))
//             .set('components', resolve('./src/components'))
//             .set('views', resolve('./src/views'))
//             .set('common', resolve('./src/common'))
//             .set('networks', resolve('./src/networks'))
//     }
// }