import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { hp, wp } from '../utils';

interface SelectableGridProps {
  data: any[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  numColumns?: number;
  boxStyle?: StyleProp<ViewStyle>;
  children: (item: any, index: number, selected: boolean) => React.ReactNode;
}

const SelectableGrid: React.FC<SelectableGridProps> = ({
  data,
  selectedIndex,
  onSelect,
  numColumns = 3,
  boxStyle,
  children,
}) => {
  return (
    <View style={[styles.grid, { flexDirection: 'row', flexWrap: 'wrap' }]}>
      {data.map((item, idx) => {
        const selected = idx === selectedIndex;
        const borderColor = selected ? '#00C9FFBA' : '#FFFFFFBA';
        const borderWidth = 1;
        const boxStyles = [
          styles.box,
          { borderColor, borderWidth },
          boxStyle,
          { width: wp(27) },
        ];
        if (selected) {
          return (
            <TouchableOpacity
              key={idx}
              style={boxStyles}
              activeOpacity={0.85}
              onPress={() => onSelect(idx)}
            >
              <LinearGradient
                colors={['#20252A', '#024E62']}
                style={StyleSheet.absoluteFill}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              />
              <View style={{ zIndex: 1 }}>{children(item, idx, true)}</View>
            </TouchableOpacity>
          );
        } else {
          return (
            <TouchableOpacity
              key={idx}
              style={[...boxStyles, { backgroundColor: '#262A34' }]}
              activeOpacity={0.85}
              onPress={() => onSelect(idx)}
            >
              {children(item, idx, false)}
            </TouchableOpacity>
          );
        }
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    width: wp(100),
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  box: {
    // aspectRatio: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    margin: wp(2),
    borderRadius: wp(3.2),
    overflow: 'hidden',
    position: 'relative',
    minHeight: hp(10)
  },
});

export default SelectableGrid;
