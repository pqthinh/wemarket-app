module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          assets: './src/assets',
          components: './src/components',
          core: './src/core',
          screens: './src/screens',
          configs: './src/configs',
          navigation: './src/navigation',
          provider: './src/provider',
          utils: './src/utils',
          stores: './src/stores',
          actions: './src/actions',
          constants: './src/utils/constants',
          reducers: './src/reducers',
          hooks: './src/core/hooks',
          theme: './src/configs/theme',
          api: './src/configs/api',
          tab: './src/tab',
          drawer: './src/drawer'
        }
      }
    ]
  ]
}
