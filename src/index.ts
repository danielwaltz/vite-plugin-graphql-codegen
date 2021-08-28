import { Plugin, ResolvedConfig } from 'vite';
import { CodegenContext, generate, loadContext } from '@graphql-codegen/cli';
import { createMatcher, isDocumentMatch } from './matchers';

export default function VitePluginGraphQLCodegen(): Plugin {
  let viteConfig: ResolvedConfig;
  let codegenContext: CodegenContext;

  return {
    name: 'graphql-codegen',
    async config(config) {
      codegenContext = await loadContext(config.root);

      // Vite handles file watching
      codegenContext.updateConfig({ watch: false });
    },
    configResolved(resolvedConfig) {
      viteConfig = resolvedConfig;
    },
    async buildStart() {
      try {
        await generate(codegenContext);
      } catch (error) {
        console.log('Something went wrong.');
      }
    },
    configureServer(server) {
      const listener = async (absolutePath = '') => {
        const matcher = createMatcher(absolutePath, viteConfig);

        const isDocument = await isDocumentMatch(matcher, codegenContext);
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
