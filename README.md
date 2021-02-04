# flist-ui

Reusable Web Components

Lerna monorepo

LitElement

Typescript

Babel

Rollup

Prettier

ESLint

GitHub NPM registry (GitHub Packages)

# About

TODO

# Getting started

## Get the source code

```
git clone https://github.com/FScholsen/flist-ui.git
cd flist-ui
```

## Install the dependencies and bootstrap

```
npm install
```

After running this command, npm will automatically run `npm prepare`, which will install dependencies in each package as well as building the sources into each package's `dist/`.

## Authenticate on GitHub Packages (NPM)

Generate a personal access token on GitHub, save it for later use.

Create the file `.npmrc` in your user home directory (or append to the existing one if it exists), `~/.npmrc`:

```
//npm.pkg.github.com/:\_authToken=TOKEN
```

Replace TOKEN with your personal access token (**without** single/double quotes).

## Create a new package

TODO

# Steps to reproduce

These are the steps I followed from scratch to have everything running:

- Create a new git repo: `git init`
- Create a new npm package: `npm init`

  This will generate a `package.json`:

  ```
  {
    "name": "flist-ui",
    "version": "0.0.0",
    "description": "Flist UI Web components monorepo",
    "main": "index.js",
    "private": true,
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "author": "",
    "license": "ISC"
  }
  ```

  The line `"private": true,` was added to avoid publishing it to NPM (instead, publish `/packages/*` with lerna).

- Add a `.gitignore`:

  ```
  # compiled output
  **/dist
  /tmp

  # IDEs and editors
  .idea
  .project
  nbproject/
  .vscode/*

  # Logs files
  *.log

  # Dependency directories
  node_modules/

  # System Files
  .DS_Store
  Thumbs.db
  ```

- Install lerna: `npm install -D lerna`

  It will add lerna as dev dependency.

