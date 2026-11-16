import plugin from "@carlos-hfc/eslint-plugin"

export default [
  {
    ignores: ["**/dist/**", "**/node_modules/**"],
  },
  ...plugin.configs.node.map((config) => ({
    ...config,
    files: ["shared/**/*.{ts,js}"],
  })),
  ...plugin.configs.react.map((config) => ({
    ...config,
    files: ["web/**/*.{ts,tsx,js,jsx}", "mobile/**/*.{ts,tsx,js,jsx}"],
  })),
]
