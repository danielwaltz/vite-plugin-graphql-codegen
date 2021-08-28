# Vite Plugin GraphQL Codegen

Experimental zero-config vite plugin that uses the vite file watcher to run [graphql codegen](https://www.graphql-code-generator.com/) programmatically without needing to start a separate watcher.

## Setup GraphQL Codegen

Installation instructions found [here](https://www.graphql-code-generator.com/docs/getting-started/installation). Optional if already set up in project.

## Install

```bash
# npm
npm i -D vite-plugin-graphql-codegen

# yarn
yarn add -D vite-plugin-graphql-codegen
```

## Initialize

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

Project bootstrapped with [TSDX](https://github.com/palmerhq/tsdx).
