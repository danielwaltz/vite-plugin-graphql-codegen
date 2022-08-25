import { normalizePath } from 'vite';
import { CodegenContext } from '@graphql-codegen/cli';
import { normalizeInstanceOrArray } from '@graphql-codegen/plugin-helpers';

export async function isGraphQLFile(
  filePath: string,
  context: CodegenContext,
): Promise<boolean> {
  const { documents = [], schema = [] } = context.getConfig();

  const normalized = [
    ...normalizeInstanceOrArray(documents),
    ...normalizeInstanceOrArray(schema),
  ];

  const loadedDocuments = await context.loadDocuments(normalized);

  if (!loadedDocuments.length) return false;

  const paths = loadedDocuments
    .map(({ location = '' }) => location)
    .map(normalizePath)
    .filter(Boolean);

  if (!paths.length) return false;

  return paths.some((documentPath) => documentPath === normalizePath(filePath));
}
