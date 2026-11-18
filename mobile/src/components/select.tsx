import { Category, cn } from "@namu-test/shared"
import { LucideCheckCircle2, LucideChevronDown } from "lucide-react-native"
import { useRef, useState } from "react"
import {
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
  ViewInstance,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { colors } from "@/colors"

type SelectOption = Category

interface SelectProps {
  placeholder?: string
  options: SelectOption[]
  value?: string
  onValueChange(value: string): void
}

interface DropdownPosition {
  top?: number
  bottom?: number
  left: number
  width: number
}

const OFFSET = 8
const MAX_DROPDOWN_HEIGHT = 40 * 4 // max-h-40

export function Select({ onValueChange, options, value }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState<DropdownPosition>({
    left: 0,
    width: 0,
  })

  const containerRef = useRef<ViewInstance>(null)

  const selectOption = options.find(option => option.slug === value)

  const closeSelect = () => setIsOpen(false)

  function handleOpen() {
    containerRef.current?.measureInWindow((x, y, width, height) => {
      const screenHeight = Dimensions.get("window").height
      const spaceBelow = screenHeight - (y + height)

      const opensUpwards =
        spaceBelow < MAX_DROPDOWN_HEIGHT + OFFSET && y > spaceBelow

      if (opensUpwards) {
        setPosition({
          bottom: screenHeight - y + OFFSET,
          left: x,
          width,
        })
      } else {
        setPosition({
          top: y + height + OFFSET,
          left: x,
          width,
        })
      }
      setIsOpen(true)
    })
  }

  function handleSelectItem(selectedValue: string) {
    onValueChange(selectedValue)
    closeSelect()
  }

  return (
    <View
      ref={containerRef}
      collapsable={false}
    >
      <Pressable
        className={cn(
          "border border-muted-foreground rounded-full flex-row items-center justify-between px-4 h-10",
          isOpen && "border-primary",
        )}
        onPress={handleOpen}
      >
        <Text
          numberOfLines={1}
          className={cn(
            "text-sm flex-1 text-muted-foreground",
            selectOption && "text-primary-foreground",
          )}
        >
          {selectOption?.name ?? "Todas"}
        </Text>

        <LucideChevronDown
          size={16}
          style={{ transform: [{ rotate: isOpen ? "180deg" : "0deg" }] }}
          color={colors["primary-foreground"]}
        />
      </Pressable>

      <Modal
        visible={isOpen}
        onRequestClose={closeSelect}
        backdropColor={`${colors.foreground}33`}
        animationType="fade"
      >
        <Pressable
          className="flex-1"
          onPress={closeSelect}
        />

        <SafeAreaView
          className="overflow-hidden rounded-lg w-full absolute p-4 bg-accent-foreground z-10"
          style={{
            ...position,
            maxHeight: MAX_DROPDOWN_HEIGHT,
          }}
        >
          <ScrollView
            nestedScrollEnabled
            keyboardShouldPersistTaps="handled"
            contentContainerClassName="gap-3"
            showsVerticalScrollIndicator={false}
          >
            {options.map(option => (
              <Pressable
                key={`option-${option.slug}`}
                className="flex-row gap-3 items-center justify-between"
                onPress={() => handleSelectItem(option.slug)}
              >
                <Text className="flex-1 text-primary-foreground text-sm font-semibold">
                  {option.name}
                </Text>

                {selectOption?.slug === option.slug && (
                  <LucideCheckCircle2
                    size={16}
                    color={colors.primary}
                  />
                )}
              </Pressable>
            ))}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </View>
  )
}
