import { Plugin } from 'vite';
import { CodegenContext, generate, loadContext } from '@graphql-codegen/cli';
import { isGraphQLDocument } from './helpers';

export default function VitePluginGraphQLCodegen(): Plugin {
  let codegenContext: CodegenContext;

  return {
    name: 'graphql-codegen',
    async config(config) {
      codegenContext = await loadContext(config.root);

      // Vite handles file watching
      codegenContext.updateConfig({ watch: false });
    },
    async buildStart() {
      try {
        await generate(codegenContext);
      } catch (error) {
        console.log('Something went wrong.');
      }
    },
    configureServer(server) {
      const listener = async (filePath = '') => {
        const isDocument = await isGraphQLDocument(filePath, codegenContext);

        if (!isDocument) return;

        try {
          await generate(codegenContext);
        } catch (error) {
          console.log('Something went wrong. Please save the file again.');
        }
      };

      server.watcher.on('add', listener);
      server.watcher.on('change', listener);
    },
  };
}
