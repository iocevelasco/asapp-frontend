const { transform } = require('@babel/core');

module.exports = {
  process(src, filename) {
    const result = transform(src, {
      filename,
      presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        'next/babel',
        '@babel/preset-react',
        '@babel/preset-typescript',
      ],
    });

    return result || src;
  },
};