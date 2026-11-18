import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { LucideHeart, LucideList } from "lucide-react-native"

import { AppLayout } from "./_layouts/app-layout"
import { BottomParamsList, StackParamsList } from "./@types/navigation"
import { colors } from "./colors"
import { ContentDetails } from "./screens/content-details"
import { Home } from "./screens/home"

const Stack = createNativeStackNavigator<StackParamsList>()
const Tab = createBottomTabNavigator<BottomParamsList>()

export function TabRoutes() {
  return (
    <Tab.Navigator
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors["muted-foreground"],
        tabBarStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarLabel: "Conteúdos",
          tabBarIcon(props) {
            return <LucideList {...props} />
          },
        }}
      />
      <Tab.Screen
        name="favorites"
        component={Home}
        options={{
          tabBarLabel: "Favoritos",
          tabBarIcon(props) {
            return (
              <LucideHeart
                {...props}
                fill={props.focused ? props.color : "transparent"}
              />
            )
          },
        }}
      />
    </Tab.Navigator>
  )
}

export function Routes() {
  return (
    <Stack.Navigator
      initialRouteName="main"
      screenOptions={{ headerShown: false }}
      screenLayout={AppLayout}
    >
      <Stack.Screen
        name="main"
        component={TabRoutes}
      />
      <Stack.Screen
        name="content-details"
        component={ContentDetails}
      />
    </Stack.Navigator>
  )
}
