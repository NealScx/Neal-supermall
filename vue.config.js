const path = require('path');
module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                'assets': path.resolve(__dirname,'src/assets'),
                'common': path.resolve(__dirname,'src/common'),
                'components': path.resolve(__dirname,'src/components'),
                'network': path.resolve(__dirname,'src/network'),
                'views': path.resolve(__dirname,'src/views'),
            }
        }
    }
}


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