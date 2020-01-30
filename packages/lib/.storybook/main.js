module.exports = {
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
