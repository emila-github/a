module.exports = {
  root: true,
  env: {
    node: true,
  },
  globals: {
    wx: true,
    TMap: true,
    BMap: true,
    AMap: true,
    qq: true,
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'linebreak-style': [0, 'error', 'windows'],
    'no-func-assign': 0,
    'no-unused-vars': 'off',
    'prettier/prettier': 'off',
  },
  overrides: [{
    files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
    env: {
      jest: true,
    },
  }, ],
}