"use client"

import type React from "react"
import Modal from "react-native-modal"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { hp, wp } from "../../utils"
import { useTheme } from "@react-navigation/native"
import MyText from "../MyText"
import Icon from "react-native-vector-icons/AntDesign"
export interface FilterOption {
  id: string
  label: string
  checked: boolean
}

interface FilterActionSheetProps {
  visible: boolean
  onClose: () => void
  filters: FilterOption[]
  onFilterToggle: (filterId: string) => void
}

export const FilterActionSheet: React.FC<FilterActionSheetProps> = ({ visible, onClose, filters, onFilterToggle }) => {
  const styles = useStyles()
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection={["down"]}
      style={styles.modal}
      backdropOpacity={0.5}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={300}
      animationOutTiming={250}
      backdropTransitionInTiming={300}
      backdropTransitionOutTiming={250}
      useNativeDriverForBackdrop
      hideModalContentWhileAnimating
      propagateSwipe
      backdropColor="#ececec80"
    >
      <View style={styles.actionSheet}>
        <View style={styles.handleContainer}>
          <View style={styles.handleBar} />
        </View>

        {/* Header */}
        <View style={styles.header}>
          <MyText fontFamily="Outfit-SemiBold" style={styles.title}>Filters</MyText>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <MyText style={styles.closeIcon}>×</MyText>
          </TouchableOpacity>
        </View>

        {/* Filter Options */}
        <View style={styles.content}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.id}
              style={styles.filterItem}
              onPress={() => onFilterToggle(filter.id)}
              activeOpacity={0.7}
            >
              <MyText style={styles.filterLabel}>{filter.label}</MyText>
              <View style={[styles.checkbox, filter.checked && styles.checkboxChecked]}>
                <Icon name="check" color="#000" size={17} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  )
}

const useStyles = () => {
  const { colors } = useTheme()
  return StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  actionSheet: {
    backgroundColor: "#000",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingBottom: 34,
    minHeight: 300,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  handleContainer: {
    paddingVertical: 10,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  handleBar: {
    width: wp(45),
    height: 4,
    backgroundColor: colors.primary + '90',
    borderRadius: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary + '30',
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
  },
  closeButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  closeIcon: {
    fontSize: hp(4),
    color: "#efefef",
    bottom: hp(0.5),
  },
  content: {
    paddingHorizontal: 20,
  },
  filterItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },
  filterLabel: {
    fontSize: 16,
    color: "#ffffff",
    flex: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#80898D",
    backgroundColor: "#80898D",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  checkmark: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  },
})
}
