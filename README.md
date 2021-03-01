# flist-ui

Reusable Web Components

Lerna monorepo

LitElement

Typescript

Babel

Rollup

Prettier

ESLint

Husky + Lint-Staged

GitHub NPM registry (GitHub Packages)

Storybook

Karma + Mocha + Chai

# About

This project uses:

- [LitElement](https://lit-element.polymer-project.org/)  
  This allows us to create [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
  from a base class called `LitElement`.

- [Lerna](https://github.com/lerna/lerna)  
  Lerna allows us to create, store and publish our packages in a single repository called `monorepo`.
  The Web Components we will create can be found under the `packages/` folder, which is generated by Lerna.

- [Typescript](https://www.typescriptlang.org/)  
  We use Typescript to write the Web Components source code.

- [Rollup](https://rollupjs.org/guide/en/)  
  The bundler we use to build our sources (written using Typescript and using ES module imports/exports) into a Javascript production code.

- [Babel](https://babeljs.io/)  
  We use Babel to transpile Typescript to a version of Javascript compatible with browsers we aim to support.

- [Storybook](https://storybook.js.org)  
  Storybook is a development environment for UI components. It allows you to browse a component library, view the different states of each component and interactively develop and test components.

# Requirements

- NodeJS LTS

# Getting started

## Get the source code

```
git clone https://github.com/FScholsen/flist-ui.git
cd flist-ui
```

_Note_:

If you already have the source code in a local repository, just update it.

```bash
cd /path/to/your/local/repo
git fetch
git checkout main
git pull
```

## Install the dependencies

```
npm install
```

After running this command, npm will automatically run `npm prepare`, which will install dependencies in each package (using `npx lerna bootstrap`).

After this, you can build the sources into each package's `dist/` with:

```
npm run build
```

## Authenticate on GitHub Packages (NPM)

Generate a personal access token on GitHub, save it for later use.

Create the file `.npmrc` in your user home directory (or append to the existing one if it exists), `~/.npmrc`:

```
//npm.pkg.github.com/:\_authToken=TOKEN
```

Replace TOKEN with your personal access token (**without** single/double quotes).

## Create a new package

TODO

# Installation procedure

These are the steps I followed from scratch to have everything running.
It includes repo creation, adding the dependencies, create and publish your first package.

_You should not run those commands in your cloned local repo._
_Instead, start from scratch: create a new dir and follow the steps_

- Create a new directory for the project: `mkdir flist-ui && cd flist-ui`
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

  The line `"private": true,` was added to avoid publishing it to NPM (instead, we will publish `/packages/*` with lerna).

- Add a `.gitignore`:

  ```
  # compiled output
  **/dist
  /tmp

  # IDEs and editors
  .idea
  .project
  nbproject/

  # Logs files
  *.log

  # Dependency directories
  node_modules/

  # System Files
  .DS_Store
  Thumbs.db
  ```

- Install lerna: `npm install -D lerna`

  It will add Lerna as dev dependency.

- Create a new lerna monorepo: `npx lerna init`

  It will create a new `lerna.json` where you can add [options](https://github.com/lerna/lerna#lernajson) and add a `packages/` directory:

  ```
  {
    "packages": ["packages/*"],
    "version": "independent",
    "command": {
      "bootstrap": {
        "hoist": false
      }
    }
  }
  ```

  Lerna can be configured to manage packages versions independently or globally (on the example above it is independent).

  To set version as global switch to `"version": "0.0.0"` (replace 0.0.0 with an appropriate version number).

<!-- SET UP THE BUILD PROCESS -->
<!-- The build process uses Babel and Rollup installed globally for the whole project (monorepo) -->

- Install rollup and babel in the monorepo (to `flist-ui/package.json`):

  - Make sure you are at the project root: run `pwd`, it should output `flist-ui` full path
  - Run `npm install -D rollup @rollup/plugin-node-resolve @rollup/plugin-commonjs rollup-plugin-terser`

    Details:

    - `rollup`: allows to bundle source files to one (bigger) bundled file
    - `@rollup/node-resolve`: allows to locate and bundle third-party dependencies in node_modules
    - `@rollup/commonjs`: convert CommonJS modules to ES6
    - `rollup-plugin-terser`: plugin to minify generated es bundle. Uses [terser](https://github.com/terser/terser) under the hood.

  - Run `npm install -D @babel/core @rollup/plugin-babel @babel/preset-env @babel/preset-typescript @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties`

    Details:

    - `@babel/core`: the core babel library, required for @rollup/plugin-babel
    - `@rollup/plugin-babel`: allows rollup to use babel
    - `@babel/preset-env`: allows you to use the latest JavaScript ES6 features
    - `@babel/preset-typescript`: allows babel to transpile Typescript to Javascript
    - `@babel/plugin-proposal-decorators`: allows to use proposal (or experimental) decorators

  - Run `npm install -D @babel/plugin-transform-runtime` and `npm install --save @babel/runtime-corejs3` (or `npm install --save @babel/runtime`)

    Details:

    In order to use `async/await` in browsers which doesn't support it, babel will transform code when using `preset-env` with `targets: "defaults"` and `useBuiltIns`. Babel won't automatically include the polyfills (helpers) for regeneratorRuntime (the default runtime used to polyfill `async/await`) so you have to include it yourself (either run `npm install regenerator-runtime` or use a core-js runtime of your choice to polyfill these features). `@babel/preset-env` just transforms code with syntax, if we don’t config useBuiltIns.

    This plugin allows to use `async/await` by transforming the helpers to use the `@babel/runtime-corejs3` instead of regenerator.

    `@babel/plugin-transform-runtime` can provide re-use helpers, but don’t polyfill by default.

    `@babel/runtime-corejs3` (or `@babel/runtime`) provide polyfills needed.

    When using this runtime, Babel will inject the runtime libs (i.e. the polyfills) and will pass it to rollup when bundling in order to limit the code size (it won't import the runtime each time a call to async/await is made)). Instead of using `@babel/runtime` to include the runtime polyfills, I use `@babel/runtime-corejs3` and configure `@babel/plugin-transform-runtime` to use `corejs: 3` (to user corejs polyfills instead of regeneratorRuntime polyfills).

  - Create a `rollup.config.js` in the project root directory

    ```
    import babel from "@rollup/plugin-babel";
    import resolve from "@rollup/plugin-node-resolve";
    import commonjs from "@rollup/plugin-commonjs";
    import { terser } from "rollup-plugin-terser";
    import path from "path";

    // The name of the package must match the directory name
    const baseFileName = path.basename(__dirname);
    const input = `./src/${baseFileName}.ts`;
    const outputDir = "./dist/";
    const extensions = [".js", ".ts"];

    export default {
      input,
      output: [
        {
          file: outputDir + baseFileName + ".js",
          format: "esm",
          sourcemap: true,
        },
        // Production build
        {
          file: outputDir + baseFileName + ".min.js",
          format: "esm",
          plugins: [
            terser({
              module: true,
            }),
          ],
        },
      ],
      plugins: [
        resolve({ extensions }),
        // plugin-commonjs must be placed before plugin-babel
        commonjs({ include: /node_modules/ }),
        babel({
          babelHelpers: "runtime",
          extensions,
          include: [
            "src/**/*",
            "./node_modules/lit-element/**",
            "./node_modules/lit-html/**",
          ],
          exclude: ["./node_modules/**"],
        }),
      ],
    };
    ```

    Rollup is configured to use Babel `runtime` helpers, because we want to use a runtime to polyfill `async/await`.

  - Create a `babel.config.js` in the monorepo directory (i.e. project root directory):

    ```
    module.exports = {
      presets: [
        ["@babel/preset-env", { targets: "defaults" }],
        ["@babel/preset-typescript"],
      ],
      plugins: [
        ["@babel/plugin-proposal-decorators", { decoratorsBeforeExport: true }],
        ["@babel/plugin-proposal-class-properties"],
        ["@babel/plugin-transform-runtime", { corejs: 3 }],
      ],
    };
    ```

- Add typescript to the project

  - (Make sure you are at project root directory `flist-ui`)
  - Install Typescript: `npm install -D typescript`
  - Install ts-lit-plugin: `npm install -D ts-lit-plugin`

    It will add type checking to lit-html (dependency of lit-element) when using `tsc`.

  - Create a `tsconfig.json` in this directory (`flist-ui`):

    ```
    {
      "compilerOptions": {
        "target": "es2020",
        "module": "es2020",
        "moduleResolution": "node",
        "lib": ["es2020", "dom", "dom.iterable"],
        "declaration": false,
        "isolatedModules": true,
        "strict": true,
        "noEmit": true,
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
        "skipLibCheck": true,
        "baseUrl": "./",
        "paths": {
          "*": ["node_modules", "packages"]
        },
        "plugins": [
          {
            "name": "ts-lit-plugin",
            "strict": true
          }
        ]
      },
      "include": ["packages"],
      "exclude": ["**/node_modules", "**/dist"]
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
      "exclude": ["**/tests"]
    }
    ```

    It will be used to build `.d.ts` files into `packages/*/dist/`.

- Add scripts to the `flist-ui/package.json`, known as `monorepo-scripts`:

  ```
  "scripts": {
    "bootstrap": "npx lerna bootstrap && npm run build:dist && npm run build:types",
    "prebuild": "npm run clean:dist",
    "build": "npm run build:dist",
    "build:dist": "npx lerna exec --parallel -- rollup -c=./rollup.config.js",
    "build:types": "npx lerna exec --parallel -- tsc -p ./tsconfig.types.json",
    "check:types": "npx tsc || echo Done.",
    "watch": "npx lerna exec -- rollup -c=./rollup.config.js -w",
    "prepare": "npx lerna bootstrap",
    "update-packages-dependencies": "npx lerna exec -- npm update",
    "clean": "npm run clean:packages",
    "clean:packages": "npm run clean:dist && npx lerna clean",
    "clean:dist": "npx lerna exec --parallel -- rm -rf ./dist",
    "test": "echo \"Error: run tests from root\" && exit 1"
  },
  ```

<!-- CREATE A NEW COMPONENT -->

- Create a new package `npx lerna create flist-button`.

  It will create directories `lib/` and `__tests__/` (which you can remove, or rename to `src/` and `/tests`).

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

- Add `typescript` as dev dependency of the package:

  - (Make sure you're inside the `flist-ui/packages/flist-button` folder)
  - Run `npm install -D typescript`
    This dependency is not required but it will allow to typecheck our source files based on the monorepo `tsconfig.json`.

- Add a per-package `rollup.config.js`:

  Copy this configuration into `/packages/flist-button/rollup.config.js`:

  ```
  import rollupBaseConfig from "../../rollup.config";
  export default {
    ...rollupBaseConfig,
  };
  ```

  The default behaviour is to extend the config at project root, but you can create your own if you want (by removing the imported module from the exported object config).

  This configuration will allow to build each package independently if it's needed.

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

  It will allow to transpile source files to emit `.d.ts` files only.

- Create a per-package `.babelrc`

  ```
  // .babelrc
  {
    "extends": "../../babel.config.js"
  }
  ```

  It will extend the existing configuration in `babel.config.js` which will then be used by rollup (in the monorepo `rollup.config.js`).

  You can define a different config in this per-package configuration file which will be added during the build process to `babel.config.js`.

    <!-- Use monorepo commands -->

- Use monorepo command to generate dist files of the package:

  This will generate `.js` files (from `./src` to `./dist` folder):

  Run this command at project root (`cd ../..` and check for `flist-ui` after running `pwd`)

  ```bash
  npm run build
  ```

  It will execute `rollup` on each packages, using the `rollup.config.js` per-package configuration (which then extends the monorepo one).
  This will create per-package `./dist/*.js` distribution-ready files.

  ```bash
  npm run build:types
  ```

  Then, it will execute `tsc` on each packages, using the `tsconfig.types.json` per-package configuration.
  This will create per-package `./dist/*.d.ts` type declaration files for each package.

  Note:

  As an alternative, you could use `npx lerna run build`, which will run `npm run build` in each package under `/packages`.  
  To use this solution, you have to add a `"build"` script in each `package.json` file of packages you want to build.  
  You have to add build dependencies (e.g. Rollup, Babel, snowpack, ...) to each package and add a config for each of them as well.  
  This way, you can have a different way of building for each component.

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

    Here is the default configuration files (which uses the default Prettier configuration):

    ```
    {
      "printWidth": 80,
      "tabWidth": 2,
      "singleQuote": false,
      "trailingComma": "es5",
      "arrowParens": "always"
    }
    ```

- Add ESLint to the monorepo:

  - Run `npm install -D eslint`
  - Run `npm install -D eslint-config-prettier`

    To avoid conflicts between eslint and prettier.

  - (`npm install -D typescript` (you must install it in order to lint with typescript-eslint, but it should already be installed unless you skip it))
  - Run `npm install -D @typescript-eslint/parser`

    Required when using `@typescript-eslint/eslint-plugin`.

  - Run `npm install -D @typescript-eslint/eslint-plugin`

    It provides lint rules for TypeScript.

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
        "plugin:wc/recommended",
        "plugin:lit/recommended",
      ],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaVersion: 12,
        sourceType: "module",
      },
      plugins: ["@typescript-eslint", "wc", "lit"],
      rules: {},
    };
    ```

    Note: the prettier and prettier/@typescript-eslint in extends attribute were added to avoid conflict between linter and prettier.

  - Install lit-analyzer `npm install -D lit-analyzer`

    It will allow to add type checks bindings in lit-html templates.

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
      "lint": "npm run check:types; npm run lint:lit-analyzer && npm run lint:eslint",
      "lint:eslint": "npx lerna exec -- eslint './src' -c '../../.eslintrc.js'",
      "lint:lit-analyzer": "npx lerna exec -- lit-analyzer './src'",
      "prettier": "npx lerna exec -- npx prettier --write . --ignore-path ../../.prettierignore",
      ...
    }
    ```

    You can configure ESLint or Prettier to use per-package config file

  - You can add plugins to ESLint to add lint support for WebComponents and lit-html :

    - Run `npm i -D eslint eslint-plugin-wc`

      ESLint plugin for Web Components.

    - Run `npm i -D eslint eslint-plugin-lit`

      lit-html support for ESLint.

    - Edit `.eslintrc.js`, add those plugins to the `"plugins"` option:

      ```
      {
        ...
        "plugins": [..., "wc", "lit"],
        ...
      }
      ```

      Then configure the linter to use the recommended configuration for those plugins:

      ```
      {
        ...
        "extends": [
          ...
          "plugin:wc/recommended",
          "plugin:lit/recommended",
        ],
        "env": {
          "browser": true   // this must be present
        }
        ...
      }
      ```

- Install `husky` and `lint-staged` and configure `pre-commit hooks`:

  - Fastest way is to run `npx mrm lint-staged`

    Before running this command, [documentation](https://github.com/okonet/lint-staged#installation-and-setup) advise to setup `Prettier` and `ESLint`, so make sure you configure it beforehand, like explained above.

  - Or run `npm install --D husky lint-staged`

  - Then add the `husky` pre-commit hook and `lint-staged` object to your `package.json`, or make sure the configuration is like this if you ran the first command:

    ```
    "husky": {
      "hooks": {
        "pre-commit": "lint-staged"
      }
    },
    "lint-staged": {
      "*.{ts}": "eslint --fix",
      "*.{js,ts,css,md}": "prettier --write"
    }
    ```

- Add a per-package `.npmignore`:

  In order to avoid publishing irrelevant files to npm, you can create a per-package `.npmignore`

  ```
  node_modules
  tests
  .babelrc
  rollup.config.js
  tsconfig.types.js
  ```

- Publish package to npm using `lerna publish` (or `npm publish` inside an individual package)

  - I am going to use GitHub Packages to store my packages in the same GitHub repo I'm using here.

    - Create a new Personal Access Token in GitHub settings
    - Select scopes: `write:packages`, `delete:packages` and generate the token
    - Copy the token and paste it in a new file `.npmrc` at the root of the project (ie `flist-ui/.npmrc`), like this:

      ```
      //npm.pkg.github.com/:\_authToken=TOKEN
      @fscholsen:registry=https://npm.pkg.github.com/fscholsen
      always-auth=true
      ```

    Replace TOKEN by your personal access token and `fscholsen` by your GitHub owner name.

  - Add this to your monorepo `package.json`:

    ```
    "repository": {
      "type": "git",
      "url": "https://github.com/fscholsen/flist-ui.git"
    },
    ```

    Replace the repo URL with your GitHub repository.

  - Complete `package.json` in each package:

    Make sure to use a scoped package name for your packages and to define main entry point of the package (with `main`, `module` and `types`)

    Here is an example for the `flist-button` package (in `flist-ui/packages/flist-button`).

    ```
    "name": "@fscholsen/flist-button",
    ...
    "main": "dist/flist-button.js",
    "module": "dist/flist-button.js",
    "types": "dist/flist-button.d.ts",
    "dependencies": {
      "lit-element": "^2.4.0"
    },
    "devDependencies": {
      "typescript": "^4.2.2"
    },
    "repository": {
      "type": "git",
      "url": "git+https://github.com/fscholsen/flist-ui.git"
    },
    "publishConfig": {
      "@fscholsen:registry": "https://npm.pkg.github.com/fscholsen"
    },
    ```

    Lerna will execute npm publish using this config in each package.

    Replace the `fscholsen/flist-ui` according to your name and repository name.

    - Make some changes to the source files
    - Add and commit with git
    - Build the source files using `npm run build`

      You can see the changes with `npx lerna changed`, running this at project root (it should output: `1 package ready to publish`)

    - (at project root again) `npx lerna publish`, specify github credentials and package new version after publish
      Lerna will create a tag when executing publish

# Configuration

## Extend build configuration

You can configure how each package will be built using `npm run build` (which uses rollup).

The default configuration of each package (`./packages/*/rollup.config.js`) extends the base config file at project root (`flist-ui/rollup.config.js`).

You can override the per-package configuration (i.e. `./packages/*/rollup.config.js`) by adding properties to the exported local configuration.

### Extend tsconfig

You can configure as well how type declaration files will be generated by editing the per-package `tsconfig.types.json` (i.e. `./packages/*/tsconfig.types.json`).

## Extend publish configuration

You can create, in each package, a `.npmignore` file.

This file should contain file or directories that you don't want to publish (to NPM or GitHub NPM Registry). You can define a diffrent one for each package (or simply omit it, if you want everything published).

```
// ./packages/flist-button/.npmignore
node_modules
tests
.babelrc
rollup.config.js
tsconfig.types.json
```

# Monorepo scripts

## bootstrap

```bash
npm run bootstrap
```

This command will first run `npx lerna bootstrap` to install and link each package's dependencies. See: [lerna bootstrap](https://github.com/lerna/lerna/tree/main/commands/bootstrap#readme).

Finally, it will generate the `dist` directory in each package with the build files.

## lint

```bash
npm run lint
```

This command will run `tsc` for type-checking, `lit-analyzer` and `eslint` in each package.

## build

```bash
npm run build
```

This command will first clean the `dist/` folder in each package (using the `prebuild` script).

Secondly, it will generate dist files (`./dist/*.js`) from the sources files (`./src/*.ts`).

**For more details**:

_It will execute `rollup -c=./rollup.config.js` in each package (with `npx lerna exec`). It uses a per-package rollup config file, relative to the package folder. This configuration allows to use the path dirname of each package to generate the input filename (e.g.: `/packages/flist-button` will result in a filename `flist-button.ts`)_

_This is why one `rollup.config.js` file has to be present at each package root. Otherwise, the input filenames have to be generated in another way (for example with [lerna-get-packages](https://www.npmjs.com/package/lerna-get-packages), see this [example](https://github.com/MikeLockz/lerna-rollup-yarn))._

_This per-package config can be used to override the default configuration, located at the monorepo root._

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

## update packages dependencies

```bash
npm run update-packages-dependencies
```

This command will update packages dependencies by running `npm update` in each packages (under `packages/`).

# Monorepo structure

```
├── node_modules
├── packages
│   ├── package-name
│   │   ├── dist          // only once the package is built
│   │   ├── node_modules  // only once the package is bootstrapped (install packages dependencies)
│   │   ├── src
│   │   ├── tests
│   │   ├── .babelrc
│   │   ├── package-lock.json
│   │   ├── package.json
│   │   ├── README.md
│   │   ├── rollup.config.js
│   │   └── tsconfig.types.json
│   └── ...
├── .eslintignore
├── .eslintrc.js
├── .gitignore
├── .npmrc
├── .prettierignore
├── .prettierrc
├── babel.config.js
├── index.html
├── lerna.json
├── package-lock.json
├── package.json
├── README.md
├── rollup.config.js
├── tsconfig.json
└── tsconfig.types.json
```

# Suggestions:

## VSCode

- lit-plugin on VSCode `runem.lit-plugin`
- Prettier Code formatter `esbenp.prettier-vscode` : installed and configured to use the working project config (and turn on `Format on save` setting in VSCode)

# References links

## Collection of similar repos

Here is a collection of similar repos I inspired from to create this repo.

- https://github.com/patrickvaler/lit-element-typescript-rollup-starter

  - here it uses rollup with plugin-terser to minify dist

- https://github.com/a-tarasyuk/rollup-typescript-babel

- https://github.com/microsoft/TypeScript-Babel-Starter

- https://github.com/PolymerLabs/lit-element-build-rollup

- https://github.com/DJCordhose/lerna-wc-ts-monorepo-demo

  - this link is useful to setup the build/dev environment

- https://github.com/rough-stuff/wired-elements

  An example of a lit-element library monorepo using rollup

- https://lit-element.polymer-project.org/guide/build

- https://github.com/johnagan/clean-webpack-plugin/blob/2b94838bd140cbf9d6b6f5449de7d1e676ed87b2/tsconfig.types.json

  - useful to emit types `.d.ts` files from src into the `packages/**/dist` folders

- https://github.com/PolymerLabs/lit-element-starter-ts

- https://github.com/MikeLockz/lerna-rollup-yarn

  - this link is useful to setup the build configuration using a rollup global config file (with lerna-get-packages)

- https://github.com/serhii-havrylenko/monorepo-babel-ts-lerna-starter

  - https://medium.com/@serhiihavrylenko/monorepo-setup-with-lerna-typescript-babel-7-and-other-part-1-ac60eeccba5f

- Rollup and Babel config to use async/await: https://github.com/htho/mweRollupBabelAsyncAwait

  It is referenced in [this GitHub issue](https://github.com/rollup/rollup-plugin-babel/issues/312)

  To polyfill async/await with Babel, it seems there are multiple ways to do it.

  One way of one doing it is by using `@babel/preset-env` with `useBuiltins: "usage"`.

  Another one way is by using `@babel/plugin-transform-runtime` (with `@babel/runtime` as dependency), the one that I use in this repo.

  See [this SO thread](https://stackoverflow.com/questions/61208604/do-we-need-combine-the-transform-runtime-and-preset-env-in-an-application) for more informations.

  By using the latter one, you don't have to include the `regenerator-runtime`, neither the `core-js` as dependencies ; instead you have to use the `@babel/runtime`.

## Babel

- Babel config files for monorepo structure: https://babeljs.io/docs/en/config-files#monorepos

- Babel polyfills (plugin-transform-runtime and runtime):
  - https://www.zzuu666.com/articles/9
  - https://babeljs.io/docs/en/babel-plugin-transform-runtime#corejs
  - https://babeljs.io/docs/en/babel-runtime

## LitElement build with Rollup (for older browsers)

- Universal build: https://lit-element.polymer-project.org/guide/build#supporting-older-browsers

## Typescript

- Typescript `baseUrl` option: https://www.typescriptlang.org/docs/handbook/module-resolution.html#base-url

- [ts-lit-plugin](https://www.npmjs.com/package/ts-lit-plugin): add type checking to lit-html templates

## Rollup

- Rollup plugins repo: https://github.com/rollup/plugins

## Lerna

- https://github.com/lerna/lerna#getting-started

- [lerna-get-packages](https://www.npmjs.com/package/lerna-get-packages)

  It's a npm package to get lerna monorepo sub-packages. It might be interesting to use it for the build configuration (See the MikeLockz/lerna-rollup-yarn github repo referenced above).

## LitElement and lit-html

- [lit-html documentation](https://lit-html.polymer-project.org/guide)

- [LitElement documentation](https://lit-element.polymer-project.org/guide)

- [Polymer/lit-element GitHub repo](https://github.com/Polymer/lit-element)

  This documentation describes how to use webcomponents polyfills (and how to include it in the client app, which is going to use the Web Components produced)

## Prettier

- prettier.io:

  - https://prettier.io/docs/en/install.html
  - https://prettier.io/docs/en/precommit.html

- Configure Prettier in VSCode (using husky and lint-staged): https://glebbahmutov.com/blog/configure-prettier-in-vscode

## Linter

- https://eslint.org/docs/user-guide/getting-started

- https://github.com/prettier/eslint-config-prettier

- eslint plugins:
  - [eslint-plugin-wc](https://www.npmjs.com/package/eslint-plugin-wc)
  - [eslint-plugin-lit](https://www.npmjs.com/package/eslint-plugin-lit)

## Husky and lint-staged

- Configure Prettier with husky and lint-staged pre-commit hooks: https://prettier.io/docs/en/precommit.html#option-1-lint-stagedhttpsgithubcomokonetlint-staged

- Use ESLint and Prettier in Typescript (with Husky and lint-staged): https://www.robertcooper.me/using-eslint-and-prettier-in-a-typescript-project

## Publish to GitHub Packages

- https://docs.github.com/en/packages/guides/configuring-npm-for-use-with-github-packages
- https://docs.github.com/en/packages/guides/configuring-npm-for-use-with-github-packages#authenticating-to-github-packages
