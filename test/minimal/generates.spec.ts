import { afterEach, describe, expect, it } from 'vitest';
import { createServer, UserConfig } from 'vite';
import { promises as fs } from 'fs';
import codegen, { type Options } from '../../src/index';
import type { CodegenConfig } from '@graphql-codegen/cli';

const OUTPUT_PATH = './test/minimal/generated';
const OUTPUT_FILE = `${OUTPUT_PATH}/graphql.ts`;

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
  afterEach(async () => {
    await fs.rm(OUTPUT_PATH, { recursive: true });
  });

  it('generates', async () => {
    await createServer(viteConfig).then((server) => server.listen());

    const file = await fs.readFile(OUTPUT_FILE, 'utf-8');

    expect(file).toMatchSnapshot();
  });
});
