module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          { loader: 'css-loader', options: { module: true } },
          'sass-loader',
        ],
      },
    ],
  },
};
