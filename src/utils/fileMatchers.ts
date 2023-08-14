import { normalizePath } from 'vite';
import { type CodegenContext } from '@graphql-codegen/cli';
import { getDocumentPaths, getSchemaPaths } from '@/utils/configPaths';

export function isCodegenConfig(
  filePath: string,
  context: CodegenContext,
): boolean {
  if (!context.filepath) return false;

  return normalizePath(filePath) === normalizePath(context.filepath);
}

export async function isGraphQLDocument(
  filePath: string,
  context: CodegenContext,
): Promise<boolean> {
  const documentPaths = await getDocumentPaths(context);

  if (!documentPaths.length) return false;

  return documentPaths.some((path) => path === normalizePath(filePath));
}

export async function isGraphQLSchema(
  filePath: string,
  context: CodegenContext,
): Promise<boolean> {
  const schemaPaths = await getSchemaPaths(context);

  if (!schemaPaths.length) return false;

  return schemaPaths.some((path) => normalizePath(filePath).includes(path));
}
