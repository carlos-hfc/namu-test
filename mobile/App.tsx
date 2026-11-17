import "./src/global.css"

import { NavigationContainer } from "@react-navigation/native"
import { StatusBar, useColorScheme } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { Routes } from "@/routes"

export function App() {
  const isDarkMode = useColorScheme() === "dark"

  return (
    <SafeAreaView className="flex-1">
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </SafeAreaView>
  )
}
