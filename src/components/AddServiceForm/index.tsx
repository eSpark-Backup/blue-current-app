"use client"

import React, { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated } from "react-native"
import MyText from "../MyText"

export interface AddServiceFormProps {
  onSave: (name: string, details: string) => void
  onCancel: () => void
}

const AddServiceForm: React.FC<AddServiceFormProps> = ({ onSave, onCancel }) => {
  const [serviceName, setServiceName] = useState("")
  const [serviceDetails, setServiceDetails] = useState("")
  const slideAnim = React.useRef(new Animated.Value(0)).current

  React.useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }, [slideAnim])

  const handleSave = () => {
    if (serviceName.trim() && serviceDetails.trim()) {
      onSave(serviceName.trim(), serviceDetails.trim())
      setServiceName("")
      setServiceDetails("")
    }
  }

  const handleCancel = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      onCancel()
    })
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: slideAnim,
          transform: [
            {
              translateY: slideAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              }),
            },
          ],
        },
      ]}
    >
      <View style={styles.formContainer}>
        <MyText fontFamily="Outfit-Regular" style={styles.label}>Service name</MyText>
        <TextInput
          style={styles.input}
          value={serviceName}
          onChangeText={setServiceName}
          placeholder="Service Name"
          placeholderTextColor="#8E8E93"
        />

        <MyText fontFamily="Outfit-Regular"  style={styles.label}>Details</MyText>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={serviceDetails}
          onChangeText={setServiceDetails}
          placeholder="Details"
          placeholderTextColor="#8E8E93"
          multiline
          numberOfLines={3}
          textAlignVertical="top"
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
            <MyText fontFamily="Outfit-Medium" style={styles.saveButtonText}>Save</MyText>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  formContainer: {
    borderRadius: 12,
  },
  label: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#181818",
    borderRadius: 8,
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 16,
    padding: 20,
  },
  textArea: {
    height: 80,
    paddingTop: 12,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    width: '45%',
    alignSelf: 'center'
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#3A3A3C",
  },
  saveButton: {
    backgroundColor: "#212222",
  },
  cancelButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
})

export default AddServiceForm
