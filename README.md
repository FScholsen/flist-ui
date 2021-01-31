# flist-ui

Reusable Web Components

Lerna monorepo

Lit Elements

Typescript

# Steps

- create an new git repo: `git init`
- create a new lerna monorepo: `npx lerna init`
- run `npm install` to install lerna as dev dependency
- create a new package `npx lerna create flist-button`
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

- add ESLint:
  - `npm install --D eslint`
  - `npm install --D eslint-config-prettier`, to avoid conflicts between eslint and prettier
  - `npm install --D typescript` (you must install it in order to lint with typescript-eslint)
  - `npm install --D @typescript-eslint/parser`
  - `npm install --D @typescript-eslint/eslint-plugin`

# References links

- https://github.com/patrickvaler/lit-element-typescript-rollup-starter

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
