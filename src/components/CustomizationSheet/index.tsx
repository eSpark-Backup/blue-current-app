import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  Pressable,
  Dimensions,
  FlatList,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import MyText from '../MyText';
import MyButton from '../MyButton';

import { hp, wp } from '../../utils';

const { height: screenHeight } = Dimensions.get('window');

interface CustomizationSheetProps {
  visible: boolean;
  setVisible: (val: boolean) => void;
  selectedTiles: string[];
  setSelectedTiles: (tiles: string[]) => void;
  allTiles: {
    id: string;
    title: string;
    icon: React.ReactNode;
    sheetIcon: React.ReactNode;
  }[];
}

const MAX_SELECTION = 3;

const CustomizationSheet: React.FC<CustomizationSheetProps> = ({
  visible,
  setVisible,
  selectedTiles,
  setSelectedTiles,
  allTiles,
}) => {
  const { colors } = useTheme();
  const [tempSelected, setTempSelected] = useState<string[]>(selectedTiles);

  useEffect(() => {
    if (visible) setTempSelected(selectedTiles);
  }, [visible]);

  const toggleSelect = (id: string) => {
    setTempSelected(prev => {
      if (prev.includes(id)) {
        // Deselect if already selected
        return prev.filter(x => x !== id);
      } else {
        // If already at max, remove the first (oldest) one
        if (prev.length >= MAX_SELECTION) {
          const [, ...rest] = prev; // remove the first element
          return [...rest, id];
        }
        // Otherwise, just add the new one
        return [...prev, id];
      }
    });
  };

  const handleSave = () => {
    setSelectedTiles(tempSelected);
    setVisible(false);
  };

  const renderTile = ({ item }: { item: any }) => {
    const isSelected = tempSelected.includes(item.id);
    return (
      <Pressable
        onPress={() => toggleSelect(item.id)}
        style={[
          styles.tile,
          { borderColor: isSelected ? '#00C9FF' : '#1C1C1C' },
        ]}
      >
        <View style={styles.tileContent}>
          <View style={styles.iconContainer}>{item.sheetIcon}</View>

          <MyText
            fontFamily="Gilroy-Medium"
            fontSize={hp(1.9)}
            style={styles.tileTitle}
            numberOfLines={2}
          >
            {item.title}
          </MyText>
        </View>

        <Icon
          name="checkmark-circle"
          color={isSelected ? '#00C9FF' : '#80898D'}
          size={20}
          style={styles.checkIcon}
        />
      </Pressable>
    );
  };

  return (
    <Modal transparent visible={visible} animationType="slide">
      <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
        <Pressable
          style={[styles.sheet, { height: screenHeight * 0.65 }]}
          onPress={e => e.stopPropagation()}
        >
          {/* Handle bar */}
          <View style={styles.handleBar} />

          {/* Header Section */}
          <View style={styles.headerContainer}>
            <MyText
              fontFamily="Outfit-SemiBold"
              fontSize={hp(3.75)}
              style={styles.headerTitle}
            >
              Customize Your Dashboard
            </MyText>
            <MyText
              fontFamily="Gilroy-Regular"
              fontSize={hp(2)}
              color="#A9A9A9"
              style={styles.headerSubtitle}
            >
              Tap a tile below to add to your dashboard
            </MyText>
          </View>

          {/* Tile List */}
          <FlatList
            data={allTiles}
            keyExtractor={item => item.id}
            renderItem={renderTile}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            contentContainerStyle={{ paddingHorizontal: wp(5) }}
          />

          {/* Save Button */}
          <MyButton
            title="Save Changes"
            onPress={handleSave}
            containerStyle={styles.saveButton}
          />
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  sheet: {
    backgroundColor: '#0d1117',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: hp(3),
  },
  handleBar: {
    width: wp(18),
    height: 4,
    backgroundColor: '#00C9FF',
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: hp(2),
  },
  headerContainer: {
    // alignItems: 'center',
    marginHorizontal: wp(5),
    marginBottom: hp(3),
  },
  headerTitle: {
    color: 'white',
  },
  headerSubtitle: {
    color: '#9FA5B4',
    marginTop: hp(0.5),
  },
  tile: {
    backgroundColor: '#00131B',
    height: hp(12),
    width: wp(40),
    borderRadius: wp(3),
    marginBottom: hp(2),
    justifyContent: 'center',
    // alignItems: 'center',
    borderWidth: 2,
    padding: wp(3),
  },
  tileContent: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  iconContainer: {
    height: hp(5),
    width: hp(5),
    justifyContent: 'center',
    // alignItems: 'center',
    // alignSelf: 'flex-start',
    marginBottom: hp(0.8),
  },
  tileTitle: {
    lineHeight: hp(2),
    color: 'white',
    flexWrap: 'wrap',
    // width: '85%',
  },
  checkIcon: {
    position: 'absolute',
    top: hp(1),
    right: wp(2),
  },
  saveButton: {
    backgroundColor: '#00C9FF',
    borderRadius: 8,
    // marginTop: hp(2),
    marginHorizontal: wp(5),
    height: hp(5),
  },
});

export default CustomizationSheet;
