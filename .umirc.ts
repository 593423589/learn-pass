import { defineConfig } from 'umi';
import px2rem from 'postcss-plugin-px2rem';

export default defineConfig({
  title: 'learn pass',
  // mock:false,
  nodeModulesTransform: {
    type: 'none',
  },
  extraPostCSSPlugins: [
    //https://www.npmjs.com/package/postcss-plugin-px2rem
    px2rem({
      rootValue: 6, //开启hd后需要换算：rootValue=designWidth*100/750
      propBlackList: [
        'border',
        'border-top',
        'border-left',
        'border-right',
        'border-bottom',
        'border-radius',
      ], //这些属性不需要转换
    }),
  ],
  proxy: {
    '/api': {
      target: 'http://192.168.43.205:8080/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  chainWebpack(memo, {}) {
    // 设置 alias
    memo.module
      .rule('wyh-custom')
      .test(/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/)
      .use('file')
      .loader('file-loader');
  },
});
