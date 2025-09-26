import type React from "react"
import { View, StyleSheet, type ViewStyle } from "react-native"
import MeasurementCard, { type MeasurementCardProps } from "../MeasurementCard"

export interface MeasurementData extends Omit<MeasurementCardProps, "onPress"> {
  id: string
  screenName?: string
}

export interface MeasurementGridProps {
  data: MeasurementData[]
  onCardPress?: (item: MeasurementData) => void
  style?: ViewStyle
  cardSpacing?: number
}

const MeasurementGrid: React.FC<MeasurementGridProps> = ({ data, onCardPress, style, cardSpacing = 12 }) => {
  const renderCard = (item: MeasurementData, index: number) => {
    return (
      <MeasurementCard
        key={item.id}
        value={item.value}
        label={item.label}
        status={item.status}
        isFullWidth={item.isFullWidth}
        onPress={() => onCardPress?.(item)}
        style={item.isFullWidth ? { marginTop: cardSpacing } : undefined}
      />
    )
  }

  const renderGrid = () => {
    const rows: React.ReactElement[] = []
    let currentRow: MeasurementData[] = []

    data.forEach((item, index) => {
      if (item.isFullWidth) {
        // If there are items in current row, render them first
        if (currentRow.length > 0) {
          rows.push(
            <View key={`row-${rows.length}`} style={[styles.row, { gap: cardSpacing }]}>
              {currentRow.map((rowItem, rowIndex) => renderCard(rowItem, rowIndex))}
            </View>,
          )
          currentRow = []
        }
        // Render full width item
        rows.push(renderCard(item, index))
      } else {
        currentRow.push(item)
        // If we have 2 items or it's the last item, render the row
        if (currentRow.length === 2 || index === data.length - 1) {
          rows.push(
            <View key={`row-${rows.length}`} style={[styles.row, { gap: cardSpacing }]}>
              {currentRow.map((rowItem, rowIndex) => renderCard(rowItem, rowIndex))}
            </View>,
          )
          currentRow = []
        }
      }
    })

    return rows
  }

  return <View style={[styles.container, { gap: cardSpacing }, style]}>{renderGrid()}</View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
  },
})

export default MeasurementGrid
