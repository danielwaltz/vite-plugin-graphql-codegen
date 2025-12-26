import { promises as fs } from "node:fs";
import { createServer, type UserConfig, type ViteDevServer } from "vite";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import codegen, { type Options } from "../../src/index";
import type { CodegenConfig } from "@graphql-codegen/cli";

const TEST_PATH = "./test/inline-config" as const;
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
      plugins: ["typescript", "typescript-operations"],
    },
  },
} satisfies CodegenConfig;

const pluginConfig = {
  config: codegenConfig,
} satisfies Options;

const viteConfig = {
  root: import.meta.dirname,
  plugins: [codegen(pluginConfig)],
} satisfies UserConfig;

describe("inline-config", () => {
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

  it("generates", async () => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const file = await fs.readFile(OUTPUT_FILE, "utf8");

    expect(file).toMatchSnapshot();
  });
});
