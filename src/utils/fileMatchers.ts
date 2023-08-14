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
  const paths = await getDocumentPaths(context);

  if (!paths.length) return false;

  return paths.some((documentPath) => documentPath === normalizePath(filePath));
}

export async function isGraphQLSchema(
  filePath: string,
  context: CodegenContext,
): Promise<boolean> {
  const paths = await getSchemaPaths(context);

  if (!paths.length) return false;

  return paths.some((schemaPath) => schemaPath === normalizePath(filePath));
}
