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
