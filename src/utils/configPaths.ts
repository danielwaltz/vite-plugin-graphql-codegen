import { normalizePath } from 'vite';
import type { CodegenContext } from '@graphql-codegen/cli';
import type { Types } from '@graphql-codegen/plugin-helpers/typings/types';

export async function getDocumentPaths(
  context: CodegenContext,
): Promise<string[]> {
  const config = context.getConfig();

  const sourceDocuments = Object.values(config.generates).map((output) =>
    Array.isArray(output) ? undefined : output.documents,
  );

  if (config.documents) {
    sourceDocuments.unshift(config.documents);
  }

  const normalized = sourceDocuments
    .filter((item): item is NonNullable<typeof item> => !!item)
    .flat();

  if (!normalized.length) return [];

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

  const sourceSchemas = Object.values(config.generates).map((output) =>
    Array.isArray(output) ? undefined : output.schema,
  );

  if (config.schema) {
    sourceSchemas.unshift(config.schema);
  }

  const normalized = sourceSchemas
    .filter((item): item is NonNullable<typeof item> => !!item)
    .flat();

  if (!normalized.length) return [];

  const schemas = await context.loadSchema(
    // loadSchema supports array of string, but typings are wrong
    normalized as unknown as Types.Schema,
  );

  return (schemas.extensions.sources as { name: string }[])
    .map(({ name = '' }) => name)
    .filter(Boolean)
    .map(normalizePath);
}
