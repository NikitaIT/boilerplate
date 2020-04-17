module.exports = {
  // webpackFinal: async (config, { configType }) => {
  //   // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
  //   // You can change the configuration based on that.
  //   // 'PRODUCTION' is used when building the static version of storybook.
  //
  //   // Make whatever fine-grained changes you need
  //   // config.module.rules.push({
  //   //   test: /\.scss$/,
  //   //   use: ['style-loader', 'css-loader', 'sass-loader'],
  //   //   include: path.resolve(__dirname, '../'),
  //   // });
  //   const x = config.module.rules.find(
  //     (x) =>
  //       Array.isArray(x.use) &&
  //       x.use[0] &&
  //       x.use[0].loader.includes('ts-loader'),
  //   );
  //   const pathToExternalFiles = '../**/src/**/*.{ts,tsx}';
  //   x.use[0].options.reportFiles = [pathToExternalFiles];
  //   // Return the altered config
  //   return config;
  // },
  stories: ['../src/**/*.stories.(js|ts|jsx|tsx|mdx)'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/preset-typescript',
    '@storybook/addon-viewport/register',
    '@storybook/addon-a11y/register',
    createAddonDocsConfig(),
  ],
};

function createAddonDocsConfig() {
  return {
    name: '@storybook/addon-docs',
    options: {
      configureJSX: true, // like isBabelOptionsExists
      babelOptions: {},
      sourceLoaderOptions: null,
    },
  };
}
