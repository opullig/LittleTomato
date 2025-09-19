/**
 * Metro configuration for React Native
 * Compatible with React Native 0.72+ and React 18
 */

const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const defaultConfig = await getDefaultConfig();

  return {
    transformer: {
      // Usando transformer padrão do React Native
      babelTransformerPath: require.resolve('metro-react-native-babel-transformer'),
    },
    resolver: {
      // Extensões que o Metro deve tratar como assets (imagens, fontes, vídeos)
      assetExts: [
        ...defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg'),
        'png',
        'jpg',
        'jpeg',
        'gif',
        'mp4',
        'ttf',
      ],
      // Extensões de código JS/TS
      sourceExts: [...defaultConfig.resolver.sourceExts, 'jsx', 'js', 'ts', 'tsx', 'svg'],
    },
  };
})();
