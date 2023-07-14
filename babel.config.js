module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      "expo-router/babel",
      //This Plugin should be last
      'react-native-reanimated/plugin',
      '@babel/plugin-transform-export-namespace-from'
    ],
  };
};
