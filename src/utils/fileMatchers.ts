import { normalizePath } from 'vite';

export const isCodegenConfig = (filePath: string, configPath?: string) => {
  if (!configPath) return false;

  return normalizePath(filePath) === normalizePath(configPath);
};

export const isFileMatched = (filePath: string, lookupPaths: string[]) => {
  if (!lookupPaths.length) return false;

  const normalizedFilePath = normalizePath(filePath);

  return lookupPaths.includes(normalizedFilePath);
};
