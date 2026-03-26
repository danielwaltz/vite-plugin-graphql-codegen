import { promises as fs } from "node:fs";
import { createServer, type UserConfig } from "vite";
import { afterEach, describe, expect, it, vi, type TestContext } from "vitest";
import codegen, { type Options, type SkipContext } from "../../src/index";

const codegenGenerateMock = vi.hoisted(() => vi.fn());
vi.mock("@graphql-codegen/cli", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@graphql-codegen/cli")>();

  return {
    ...actual,
    generate: codegenGenerateMock,
  };
});

const TEST_PATH = "./test/skip" as const;
const DOCUMENT_PATH = `${TEST_PATH}/graphql` as const;
const SCHEMA_FILE = `${TEST_PATH}/schema.graphql` as const;
const QUERY_FILE = `${DOCUMENT_PATH}/Foo.graphql` as const;
const OUTPUT_PATH = `${TEST_PATH}/generated` as const;
const OUTPUT_FILE = `${OUTPUT_PATH}/graphql.ts` as const;

const setupFiles = async () => {
  await fs.mkdir(DOCUMENT_PATH, { recursive: true });
  await fs.writeFile(
    SCHEMA_FILE,
    `
      type Query {
        foo: String
        bar: String
      }
    `,
  );
  await fs.writeFile(QUERY_FILE, "query Foo { foo }");
};

const updateQueryFile = async (content: string) => {
  await fs.writeFile(QUERY_FILE, content);
  await new Promise((resolve) => setTimeout(resolve, 200));
};

interface TestContextWithServer extends TestContext {
  viteServer: Awaited<ReturnType<typeof createServer>> | null;
}

const startServer = async (
  options: Options = {},
  context: TestContextWithServer,
) => {
  await setupFiles();

  const config = {
    root: import.meta.dirname,
    logLevel: "silent",
    server: {
      host: "127.0.0.1",
      port: 0,
      strictPort: false,
    },
    plugins: [
      codegen({
        config: {
          schema: SCHEMA_FILE,
          documents: `${DOCUMENT_PATH}/**/*.graphql`,
          generates: {
            [OUTPUT_FILE]: {
              plugins: ["typescript", "typescript-operations"],
            },
          },
        },
        ...options,
      }),
    ],
  } satisfies UserConfig;

  context.viteServer = await createServer(config).then((server) =>
    server.listen(),
  );

  // ensure the watcher is ready before proceeding with tests
  await vi.waitFor(() => {
    expect(
      context.viteServer?.watcher.listeners("change").length,
    ).toBeGreaterThan(1);
  });
};

describe("skip", () => {
  afterEach<TestContextWithServer>(async (context) => {
    codegenGenerateMock.mockReset();
    context.viteServer?.watcher.close();
    await context.viteServer?.close();
    context.viteServer = null;

    await fs.rm(SCHEMA_FILE, { force: true });
    await fs.rm(DOCUMENT_PATH, { recursive: true, force: true });
    await fs.rm(OUTPUT_PATH, { recursive: true, force: true });
  });

  describe("on server start", () => {
    it.for([
      {
        describe: "when skip is not set",
        skip: undefined,
      },
      {
        describe: "when skip is false",
        skip: false,
      },
      {
        describe: "when skip returns false by matching start trigger",
        skip: ({ trigger }: SkipContext) => trigger !== "start",
      },
      {
        describe: "when skip resolves false by matching start trigger",
        skip: ({ trigger }: SkipContext) =>
          Promise.resolve(trigger !== "start"),
      },
    ])("it should run codegen $describe", async ({ skip }, context) => {
      await startServer({ skip }, context as TestContextWithServer);

      expect(codegenGenerateMock).toHaveBeenCalledWith({
        pluginContext: {},
        schema: SCHEMA_FILE,
        documents: `${DOCUMENT_PATH}/**/*.graphql`,
        watch: false,
        generates: {
          [OUTPUT_FILE]: {
            plugins: ["typescript", "typescript-operations"],
          },
        },
      });
    });

    it.for([
      {
        describe: "when skip is true",
        skip: true,
      },
      {
        describe: "when skip returns true by matching start trigger",
        skip: ({ trigger }: SkipContext) => trigger === "start",
      },
      {
        describe: "when skip resolves true by matching start trigger",
        skip: ({ trigger }: SkipContext) =>
          Promise.resolve(trigger === "start"),
      },
    ])("it should skip codegen $describe", async ({ skip }, context) => {
      await startServer({ skip }, context as TestContextWithServer);

      expect(codegenGenerateMock).not.toHaveBeenCalled();
    });
  });

  describe("on watch triggered", () => {
    it.for([
      {
        describe: "when skip is not set",
        skip: undefined,
      },
      {
        describe: "when skip is false",
        skip: false,
      },
      {
        describe: "when skip returns false by matching watch trigger",
        skip: ({ trigger }: SkipContext) => trigger !== "watch",
      },
      {
        describe: "when skip resolves false by matching watch trigger",
        skip: ({ trigger }: SkipContext) =>
          Promise.resolve(trigger !== "watch"),
      },
      {
        describe: "when skip resolves false by matching filePath",
        skip: async ({ filePath }: SkipContext) =>
          filePath !== (await fs.realpath(QUERY_FILE)),
      },
    ])("it should run codegen $describe", async ({ skip }, context) => {
      await startServer(
        { skip, enableWatcher: true },
        context as TestContextWithServer,
      );
      codegenGenerateMock.mockReset();

      await updateQueryFile("query Foo { foo bar }");

      expect(codegenGenerateMock).toHaveBeenCalledWith({
        pluginContext: {},
        schema: SCHEMA_FILE,
        documents: `${DOCUMENT_PATH}/**/*.graphql`,
        watch: false,
        generates: {
          [OUTPUT_FILE]: {
            plugins: ["typescript", "typescript-operations"],
          },
        },
      });
    });

    it.for([
      {
        describe: "when skip is true",
        skip: true,
      },
      {
        describe: "when skip returns true by matching watch trigger",
        skip: ({ trigger }: SkipContext) => trigger === "watch",
      },
      {
        describe: "when skip resolves true by matching watch trigger",
        skip: ({ trigger }: SkipContext) =>
          Promise.resolve(trigger === "watch"),
      },
      {
        describe: "when skip resolves true by matching filePath",
        skip: async ({ filePath }: SkipContext) =>
          filePath === (await fs.realpath(QUERY_FILE)),
      },
    ])("it should skip codegen $describe", async ({ skip }, context) => {
      await startServer(
        { skip, enableWatcher: true },
        context as TestContextWithServer,
      );
      codegenGenerateMock.mockReset();

      await updateQueryFile("query Foo { foo bar }");

      expect(codegenGenerateMock).not.toHaveBeenCalled();
    });
  });
});
