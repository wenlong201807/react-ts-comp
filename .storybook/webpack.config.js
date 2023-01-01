// const path = require('path');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.tsx?$/,
    use: [
      {
        loader: require.resolve('babel-loader'),
        options: {
          presets: [require.resolve('babel-preset-react-app')],
        },
      },
      // 自动生成文档
      // {
      //   loader: require.resolve('react-docgen-typescript-loader'),
      //   options: {
      //     shouldExtractLiteralValuesFromEnum: true, // 只展示自定义属性，默认属性不展示
      //     propFilter: (prop) => {
      //       if (prop.parent) {
      //         return !prop.parent.fileName.includes('node_modules');
      //       }
      //       return true;
      //     },
      //   },
      // },
    ],
  });

  // config.module.rules.push({
  //   test: /\.scss$/,
  //   loaders: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
  //   include: path.resolve(__dirname, '../')
  // });

  // config.plugins.push(new MiniCssExtractPlugin({ filename: '[name].css' }))

  config.resolve.extensions.push('.ts', '.tsx');

  return config;
};
