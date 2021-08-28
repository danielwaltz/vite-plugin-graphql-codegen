import { Plugin } from 'vite';
import { generate, loadContext } from '@graphql-codegen/cli';

export default function VitePluginGraphQLCodegen(): Plugin {
  return {
    name: 'graphql-codegen',
    configureServer(server) {
      server.watcher.on('change', async () => {
        const context = await loadContext();
        context.updateConfig({ watch: false });
        generate(context, true);
      });
    },
  };
}
