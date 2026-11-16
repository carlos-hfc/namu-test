const path = require("path")
const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config")
const { withNativeWind } = require("nativewind/metro")

const projectRoot = __dirname
const monorepoRoot = path.resolve(projectRoot, "..")

const defaultConfig = getDefaultConfig(projectRoot)

const config = mergeConfig(defaultConfig, {
  projectRoot,
  watchFolders: [monorepoRoot],
  resolver: {
    nodeModulesPaths: [
      path.resolve(projectRoot, "node_modules"),
      path.resolve(monorepoRoot, "node_modules"),
    ],
  },
})

module.exports = withNativeWind(config, {
  input: path.resolve(projectRoot, "src/global.css"),
  inlineRem: 16,
})
