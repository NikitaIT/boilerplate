A tool for managing JavaScript projects with multiple packages.

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

# Lerna [docs](https://github.com/lerna/lerna#about) 


## Setup Lerna

Lerna 2.x is the recommended version to start with.

```bash
npm install --global lerna
```

Next we'll create a new git repository:

```bash
git init lerna-repo && cd lerna-repo
```

And now let's turn it into a Lerna repo:

```bash
lerna init
```

Your repository should now look like this:

```
lerna-repo/
  packages/
  package.json
  lerna.json
```

Add yarn to Lerna, command is optional settings

lerna.json
```json
{
  "npmClient": "yarn",
  "command": {
    "publish": {
      "ignoreChanges": ["ignored-file", "*.md"],
      "message": "chore(release): publish",
      "registry": "https://npm.pkg.github.com"
    },
    "bootstrap": {
      "ignore": "component-*",
      "npmClientArgs": ["--no-package-lock"]
    }
  }
}
```

Add yarn workspaces to Lerna

lerna.json
```json
{
  "useWorkspaces": true
}
```

package.json
```json
{
  "workspaces": [
    "packages/*"
  ]
}
```

Switch WebStorm to yarn

open by [link](jetbrains://WebStorm/settings?name=Languages+%26+Frameworks--Node.js+and+NPM) and select yarn
```
File | Settings | Languages & Frameworks | Node.js and NPM
```

Add git ignore

.gitignore
```
.log
.DS_Store
.jest-*
lib
node_modules
```

## Working with Lerna

Bootstrap the packages in the current Lerna repo. 
Installing all their dependencies and linking any cross-dependencies.
This command is crucial, as it allows you to use your package names in `require()`
as if the packages were already existing and available in your `node_modules` folder.

```bash
lerna bootstrap
```

Add yarn.lock to git after bootstrap.

Run an npm script in each package that contains that script.

```bash
lerna run [script]
```

## Add package to Lerna

Add empty package

```bash
lerna create <name> [loc]

Create a new lerna-managed package

Positionals:
  name  The package name (including scope), which must be locally unique _and_
        publicly available                                   [string] [required]
  loc   A custom package location, defaulting to the first configured package
        location                                                        [string]

Command Options:
  --access        When using a scope, set publishConfig.access value
                             [choices: "public", "restricted"] [default: public]
  --bin           Package has an executable. Customize with --bin
                  <executableName>                             [default: <name>]
  --description   Package description                                   [string]
  --dependencies  A list of package dependencies                         [array]
  --es-module     Initialize a transpiled ES Module
  --homepage      The package homepage, defaulting to a subpath of the root
                  pkg.homepage                                          [string]
  --keywords      A list of package keywords                             [array]
  --license       The desired package license (SPDX identifier)   [default: ISC]
  --private       Make the new package private, never published
  --registry      Configure the package's publishConfig.registry        [string]
  --tag           Configure the package's publishConfig.tag             [string]
  --yes           Skip all prompts, accepting default values
```

### Add react-app package

```bash
cd ./packages && yarn create react-app my-app --template typescript
```

add to project package.json
```json
{
  "scripts": {
    "start": "some serve command",
    "build": "some build command",
    "build.dev": "some build command"
  }
}
```

add to project package.json
```json
{
  "scripts": {
    "my-app": "cd ./packages/my-app && yarn start",
    "build-production": "lerna run build --stream",
    "build-development": "lerna run build.dev --stream"
  }
}
```

## Add eslint rules

```bash
yarn add -DW eslint eslint-plugin-react @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-import
```

and create simple config file for it `.eslintrc.js` in root.

If you have a `ts` add new script in `package.json` for linting `*.ts` files:

```bash
{
  "scripts": {
    "lint:ts": "eslint 'packages/**/*.ts{,x}'"
  }
}
```
### Add storybook library package [docs](https://storybook.js.org/docs/guides/guide-react/)

Repeat all installation steps for `Add react-app package` with new name like `lib` instead like `my-app`. 
It will be fast if you have already taken this step.

I want to pay attention that the `node_modules` folder in the created project is **empty**(has only `bin` and optional `cache`), 
this is important, we should try to ensure that all dependency versions of all packages match.

Before execute go to lib folder:
```bash
cd ./packages/lib
```

If you use `create-react-app`: `react_scripts` else: `react`
```bash
npx -p @storybook/cli sb init --type react_scripts
```

Add docs and mdx for storybook [docs for manual configuration](https://github.com/storybookjs/storybook/blob/next/addons/docs/README.md#installation):
```bash
yarn add @storybook/addon-docs --dev
```

Add to `main.js` config and `(|mdx)` pattern:
```js
module.exports = {
  stories: ['../src/**/*.stories.(js|mdx)'],
  addons: [createAddonDocsConfig()]
}

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
```

Add the following to your `Jest` configuration:
```json
{
  "transform": {
    "^.+\\.[tj]sx?$": "babel-jest",
    "^.+\\.mdx$": "@storybook/addon-docs/jest-transform-mdx"
  }
}
```