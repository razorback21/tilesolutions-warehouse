module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      "expo-router/babel",
      '@babel/plugin-transform-export-namespace-from',
      //This Plugin should be last
      'react-native-reanimated/plugin',
    ],
  };
};
