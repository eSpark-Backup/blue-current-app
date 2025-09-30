import React from 'react';
import { View, StyleSheet, Pressable, Image } from 'react-native';
import MyText from '../MyText';
import { hp, wp } from '../../utils';
import Icon from 'react-native-vector-icons/Ionicons';

interface PaymentOptionCardProps {
  title: string;
  LeftComponent?: React.ReactNode;
  selected?: boolean;
  onPress?: () => void;
}

const PaymentOptionCard: React.FC<PaymentOptionCardProps> = ({
  title,
  LeftComponent,
  selected = false,
  onPress,
}) => {
  return (
    <Pressable
      style={[
        styles.cardContainer,
        { borderColor: selected ? '#00C9FF' : '#444' },
      ]}
      onPress={onPress}
    >
      <View style={styles.leftContainer}>
        {LeftComponent}
        <MyText fontFamily="Outfit-Regular" fontSize={hp(2)}>
          {title}
        </MyText>
      </View>

      {selected && <Icon name="checkmark-circle" size={22} color="#00C9FF" />}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    height: hp(7),
    borderRadius: hp(1),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(2),
    paddingHorizontal: wp(4),
    borderWidth: 1,
    backgroundColor: '#0d1117',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(3),
  },
  icon: {
    width: wp(8),
    height: hp(4),
    marginRight: wp(2),
  },
});

export default PaymentOptionCard;
