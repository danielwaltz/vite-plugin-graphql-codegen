import { normalizePath } from 'vite';
import type { CodegenContext } from '@graphql-codegen/cli';

export function isCodegenConfig(filePath: string, context: CodegenContext) {
  if (!context.filepath) return false;

  return normalizePath(filePath) === normalizePath(context.filepath);
}
