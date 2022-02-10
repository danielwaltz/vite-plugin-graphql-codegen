import fs from 'fs';
import { Plugin } from 'vite';
import { CodegenContext, generate, loadContext } from '@graphql-codegen/cli';
import { Types } from '@graphql-codegen/plugin-helpers';
import { isCodegenConfig } from './helpers/isCodegenConfig';
import { isGraphQLDocument } from './helpers/isGraphQLDocument';
import { restartVite } from './helpers/restartVite';
import { ViteMode, isServeMode, isBuildMode } from './helpers/viteModes';
import { debugLog } from './helpers/debugLog';

export interface Options {
  /**
   * Run codegen when the server starts.
   * @defaultValue `true`
   */
  runOnStart?: boolean;
  /**
   * Run codegen on builds.
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
  /**
   * Override the codegen configuration file path.
   */
  configFilePathOverride?: string;
  /**
   * Log various steps to aid in tracking down bugs.
   * @defaultValue `false`
   */
  debug?: boolean;
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
    configFilePathOverride,
    debug = false,
  } = options ?? {};

  const log = (...args: any[]) => {
    if (!debug) return;
    debugLog(...args);
  };

  log('Plugin initialized with options:', options);

  return {
    name: 'graphql-codegen',
    async config(_config, env) {
      try {
        const cwd = process.cwd();
        log('Loading codegen context:', configFilePathOverride ?? cwd);
        codegenContext = await loadContext(configFilePathOverride);
        log('Loading codegen context successful');
      } catch (error) {
        log('Loading codegen context failed');
        throw error;
      }

      // Vite handles file watching
      const watch = false;

      codegenContext.updateConfig({ ...configOverride, watch });

      viteMode = env.command;
    },
    configResolved() {
      for (const fileName of VITE_CONFIG_FILE_NAMES) {
        log('Checking for vite config file:', fileName);

        if (fs.existsSync(fileName)) {
          viteConfigFileName = fileName;
          log('Vite config file found:', fileName);
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
        isServe && log('Generation successful on start');
        isBuild && log('Generation successful on build');
      } catch (error) {
        // GraphQL Codegen handles logging useful errors
        isServe && log('Generation failed on start');
        isBuild && log('Generation failed on build');

        // Prevent build if codegen fails
        if (isBuild) throw error;
      }
    },
    configureServer(server) {
      const listener = async (filePath = '') => {
        log('File changed:', filePath);

        const isConfig = isCodegenConfig(filePath, codegenContext);

        if (isConfig) {
          log('Codegen config file changed, restarting vite');
          restartVite(viteConfigFileName);
          return;
        }

        if (!enableWatcher) return;

        try {
          const isDocument = await isGraphQLDocument(filePath, codegenContext);
          log('Document check successful in file watcher');

          if (!isDocument) return;
        } catch (error) {
          // GraphQL Codegen handles logging useful errors
          log('Document check failed in file watcher');
        }

        log('File matched a graphql document');

        try {
          await generate(codegenContext);
          log('Generation successful in file watcher');
        } catch (error) {
          // GraphQL Codegen handles logging useful errors
          log('Generation failed in file watcher');
        }
      };

      server.watcher.on('add', listener);
      server.watcher.on('change', listener);
    },
  };
}
