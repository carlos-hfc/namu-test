import { PropsWithChildren } from "react"
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export function AppLayout({ children }: PropsWithChildren) {
  return (
    <SafeAreaView className="flex-1 bg-zinc-100 text-foreground">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          className="flex-1"
          behavior="padding"
        >
          {children}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}
