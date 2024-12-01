import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { createServer, UserConfig, ViteDevServer } from 'vite';
import { promises as fs } from 'node:fs';
import codegen from '../../src/index';

const TEST_PATH = './test/graphql-config-file' as const;
const OUTPUT_PATH = `${TEST_PATH}/generated` as const;
const OUTPUT_FILE = `${OUTPUT_PATH}/graphql.ts` as const;

const viteConfig = {
  plugins: [
    codegen({
      configFilePathOverride: `${TEST_PATH}/graphql.config.yml`,
    }),
  ],
} satisfies UserConfig;

describe('graphql-config-file', () => {
  let viteServer: ViteDevServer | null = null;

  beforeAll(async () => {
    viteServer = await createServer(viteConfig).then((s) => s.listen());
  });

  afterAll(async () => {
    await viteServer?.close();
    viteServer = null;
  });

  afterEach(async () => {
    await fs.rm(OUTPUT_PATH, { recursive: true });
  });

  it('generates', async () => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const file = await fs.readFile(OUTPUT_FILE, 'utf-8');

    expect(file).toMatchSnapshot();
  });
});
