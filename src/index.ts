import { Plugin } from 'vite';

export default function VitePluginGraphQLCodegen(): Plugin {
  return {
    name: 'graphql-codegen',
  };
}
