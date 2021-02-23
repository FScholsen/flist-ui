- [ ] Add Storybook to view and test components

- [ ] Add rollup terser plugin (`rollup-plugin-terse`) to produce the production build

- [ ] Update the README with :

  - [ ] updated build config (rollup, babel)
    - remove rollup-plugin-typescript from devDependencies
  - [ ] updated type-checking config (with tsc)
  - [x] project requirements (NodeJS LTS, npm)

- [x] Move to independent package version with Lerna

- [ ] Add stylelint https://stylelint.io/, See: https://github.com/serhii-havrylenko/monorepo-babel-ts-lerna-starter/blob/master/README.MD#stylelint

- [ ] Add Jest for testing, see: https://github.com/serhii-havrylenko/monorepo-babel-ts-lerna-starter/blob/master/README.MD#testing

  - choose a testing framework form this list:
    - karma
    - mocha
    - chai
    - jest
  - those packages might be useful:
    - `@open-wc/testing`
    - `@open-wc/testing-karma`
  - See the https://github.com/PolymerLabs/lit-element-starter-ts repo for references

- Use `web-component-analyzer` npm package to generate documentation about the web-components

- [ ] Add `npm-run-all` in order to use `run-p [-c]`, it allows to run multiple commands without stopping the others after that one failed

- [ ] Add this to `lerna.json`:

  See: https://github.com/serhii-havrylenko/monorepo-babel-ts-lerna-starter/blob/master/README.MD#package-publishing

  Set correct values for registry and allowBranch according to existing configuration

  ```
  {
    "command": {
      "publish": {
        "conventionalCommits": true,
        "registry": "http://localhost:4873",
        "access": "public",
        "npmClient": "yarn",
        "allowBranch": ["master", "feature/*"]
      }
    }
  }
  ```

- [ ] Add `yarn` as devDependency and use workspaces with lerna (use yarn as `npmClient`)

  - See example use here:
    https://github.com/serhii-havrylenko/monorepo-babel-ts-lerna-starter/blob/master/README.MD#first-package
  - See config here:
    https://github.com/serhii-havrylenko/monorepo-babel-ts-lerna-starter/blob/master/README.MD#setting-up-package-manager

- [ ] Setup the build config according to [this config](https://lit-element.polymer-project.org/guide/build#supporting-older-browsers) to allow using components in IE11

  - a solution might be to use regeneratorRuntime (regenerator-runtime/runtime) or SystemJS runtime as explained in LitElement docs
  - or use the builtins polyfills of babel preset env : https://babeljs.io/docs/en/babel-preset-env.html#usebuiltins
  - or try to produce bundles of type IIFE and use this bundled iife file in IE11 (instead of `type="module"` and esm version) (though, I think without babel polyfills it won't work)
  - Other useful resources that might help to build for older browsers:
    - https://www.npmjs.com/package/systemjs (tutorial found on this page: https://www.youtube.com/watch?v=AmdKF2UhFzw)
    - https://github.com/systemjs/systemjs-babel
    - https://babeljs.io/docs/en/babel-preset-env.html#corejs
    - https://github.com/rollup/plugins/tree/master/packages/babel

- [ ] Add `.npmignore` in each package to exclude from publishing
