import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import MyText from '../MyText';
import { hp, wp } from '../../utils';
import Icon from 'react-native-vector-icons/Entypo';
import Space from '../Space';

const NotificationCard = ({
  name = 'John Doe',
  message = 'Lorem Ipsum is simply dummy text of the printing',
  time = '15h',
  onViewPress = () => {},
  onThreeDotPress = () => {},
}) => {
  return (
    <View style={styles.cardRow}>
      <View style={styles.avatarContainer}>
        <MyText fontFamily="Outfit-Medium" fontSize={hp(1.4)}>
        {name
            ?.split(' ')
            ?.map((n) => n[0])
            ?.join('')
            ?.toUpperCase()}
        </MyText>
      </View>
      <Space mR={hp(1.5)} />
      <View style={styles.messageContainer}>
        <MyText fontFamily="Outfit-SemiBold" fontSize={hp(1.4)}>
          {message}
        </MyText>
        <Pressable
          style={styles.viewButton}
          onPress={onViewPress}
        >
          <MyText fontFamily="Outfit-Medium" fontSize={hp(1.4)}>
            View
          </MyText>
        </Pressable>
      </View>
      <Space mR={hp(1)} />
      <View style={styles.timeContainer}>
        <MyText fontFamily="Outfit-Medium" fontSize={hp(1.4)} color="#5E6272">
          {time}
        </MyText>
        <Icon name="dots-three-horizontal" color={'#E2E8F0'} size={hp(1.8)} onPress={onThreeDotPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  avatarContainer: {
    height: hp(6),
    width: hp(6),
    backgroundColor: '#334155',
    borderRadius: hp(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageContainer: {
    width: wp(60),
  },
  viewButton: {
    backgroundColor: '#2E70E8',
    padding: hp(1),
    borderRadius: hp(0.5),
    width: hp(8),
    marginTop: hp(1),
    alignItems: 'center',
  },
  timeContainer: {
    alignItems: 'center',
    rowGap: hp(1),
  },
});

export default NotificationCard;
