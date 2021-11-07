module.exports = {
  presets: ['@babel/preset-typescript', '@babel/preset-env'],
  plugins: [
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['babel-plugin-module-resolver', {
      alias: {
        db: './src/db',
        tag: './src/tag',
        auth: './src/auth',
        data: './src/data',
        like: './src/like',
        user: './src/user',
        image: './src/image',
        plant: './src/plant',
        utils: './src/utils',
        upload: './src/upload',
        vendor: './src/vendor',
        location: './src/location',
      },
    }],
  ],
};
