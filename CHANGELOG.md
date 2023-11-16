### [3.3.2](https://github.com/danielwaltz/vite-plugin-graphql-codegen/compare/v3.3.1...v3.3.2) (2023-11-16)


### Bug Fixes

* add vite 5 as supported peer and update deps ([f2000e5](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/f2000e5ada65fadaf4bc0c96509d4aff7234efb3))

### [3.3.1](https://github.com/danielwaltz/vite-plugin-graphql-codegen/compare/v3.3.0...v3.3.1) (2023-09-15)


### Bug Fixes

* match on relative document paths ([ff11873](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/ff118734567f0ae2cf55132bd030cad682a6a959)), closes [#23](https://github.com/danielwaltz/vite-plugin-graphql-codegen/issues/23)

## [3.3.0](https://github.com/danielwaltz/vite-plugin-graphql-codegen/compare/v3.2.5...v3.3.0) (2023-08-19)


### Features

* run schema and document checks at the same time ([aa8c92c](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/aa8c92cd3a8236a06a2870472ab3fe3167b2a2f9)), closes [#21](https://github.com/danielwaltz/vite-plugin-graphql-codegen/issues/21)

### [3.2.5](https://github.com/danielwaltz/vite-plugin-graphql-codegen/compare/v3.2.4...v3.2.5) (2023-08-18)


### Bug Fixes

* add `@graphql-codegen/plugin-helpers` to dependencies ([e58be01](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/e58be018b1c6dff8a4cfd73770d20d630ed0873b)), closes [#22](https://github.com/danielwaltz/vite-plugin-graphql-codegen/issues/22)

### [3.2.4](https://github.com/danielwaltz/vite-plugin-graphql-codegen/compare/v3.2.3...v3.2.4) (2023-08-14)


### Bug Fixes

* fix matching on schema changes ([43ee458](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/43ee4582aa2c551c36c092baf777da9c70629e99)), closes [#21](https://github.com/danielwaltz/vite-plugin-graphql-codegen/issues/21)

### [3.2.3](https://github.com/danielwaltz/vite-plugin-graphql-codegen/compare/v3.2.2...v3.2.3) (2023-07-25)


### Bug Fixes

* add v5.0.0 to codegen cli peer deps definition ([c67977e](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/c67977e814ad1e140347f2bc729c219778a129f1))

## [3.2.2](https://github.com/danielwaltz/vite-plugin-graphql-codegen/compare/v3.2.1...v3.2.2) (2023-05-25)


### Bug Fixes

* add @graphql-codegen/cli@^4.0.0 as peer dependency ([fba8d5a](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/fba8d5a144cba26efc10b7ddf674863c722feb76))

## [3.2.1](https://github.com/danielwaltz/vite-plugin-graphql-codegen/compare/v3.2.0...v3.2.1) (2023-04-26)


### Bug Fixes

* fix watching schema while also watching documents ([8cd00ea](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/8cd00ea43479fb02a4640ecc07afdeb35a88f307))

# [3.2.0](https://github.com/danielwaltz/vite-plugin-graphql-codegen/compare/v3.1.0...v3.2.0) (2023-04-05)


### Features

* add options for error throwing on server start or build ([4654dde](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/4654dde1606520c94b86a404fc2fb291c850b9a7)), closes [#15](https://github.com/danielwaltz/vite-plugin-graphql-codegen/issues/15)

# [3.1.0](https://github.com/danielwaltz/vite-plugin-graphql-codegen/compare/v3.0.1...v3.1.0) (2023-02-04)


### Bug Fixes

* add missing babel peer dep ([f01765d](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/f01765df9c6c3851db18b25c71a6d788f9dfe24c))


### Features

* support graphql codegen v3.0.0 ([9b8cea4](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/9b8cea4786f229eb7c0255293735894564aa714b))

## [3.0.1](https://github.com/danielwaltz/vite-plugin-graphql-codegen/compare/v3.0.0...v3.0.1) (2022-12-12)


### Bug Fixes

* fix plugin type issue ([7cb46b7](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/7cb46b709cfa15fc3ca8e241b83228d67ee9c78c))

# [3.0.0](https://github.com/danielwaltz/vite-plugin-graphql-codegen/compare/v2.3.1...v3.0.0) (2022-12-09)


* feat!: support vite 4 ([6ad94c6](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/6ad94c65833b65c323739b70584895bcea5c67a7))


### BREAKING CHANGES

* requires using vite 4 due to plugin type incompatibility

## [2.3.1](https://github.com/danielwaltz/vite-plugin-graphql-codegen/compare/v2.3.0...v2.3.1) (2022-10-14)


### Bug Fixes

* skip codegen config file check if filepath is not defined ([4b89289](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/4b8928963e9725951b55a3f6c617b2318a21b108)), closes [#13](https://github.com/danielwaltz/vite-plugin-graphql-codegen/issues/13)

# [2.3.0](https://github.com/danielwaltz/vite-plugin-graphql-codegen/compare/v2.2.1...v2.3.0) (2022-08-26)


### Features

* add option for enabling matching on schemas ([e4b57f1](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/e4b57f15d8d9140f0a05705f3f1cfe3fd1c927bd))

## [2.2.1](https://github.com/danielwaltz/vite-plugin-graphql-codegen/compare/v2.2.0...v2.2.1) (2022-08-25)


### Bug Fixes

* removes module export ([1872545](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/18725450c9cdcc990e0af3de5e9e1046087d3a08))

# [2.2.0](https://github.com/danielwaltz/vite-plugin-graphql-codegen/compare/v2.1.1...v2.2.0) (2022-08-25)


### Features

* make commonjs the default with esm definitions ([df9e437](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/df9e4374bf318ff4b9beddd76e0271820de3078d))

## [2.1.1](https://github.com/danielwaltz/vite-plugin-graphql-codegen/compare/v2.1.0...v2.1.1) (2022-08-25)


### Bug Fixes

* fix package exports path ([d519d15](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/d519d156f999613a3b128ee68270fb9ee880994e))

# [2.1.0](https://github.com/danielwaltz/vite-plugin-graphql-codegen/compare/v2.0.1...v2.1.0) (2022-08-25)


### Bug Fixes

* Changes package.json to module ([386a875](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/386a875c4703f0c32daf139365567ae1d071e32a))


### Features

* Adds schema to the isGraphQLDocument check ([76ae403](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/76ae403afe58e02f315aa4141af7c93d44a75032))

## [2.0.1](https://github.com/danielwaltz/vite-plugin-graphql-codegen/compare/v2.0.0...v2.0.1) (2022-08-24)


### Bug Fixes

* add default export for commonjs ([c93263f](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/c93263f118a249f8fc9f3f9bb0ea3d4bf02d2e0e)), closes [#4](https://github.com/danielwaltz/vite-plugin-graphql-codegen/issues/4)
* remove gap in debug log output ([a75a820](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/a75a820e1daa376396466b1618085fdf047f7d87))

# [2.0.0](https://github.com/danielwaltz/vite-plugin-graphql-codegen/compare/v1.8.3...v2.0.0) (2022-08-11)


### Features

* update debug log output to match vite 3 ([c33bba7](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/c33bba7e351ecb1fc09f015e949d539b3c804f26))
* use vite dev server restart function ([b413156](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/b4131565f28a785a460b1c19385e9cd41d1252fb))


### BREAKING CHANGES

* Requires vite version 2.7 or greater

## [1.8.3](https://github.com/danielwaltz/vite-plugin-graphql-codegen/compare/v1.8.2...v1.8.3) (2022-08-11)


### Bug Fixes

* switch to npm and refresh packages ([be95d72](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/be95d72e51c7eb907bab31ed08671ad0ac451c9c))

## [1.8.2](https://github.com/danielwaltz/vite-plugin-graphql-codegen/compare/v1.8.1...v1.8.2) (2022-08-11)


### Bug Fixes

* configure semantic release to release dist ([cfc1954](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/cfc195413cfedf4e06ebcf0a84590d3e2610e27e))

## [1.8.1](https://github.com/danielwaltz/vite-plugin-graphql-codegen/compare/v1.8.0...v1.8.1) (2022-08-10)


### Bug Fixes

* normalize file paths before comparisons ([b855f0a](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/b855f0a886505ef801dae6c05c258ea58e4e2a90))

# [1.8.0](https://github.com/danielwaltz/vite-plugin-graphql-codegen/compare/v1.7.0...v1.8.0) (2022-07-13)


### Features

* support vite 3 ([c881720](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/c88172034685037a2d9dc2afc1ccbaa4fa03f621))

# [1.7.0](https://github.com/danielwaltz/vite-plugin-graphql-codegen/compare/v1.6.0...v1.7.0) (2022-06-10)


### Features

* support overriding config in certain modes ([97fce30](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/97fce30fc87fdc388ce008d47760c773ba602990))

# [1.6.0](https://github.com/danielwaltz/vite-plugin-graphql-codegen/compare/v1.5.2...v1.6.0) (2022-03-18)


### Features

* Support passing manual codegen config ([e86079b](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/e86079bce751acfa8e5b1b0f3565a7cc3f4b2514)), closes [#3](https://github.com/danielwaltz/vite-plugin-graphql-codegen/issues/3)

## [1.5.2](https://github.com/danielwaltz/vite-plugin-graphql-codegen/compare/v1.5.1...v1.5.2) (2022-02-23)


### Bug Fixes

* Make graphql a dev dependency ([e88edb1](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/e88edb11a4042c5637c36493633e806e9f5ee919))

## [1.5.1](https://github.com/danielwaltz/vite-plugin-graphql-codegen/compare/v1.5.0...v1.5.1) (2022-02-23)


### Bug Fixes

* Fix graphql dependency ([aeb9b59](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/aeb9b59da2e83822a71d0f827d0219eeedd295f8))

# [1.5.0](https://github.com/danielwaltz/vite-plugin-graphql-codegen/compare/v1.4.0...v1.5.0) (2022-02-10)


### Features

* Add option to override codegen config file path ([ddf9c54](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/ddf9c5402c4d626d2e1761cd98d692c6cbda5efe)), closes [#1](https://github.com/danielwaltz/vite-plugin-graphql-codegen/issues/1)

# [1.4.0](https://github.com/danielwaltz/vite-plugin-graphql-codegen/compare/v1.3.0...v1.4.0) (2022-02-09)


### Features

* Add a debug option to aid in troubleshooting ([092398d](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/092398db4e4a35eefc03f564f35ceb9cc7e8ffa8))

# [1.3.0](https://github.com/danielwaltz/vite-plugin-graphql-codegen/compare/v1.2.0...v1.3.0) (2022-02-01)


### Features

* Support disabling codegen in certain modes ([9c546a7](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/9c546a799664df7877e980b3daf8353d8498fd9a))
* Support overwriting codegen config options ([4224cec](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/4224cec993f6f7a9ca76dff4a677b9c42bb8586d))

# [1.2.0](https://github.com/danielwaltz/vite-plugin-graphql-codegen/compare/v1.1.1...v1.2.0) (2022-02-01)


### Features

* Restart vite when codegen config file changes ([24b0d0e](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/24b0d0e6e4b1d22f40a79fd6b9e6fa5c223feba7))

## [1.1.1](https://github.com/danielwaltz/vite-plugin-graphql-codegen/compare/v1.1.0...v1.1.1) (2021-08-28)


### Bug Fixes

* Add fallback extension to preset config ([7e6b862](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/7e6b86298640a37522c85a3d36eca8d72cab516a))
* Make documents matcher work with multiple files ([a047a37](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/a047a3782e735eb769fc58d9e4ef7c551d338b23))

# [1.1.0](https://github.com/danielwaltz/vite-plugin-graphql-codegen/compare/v1.0.1...v1.1.0) (2021-08-28)


### Features

* Add support for near operation file preset ([18b1227](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/18b12279629e3874edd3c691bfdede73a0a60ca4))

## [1.0.1](https://github.com/danielwaltz/vite-plugin-graphql-codegen/compare/v1.0.0...v1.0.1) (2021-08-28)


### Bug Fixes

* Add try catch on generate to keep vite running ([94e4a9b](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/94e4a9b68460a2f3517310545b695d22ad5ad81f))
