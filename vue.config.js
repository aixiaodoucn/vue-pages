let path = require('path')
let glob = require('glob') // 用于筛选文件

// 工厂函数 - 配置pages实现多页面获取某文件夹下的html与js
function handleEntry(entry) {
  let entries = {}
  let entryBaseName = ''
  let entryPathName = ''
  let entryTemplate = ''
  // let applicationName = ''

  glob.sync(entry).forEach(item => {
    console.log('!!!', item)
    entryBaseName = path.basename(item, path.extname(item))
    console.log('entryBaseName:', entryBaseName)
    entryTemplate = item.split('/').splice(-3)
    console.log('entryTemplate:', entryTemplate)
    entryPathName = entryBaseName // 正确输出js和html的路径
    console.log('entryPathName', entryPathName)

    entries[entryPathName] = {
      entry: 'src/' + entryTemplate[0] + '/' + entryTemplate[1] + '/' + entryTemplate[1] + '.js',
      template: 'src/' + entryTemplate[0] + '/' + entryTemplate[1] + '/' + entryTemplate[2],
      title: entryTemplate[2],
      filename: entryTemplate[2]
    }
  })

  return entries
}

let pages = handleEntry('./src/views/**?/*.html')
console.log(pages)

// 以下开始配置
module.exports = {
  lintOnSave: false, // 关掉eslint
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  productionSourceMap: false,
  // 入口设置
  pages,
  devServer: {
    index: '/index.html', // 运行时，默认打开index页面
    open: true,
    host: 'localhost',
    port: 8080,
    https: false,
    hotOnly: false
    // 配置首页 入口链接
    // before: app => {
    //   app.get('/', (req, res, next) => {
    //     for (let i in pages) {
    //       res.write(`<a target="_self" href="/${i}">/${i}</a></br>`);
    //     }
    //     res.end()
    //   });
    // }
  }
}
