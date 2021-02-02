# flist-ui

Reusable Web Components

Lerna monorepo

Lit Elements

Typescript

Babel

Rollup

Prettier

ESLint

GitHub NPM registry (GitHub Packages)

# Getting started

# Steps

These are the steps I followed from scratch to have everything running:

- create an new git repo: `git init`
- create an new npm package (and package.json): `npm init`

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

- add a `.gitignore`

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

- install lerna: `npm install -D lerna`
  It will add lerna as dev dependency
- create a new lerna monorepo: `npx lerna init`
  It will create a new `lerna.json` where you can add [options](https://github.com/lerna/lerna#lernajson):

```
{
  "packages": [
    "packages/*"
  ],
  "version": "0.0.0"
}

```

- create a new package `npx lerna create flist-button`
<!-- TODO Remove typescript from packages, move it to global install -->
- add typescript to the package

  - `cd flist-ui/packages/flist-button`
  - `npm install -D typescript`
  - create a `tsconfig.json` in this directory (`flist-ui/packages/flist-button`):

  ```
  {
    "compilerOptions": {
      "target": "es2017",
      "module": "es2015",
      "moduleResolution": "node",
      "lib": ["es2017", "dom", "dom.iterable"],
      "declaration": true,
      "emitDeclarationOnly": true, // only emit .d.ts file, let babel generate dist files
      "isolatedModules": true,
      "strict": true,
      "noUnusedLocals": true,
      "noUnusedParameters": true,
      "noImplicitReturns": true,
      "noImplicitAny": true,
      "strictNullChecks": true,
      "noFallthroughCasesInSwitch": true,
      "allowSyntheticDefaultImports": true,
      "esModuleInterop": true,
      "experimentalDecorators": true
      // "plugins": [
      //     {
      //         "name": "ts-lit-plugin",
      //         "strict": true
      //     }
      // ]
    },
    "include": ["src/**/*.ts"],
    "exclude": ["node_modules"]
  }
  ```

- add rollup and babel to the package:

  - `cd flist-ui/packages/flist-button`
  - `npm install -D rollup @rollup/plugin-node-resolve`
  - `npm install -D @babel/core @rollup/plugin-babel @babel/preset-env @babel/preset-typescript @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties`
  - create a `rollup.config.js` in this directory

  ```
  // rollup.config.js
  import { babel } from "@rollup/plugin-babel";
  import resolve from "@rollup/plugin-node-resolve";
  import commonjs from "@rollup/plugin-commonjs";
  const input = "src/flist-button.ts";
  const outputDir = "./dist/";
  const extensions = [".ts"];
  const config = {
    input: input,
    output: {
      dir: outputDir,
      format: "esm",
      sourcemap: true,
    },
    plugins: [
      resolve({ extensions }),
      commonjs(),
      babel({
        babelHelpers: "bundled",
        extensions,
        include: ["src/**/*"],
        exclude: ["./node_modules/*"],
      }),
    ],
  };
  export default config;
  ```

  - create a `.babelrc` in this directory

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

- add lit-element as dependency:

  - `cd flist-ui/packages/flist-button`
  - `npm install lit-element`
  - use lit-element as dependency of a package:

  ```
  // src/flist-button.ts
  import { LitElement, html, customElement, property } from "lit-element";
  @customElement("flist-button")
  export class FlistButton extends LitElement {
    ...
  }
  ```

- add scripts to the `package.json`:

```
"scripts": {
  "build": "rm -rf ./dist && npx rollup --config",
  "watch": "rm -rf ./dist && npx rollup --config --watch"
}
```

- generate dist files of the package:  
  This will generate `.js` files in `./dist` from the `./src` folder :

  - `npm run build` (inside of a package in `flist-ui/packages/`)
  - `npm run build` (at project root, this command is an "alias" of `npx lerna run build`, this command will `run npm run` build in each package under `/packages`)

- generate type declaration from `.ts` files:

  - add a new `tsconfig.types.json`, to transpile source files and emit `.d.ts` files

  ```
  // ./packages/flist-button/tsconfig.types.json
  {
    "extends": "./tsconfig",
    "compilerOptions": {
      "outDir": "dist",
      "declaration": true,
      "declarationMap": true,
      "isolatedModules": false,
      "noEmit": false,
      "allowJs": false,
      "emitDeclarationOnly": true
    },
    "exclude": ["tests/**/*.ts"]
  }
  ```

  - add this to the npm scripts in `package.json`:

  ```
  "scripts": {
    "build": "rm -rf ./dist && npm run build:types && npx rollup --config",
    "build:types": "npx tsc --project tsconfig.types.json"
  }
  ```

  - `npm run build` will now generate type declarations files (in `./dist/*.d.ts`)

- add Prettier

  - cd `flist-ui`
  - `npm install --save-dev --save-exact prettier`
  - add a `.prettierignore`:

  ```
  # Ignore artifacts:

  build
  dist
  node_modules
  ```

  - add a `.prettierrc`, to override the default configuration of Prettier (if needed)

- add ESLint (for the monorepo):

  - `npm install --D eslint`
  - `npm install --D eslint-config-prettier`, to avoid conflicts between eslint and prettier
  - `npm install --D typescript` (you must install it in order to lint with typescript-eslint)
  - `npm install --D @typescript-eslint/parser`
  - `npm install --D @typescript-eslint/eslint-plugin`
  - `npx eslint --init` to generate a default config file, or use this one:

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

  - install lit-analyzer `npm install -D lit-analyzer`

  - add this to `package.json` scripts:

  ```
  "scripts": {
    ...
    "lint": "npm run lint:lit-analyzer && npx eslint './packages/**/src/**/*.ts'",
    "lint:lit-analyzer": "npx lit-analyzer './packages/**/src/**/*.ts'"
    ...
  }
  ```

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
