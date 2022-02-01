import fs from 'fs';
import { Plugin } from 'vite';
import { CodegenContext, generate, loadContext } from '@graphql-codegen/cli';
import { isCodegenConfig, isGraphQLDocument, restartVite } from './helpers';

const VITE_CONFIG_FILE_NAMES = ['vite.config.ts', 'vite.config.js'] as const;

export default function VitePluginGraphQLCodegen(): Plugin {
  let codegenContext: CodegenContext;
  let viteConfigFileName: typeof VITE_CONFIG_FILE_NAMES[number];

  return {
    name: 'graphql-codegen',
    async config(config) {
      codegenContext = await loadContext(config.root);

      // Vite handles file watching
      codegenContext.updateConfig({ watch: false });
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
      try {
        await generate(codegenContext);
      } catch (error) {
        // GraphQL Codegen handles printing errors
      }
    },
    configureServer(server) {
      const listener = async (filePath = '') => {
        const isConfig = isCodegenConfig(filePath, codegenContext);

        if (isConfig) {
          restartVite(viteConfigFileName);
          return;
        }

        try {
          const isDocument = await isGraphQLDocument(filePath, codegenContext);

          if (!isDocument) return;
        } catch {
          // GraphQL Codegen handles printing errors
        }

        try {
          await generate(codegenContext);
        } catch (error) {
          // GraphQL Codegen handles printing errors
        }
      };

      server.watcher.on('add', listener);
      server.watcher.on('change', listener);
    },
  };
}
