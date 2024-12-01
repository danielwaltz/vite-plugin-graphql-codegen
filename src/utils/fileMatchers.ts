import { normalizePath } from 'vite';
import type { CodegenContext } from '@graphql-codegen/cli';
import { getGeneratesPaths } from './configPaths';

export function isCodegenConfig(filePath: string, context: CodegenContext) {
  if (!context.filepath) return false;

  return normalizePath(filePath) === normalizePath(context.filepath);
}

export function isGeneratedFile(filePath: string, context: CodegenContext) {
  const generatesPaths = getGeneratesPaths(context);

  const normalizedFilePath = normalizePath(filePath);

  return generatesPaths.some((path) => normalizedFilePath.includes(path));
}
