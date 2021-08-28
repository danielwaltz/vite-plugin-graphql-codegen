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

  if (!documents) return false;

  for (const document of documents) {
    if (!document.location) break;
    const relativeDocumentPath = matcher.getRelativePath(document.location);
    return matcher.match(relativeDocumentPath);
  }

  return false;
}
