import type React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { hp, wp } from '../../utils';



interface YesNoToggleProps {
  value: boolean | null;
  onValueChange: (value: boolean) => void;
  size?: 'sm' | 'md' | 'lg';
}

export const YesNoToggle: React.FC<YesNoToggleProps> = ({ value, onValueChange, size = 'md' }) => {
  // Responsive size map for component width/height
  const sizeMap: Record<'sm' | 'md' | 'lg', { width: number; height: number; fontSize: number; borderRadius: number }> = {
    sm: {
      width: wp(32),
      height: hp(4),
      fontSize: hp(1.5),
      borderRadius: hp(1),
    },
    md: {
      width: wp(44),
      height: hp(5.2),
      fontSize: hp(1.8),
      borderRadius: hp(1),
    },
    lg: {
      width: wp(60),
      height: hp(7),
      fontSize: hp(2.2),
      borderRadius: hp(1),
    },
  };
  const sz = sizeMap[(size as 'sm' | 'md' | 'lg')] || sizeMap.md;
  return (
    <View style={[styles.container, { borderRadius: sz.borderRadius, width: sz.width, height: sz.height }]}> 
      <TouchableOpacity
        style={[
          styles.button,
          styles.yesButton,
          value === true && styles.selectedButton,
          { borderTopLeftRadius: sz.borderRadius, borderBottomLeftRadius: sz.borderRadius, height: sz.height },
        ]}
        onPress={() => onValueChange(true)}
      >
        <Text style={[styles.buttonText, { fontSize: sz.fontSize }, value === true && styles.selectedText]}>Yes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          styles.noButton,
          value === false && styles.selectedButton,
          { borderTopRightRadius: sz.borderRadius, borderBottomRightRadius: sz.borderRadius, height: sz.height },
        ]}
        onPress={() => onValueChange(false)}
      >
        <Text style={[styles.buttonText, { fontSize: sz.fontSize }, value === false && styles.selectedText]}>No</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#4A5568",
    overflow: "hidden",
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: '100%',
  },
  yesButton: {},
  noButton: {},
  selectedButton: {
    backgroundColor: "#4FC3F7",
  },
  buttonText: {
    fontWeight: "500",
    color: "#9CA3AF",
  },
  selectedText: {
    color: "#FFFFFF",
  },
});
