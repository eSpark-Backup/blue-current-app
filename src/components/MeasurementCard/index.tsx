import type React from "react"
import { View, Text, TouchableOpacity, StyleSheet, type ViewStyle } from "react-native"
import MyText from "../MyText"

export interface MeasurementCardProps {
  value: string
  label: string
  status?: "good" | "warning" | "error"
  onPress?: () => void
  style?: ViewStyle
  isFullWidth?: boolean
}

const MeasurementCard: React.FC<MeasurementCardProps> = ({
  value,
  label,
  status = "good",
  onPress,
  style,
  isFullWidth = false,
}) => {
  const getStatusColor = () => {
    switch (status) {
      case "good":
        return "#6FFF00"
      case "warning":
        return "#FFD900" 
      case "error":
        return "#FF0000" 
      default:
        return "#6FFF00"
    }
  }

  return (
    <TouchableOpacity
      style={[styles.card, isFullWidth && styles.fullWidthCard, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <MyText fontFamily="Outfit-SemiBold" style={styles.value}>{value}</MyText>
          <View style={[styles.statusIndicator, { backgroundColor: getStatusColor() }]} />
        </View>
        <MyText fontFamily="Outfit-Medium" style={styles.label}>{label}</MyText>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FFFFFFBA",
    padding: 20,
    flex: 1,
    minHeight: 120,
  },
  fullWidthCard: {
    flex: 0,
    width: "100%",
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    marginBottom: 8,
  },
  value: {
    fontSize: 32,
    color: "#FFFFFF",
    // lineHeight: 44.54,
  },
  statusIndicator: {
    width: 18,
    height: 18,
    borderRadius: 100,
  },
  label: {
    fontSize: 20,
    color: "#FFFFFF",
    marginTop: "auto",
  },
})

export default MeasurementCard
