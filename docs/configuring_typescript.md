# Configuring your Silverstripe CMS module to work with TypeScript

Experimental TypeScript support is provided by this module.

## Starting to write typescript
You can start writting TypeScript code by simply renaming your regular JS file to have a TS or TSX extensions.

`silverstripe/webpack-config` will default to using the `tsconfig.json` in the root of your module. If that's not available it will use a generic one that ships with this package.

If you want to use your own `tsconfig.json`, you can extends the one that ships with this package.

```json
{
  "extends": "./node_modules/@silverstripe/webpack-config/tsconfig.json",
  "compilerOptions": {
    "strict": false
  }
}
```

## Referencing other silverstripe libraries
The Silverstripe libraries use a somewhat unusal set up because our JS libraries are shipped via composer. e.g.: the `asset-admin` front-end code in `vendor/silverstripe/asset-admin/client/dist` will reference dependencies bundled by `admin` in `vendor/silverstripe/admin/client/dist`.

If you want your module to reference components exposed in another library, you need to update the `paths` attribute in your `tsconfig.json` file.

For example, the following `tsconfig.json` will allow you to reference JS code in the admin and cms module.

```json
{
  "extends": "./node_modules/@silverstripe/webpack-config/tsconfig.json",
  "compilerOptions": {
    "paths" : {
      "*" : [
        "client/src/*",
        "../admin/client/src/*",
        "../cms/client/src/*"
      ]
    },
    "strict": true
  },
  "exclude": [
    "node_modules",
    "../admin/client/src",
    "../cms/client/src",
  ]
}
```

The following JS code will allow you to import the TextField component from `silverstripe/admin`.

```ts
import TextField from 'components/TextField/TextField`;
```

This will work even if TextField is written in plain JavaScript. Beware that this will not bundle the TextField component into your library. Only components that have been exposed by the parent library will actually be available at run-time.

# Enabling test
To get your test running in TS, add the following entry to your `package.json`. 
```json
// ...
  "jest": {
    "roots": [
      "client/src"
    ],
    // This allow the jest to find your TS files
    "moduleFileExtensions": ["ts", "tsx", "js", "jsx"],
    "moduleDirectories": [
      "client/src",
      "node_modules"
    ],
    // This tell jest what the test filenames will look like
    "testMatch": [
      "**/tests/**/*-test.(j|t)s?(x)"
    ],
    "transform": {
      // This tells jest to process the ts test files with ts-jest
      "^.+\\.(ts|tsx)$": "ts-jest",
      "^.+\\.(js|jsx)$": "babel-jest"
    },
    // This tells ts-test where to find your tsconfig.json file
    "globals": {
      "ts-jest": {
        "tsConfig": "tsconfig.json"
        // or `node_module/@silverstripe/webpack-config/tsconfig.json` if you're using the generic one.
      }
    }
  },
// ...