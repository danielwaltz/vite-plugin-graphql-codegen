import { Plugin, ResolvedConfig } from 'vite';
import { CodegenContext, generate, loadContext } from '@graphql-codegen/cli';
import minimatch from 'minimatch';

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
      const listener = async (path = '') => {
        const { generates, documents } = codegenContext.getConfig();

        // Check if file is a generated file
        const generated = Object.keys(generates);
        const isGenerated = generated.some(file => path.includes(file));
        if (isGenerated) return;

        // Check if file is an operation document
        const [, relativePath = ''] = path.split(`${viteConfig.root}/`);
        const isDocument = minimatch(relativePath, documents);
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
