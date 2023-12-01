/** @type {import('semantic-release').GlobalConfig} */
module.exports = {
  branches: ['main'],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'conventionalcommits',
        releaseRules: [
          {
            type: 'chore',
            scope: 'deps',
            release: 'patch',
          },
        ],
      },
    ],
    [
      '@semantic-release/release-notes-generator',
      {
        preset: 'conventionalcommits',
        presetConfig: {
          types: [
            {
              type: 'feat',
              section: 'Features',
              hidden: false,
            },
            {
              type: 'fix',
              section: 'Bug Fixes',
              hidden: false,
            },
            {
              type: 'perf',
              section: 'Performance Improvements',
              hidden: false,
            },
            {
              type: 'revert',
              section: 'Reverts',
              hidden: false,
            },
            {
              type: 'docs',
              section: 'Documentation',
              hidden: false,
            },
            {
              type: 'style',
              section: 'Styles',
              hidden: false,
            },
            {
              type: 'chore',
              section: 'Miscellaneous Chores',
              hidden: false,
            },
            {
              type: 'refactor',
              section: 'Code Refactoring',
              hidden: false,
            },
            {
              type: 'test',
              section: 'Tests',
              hidden: false,
            },
            {
              type: 'build',
              section: 'Build System',
              hidden: false,
            },
            {
              type: 'ci',
              section: 'Continuous Integration',
              hidden: false,
            },
          ],
        },
      },
    ],
    '@semantic-release/changelog',
    '@semantic-release/npm',
    '@semantic-release/git',
    '@semantic-release/github',
  ],
};
