import { normalizePath } from 'vite';
import type { CodegenContext } from '@graphql-codegen/cli';
import { getDocumentPaths, getSchemaPaths } from '../utils/configPaths';

export type FileMatcher = (
  filePath: string,
  context: CodegenContext,
) => Promise<boolean>;

export const isCodegenConfig: FileMatcher = async (filePath, context) => {
  if (!context.filepath) return false;

  return normalizePath(filePath) === normalizePath(context.filepath);
};

export const isGraphQLDocument: FileMatcher = async (filePath, context) => {
  const documentPaths = await getDocumentPaths(context);

  if (!documentPaths.length) return false;

  const normalizedFilePath = normalizePath(filePath);

  return documentPaths.includes(normalizedFilePath);
};

export const isGraphQLSchema: FileMatcher = async (filePath, context) => {
  const schemaPaths = await getSchemaPaths(context);

  if (!schemaPaths.length) return false;

  const normalizedFilePath = normalizePath(filePath);

  return schemaPaths.includes(normalizedFilePath);
};
