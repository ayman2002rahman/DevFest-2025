const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');
const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');

let config = getDefaultConfig(__dirname);

// Step 1. Modify the resolver settings for SVG:
config.resolver.assetExts = config.resolver.assetExts.filter(ext => ext !== "svg");
config.resolver.sourceExts.push("svg");

// Step 2. Configure the transformer to use react-native-svg-transformer:
config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve("react-native-svg-transformer"),
};

// Step 3. Add NativeWind configuration:
config = withNativeWind(config, { input: './global.css' });

// Step 4. Wrap the configuration with Reanimated's settings:
module.exports = wrapWithReanimatedMetroConfig(config);