- Create a new lerna monorepo: `npx lerna init`

  It will create a new `lerna.json` where you can add [options](https://github.com/lerna/lerna#lernajson) and add a `packages/` directory:

  ```
  {
    "packages": [
      "packages/*"
    ],
    "version": "0.0.0"
  }
  ```

  For example, Lerna can be configured to manage packages versions independently or globally (on the example above it is global).

<!-- SET UP THE BUILD PROCESS -->
<!-- The build process uses Babel and Rollup installed globally to the project -->

- Install rollup and babel to the main package (to `flist-ui/package.json`):

  - Run `cd ../..`
  - Make sure you are at the project root: run `pwd`, it should output `flist-ui` full path
  - Run `npm install -D rollup @rollup/plugin-node-resolve @rollup/plugin-commonjs`

    Details:

    - `rollup`: allows to bundle source files to one (bigger) distribution-ready bundled file
    - `@rollup/node-resolve`: allows to locate and bundle third-party dependencies in node_modules
    - `@rollup/commonjs`: convert CommonJS modules to ES6

  - Run `npm install -D @babel/core @rollup/plugin-babel @babel/preset-env @babel/preset-typescript @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties`

    Details:

    - `@babel/core`: the core babel library, required for @rollup/plugin-babel
    - `@rollup/plugin-babel`: allows rollup to use babel
    - `@babel/preset-env`: allows you to use the latest JavaScript features (no browser polyfills needed)
    - `@babel/preset-typescript`: allows babel to transpile Typescript to Javascript
    - `@babel/plugin-proposal-decorators`: allows to use proposal (or experimental) decorators

  - Create a `rollup.config.js` in the project root directory

    ```
    // rollup.config.js
    import { babel } from "@rollup/plugin-babel";
    import resolve from "@rollup/plugin-node-resolve";
    import commonjs from "@rollup/plugin-commonjs";
    import path from "path";

    // The name of the package must match the directory name
    const input = `./src/${path.basename(__dirname)}.ts`;
    const outputDir = "./dist/";
    const extensions = [".js", ".ts"];

    export default {
      input,
      output: {
        dir: outputDir,
        format: "esm",
        sourcemap: true,
      },
      plugins: [
        resolve({ extensions }),
        commonjs({ include: /node_modules/ }),
        babel({
          babelHelpers: "bundled",
          extensions,
          include: ["src/**/*"],
          exclude: ["./node_modules/*"],
          presets: ["@babel/preset-env", "@babel/preset-typescript"],
          plugins: [
            ["@babel/plugin-proposal-decorators", { decoratorsBeforeExport: true }],
            ["@babel/plugin-proposal-class-properties"],
          ],
        }),
      ],
    };
    ```

- Add typescript to the project

  - (Make sure you are at project root directory `flist-ui`)
  - Install Typescript: `npm install -D typescript`
  - Install ts-lit-plugin: `npm install -D ts-lit-plugin`

    It will add type checking to lit-html (dependency of lit-element)

  - Create a `tsconfig.json` in this directory (`flist-ui`):

    ```
    {
      "compilerOptions": {
        "target": "es2017",
        "module": "es2015",
        "moduleResolution": "node",
        "lib": ["es2017", "dom", "dom.iterable"],
        "declaration": true,
        "noEmit": true,
        "isolatedModules": true,
        "strict": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "noImplicitReturns": true,
        "noImplicitAny": true,
        "strictNullChecks": true,
        "noFallthroughCasesInSwitch": true,
        "allowSyntheticDefaultImports": true,
        "experimentalDecorators": true,
        "esModuleInterop": true,
        "forceConsistentCasingInFileNames": true,
        "plugins": [
          {
            "name": "ts-lit-plugin",
            "strict": true
          }
        ]
      },
      "exclude": ["node_modules"]
    }
    ```

  - Create a `tsconfig.types.json` in this directory (`flist-ui`):

    ```
    {
      "extends": "./tsconfig.json",
      "compilerOptions": {
        "declaration": true,
        "declarationMap": true,
        "isolatedModules": false,
        "noEmit": false,
        "allowJs": false,
        "emitDeclarationOnly": true
      },
      "exclude": ["tests"]
    }
    ```

    It will be used to build `.d.ts` files into `packages/*/dist/`.

- Add scripts to the `flist-ui/package.json`, known as `monorepo-scripts`:

  ```
  "scripts": {
    "bootstrap": "npx lerna bootstrap && npm run build:dist && npm run build:types",
    "prebuild": "npm run clean:dist",
    "build": "npm run build:dist && npm run build:types",
    "build:dist": "npx lerna exec -- rollup -c=./rollup.config.js",
    "build:types": "npx lerna exec -- tsc -p ./tsconfig.types.json",
    "check:types": "npx lerna exec -- tsc -p ./tsconfig.json",
    "watch": "npx lerna exec -- rollup -c=./rollup.config.js -w",
    "prepare": "npm run bootstrap",
    "clean": "npm run clean:packages",
    "clean:packages": "npm run clean:dist && npx lerna clean",
    "clean:dist": "npx lerna exec -- rm -rf ./dist",
    "test": "echo \"Error: run tests from root\" && exit 1"
  },
  ```

<!-- CREATE A NEW COMPONENT -->

- Create a new package `npx lerna create flist-button`
  It will create directories `lib/` and `__tests__/` (which you can remove, or rename).
- Add `lit-element` as dependency of the package (inside a per-package `package.json`):

  - Run `cd ./packages/flist-button`
  - Run `npm install lit-element`
  - Use lit-element as dependency of the package:

    Create a new `src/flist-button.ts`

    ```
    // create the file src/flist-button.ts
    import { LitElement, html, customElement, property } from "lit-element";
    @customElement("flist-button")
    export class FlistButton extends LitElement {
      @property()
      name = "Button";
      ...
      render() {
        return html`<button></button>`;
      }
    }
    declare global {
      interface HTMLElementTagNameMap {
        "flist-button": FlistButton;
      }
    }
    ```

  - Add a per-package `rollup.config.js`:
    Copy this into `/packages/flist-button/rollup.config.js`

    ```
    import rollupBaseConfig from "../../rollup.config";
    export default {
      ...rollupBaseConfig,
    };
    ```

    The default behaviour is to extend the config at project root, but you can create your own if you want (by removing the imported module from the exported object config).

    This configuration will allow to build each package independently if it's needed.

  - Add a per-package `tsconfig.json`

    ```
    {
      "extends": "../../tsconfig.json",
      "include": ["./src"]
    }
    ```

    It will allow to type check each package independently.

  - Add a per-package `tsconfig.types.json`

    ```
    {
      "extends": "../../tsconfig.types.json",
      "compilerOptions": {
        "outDir": "./dist"
      },
      "include": ["./src"]
    }
    ```

    It will allow to transpile source files and emit `.d.ts` files.

  - Optionally, you can create a per-package `.babelrc`

    ```
    // .babelrc
    {
      "presets": ["@babel/preset-env", "@babel/preset-typescript"],
      "plugins": [
        ["@babel/plugin-proposal-decorators", { "decoratorsBeforeExport": true }],
        ["@babel/plugin-proposal-class-properties"]
      ]
    }
    ```

    It will extend the existing configuration in `rollup.config.js`.

    <!-- Use monorepo commands -->

- Use monorepo command to generate dist files of the package:

  This will generate `.js` files (from `./src` to `./dist` folder):

  Run this command at project root (`cd ../..` and check for `flist-ui`)

  ```
  npm run build
  ```

  First, it will execute `rollup` on each packages, using the `rollup.config.js` per-package configuration.
  This will create per-package `./dist/*.js` dist files.

  Then, it will then execute `tsc` on each packages, using the `tsconfig.json` per-package configuration.
  This will create per-package `./dist/*.d.ts` type declaration files.

  Note:

  As an alternative, you could use `npx lerna run build`, which will run `npm run build` in each package under `/packages`.  
  To use this solution, you have to add a `"build"` script in each `package.json` file of packages you want to build.  
  You have to add build dependencies (e.g. Rollup, Babel, snowpack, ...) to each package and add a config for each of them as well.  
  This way, you can have a complete different way of building for each component.

<!-- Add Prettier and ESLint -->

- Add Prettier to the monorepo

  - cd `flist-ui`
  - Run `npm install --save-dev --save-exact prettier`
  - Add a `.prettierignore`:

    ```
    # Ignore artifacts:
    package-lock.json
    dist
    node_modules
    ```

  - Add a `.prettierrc`, to override the default configuration of Prettier if needed

- Add ESLint to the monorepo:

  - Run `npm install --D eslint`
  - Run `npm install --D eslint-config-prettier`, to avoid conflicts between eslint and prettier
  - (`npm install --D typescript` (you must install it in order to lint with typescript-eslint, but it should already be installed unless you skip it))
  - Run `npm install --D @typescript-eslint/parser`
  - Run `npm install --D @typescript-eslint/eslint-plugin`
  - Run `npx eslint --init` to generate a default config file, or use this one `.eslintrc.js`:

    ```
    module.exports = {
      env: {
        browser: true,
        es2021: true,
      },
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
        "prettier/@typescript-eslint",
      ],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaVersion: 12,
        sourceType: "module",
      },
      plugins: ["@typescript-eslint"],
      rules: {},
    };
    ```

    Note: the prettier and prettier/@typescript-eslint in extends attribute, added to avoid conflict between linter and prettier.

  - Install lit-analyzer `npm install -D lit-analyzer`

    It will allows to add type checks bindings in lit-html templates.

  - Add a `.eslintignore`:

    ```
    **/dist
    **/build
    **/node_modules
    ```

  - Add this to `package.json` scripts:

    ```
    "scripts": {
      ...
      "lint": "npm run lint:lit-analyzer && npm run lint:eslint",
      "lint:eslint": "npx lerna exec -- eslint './src/**/*.ts'",
      "lint:lit-analyzer": "npx lerna exec -- lit-analyzer './src/**/*.ts'",
      "prettier": "npx lerna exec -- npx prettier --write . --ignore-path ../../.prettierignore",
      ...
    }
    ```
    You can configure ESLint or Prettier to use per-package config file

- Publish package to npm using `lerna publish` (or `npm publish` inside an individual package)

  - I am going to use GitHub Packages to store my packages in the same GitHub repo I'm using here.

    - create a new Personal Access Token in GitHub settings
    - Select scopes: `write:packages`, `delete:packages` and generate the token
    - copy the token and paste it in a new file `.npmrc` at the root of the project (ie `flist-ui/.npmrc`), like this:

    ```
    //npm.pkg.github.com/:\_authToken=TOKEN
    @fscholsen:registry=https://npm.pkg.github.com/fscholsen
    always-auth=true
    ```

    Replace TOKEN by your personal access token (and `fscholsen` by your github owner name)

  - add this to your `package.json` in each packages:
    Lerna will execute npm publish, using this config, in each package

    ```
    "repository": {
      "type": "git",
      "url": "git+https://github.com/fscholsen/flist-ui.git"
    },
    ```

    Replace the `fscholsen/flist-ui` according to your name and repository name.

    - Make some changes to the src files, add and commit with git (optionally build them using `npm run build`); you can see the changes with `npx lerna changed`, running this at project root (it should output: `1 package ready to publish`)
    - (at project root again) `npx lerna publish`, specify github credentials and package new version after publish
      Lerna will create a tag when executing publish

- Add precommit hooks with `husky` and `lint-staged`

- Add a `.npmignore`

# Configuration

## Extend build configuration

You can configure how each package will be built using `npm run build` (which uses rollup).

The default configuration of each package (`./packages/*/rollup.config.js`) extends the base config file at project root (`flist-ui/rollup.config.js`).

You can override the per-package configuration (i.e. `./packages/*/rollup.config.js`) by adding properties to the exported local configuration.

### Extend tsconfig

## Extend publish configuration

You can create, in each package, a `.npmignore` file.

This file should contain file or directories that you don't want to publish (to NPM or GitHub NPM Registry).

```
// ./packages/flist-button/.npmignore
node_modules
src
tests
.babelrc
rollup.config.js
tsconfig.json
tsconfig.types.json
```

# Monorepo scripts

## bootstrap

```bash
npm run bootstrap
```

This command will clean the `dist` and `node_modules` folders in every package (inside `packages/`).

It will then run `npx lerna bootstrap` to install and link each package's dependencies. See: [lerna bootstrap](https://github.com/lerna/lerna/tree/main/commands/bootstrap#readme).

Finally, it will generate the `dist` directory in each package with the build files.

## lint

```bash
npm run lint
```

This command will run `lit-analyzer` and `eslint` in each package.

## build

```bash
npm run build
```

This command will first clean the `dist/` folder in each package.

Secondly, it will generate dist files (`./dist/*.js`) from the sources files (`./src/*.ts`).

**For more details**:

_It will execute `rollup -c=./rollup.config.js` in each package (with `npx lerna exec`). It uses a per-package rollup config file, relative to the package folder._

_This is why one `rollup.config.js` file has to be present at the package root. This per-package config can be used to override the default configuration, located at the monorepo root._

## publish

```bash
npm run publish
```

This command will run `npx lerna publish`.

Each package will be published at the specified `"publishConfig"` from their respective `package.json`.

## clean

```bash
npm run clean
```

This command will remove the `dist/` and `node_modules/` folders in each package (inside `packages/`).

# Suggestions:

## VSCode

- lit-plugin on VSCode `runem.lit-plugin`
- Prettier Code formatter `esbenp.prettier-vscode` : installed and configured to use the working project config (and turn on `Format on save` setting in VSCode)

# References links

- https://github.com/patrickvaler/lit-element-typescript-rollup-starter

  - here it uses rollup with plugin-terser to minify dist

- https://github.com/a-tarasyuk/rollup-typescript-babel

- https://github.com/microsoft/TypeScript-Babel-Starter

- https://github.com/PolymerLabs/lit-element-build-rollup

- https://github.com/DJCordhose/lerna-wc-ts-monorepo-demo

  - this link is useful to setup the build/dev environment

- https://github.com/rough-stuff/wired-elements

- https://lit-element.polymer-project.org/guide/build

- https://github.com/johnagan/clean-webpack-plugin/blob/2b94838bd140cbf9d6b6f5449de7d1e676ed87b2/tsconfig.types.json

  - useful to emit types `.d.ts` files from src into the `packages/**/dist` folders

- https://github.com/PolymerLabs/lit-element-starter-ts

## Lerna

- https://github.com/lerna/lerna#getting-started

## Prettier and Linter

- prettier.io:

  - https://prettier.io/docs/en/install.html
  - https://prettier.io/docs/en/precommit.html

- https://eslint.org/docs/user-guide/getting-started

- https://github.com/prettier/eslint-config-prettier

## Publish to GitHub Packages

- https://docs.github.com/en/packages/guides/configuring-npm-for-use-with-github-packages
- https://docs.github.com/en/packages/guides/configuring-npm-for-use-with-github-packages#authenticating-to-github-packages
