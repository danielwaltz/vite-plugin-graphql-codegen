import { normalizePath } from 'vite';
import { type CodegenContext } from '@graphql-codegen/cli';
import { getDocumentPaths, getSchemaPaths } from '@/utils/configPaths';

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

  return documentPaths.some((path) => path === normalizePath(filePath));
};

export const isGraphQLSchema: FileMatcher = async (filePath, context) => {
  const schemaPaths = await getSchemaPaths(context);

  if (!schemaPaths.length) return false;

  return schemaPaths.some((path) => normalizePath(filePath).includes(path));
};
