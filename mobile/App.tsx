import "./src/global.css"

import { NavigationContainer } from "@react-navigation/native"
import { StatusBar, useColorScheme } from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"

import { Routes } from "@/routes"

export function App() {
  const isDarkMode = useColorScheme() === "dark"

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <SafeAreaView className="flex-1">
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
