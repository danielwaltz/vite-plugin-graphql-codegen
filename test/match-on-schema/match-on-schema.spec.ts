import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { createServer, UserConfig, ViteDevServer } from 'vite';
import { promises as fs } from 'node:fs';
import codegen from '../../src/index';

const TEST_PATH = './test/match-on-schema' as const;
const SCHEMA_PATH = `${TEST_PATH}/schema.graphql` as const;
const DOCUMENT_PATH = `${TEST_PATH}/graphql` as const;
const OUTPUT_PATH = `${TEST_PATH}/generated` as const;
const OUTPUT_FILE_NAME = 'graphql.ts' as const;
const OUTPUT_FILE = `${OUTPUT_PATH}/${OUTPUT_FILE_NAME}` as const;

const viteConfig = {
  plugins: [
    codegen({
      runOnStart: false,
      matchOnDocuments: false,
      matchOnSchemas: true,
      configFilePathOverride: `${TEST_PATH}/codegen.yml`,
    }),
  ],
} satisfies UserConfig;

describe('match-on-schema', () => {
  let viteServer: ViteDevServer | null = null;

  const isFileGenerated = async (): Promise<boolean> => {
    try {
      await fs.access(OUTPUT_FILE);
      return true;
    } catch (error) {
      // ignore
    }

    return new Promise((resolve, reject) => {
      if (!viteServer) reject('Vite server not started');

      viteServer?.watcher.on('add', (path: string) => {
        if (path.includes(OUTPUT_FILE_NAME)) resolve(true);
      });

      setTimeout(() => reject('Generated file not found'), 5000);
    });
  };

  beforeAll(async () => {
    await fs.writeFile(SCHEMA_PATH, 'type Query { foo: String }');
    await fs.mkdir(DOCUMENT_PATH, { recursive: true });
    await fs.writeFile(`${DOCUMENT_PATH}/Foo.graphql`, 'query Foo { foo }');
    viteServer = await createServer(viteConfig).then((s) => s.listen());
  });

  afterAll(async () => {
    await viteServer?.close();
    viteServer = null;
    await fs.rm(SCHEMA_PATH, { recursive: true });
    await fs.rm(DOCUMENT_PATH, { recursive: true });
  });

  afterEach(async () => {
    await fs.rm(OUTPUT_PATH, { recursive: true });
  });

  it('generates on schema change', async () => {
    await fs.writeFile(SCHEMA_PATH, 'type Query { foo: String bar: Int }');

    await isFileGenerated();

    const file = await fs.readFile(OUTPUT_FILE, 'utf-8');

    expect(file).toMatchSnapshot();
  });
});
