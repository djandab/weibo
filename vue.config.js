
// sass 依赖 $ npm install sass-loader node-sass --save-dev
//axios 安装 npm i axios -S
//https://api.bilibili.com/x/web-show/res/loc?jsonp=jsonp&pf=7&id=1695
module.exports = {
  configureWebpack: {
		devServer:{
			proxy:{
				'/api' :{
					target:'https://m.weibo.cn',
					changeOrigin:true,
					pathRewrite:{
						'^/api':''
					}
				}
			}
		}
  }
}