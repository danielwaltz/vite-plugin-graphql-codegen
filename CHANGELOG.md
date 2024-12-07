## [3.4.3](https://github.com/danielwaltz/vite-plugin-graphql-codegen/compare/v3.4.2...v3.4.3) (2024-12-07)

### Bug Fixes

* remove vite and codegen cli from deps to rely on peer deps ([40e8c56](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/40e8c560486638330967f809b64616318ae877d4))

### Miscellaneous Chores

* add full git url to package file ([33c53b3](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/33c53b30cf5fe0fd7a0e82eab7047be2ab8cb4e8))
* add vite and codegen cli as dev deps ([8104f38](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/8104f38ee8e392c33761ef8692df7e64b6a849c5))
* migrate to flat eslint config ([7676e68](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/7676e682ed4e1fbe252c5324c5f11340892b4bf0))
* update deps and format ([66dd33f](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/66dd33f1a67638a1fb10be4d49e13948e2575c8a))

### [3.4.2](https://github.com/danielwaltz/vite-plugin-graphql-codegen/compare/v3.4.1...v3.4.2) (2024-12-01)


### Bug Fixes

* **deps:** update dep versions to be more loose ([c807514](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/c8075147f366825a85d677d477ba3d2ea3a1cdb7))

### [3.4.1](https://github.com/danielwaltz/vite-plugin-graphql-codegen/compare/v3.4.0...v3.4.1) (2024-12-01)


### Performance Improvements

* load and cache matches on server start ([69c1d97](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/69c1d97cc7a6df321276b6445145482a28efd8dd)), closes [#32](https://github.com/danielwaltz/vite-plugin-graphql-codegen/issues/32) [#27](https://github.com/danielwaltz/vite-plugin-graphql-codegen/issues/27)
* skip match cache refresh if file is generated ([c0737a7](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/c0737a7aab210b227f5395c2b0b04873262cf3bf))


### Tests

* scope vite instances to spec directories ([90d771f](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/90d771f9ca032850eb21060a18f403dd6d3b63f4))


### Miscellaneous Chores

* **deps:** update deps ([43ed87b](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/43ed87b78c08edda73962b423fa73794c999be54))
* **deps:** use vite 6 ([64c89c9](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/64c89c9244c55c1c302e45c1370d902dc79bfb4a))
* update dev deps ([2de28d2](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/2de28d2742ce1cc08aeff0b560b0d2d57c82083d))

## [3.4.0](https://github.com/danielwaltz/vite-plugin-graphql-codegen/compare/v3.3.8...v3.4.0) (2024-11-23)


### Features

* support glob paths in schema ([#33](https://github.com/danielwaltz/vite-plugin-graphql-codegen/issues/33)) ([2efef2e](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/2efef2e059537af77d753151b033faf6c4a80248)), closes [#34](https://github.com/danielwaltz/vite-plugin-graphql-codegen/issues/34)


### Continuous Integration

* update github action versions ([0c656ab](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/0c656ab6628f956f1a90e3fa706cf290e5f7fa4f))


### Miscellaneous Chores

* update node to `v22.11.0` lts ([d941f32](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/d941f32866db4d0beec22d6ebe1eccecc15f300a))
* use `.node-version` file ([863a61a](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/863a61a4eacedd9229102810235a521284cbb642))

### [3.3.8](https://github.com/danielwaltz/vite-plugin-graphql-codegen/compare/v3.3.7...v3.3.8) (2024-06-12)


### Bug Fixes

* watch documents and schemas from nested config ([5f8f08d](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/5f8f08d4b64fe53db9ce485695bb108f27db8cc6))


### Miscellaneous Chores

* normalize schema file path ([39f1361](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/39f136140018175357eec47ef7846b12103d95af))

### [3.3.7](https://github.com/danielwaltz/vite-plugin-graphql-codegen/compare/v3.3.6...v3.3.7) (2024-06-01)


### Bug Fixes

* prepare for vite v6 release ([b49c508](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/b49c5080006c7df2cef9a3505dc74793aaadcadd))


### Miscellaneous Chores

* **deps:** refresh lockfile and dedupe deps ([005f81e](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/005f81e77c7cfdcc9e86faec86b06d795280f5e8))
* **deps:** update deps ([6c75534](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/6c755349932a9de4c4cb1f905abc637b77686153))
* update node to `20.12.1` ([4271cfb](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/4271cfb9f84845035f4bedb1da9d31b5487d0302))

### [3.3.6](https://github.com/danielwaltz/vite-plugin-graphql-codegen/compare/v3.3.5...v3.3.6) (2024-01-02)


### Miscellaneous Chores

* **deps:** update deps ([063408b](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/063408bfd0ef94d5d9db0d35e5555ab1f9bc4a53)), closes [#28](https://github.com/danielwaltz/vite-plugin-graphql-codegen/issues/28)
* explicitly add semantic release plugins as deps ([6da889b](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/6da889b468d1f4867e4fb2d1a68347a4f4c9fd31))
* update node to `v20.10.0` and use dedicated release config ([9ccbd00](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/9ccbd0041dd96dc6d61b44bd7002723169a3b267))

### [3.3.5](https://github.com/danielwaltz/vite-plugin-graphql-codegen/compare/v3.3.4...v3.3.5) (2023-11-27)


### Bug Fixes

* migrate to unbuild and fix default export issues in commonjs ([24914a2](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/24914a2801faa9de81dd66e8e86aa8f54b8a877b))

### [3.3.4](https://github.com/danielwaltz/vite-plugin-graphql-codegen/compare/v3.3.3...v3.3.4) (2023-11-27)


### Bug Fixes

* support esm ([951c1bb](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/951c1bbca24da07df898c566cb810bab6b1ae222))

### [3.3.3](https://github.com/danielwaltz/vite-plugin-graphql-codegen/compare/v3.3.2...v3.3.3) (2023-11-17)


### Bug Fixes

* broaden allowed vite dependency versions ([3b2bf38](https://github.com/danielwaltz/vite-plugin-graphql-codegen/commit/3b2bf38f8fb29541eafca39fa87ed462497a2986))

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
