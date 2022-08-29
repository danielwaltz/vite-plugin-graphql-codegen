import { normalizePath } from 'vite';
import { CodegenContext } from '@graphql-codegen/cli';
import { normalizeInstanceOrArray } from '@graphql-codegen/plugin-helpers';

export function isCodegenConfig(
  filePath: string,
  context: CodegenContext,
): boolean {
  return normalizePath(filePath) === normalizePath(context.filepath);
}

export async function isGraphQLDocument(
  filePath: string,
  context: CodegenContext,
): Promise<boolean> {
  const config = context.getConfig();

  if (!config.documents) return false;

  const normalized = normalizeInstanceOrArray(config.documents);

  const documents = await context.loadDocuments(normalized);

  if (!documents.length) return false;

  const paths = documents
    .map(({ location = '' }) => location)
    .map(normalizePath)
    .filter(Boolean);

  if (!paths.length) return false;

  return paths.some((documentPath) => documentPath === normalizePath(filePath));
}

export async function isGraphQLSchema(
  filePath: string,
  context: CodegenContext,
): Promise<boolean> {
  const config = context.getConfig();

  if (!config.schema) return false;

  const schemas = normalizeInstanceOrArray(config.schema);

  const paths = schemas
    .filter((schema): schema is string => typeof schema === 'string')
    .map(normalizePath)
    .filter(Boolean);

  if (!paths.length) return false;

  return paths.some((schemaPath) => schemaPath === normalizePath(filePath));
}
