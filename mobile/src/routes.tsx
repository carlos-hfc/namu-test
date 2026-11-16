import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { StackParamsList } from "./@types/navigation"
import { Home } from "./screens/home"

const Stack = createNativeStackNavigator<StackParamsList>()

export function Routes() {
  return (
    <Stack.Navigator
      initialRouteName="home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="home"
        component={Home}
      />
    </Stack.Navigator>
  )
}
