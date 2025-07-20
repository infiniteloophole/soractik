const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const path = require('path');
const webpack = require('webpack');

module.exports = async function (env, argv) {
  // Generate the default Expo Webpack config
  const config = await createExpoWebpackConfigAsync(env, argv);

  // Provide a browser-friendly implementation for the Node‐only `ws` package
  config.resolve = config.resolve || {};
  config.resolve.alias = {
    ...(config.resolve.alias || {}),
    ws: require.resolve('isomorphic-ws'),
    '@ledgerhq/devices/hid-framing': path.resolve(__dirname, 'shims', 'ledgerHidFraming.js'),
    
  };

  // Polyfill Node.js core modules for the browser build
  config.resolve.fallback = {
    ws: require.resolve('isomorphic-ws'),
    ...(config.resolve.fallback || {}),
    // Disable server-only modules
    fs: false,
    net: false,
    tls: false,
    child_process: false,
    // Provide browser replacements
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
    path: require.resolve('path-browserify'),
    os: require.resolve('os-browserify/browser'),
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    zlib: require.resolve('browserify-zlib'),
    buffer: require.resolve('buffer/'),
    process: require.resolve('process/browser'),
    assert: require.resolve('assert/'),
    util: require.resolve('util/'),
  };

  // Inject global shims for `process` and `Buffer`
  config.plugins = config.plugins || [];
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    })
  );

  return config;
}; 