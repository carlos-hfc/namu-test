import { Image, View } from "react-native"

export function Header() {
  return (
    <View className="bg-background border-b border-border p-4">
      <Image
        source={require("@/assets/logo.png")}
        alt="Logo Namu"
        className="w-20 h-6"
      />
    </View>
  )
}
