import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { createServer, UserConfig, ViteDevServer } from 'vite';
import { promises as fs } from 'node:fs';
import codegen from '../../src/index';

const TEST_PATH = './test/main' as const;
const DOCUMENT_PATH = `${TEST_PATH}/graphql` as const;
const OUTPUT_PATH = `${TEST_PATH}/generated` as const;
const OUTPUT_FILE_NAME = 'graphql.ts' as const;
const OUTPUT_FILE = `${OUTPUT_PATH}/${OUTPUT_FILE_NAME}` as const;

const viteConfig = {
  plugins: [
    codegen({
      configFilePathOverride: `${TEST_PATH}/codegen.yml`,
    }),
  ],
} satisfies UserConfig;

describe('main', () => {
  let viteServer: ViteDevServer | null = null;

  const fileGenerated = () => {
    return new Promise<void>((resolve, reject) => {
      viteServer?.watcher.on('add', (path: string) => {
        if (path.includes(OUTPUT_FILE_NAME)) resolve();
      });

      setTimeout(() => reject('Generated file not found'), 2000);
    });
  };

  beforeAll(async () => {
    await fs.mkdir(DOCUMENT_PATH, { recursive: true });
    await fs.writeFile(`${DOCUMENT_PATH}/Foo.graphql`, 'query Foo { foo }');
    viteServer = await createServer(viteConfig).then((s) => s.listen());
  });

  afterAll(async () => {
    await viteServer?.close();
    viteServer = null;
    await fs.rm(DOCUMENT_PATH, { recursive: true });
  });

  afterEach(async () => {
    await fs.rm(OUTPUT_PATH, { recursive: true });
  });

  it('generates on server start', async () => {
    const file = await fs.readFile(OUTPUT_FILE, 'utf-8');

    expect(file).toMatchSnapshot();
  });

  it('generates on file add', async () => {
    const documentPath = `${DOCUMENT_PATH}/Bar.graphql`;

    await fs.writeFile(documentPath, 'query Bar { bar }');

    await fileGenerated();

    const file = await fs.readFile(OUTPUT_FILE, 'utf-8');

    expect(file).toMatchSnapshot();
  });

  it('generates on file change', async () => {
    const documentPath = `${DOCUMENT_PATH}/Foo.graphql`;

    await fs.writeFile(documentPath, 'query Foo { foo bar }');

    await fileGenerated();

    const file = await fs.readFile(OUTPUT_FILE, 'utf-8');

    expect(file).toMatchSnapshot();
  });
});
