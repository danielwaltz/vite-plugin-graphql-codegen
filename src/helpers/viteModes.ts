import { ConfigEnv } from 'vite';

export type ViteMode = ConfigEnv['command'];

const modes = {
  serve: 'serve',
  build: 'build',
} as { [K in ViteMode]: K };

export const isServeMode = (mode: ViteMode) => mode === modes.serve;

export const isBuildMode = (mode: ViteMode) => mode === modes.build;
