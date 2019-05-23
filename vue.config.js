const path = require("path");
const vConsolePlugin = require("vconsole-webpack-plugin"); // 引入 移动端模拟开发者工具 插件 （另：https://github.com/liriliri/eruda）
const CompressionPlugin = require("compression-webpack-plugin"); //Gzip
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin; //Webpack包文件分析器

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  // baseUrl  type:{string} default:'/'
  // 将部署应用程序的基本URL
  // 将部署应用程序的基本URL。
  // 默认情况下，Vue CLI假设您的应用程序将部署在域的根目录下。
  // https://www.my-app.com/。如果应用程序部署在子路径上，则需要使用此选项指定子路径。例如，如果您的应用程序部署在https://www.foobar.com/my-app/，集baseUrl到'/my-app/'.
  baseUrl: process.env.NODE_ENV === "production" ? "./" : "/",

  // outputDir: 在npm run build时 生成文件的目录 type:string, default:'dist'

  outputDir: "dist",
  assetsDir: "assets",
  // pages:{ type:Object,Default:undfind }
  /*
    构建多页面模式的应用程序.每个“页面”都应该有一个相应的JavaScript条目文件。该值应该是一
    个对象，其中键是条目的名称，而该值要么是指定其条目、模板和文件名的对象，要么是指定其条目
    的字符串，
    注意：请保证pages里配置的路径和文件名 在你的文档目录都存在 否则启动服务会报错的
    */
  // pages: {
  // index: {
  // entry for the page
  // entry: 'src/index/main.js',
  // the source template
  // template: 'public/index.html',
  // output as dist/index.html
  // filename: 'index.html'
  // },
  // when using the entry-only string format,
  // template is inferred to be `public/subpage.html`
  // and falls back to `public/index.html` if not found.
  // Output filename is inferred to be `subpage.html`.
  // subpage: 'src/subpage/main.js'
  // },

  //   lintOnSave：{ type:Boolean default:true } 问你是否使用eslint
  lintOnSave: true,

  chainWebpack: config => {
    [".js", ".vue", ".json", ".css"],
      // 配置文件别名
      config.resolve.alias
        .set("@", resolve("src"))
        .set("api", resolve("src/api"))
        .set("assets", resolve("src/assets"))
        .set("components", resolve("src/components"))
        .set("static", resolve("src/static"));
    // 修改 Loader 选项
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap(options => {
        // 修改它的选项...
        return options;
      });
  },
  //调整 webpack 配置 https://cli.vuejs.org/zh/guide/webpack.html#%E7%AE%80%E5%8D%95%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%B9%E5%BC%8F
  configureWebpack: config => {
    //生产and测试环境
    let pluginsPro = [
      new CompressionPlugin({
        //文件开启Gzip，也可以通过服务端(如：nginx)(https://github.com/webpack-contrib/compression-webpack-plugin)
        filename: "[path].gz[query]",
        algorithm: "gzip",
        test: new RegExp("\\.(" + ["js", "css"].join("|") + ")$"),
        threshold: 8192,
        minRatio: 0.8
      }),
      //	Webpack包文件分析器(https://github.com/webpack-contrib/webpack-bundle-analyzer)
      new BundleAnalyzerPlugin()
    ];
    //开发环境
    let pluginsDev = [
      //移动端模拟开发者工具(https://github.com/diamont1001/vconsole-webpack-plugin  https://github.com/Tencent/vConsole)
      new vConsolePlugin({
        filter: [], // 需要过滤的入口文件
        enable: false // 发布代码前记得改回 false
      })
    ];
    if (process.env.NODE_ENV === "production") {
      // 为生产环境修改配置...process.env.NODE_ENV !== 'development'
      config.plugins = [...config.plugins, ...pluginsPro];
    } else {
      // 为开发环境修改配置...
      config.plugins = [...config.plugins, ...pluginsDev];
    }
  },
  // productionSourceMap：{ type:Bollean,default:true } 生产源映射
  // 如果您不需要生产时的源映射，那么将此设置为false可以加速生产构建
  productionSourceMap: false,
  // 3个属性host,port,https
  devServer:{
    disableHostCheck: true, // 禁用webpack热重载检查 解决热更新失效问题
    // hotOnly: true,
  }, 
  // 它支持webPack-dev-server的所有选项
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  },
  devServer: {
    port: 8085, // 端口号
    // host: "localhost",
    host: "0.0.0.0",
    https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器
    hotOnly: true, // 热更新
    proxy: "http://localhost:3000" // 配置跨域处理,只有一个代理
    // proxy: {
    //   "/api": {
    //     target: "<url>",
    //     ws: true,
    //     changeOrigin: true
    //   }
    //   // "/foo": {
    //   //   target: "<other_url>"
    //   // }
    // } // 配置多个代理
  }
};
