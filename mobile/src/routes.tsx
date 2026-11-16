import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { AppLayout } from "./_layouts/app-layout"
import { StackParamsList } from "./@types/navigation"
import { Home } from "./screens/home"

const Stack = createNativeStackNavigator<StackParamsList>()

export function Routes() {
  return (
    <Stack.Navigator
      initialRouteName="home"
      screenOptions={{ headerShown: false }}
      screenLayout={AppLayout}
    >
      <Stack.Screen
        name="home"
        component={Home}
      />
    </Stack.Navigator>
  )
}
