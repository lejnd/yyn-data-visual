/**
 * @fileOverview app配置
 * @date 2018/06/17
 */
 
const debug = process.env.NODE_ENV !== 'production'
 
console.log('')
console.log('本地启动或构建的文件信息 | 开始--------------------------------------------------------------')

console.log('本地启动或构建的文件信息 | 结束--------------------------------------------------------------')
console.log('')
 
module.exports = {
  baseUrl: './',
  devServer: {
    proxy: {
      '/api': {
        // target: 'http://220.163.122.58:8081',    // 投诉dev
        target: 'https://tglpt.ybsjyyn.com',     // 导旅dev
        changOrigin: true,
        pathRewrite: {
            '^/api': ''
        } 
      }
    }
  }
}
