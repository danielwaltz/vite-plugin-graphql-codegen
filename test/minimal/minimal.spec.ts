import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { createServer, UserConfig, ViteDevServer } from 'vite';
import { promises as fs } from 'fs';
import codegen, { type Options } from '../../src/index';
import type { CodegenConfig } from '@graphql-codegen/cli';

const TEST_PATH = './test/minimal' as const;
const OUTPUT_PATH = `${TEST_PATH}/generated` as const;
const OUTPUT_FILE = `${OUTPUT_PATH}/graphql.ts` as const;

const codegenConfig = {
  schema: `
    type Query {
      foo: String
    }
  `,
  documents: `
    query Foo {
      foo
    }
  `,
  generates: {
    [OUTPUT_FILE]: {
      plugins: ['typescript', 'typescript-operations'],
    },
  },
} satisfies CodegenConfig;

const pluginConfig = {
  config: codegenConfig,
} satisfies Options;

const viteConfig = {
  plugins: [codegen(pluginConfig)],
} satisfies UserConfig;

describe('minimal', () => {
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
    const file = await fs.readFile(OUTPUT_FILE, 'utf-8');

    expect(file).toMatchSnapshot();
  });
});
