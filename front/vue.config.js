module.exports = {
  lintOnSave:false,
  chainWebpack: config => {
    config.module
      .rule('babel')
      .test(/\.m?js$/)
      .exclude
        .add(/node_modules/)
        .end()
      .use('babel-loader')
      .loader('babel-loader')
      .options({
        presets: ['@babel/preset-env']
      });
  }
};
