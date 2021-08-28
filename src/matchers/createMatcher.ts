import { ResolvedConfig } from 'vite';
import minimatch from 'minimatch';

export type Matcher = ReturnType<typeof createMatcher>;

export default function createMatcher(
  absolutePath: string,
  config: ResolvedConfig
) {
  const getRelativePath = (path: string) => {
    return path.split(`${config.root}/`).slice(-1)[0];
  };

  const relativePath = getRelativePath(absolutePath);

  const match = (pattern: string) => {
    return minimatch(relativePath, pattern);
  };

  return { match, getRelativePath } as const;
}
