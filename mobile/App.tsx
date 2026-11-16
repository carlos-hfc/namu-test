import "./src/global.css"

import { StatusBar, Text, useColorScheme } from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"

export function App() {
  const isDarkMode = useColorScheme() === "dark"

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <SafeAreaView>
        <Text className="text-sm">TESTE</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
