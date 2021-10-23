module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
  ],
  plugins: [
    [
      "babel-plugin-tsconfig-paths",
      {
        relative: true,
        extensions: [".js", ".jsx", ".ts", ".tsx", ".es", ".es6", ".mjs"],
        rootDir: "./src",
        tsconfig: "../tsconfig.json",
      },
    ],
    "babel-plugin-transform-typescript-metadata",
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-class-properties", { loose: false }],
  ],
};
