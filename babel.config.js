module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          assets: './src/assets',
          images: './src/assets/images',
          components: './src/components',
          core: './src/core',
          screens: './src/screens',
          configs: './src/configs',
          navigation: './src/navigation',
          provider: './src/provider',
          utils: './src/utils',
          stores: './src/stores',
          actions: './src/redux/actions',
          constants: './src/utils/constants',
          reducers: './src/redux/reducers',
          hooks: './src/core/hooks',
          theme: './src/configs/theme',
          api: './src/configs/api',
          tab: './src/tab',
          drawer: './src/drawer',
          context: './src/context'
        }
      }
    ]
  ]
}
