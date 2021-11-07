module.exports = {
  presets: ['@babel/preset-typescript', '@babel/preset-env'],
  plugins: [
    ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
    ['babel-plugin-module-resolver', {
      alias: {
        '': './src',
      },
    }],
  ],
};
