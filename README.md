# Vite Plugin GraphQL Codegen

Zero-config vite plugin that uses the vite file watcher to run [graphql codegen](https://www.graphql-code-generator.com/) programmatically without needing to start a separate watcher.

## Setup GraphQL Codegen

Installation instructions found [here](https://www.graphql-code-generator.com/docs/getting-started/installation). Optional if already set up in project.

## Install Plugin

```bash
# npm
npm i -D vite-plugin-graphql-codegen

# yarn
yarn add -D vite-plugin-graphql-codegen

# pnpm
pnpm i -D vite-plugin-graphql-codegen
```

## Initialize Plugin

```ts
// vite.config.ts

import { defineConfig } from 'vite';
import codegen from 'vite-plugin-graphql-codegen';

export default defineConfig({
  plugins: [
    codegen(),
  ],
});
```

## Options

Providing options is not required as sensible defaults are in place, but there may be times where it's helpful to disable codegen under certain circumstances, like when running builds in CI.

```ts
codegen({
  /**
   * Run codegen on server start.
   *
   * @defaultValue `true`
   */
  runOnStart: boolean,
  /**
   * Run codegen on build. Will prevent build if codegen fails.
   *
   * @defaultValue `true`
   */
  runOnBuild: boolean,
  /**
   * Enable codegen integration with vite file watcher.
   *
   * @defaultValue `true`
   */
  enableWatcher: boolean,
  /**
   * Throw an error if codegen fails on server start.
   *
   * @defaultValue `false`
   */
  throwOnStart: boolean,
  /**
   * Throw an error if codegen fails on build.
   *
   * @defaultValue `true`
   */
  throwOnBuild: boolean,
  /**
   * Run codegen when a document matches.
   *
   * @defaultValue `true`
   */
  matchOnDocuments: boolean,
  /**
   * Run codegen when a schema matches.
   *
   * @defaultValue `false`
   */
  matchOnSchemas: boolean,
  /**
   * Manually define the codegen config.
   */
  config: CodegenConfig,
  /**
   * Override parts of the codegen config just for this plugin.
   */
  configOverride: Partial<CodegenConfig>,
  /**
   * Override parts of the codegen config just for this plugin on server start.
   */
  configOverrideOnStart: Partial<CodegenConfig>,
  /**
   * Override parts of the codegen config just for this plugin on build.
   */
  configOverrideOnBuild: Partial<CodegenConfig>,
  /**
   * Override parts of the codegen config just for this plugin in the watcher.
   */
  configOverrideWatcher: Partial<CodegenConfig>,
  /**
   * Override the codegen config file path.
   */
  configFilePathOverride: string,
  /**
   * Log various steps to aid in tracking down bugs.
   *
   * @defaultValue `false`
   */
  debug: boolean,
});
```
