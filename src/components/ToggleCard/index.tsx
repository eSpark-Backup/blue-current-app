import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

import MyText from '../MyText';
import CustomToggle from '../CustomToggle';

import { hp, wp } from '../../utils';

interface ToggleCardProps {
  title?: string;
  trackOnColor?: string;
}

const ToggleCard: React.FC<ToggleCardProps> = ({ title = 'Olly Smith', trackOnColor = undefined }) => {
  const [toggleValue, setToggleValue] = useState(false);
  const { colors } = useTheme();

  return (
    <View style={[styles.cardContainer, { borderColor: colors.primary }]}>
      <MyText fontFamily="Outfit-Regular" fontSize={hp(2)}>
        {title}
      </MyText>
      <View style={styles.rightContainer}>
        <CustomToggle
          trackColorOn={trackOnColor}
          size="small"
          value={toggleValue}
          onChange={setToggleValue}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    height: hp(8),
    borderRadius: hp(1.2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(2),
    paddingHorizontal: wp(3.8),
    paddingVertical: hp(1.2),
    borderWidth: 1,
  },
  rightContainer: {
    justifyContent: 'center',
  },
});

export default ToggleCard;
