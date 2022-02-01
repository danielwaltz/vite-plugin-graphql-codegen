import fs from 'fs';
import { Plugin } from 'vite';
import { CodegenContext, generate, loadContext } from '@graphql-codegen/cli';
import { Types } from '@graphql-codegen/plugin-helpers';
import { isCodegenConfig } from './helpers/isCodegenConfig';
import { isGraphQLDocument } from './helpers/isGraphQLDocument';
import { restartVite } from './helpers/restartVite';
import { ViteMode, isServeMode, isBuildMode } from './helpers/viteModes';

export interface Options {
  /**
   * Enable codegen in serve mode.
   * @defaultValue `true`
   */
  runOnStart?: boolean;
  /**
   * Enable codegen in build mode.
   * @defaultValue `true`
   */
  runOnBuild?: boolean;
  /**
   * Enable codegen integration with vite file watcher.
   * @defaultValue `true`
   */
  enableWatcher?: boolean;
  /**
   * Override codegen configuration just for this plugin.
   */
  configOverride?: Partial<Types.Config>;
}

const VITE_CONFIG_FILE_NAMES = ['vite.config.ts', 'vite.config.js'] as const;

export default function VitePluginGraphQLCodegen(options?: Options): Plugin {
  let codegenContext: CodegenContext;
  let viteMode: ViteMode;
  let viteConfigFileName: typeof VITE_CONFIG_FILE_NAMES[number];

  const {
    runOnStart = true,
    runOnBuild = true,
    enableWatcher = true,
    configOverride = {},
  } = options ?? {};

  return {
    name: 'graphql-codegen',
    async config(config, env) {
      codegenContext = await loadContext(config.root);

      // Vite handles file watching
      const watch = false;

      codegenContext.updateConfig({ ...configOverride, watch });

      viteMode = env.command;
    },
    configResolved() {
      for (const fileName of VITE_CONFIG_FILE_NAMES) {
        if (fs.existsSync(fileName)) {
          viteConfigFileName = fileName;
          break;
        }
      }
    },
    async buildStart() {
      const isServe = isServeMode(viteMode);
      const isBuild = isBuildMode(viteMode);

      if (isServe && !runOnStart) return;
      if (isBuild && !runOnBuild) return;

      try {
        await generate(codegenContext);
      } catch (error) {
        // Prevent build if codegen fails
        if (isBuild) throw error;

        // GraphQL Codegen handles logging useful errors
      }
    },
    configureServer(server) {
      const listener = async (filePath = '') => {
        const isConfig = isCodegenConfig(filePath, codegenContext);

        if (isConfig) {
          restartVite(viteConfigFileName);
          return;
        }

        if (!enableWatcher) return;

        try {
          const isDocument = await isGraphQLDocument(filePath, codegenContext);

          if (!isDocument) return;
        } catch (error) {
          // GraphQL Codegen handles logging useful errors
        }

        try {
          await generate(codegenContext);
        } catch (error) {
          // GraphQL Codegen handles logging useful errors
        }
      };

      server.watcher.on('add', listener);
      server.watcher.on('change', listener);
    },
  };
}
