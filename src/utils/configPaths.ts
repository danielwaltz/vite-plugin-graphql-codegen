import { normalizePath } from 'vite';
import type { CodegenContext } from '@graphql-codegen/cli';
import { normalizeInstanceOrArray } from '@graphql-codegen/plugin-helpers';

export async function getDocumentPaths(
  context: CodegenContext,
): Promise<string[]> {
  const config = context.getConfig();

  if (!config.documents) return [];

  const normalized = normalizeInstanceOrArray(config.documents);

  const documents = await context.loadDocuments(normalized);

  if (!documents.length) return [];

  return documents
    .map(({ location = '' }) => location)
    .filter(Boolean)
    .map(normalizePath);
}

export async function getSchemaPaths(
  context: CodegenContext,
): Promise<string[]> {
  const config = context.getConfig();

  if (!config.schema) return [];

  const schemas = normalizeInstanceOrArray(config.schema);

  return schemas
    .filter((schema): schema is string => typeof schema === 'string')
    .filter(Boolean)
    .map(normalizePath);
}
