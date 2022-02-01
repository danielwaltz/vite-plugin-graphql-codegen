# Vite Plugin GraphQL Codegen

Experimental zero-config vite plugin that uses the vite file watcher to run [graphql codegen](https://www.graphql-code-generator.com/) programmatically without needing to start a separate watcher.

## Setup GraphQL Codegen

Installation instructions found [here](https://www.graphql-code-generator.com/docs/getting-started/installation). Optional if already set up in project.

## Install Plugin

```bash
# npm
npm i -D vite-plugin-graphql-codegen

# yarn
yarn add -D vite-plugin-graphql-codegen
```

## Initialize Plugin

```js
# vite.config.ts

import { defineConfig } from 'vite';
import codegen from 'vite-plugin-graphql-codegen';

export default defineConfig({
  plugins: [
    codegen()
  ],
});
```

## Options

Providing options is not required as sensible defaults are in place, but there may be times where it's helpful to disable codegen under certain circumstances, like when running builds in CI.

```js
codegen({
  /* Should codegen run when the dev server starts. Defaults to true. */
  runOnStart: true,
  /* Should codegen run on build. Will prevent build if codegen fails. Defaults to true. */
  runOnBuild: true,
  /* Should codegen run when files get added or change. Defaults to true. */
  enableWatcher: true
})
```

Project bootstrapped with [TSDX](https://github.com/palmerhq/tsdx).
