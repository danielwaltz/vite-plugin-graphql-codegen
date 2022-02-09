export function debugLog(...args: any[]) {
  const LOG_PREFIX = '\x1b[36m[vite-plugin-graphql-codegen]\x1b[0m' as const;
  console.log(LOG_PREFIX, ...args);
}
