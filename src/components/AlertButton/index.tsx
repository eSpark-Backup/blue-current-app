import React from 'react';
import { StyleSheet } from 'react-native';
import MyButton from '../MyButton';
import { hp, wp } from '../../utils';

type AlertButtonProps = {
  onPress: () => void;
};

const AlertButton: React.FC<AlertButtonProps> = ({ onPress }) => {
  return (
    <MyButton
      title="Alert ⚠️"
      onPress={onPress}
      containerStyle={styles.container}
      textStyle={styles.text}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    borderRadius: 6,
    paddingVertical: hp(0.7),
    paddingHorizontal: wp(4),
    alignSelf: 'center',
  },
  text: {
    fontSize: hp(1.6),
    fontWeight: '600',
    color: '#fff',
  },
});

export default AlertButton;
