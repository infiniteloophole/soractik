const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.extraNodeModules = {
  ...(config.resolver.extraNodeModules || {}),
  ws: require.resolve('isomorphic-ws'),
  '@ledgerhq/devices/hid-framing': require.resolve('./shims/ledgerHidFraming.js'),
};

config.resolver.alias = {
  ...(config.resolver.alias || {}),
  ws: require.resolve('isomorphic-ws'),
  '@ledgerhq/devices/hid-framing': require.resolve('./shims/ledgerHidFraming.js'),
};

module.exports = config; 