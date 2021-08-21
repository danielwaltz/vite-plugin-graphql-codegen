import plugin from '../src';

describe('graphql codegen plugin', () => {
  it('has correct name', () => {
    expect(plugin().name).toEqual('graphql-codegen');
  });
});
