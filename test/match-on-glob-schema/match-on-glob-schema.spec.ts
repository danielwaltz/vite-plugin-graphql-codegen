import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { createServer, UserConfig, ViteDevServer } from 'vite';
import { promises as fs } from 'node:fs';
import codegen from '../../src/index';

const TEST_PATH = './test/match-on-glob-schema' as const;
const DIR_PATH_1 = `${TEST_PATH}/dir-1` as const;
const DIR_PATH_2 = `${TEST_PATH}/dir-2` as const;
const SCHEMA_PATH_1 = `${DIR_PATH_1}/schema-1.graphql` as const;
const SCHEMA_PATH_2 = `${DIR_PATH_1}/schema-2.graphql` as const;
const SCHEMA_PATH_3 = `${DIR_PATH_2}/schema-1.graphql` as const;
const SCHEMA_PATH_4 = `${DIR_PATH_2}/schema-2.graphql` as const;
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

describe('match-on-glob-schema', () => {
  let viteServer: ViteDevServer | null = null;

  const isFileGenerated = async (): Promise<boolean> => {
    try {
      await fs.access(OUTPUT_FILE);
      return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    // Files in dir1
    await fs.mkdir(DIR_PATH_1, { recursive: true });
    await fs.writeFile(SCHEMA_PATH_1, 'type Query { foo: String }');
    await fs.writeFile(SCHEMA_PATH_2, 'type Query { bar: String }');

    // Files in dir2
    await fs.mkdir(DIR_PATH_2, { recursive: true });
    await fs.writeFile(SCHEMA_PATH_3, 'type Query { baz: String }');
    await fs.writeFile(SCHEMA_PATH_4, 'type Query { qux: String }');

    await fs.mkdir(DOCUMENT_PATH, { recursive: true });
    await fs.writeFile(`${DOCUMENT_PATH}/Foo.graphql`, 'query Foo { foo }');
    viteServer = await createServer(viteConfig).then((s) => s.listen());
  });

  afterAll(async () => {
    await viteServer?.close();
    viteServer = null;
    await fs.rm(DIR_PATH_1, { recursive: true });
    await fs.rm(DIR_PATH_2, { recursive: true });

    await fs.rm(DOCUMENT_PATH, { recursive: true });
  });

  afterEach(async () => {
    await fs.rm(OUTPUT_PATH, { recursive: true });
  });

  it('generates on schema change', async () => {
    // Files in dir1
    await fs.writeFile(SCHEMA_PATH_1, 'type Query { foo: Int }');
    await fs.writeFile(SCHEMA_PATH_2, 'type Query { bar: Int }');

    // Files in dir2
    await fs.writeFile(SCHEMA_PATH_3, 'type Query { baz: Int }');
    await fs.writeFile(SCHEMA_PATH_4, 'type Query { qux: Int }');

    await isFileGenerated();

    const file = await fs.readFile(OUTPUT_FILE, 'utf-8');

    expect(file).toMatchSnapshot();
  });
});
