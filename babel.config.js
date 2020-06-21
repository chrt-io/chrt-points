module.exports = {
  env: {
    test: {
      plugins: [
        '@babel/plugin-transform-modules-commonjs',
        [
          'babel-plugin-root-import',
          {
            rootPathSuffix: './src/',
            rootPathPrefix: '~/'
          }
        ]
      ]
    }
  },
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
      }
    ]
  ],
  plugins: [
    [
      'babel-plugin-root-import',
      {
        rootPathSuffix: './src/',
        rootPathPrefix: '~/'
      }
    ]
  ]
};
