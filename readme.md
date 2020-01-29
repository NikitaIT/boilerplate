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