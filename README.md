# link-local
local package link manager

## Prerequisites
- `NodeJS`
- `NPM`
- `Yarn`

## How to use
- install link-local
```cli
  yarn add link-local -D (or "npm install link-local --save-dev")
```

- create "localDependencies" section in your `package.json`
```json
  "localDependencies": {
    "local-package-name": "path/to/the/package"
  }
```

- register a script in `package.json`
```json
  "scripts": {
    "link": "link-local"
  }
```

- run the script
```cli
  npm run link
```
