import type React from "react"
import { useRef, useEffect } from "react"
import { TouchableOpacity, Animated, type ViewStyle, StyleSheet } from "react-native"

export interface ToggleProps {
  /** Current toggle state */
  value: boolean
  /** Callback when toggle state changes */
  onChange: (value: boolean) => void
  /** Size variant of the toggle */
  size?: "small" | "medium" | "large"
  /** Whether the toggle is disabled */
  isDisabled?: boolean
  /** Custom style for the toggle container */
  style?: ViewStyle
  /** Custom style for the track */
  trackStyle?: ViewStyle
  /** Custom style for the thumb */
  thumbStyle?: ViewStyle
  /** Track color when toggle is off */
  trackColorOff?: string
  /** Track color when toggle is on */
  trackColorOn?: string
  /** Thumb color when toggle is off */
  thumbColorOff?: string
  /** Thumb color when toggle is on */
  thumbColorOn?: string
  /** Animation duration in milliseconds */
  animationDuration?: number
  /** Test ID for testing purposes */
  testID?: string
}

const CustomToggle: React.FC<ToggleProps> = ({
  value,
  onChange,
  size = "medium",
  isDisabled = false,
  style,
  trackStyle,
  thumbStyle,
  trackColorOff = "#262A34",
  trackColorOn = "#00C9FF",
  thumbColorOff = "#4D5362",
  thumbColorOn = "#FFFFFF",
  animationDuration = 200,
  testID,
}) => {
  const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current
  const scaleValue = useRef(new Animated.Value(1)).current

  // Size configurations
  const sizeConfig = {
    small: {
      width: 40,
      height: 24,
      thumbSize: 20,
      padding: 2,
    },
    medium: {
      width: 50,
      height: 30,
      thumbSize: 26,
      padding: 2,
    },
    large: {
      width: 60,
      height: 36,
      thumbSize: 32,
      padding: 2,
    },
  }

  const config = sizeConfig[size]

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value ? 1 : 0,
      duration: animationDuration,
      useNativeDriver: false,
    }).start()
  }, [value, animationDuration])

  const handlePress = () => {
    if (isDisabled) return

    // Add press animation
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.95,
        duration: 50,
        useNativeDriver: false,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 50,
        useNativeDriver: false,
      }),
    ]).start()

    onChange(!value)
  }

  const trackColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [trackColorOff, trackColorOn],
  })

  const thumbColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [thumbColorOff, thumbColorOn],
  })

  const thumbTranslateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, config.width - config.thumbSize - config.padding * 2],
  })

  const containerStyle: ViewStyle = {
    width: config.width,
    height: config.height,
    borderRadius: config.height / 2,
    padding: config.padding,
    justifyContent: "center",
    opacity: isDisabled ? 0.5 : 1,
  }

  const thumbStyleAnimated: ViewStyle = {
    width: config.thumbSize,
    height: config.thumbSize,
    borderRadius: config.thumbSize / 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handlePress}
      disabled={isDisabled}
      style={[containerStyle, style]}
      testID={testID}
    >
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          {
            backgroundColor: trackColor,
            borderRadius: config.height / 2,
          },
          trackStyle,
        ]}
      />
      <Animated.View
        style={[
          thumbStyleAnimated,
          {
            backgroundColor: thumbColor,
            transform: [{ translateX: thumbTranslateX }, { scale: scaleValue }],
          },
          thumbStyle,
        ]}
      />
    </TouchableOpacity>
  )
}

export default CustomToggle
