import { Plugin } from 'vite';
import { CodegenContext, generate, loadContext } from '@graphql-codegen/cli';

export default function VitePluginGraphQLCodegen(): Plugin {
  let codegenContext: CodegenContext;

  return {
    name: 'graphql-codegen',
    async config(config) {
      // Load codegen config from user defined project root
      codegenContext = await loadContext(config.root);

      // Vite handles file watching
      codegenContext.updateConfig({ watch: false });
    },
    async buildStart() {
      await generate(codegenContext);
    },
    configureServer(server) {
      const listener = (path: string) => {
        const codegenConfig = codegenContext.getConfig();

        // Get list of generated files
        const generated = Object.keys(codegenConfig.generates);

        // Check if saved file is a generated file
        const isGenerated = generated.some(file => path.includes(file));

        if (isGenerated) return;

        generate(codegenContext);
      };

      server.watcher.on('add', listener);
      server.watcher.on('change', listener);
    },
  };
}
