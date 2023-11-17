import type { ConfigEnv } from 'vite';

export type ViteMode = ConfigEnv['command'];

const modes = {
  serve: 'serve',
  build: 'build',
} as { [K in ViteMode]: K };

const { serve, build } = modes;

export function isServeMode(mode: ViteMode): mode is typeof serve {
  return mode === serve;
}

export function isBuildMode(mode: ViteMode): mode is typeof build {
  return mode === build;
}
