import { CodegenContext } from '@graphql-codegen/cli';

export function isCodegenConfig(
  filePath: string,
  context: CodegenContext,
): boolean {
  const configPath = context.filepath;
  return configPath === filePath;
}
