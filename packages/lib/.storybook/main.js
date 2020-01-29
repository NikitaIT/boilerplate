module.exports = {
  stories: ['../src/**/*.stories.(js|mdx)'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-actions',
    '@storybook/addon-links',
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
