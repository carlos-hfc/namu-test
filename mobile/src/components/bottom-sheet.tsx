import { LucideX } from "lucide-react-native"
import {
  PropsWithChildren,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
} from "react"
import {
  Animated,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  TouchableOpacity,
  View,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { colors } from "@/colors"

const { height } = Dimensions.get("screen")

interface BottomSheetProps extends PropsWithChildren {
  open: boolean
  onClose(): void
  titleComponent?: ReactNode
}

export function BottomSheet({
  children,
  onClose,
  open,
  titleComponent,
}: BottomSheetProps) {
  const container = useRef(new Animated.Value(height)).current

  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  const onOpen = useCallback(() => {
    Animated.parallel([
      Animated.timing(container, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start()
  }, [container])

  const handleClose = useCallback(
    (callback?: () => void) => {
      Animated.parallel([
        Animated.timing(container, {
          toValue: height,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start(() => callback && callback())
    },
    [container],
  )

  const handleBackdropPress = useCallback(() => {
    if (Keyboard.isVisible()) return Keyboard.dismiss()

    handleClose(() => onCloseRef.current?.())
  }, [handleClose])

  useEffect(() => {
    if (open) onOpen()
    else handleClose()
  }, [handleClose, onOpen, open])

  return (
    <Modal
      animationType="slide"
      visible={open}
      onRequestClose={handleBackdropPress}
      backdropColor={`${colors.foreground}99`}
    >
      <KeyboardAvoidingView
        behavior="padding"
        className="flex-1"
      >
        <Pressable
          className="flex-1"
          onPress={handleBackdropPress}
        />

        <Animated.View
          className="w-full rounded-t-xl bg-accent-foreground"
          style={{ transform: [{ translateY: container }] }}
        >
          <SafeAreaView className="gap-6 p-6">
            <View className="flex-row items-start justify-between">
              {titleComponent}

              <TouchableOpacity onPress={handleBackdropPress}>
                <LucideX
                  size={16}
                  color={colors.accent}
                />
              </TouchableOpacity>
            </View>

            {children}
          </SafeAreaView>
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  )
}
