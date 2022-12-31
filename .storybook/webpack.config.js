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
      // {
      //   loader: require.resolve('react-docgen-typescript-loader'),
      //   options: {
      //     shouldExtractLiteralValuesFromEnum: true,
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
