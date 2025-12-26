import { normalizePath } from "vite";
import { getDocumentPaths, getSchemaPaths } from "./configPaths";
import type { Options } from "..";
import type { CodegenContext } from "@graphql-codegen/cli";

export function createMatchCache(
  context: CodegenContext,
  options: Pick<Required<Options>, "matchOnDocuments" | "matchOnSchemas">,
) {
  const cache = new Set<string>();

  const refresh = async () => {
    const matchers = [] as Promise<string[]>[];
    if (options.matchOnDocuments) matchers.push(getDocumentPaths(context));
    if (options.matchOnSchemas) matchers.push(getSchemaPaths(context));

    const results = await Promise.all(matchers);

    const entries = results.flat().map(normalizePath);

    cache.clear();

    for (const entry of entries) {
      cache.add(entry);
    }
  };

  return {
    init: refresh,
    refresh,
    has: (filePath: string) => cache.has(normalizePath(filePath)),
    entries: () => Array.from(cache),
  };
}
