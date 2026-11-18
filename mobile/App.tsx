import "./src/global.css"

import { api, configureApi } from "@namu-test/shared"
import { NavigationContainer } from "@react-navigation/native"
import { QueryClientProvider } from "@tanstack/react-query"
import { StatusBar, useColorScheme } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { ContentsProvider } from "@/contexts/contents-context"
import { env } from "@/env"
import { queryClient } from "@/lib/react-query"
import { Routes } from "@/routes"

configureApi({ baseURL: env.API_URL })

api.interceptors.request.use(config => {
  new Promise(resolve => setTimeout(() => resolve({}), 5000))
  // if (config.url?.includes("/contents")) {
  //   return Promise.reject(new ApiError("Erro"))
  // }

  return config
})

export function App() {
  const isDarkMode = useColorScheme() === "dark"

  return (
    <SafeAreaView className="flex-1">
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />

      <QueryClientProvider client={queryClient}>
        <ContentsProvider>
          <NavigationContainer>
            <Routes />
          </NavigationContainer>
        </ContentsProvider>
      </QueryClientProvider>
    </SafeAreaView>
  )
}
