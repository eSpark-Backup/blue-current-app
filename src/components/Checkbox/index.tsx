"use client"

import React from "react"
import { TouchableOpacity, View, Animated, StyleSheet, type ViewStyle } from "react-native"

export interface CheckboxProps {
  value: boolean
  onChange: (value: boolean) => void
  size?: "small" | "medium" | "large"
  style?: ViewStyle
  isDisabled?: boolean
  color?: string
  borderColor?: string
  checkColor?: string
}

const Checkbox: React.FC<CheckboxProps> = ({
  value,
  onChange,
  size = "medium",
  style,
  isDisabled = false,
  color = "#004F65",
  borderColor = "#3A3A3C",
  checkColor = "#FFFFFF",
}) => {
  const animatedValue = React.useRef(new Animated.Value(value ? 1 : 0)).current

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start()
  }, [value, animatedValue])

  const handlePress = () => {
    if (!isDisabled) {
      onChange(!value)
    }
  }

  const sizeStyles = {
    small: { width: 16, height: 16, borderRadius: 3 },
    medium: { width: 20, height: 20, borderRadius: 4 },
    large: { width: 24, height: 24, borderRadius: 5 },
  }

  const checkmarkSize = {
    small: 12,
    medium: 16,
    large: 20,
  }

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["transparent", color],
  })

  const borderColorAnimated = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [borderColor, color],
  })

  const checkmarkOpacity = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0, 1],
  })

  const checkmarkScale = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.3, 0.7, 1],
  })

  return (
    <TouchableOpacity onPress={handlePress} disabled={isDisabled} style={[styles.container, style]} activeOpacity={0.7}>
      <Animated.View
        style={[
          styles.checkbox,
          sizeStyles[size],
          {
            // backgroundColor,
            borderColor: '#fff',
            opacity: isDisabled ? 0.5 : 1,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.checkmark,
            {
              opacity: checkmarkOpacity,
              transform: [{ scale: checkmarkScale }],
              width: checkmarkSize[size],
              height: checkmarkSize[size],
            },
          ]}
        >
          <View
            style={[
              styles.checkmarkLine1,
              {
                backgroundColor: checkColor,
                width: checkmarkSize[size] * 0.3,
                height: 2,
                transform: [
                  { translateX: checkmarkSize[size] * 0.1 },
                  { translateY: checkmarkSize[size] * 0.2 },
                  { rotate: "45deg" },
                ],
              },
            ]}
          />
          <View
            style={[
              styles.checkmarkLine2,
              {
                backgroundColor: checkColor,
                width: checkmarkSize[size] * 0.6,
                height: 2,
                transform: [
                  { translateX: checkmarkSize[size] * 0.2 },
                  { translateY: checkmarkSize[size] * 0.1 },
                  { rotate: "-45deg" },
                ],
              },
            ]}
          />
        </Animated.View>
      </Animated.View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  checkbox: {
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  checkmark: {
    position: "relative",
    top: 6,
    left: 1
  },
  checkmarkLine1: {
    position: "absolute",
  },
  checkmarkLine2: {
    position: "absolute",
  },
})

export default Checkbox
