"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native"
import Modal from "react-native-modal"
import { hp } from "../../utils"

interface CalendarProps {
  isVisible: boolean
  onClose: () => void
  selectedDate?: Date
  onDateSelect: (date: Date) => void
  minDate?: Date
  maxDate?: Date
  disablePastDates?: boolean
  style?: any
}

interface CalendarState {
  currentMonth: Date
  selectedDate: Date | null
}

const Calendar: React.FC<CalendarProps> = ({
  isVisible,
  onClose,
  selectedDate,
  onDateSelect,
  minDate,
  maxDate,
  disablePastDates = true,
  style,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [internalSelectedDate, setInternalSelectedDate] = useState<Date | null>(selectedDate || null)

  useEffect(() => {
    if (selectedDate) {
      setInternalSelectedDate(selectedDate)
      setCurrentMonth(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1))
    }
  }, [selectedDate])

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const dayNames = ["M", "T", "W", "T", "F", "S", "S"]

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay()
    return firstDay === 0 ? 6 : firstDay - 1 // Convert Sunday (0) to be last (6)
  }

  const isDateDisabled = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (disablePastDates && date < today) {
      return true
    }

    if (minDate && date < minDate) {
      return true
    }

    if (maxDate && date > maxDate) {
      return true
    }

    return false
  }

  const isDateSelected = (date: Date) => {
    if (!internalSelectedDate) return false
    return (
      date.getDate() === internalSelectedDate.getDate() &&
      date.getMonth() === internalSelectedDate.getMonth() &&
      date.getFullYear() === internalSelectedDate.getFullYear()
    )
  }

  const handleDatePress = (date: Date) => {
    if (isDateDisabled(date)) return

    setInternalSelectedDate(date)
    onDateSelect(date)
  }

  const navigateMonth = (direction: "prev" | "next") => {
    const newMonth = new Date(currentMonth)
    if (direction === "prev") {
      newMonth.setMonth(currentMonth.getMonth() - 1)
    } else {
      newMonth.setMonth(currentMonth.getMonth() + 1)
    }
    setCurrentMonth(newMonth)
  }

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth)
    const firstDay = getFirstDayOfMonth(currentMonth)
    const days = []

    // Previous month's trailing days
    const prevMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 0)
    const daysInPrevMonth = prevMonth.getDate()

    for (let i = firstDay - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i
      const date = new Date(prevMonth.getFullYear(), prevMonth.getMonth(), day)
      days.push(
        <TouchableOpacity
          key={`prev-${day}`}
          style={[styles.dayButton, styles.otherMonthDay]}
          onPress={() => handleDatePress(date)}
          disabled={isDateDisabled(date)}
        >
          <Text style={[styles.dayText, styles.otherMonthText]}>{day}</Text>
        </TouchableOpacity>,
      )
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
      const disabled = isDateDisabled(date)
      const selected = isDateSelected(date)

      days.push(
        <TouchableOpacity
          key={`current-${day}`}
          style={[styles.dayButton, selected && styles.selectedDay, disabled && styles.disabledDay]}
          onPress={() => handleDatePress(date)}
          disabled={disabled}
        >
          <Text style={[styles.dayText, selected && styles.selectedDayText, disabled && styles.disabledDayText]}>
            {day}
          </Text>
        </TouchableOpacity>,
      )
    }

    // Next month's leading days
    const totalCells = 42 // 6 rows × 7 days
    const remainingCells = totalCells - days.length

    for (let day = 1; day <= remainingCells; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, day)
      days.push(
        <TouchableOpacity
          key={`next-${day}`}
          style={[styles.dayButton, styles.otherMonthDay]}
          onPress={() => handleDatePress(date)}
          disabled={isDateDisabled(date)}
        >
          <Text style={[styles.dayText, styles.otherMonthText]}>{day}</Text>
        </TouchableOpacity>,
      )
    }

    return days
  }

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modal}
    //   backdropOpacity={.0}
      animationIn="fadeIn"
      animationOut="fadeOut"
      backdropColor="#ececec80"
    >
      <View style={[styles.calendarContainer, style]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.navButton} onPress={() => navigateMonth("prev")}>
            <Text style={styles.navButtonText}>←</Text>
          </TouchableOpacity>

          <Text style={styles.monthYearText}>
            {`${currentMonth.getDate()} ${monthNames[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`}
          </Text>

          <TouchableOpacity style={styles.navButton} onPress={() => navigateMonth("next")}>
            <Text style={styles.navButtonText}>→</Text>
          </TouchableOpacity>
        </View>

        {/* Day names */}
        <View style={styles.dayNamesContainer}>
          {dayNames.map((dayName, index) => (
            <View key={index} style={styles.dayNameCell}>
              <Text style={styles.dayNameText}>{dayName}</Text>
            </View>
          ))}
        </View>

        {/* Calendar grid */}
        <View style={styles.calendarGrid}>{renderCalendarDays()}</View>
      </View>
    </Modal>
  )
}

const { width } = Dimensions.get("window")
const calendarWidth = width * 0.85

const styles = StyleSheet.create({
  modal: {
    alignItems: "center",
    margin: 0,
    bottom: 0,
  },
  calendarContainer: {
    backgroundColor: "#000000",
    borderRadius: 16,
    padding: 20,
    width: calendarWidth,
    top: hp(10),
    borderWidth: 1,
    borderColor: '#44475C',
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  navButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  navButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  monthYearText: {
    color: "#00C9FF",
    fontSize: 18,
    fontWeight: "bold",
  },
  dayNamesContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  dayNameCell: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
  },
  dayNameText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dayButton: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  selectedDay: {
    backgroundColor: "#00C9FF",
    borderRadius: 100,
    height: 35,
    width: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  disabledDay: {
    opacity: 0.3,
  },
  otherMonthDay: {
    opacity: 0.4,
  },
  dayText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
  selectedDayText: {
    color: "#000000",
    fontWeight: "bold",
  },
  disabledDayText: {
    color: "#5E6272",
  },
  otherMonthText: {
    color: "#5E6272",
  },
})

export default Calendar
