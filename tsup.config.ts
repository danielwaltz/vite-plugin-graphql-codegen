import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  dts: true,
  sourcemap: true,
  clean: true,
  skipNodeModulesBundle: true,
  esbuildOptions: (options) => {
    options.footer = {
      // This will ensure the plugin can be written as a modern ECMA module
      // while still publishing as CommonJS
      // https://github.com/egoist/tsup/issues/572#issuecomment-1060599574
      js: 'module.exports = module.exports.default;',
    };
  },
});
