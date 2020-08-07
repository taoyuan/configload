export const samples = ['yml', 'yaml', 'json', 'json5', 'toml', 'js'].map(
  type => ({
    file: `foo.${type}`,
    content: {
      [type]: {
        foo: 'bar',
      },
    },
  }),
);
