import { Plugin, ResolvedConfig } from 'vite';
import { CodegenContext, generate, loadContext } from '@graphql-codegen/cli';
import {
  normalizeInstanceOrArray,
  Types,
} from '@graphql-codegen/plugin-helpers';
import minimatch from 'minimatch';

export default function VitePluginGraphQLCodegen(): Plugin {
  let viteConfig: ResolvedConfig;
  let codegenContext: CodegenContext;

  const getRelativePath = (path: string) => {
    return path.split(`${viteConfig.root}/`).slice(-1)[0];
  };

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
        const relativePath = getRelativePath(path);
        const match = (pattern: string) => minimatch(relativePath, pattern);

        const codegenConfig = codegenContext.getConfig<Types.Config>();
        const { generates = {}, documents } = codegenConfig;

        // If modified file is generated
        for (const [genPath, genConfig] of Object.entries(generates)) {
          // If generated path is file
          const fileExt = genPath.split('.').slice(-1)[0];
          const isFile = !!fileExt;
          if (isFile && match(genPath)) return;

          // If generated path is directory
          const { preset = '', presetConfig } = genConfig;
          const isNearOperationFilePreset = preset === 'near-operation-file';
          const presetExt = presetConfig?.extension ?? '.generated.ts';
          if (isNearOperationFilePreset && match(`**/*${presetExt}`)) return;
        }

        // If modified file is operation document
        if (!documents) return;
        const normalized = normalizeInstanceOrArray(documents);
        const documentFiles = codegenContext.loadDocuments(normalized);

        for (const docFile of await documentFiles) {
          if (!docFile.location) break;
          if (!match(getRelativePath(docFile.location))) return;
        }

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
