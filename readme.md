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
## Working with Lerna

Bootstrap the packages in the current Lerna repo. 
Installing all their dependencies and linking any cross-dependencies.
This command is crucial, as it allows you to use your package names in `require()`
as if the packages were already existing and available in your `node_modules` folder.

```bash
lerna bootstrap
```

Run an npm script in each package that contains that script.

```bash
lerna run [script]
```

## Add package to Lerna
