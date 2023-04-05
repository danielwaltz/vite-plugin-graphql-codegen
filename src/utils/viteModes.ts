import { ConfigEnv } from 'vite';

export type ViteMode = ConfigEnv['command'];

const modes = {
  serve: 'serve',
  build: 'build',
} as const satisfies { [K in ViteMode]: K };

export const isServeMode = (mode: ViteMode): mode is typeof modes.serve =>
  mode === modes.serve;

export const isBuildMode = (mode: ViteMode): mode is typeof modes.build =>
  mode === modes.build;
