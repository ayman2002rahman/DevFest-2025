const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');
const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');

let config = getDefaultConfig(__dirname);

// Add NativeWind configuration
config = withNativeWind(config, { input: './global.css' });

// Wrap the configuration with Reanimated's settings
module.exports = wrapWithReanimatedMetroConfig(config);