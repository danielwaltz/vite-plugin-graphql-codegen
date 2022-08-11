import { normalize } from 'node:path';
import { CodegenContext } from '@graphql-codegen/cli';

export function isCodegenConfig(
  filePath: string,
  context: CodegenContext,
): boolean {
  return normalize(context.filepath) === normalize(filePath);
}
