- [ ] Update the README with :
  - [ ] updated build config (rollup, babel)
  - [ ] updated type-checking config (with tsc)
  - [ ] project requirements (NodeJS LTS, npm)
- [ ] Move to independent package version with Lerna
- Add stylelint https://stylelint.io/, See: https://github.com/serhii-havrylenko/monorepo-babel-ts-lerna-starter/blob/master/README.MD#stylelint
- Add Jest for testing, see: https://github.com/serhii-havrylenko/monorepo-babel-ts-lerna-starter/blob/master/README.MD#testing
- Add `npm-run-all` in order to use `run-p [-c]`, it allows to run multiple commands without stopping the others after that one failed
- Add this to `lerna.json`:
  See: https://github.com/serhii-havrylenko/monorepo-babel-ts-lerna-starter/blob/master/README.MD#package-publishing

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

- Add `yarn` as devDependency and use workspaces with lerna (use yarn as `npmClient`)

  - See example use here:
    https://github.com/serhii-havrylenko/monorepo-babel-ts-lerna-starter/blob/master/README.MD#first-package
  - See config here:
    https://github.com/serhii-havrylenko/monorepo-babel-ts-lerna-starter/blob/master/README.MD#setting-up-package-manager

- Setup the build config according to [this config](https://lit-element.polymer-project.org/guide/build#supporting-older-browsers) to allow using components in IE11

- Add `.npmignore` in each package to exclude from publishing
