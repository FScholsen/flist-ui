# flist-ui

Reusable Web Components

Lerna monorepo

Lit Elements

Typescript


# Steps 
- create an new git repo: `git init`
- create a new lerna monorepo: `npx lerna init` 
- run `npm install`
- create a new package `npx lerna create flist-button`
- add typescript
    - `cd flist-ui/packages/flist-button`
    - `npm install typescript`
    - create a `tsconfig.json` in this directory (`flist-ui/packages/flist-button`):

    ```
    {
        "compilerOptions": {
            "target": "es2017",
            "module": "es2015",
            "moduleResolution": "node",
            "lib": ["es2017", "dom", "dom.iterable"],
            "declaration": true,
            // "declarationMap": true,
            // "sourceMap": true,
            "outDir": "./lib",
            "rootDir": "./src",
            "strict": true,
            "noUnusedLocals": true,
            "noUnusedParameters": true,
            "noImplicitReturns": true,
            "noImplicitAny": true,
            "strictNullChecks": true,
            "noFallthroughCasesInSwitch": true,
            "allowSyntheticDefaultImports": true,
            "esModuleInterop": true,
            "experimentalDecorators": true,
            "forceConsistentCasingInFileNames": true,
        },
        "include": [
            "src/**/*.ts"
        ],
        "exclude": [
            "node_modules"
        ]
    }
    ```