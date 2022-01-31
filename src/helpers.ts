import { CodegenContext } from '@graphql-codegen/cli';
import { normalizeInstanceOrArray } from '@graphql-codegen/plugin-helpers';

export async function isGraphQLDocument(
  filePath: string,
  context: CodegenContext
): Promise<boolean> {
  const config = context.getConfig();

  if (!config.documents) return false;

  const normalized = normalizeInstanceOrArray(config.documents);

  const documents = await context.loadDocuments(normalized);

  if (!documents.length) return false;

  const paths = documents.map(({ location = '' }) => location).filter(Boolean);

  if (!paths.length) return false;

  return paths.some(documentPath => documentPath === filePath);
}
