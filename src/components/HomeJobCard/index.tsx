import React from 'react';
import { Image, Touchable, TouchableOpacity, View, StyleSheet } from 'react-native';
import { hp } from '../../utils';
import MyText from '../MyText';

const HomeJobCard = ({
  name = 'Olly Smith',
  issue = 'Hardware issue',
  avatar = 'https://picsum.photos/200',
}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.leftContainer}>
        <View style={styles.infoRow}>
          <Image
            source={{ uri: avatar }}
            style={styles.avatar}
          />
          <View>
            <MyText fontFamily="Outfit-SemiBold" fontSize={hp(1.6)}>
              {name}
            </MyText>
            <MyText
              fontFamily="Outfit-Medium"
              fontSize={hp(1.2)}
              color="#5E6272"
            >
              {issue}
            </MyText>
          </View>
        </View>
      </View>
      <View style={styles.rightContainer}>
        <TouchableOpacity style={styles.viewButton} activeOpacity={0.7}>
          <MyText fontFamily="Outfit-Medium" fontSize={hp(1.4)}>
            View
          </MyText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    height: hp(8),
    backgroundColor: '#181A20',
    borderRadius: hp(1.2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: hp(2),
  },
  leftContainer: {
    height: hp(5),
    width: hp(16),
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  avatar: {
    height: hp(5),
    width: hp(5),
    borderRadius: hp(2.5),
  },
  rightContainer: {
    height: hp(5),
    width: hp(16),
    justifyContent: 'center',
  },
  viewButton: {
    height: hp(4),
    width: hp(10),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#212222',
    borderRadius: hp(1.2),
    alignSelf: 'flex-end',
  },
});

export default HomeJobCard;
