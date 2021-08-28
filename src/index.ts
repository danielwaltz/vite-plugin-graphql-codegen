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
      await generate(codegenContext);
    },
    configureServer(server) {
      const listener = (path = '') => {
        const { generates, documents } = codegenContext.getConfig();

        // Check if file is a generated file
        const generated = Object.keys(generates);
        const isGenerated = generated.some(file => path.includes(file));
        if (isGenerated) return;

        // Check if file is an operation document
        const [, fileName = ''] = path.split(`${viteConfig.root}/`);
        const isDocument = minimatch(fileName, documents);
        if (!isDocument) return;

        generate(codegenContext);
      };

      server.watcher.on('add', listener);
      server.watcher.on('change', listener);
    },
  };
}
