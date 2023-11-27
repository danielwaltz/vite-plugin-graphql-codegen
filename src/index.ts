import type { Plugin } from 'vite';
import {
  type CodegenConfig,
  CodegenContext,
  generate,
  loadContext,
} from '@graphql-codegen/cli';
import {
  type FileMatcher,
  isCodegenConfig,
  isGraphQLDocument,
  isGraphQLSchema,
} from './utils/fileMatchers';
import { isBuildMode, isServeMode, type ViteMode } from './utils/viteModes';
import { debugLog } from './utils/debugLog';

export interface Options {
  /**
   * Run codegen on server start.
   *
   * @defaultValue `true`
   */
  runOnStart?: boolean;
  /**
   * Run codegen on build. Will prevent build if codegen fails.
   *
   * @defaultValue `true`
   */
  runOnBuild?: boolean;
  /**
   * Enable codegen integration with vite file watcher.
   *
   * @defaultValue `true`
   */
  enableWatcher?: boolean;
  /**
   * Throw an error if codegen fails on server start.
   *
   * @defaultValue `false`
   */
  throwOnStart?: boolean;
  /**
   * Throw an error if codegen fails on build.
   *
   * @defaultValue `true`
   */
  throwOnBuild?: boolean;
  /**
   * Run codegen when a document matches.
   *
   * @defaultValue `true`
   */
  matchOnDocuments?: boolean;
  /**
   * Run codegen when a schema matches. Only supports file path based schemas.
   *
   * @defaultValue `false`
   */
  matchOnSchemas?: boolean;
  /**
   * Manually define the codegen config.
   */
  config?: CodegenConfig;
  /**
   * Override parts of the codegen config just for this plugin.
   */
  configOverride?: Partial<CodegenConfig>;
  /**
   * Override parts of the codegen config just for this plugin on server start.
   */
  configOverrideOnStart?: Partial<CodegenConfig>;
  /**
   * Override parts of the codegen config just for this plugin on build.
   */
  configOverrideOnBuild?: Partial<CodegenConfig>;
  /**
   * Override parts of the codegen config just for this plugin in the watcher.
   */
  configOverrideWatcher?: Partial<CodegenConfig>;
  /**
   * Override the codegen config file path.
   */
  configFilePathOverride?: string;
  /**
   * Log various steps to aid in tracking down bugs.
   *
   * @defaultValue `false`
   */
  debug?: boolean;
}

export function GraphQLCodegen(options?: Options): Plugin {
  let codegenContext: CodegenContext;
  let viteMode: ViteMode;

  const {
    runOnStart = true,
    runOnBuild = true,
    enableWatcher = true,
    throwOnStart = false,
    throwOnBuild = true,
    matchOnDocuments = true,
    matchOnSchemas = false,
    config = null,
    configOverride = {},
    configOverrideOnStart = {},
    configOverrideOnBuild = {},
    configOverrideWatcher = {},
    configFilePathOverride,
    debug = false,
  } = options ?? {};

  const log = (...args: unknown[]) => {
    if (!debug) return;
    debugLog(...args);
  };

  const generateWithOverride = async (
    overrideConfig: Partial<CodegenConfig>,
  ) => {
    const currentConfig = codegenContext.getConfig();

    return generate({
      ...currentConfig,
      ...configOverride,
      ...overrideConfig,
      // Vite handles file watching
      watch: false,
    });
  };

  if (options) log('Plugin initialized with options:', options);

  return {
    name: 'graphql-codegen',
    async config(_config, env) {
      try {
        if (config) {
          log('Manual config passed, creating codegen context');
          codegenContext = new CodegenContext({ config });
        } else {
          const cwd = process.cwd();
          log('Loading codegen context:', configFilePathOverride ?? cwd);
          codegenContext = await loadContext(configFilePathOverride);
        }
        log('Loading codegen context successful');
      } catch (error) {
        log('Loading codegen context failed');
        throw error;
      }

      viteMode = env.command;
    },
    async buildStart() {
      if (isServeMode(viteMode)) {
        if (!runOnStart) return;

        try {
          await generateWithOverride(configOverrideOnStart);
          log('Generation successful on start');
        } catch (error) {
          // GraphQL Codegen handles logging useful errors
          log('Generation failed on start');
          if (throwOnStart) throw error;
        }
      }

      if (isBuildMode(viteMode)) {
        if (!runOnBuild) return;

        try {
          await generateWithOverride(configOverrideOnBuild);
          log('Generation successful on build');
        } catch (error) {
          // GraphQL Codegen handles logging useful errors
          log('Generation failed on build');
          if (throwOnBuild) throw error;
        }
      }
    },
    configureServer(server) {
      if (!enableWatcher) return;

      const listener = async (filePath = '') => {
        log('File changed:', filePath);

        const isConfig = await isCodegenConfig(filePath, codegenContext);

        if (isConfig) {
          log('Codegen config file changed, restarting vite');
          server.restart();
          return;
        }

        const matchers: [
          enabled: boolean,
          name: string,
          matcher: FileMatcher,
        ][] = [
          [matchOnDocuments, 'document', isGraphQLDocument],
          [matchOnSchemas, 'schema', isGraphQLSchema],
        ];

        const matcherResults = await Promise.all(
          matchers.map(async ([enabled, name, matcher]) => {
            if (!enabled) {
              log(`Check for ${name} file skipped in file watcher by config`);
              return false;
            }

            try {
              const isMatch = await matcher(filePath, codegenContext);

              log(`Check for ${name} file successful in file watcher`);

              if (isMatch) log(`File matched a graphql ${name}`);
              else log(`File did not match a graphql ${name}`);

              return isMatch;
            } catch (error) {
              // GraphQL Codegen handles logging useful errors
              log(`Check for ${name} file failed in file watcher`);
              return false;
            }
          }),
        );

        const isMatch = matcherResults.some((result) => result);

        if (!isMatch) return;

        try {
          await generateWithOverride(configOverrideWatcher);
          log('Generation successful in file watcher');
        } catch (error) {
          // GraphQL Codegen handles logging useful errors
          log('Generation failed in file watcher');
        }
      };

      server.watcher.on('add', listener);
      server.watcher.on('change', listener);
    },
  } as const satisfies Plugin;
}

export default GraphQLCodegen;
