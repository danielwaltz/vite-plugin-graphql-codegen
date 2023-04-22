import { afterEach, describe, expect, it } from 'vitest';
import { createServer, UserConfig } from 'vite';
import { promises as fs } from 'fs';
import codegen from '../../src/index';

const TEST_PATH = './test/codegen-config-file' as const;
const OUTPUT_PATH = `${TEST_PATH}/generated` as const;
const OUTPUT_FILE = `${OUTPUT_PATH}/graphql.ts` as const;

const viteConfig = {
  plugins: [
    codegen({
      configFilePathOverride: `${TEST_PATH}/codegen.yml`,
    }),
  ],
} satisfies UserConfig;

describe('codegen-config-file', () => {
  afterEach(async () => {
    await fs.rm(OUTPUT_PATH, { recursive: true });
  });

  it('generates', async () => {
    await createServer(viteConfig).then((server) => server.listen());

    const file = await fs.readFile(OUTPUT_FILE, 'utf-8');

    expect(file).toMatchSnapshot();
  });
});
