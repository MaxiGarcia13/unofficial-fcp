import antfu from '@antfu/eslint-config';

export default antfu({
  vue: false,
  astro: true,
  typescript: true,

  stylistic: {
    indent: 2,
    semi: true,
    quotes: 'single',
  },

  rules: {
    'style/brace-style': ['error', '1tbs'],
  },
});
