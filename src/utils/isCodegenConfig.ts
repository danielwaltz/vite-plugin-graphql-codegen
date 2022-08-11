import { normalizePath } from 'vite';
import { CodegenContext } from '@graphql-codegen/cli';

export function isCodegenConfig(
  filePath: string,
  context: CodegenContext,
): boolean {
  return normalizePath(filePath) === normalizePath(context.filepath);
}
