import { CodegenContext } from '@graphql-codegen/cli';
import { Types } from '@graphql-codegen/plugin-helpers';
import { Matcher } from './createMatcher';

export async function isGeneratedMatch(
  matcher: Matcher,
  context: CodegenContext
): Promise<boolean> {
  const config = context.getConfig<Types.Config>();

  const generates = Object.entries(config.generates);

  if (!generates.length) return false;

  for (const [genPath, genConfig] of generates) {
    const { preset = '', presetConfig } = genConfig;
    const isNearOperationFilePreset = preset === 'near-operation-file';
    const presetExt = presetConfig?.extension ?? '.generated.ts';
    if (isNearOperationFilePreset) return matcher.match(`**/*${presetExt}`);

    return matcher.match(genPath);
  }

  return false;
}
