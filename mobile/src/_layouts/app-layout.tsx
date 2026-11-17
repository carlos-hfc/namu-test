import { PropsWithChildren } from "react"
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { Header } from "@/components/header"

export function AppLayout({ children }: PropsWithChildren) {
  return (
    <SafeAreaView className="flex-1 bg-zinc-100">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          className="flex-1"
          behavior="padding"
        >
          <Header />

          {children}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}
