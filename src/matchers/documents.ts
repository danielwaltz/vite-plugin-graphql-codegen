import { CodegenContext } from '@graphql-codegen/cli';
import {
  normalizeInstanceOrArray,
  Types,
} from '@graphql-codegen/plugin-helpers';
import { Matcher } from './createMatcher';

export async function isDocumentMatch(
  matcher: Matcher,
  context: CodegenContext
): Promise<boolean> {
  const config = context.getConfig<Types.Config>();

  if (!config.documents) return false;

  const normalized = normalizeInstanceOrArray(config.documents);
  const documents = await context.loadDocuments(normalized);

  if (!documents.length) return false;

  const paths = documents
    .map(({ location = '' }) => location)
    .map(matcher.getRelativePath)
    .filter(Boolean);

  if (!paths.length) return false;

  return paths.some(matcher.match);
}
