module.exports = {
  addons: [
    {
      name: 'storybook-addon-sass-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
};
