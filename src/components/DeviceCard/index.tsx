import React from 'react';
import { Image, View } from 'react-native';
import { hp } from '../../utils';
import { StyleSheet } from 'react-native';
import Space from '../Space';
import MyText from '../MyText';

const DeviceCard = ({
  isConnected = false,
  deviceName = 'Device Name',
  userName = 'User Name / Service',
  containerStyle = {},
  imageStyle = {},
}) => {
  return (
    <View style={[styles.cardContainer, containerStyle]}>
      <View style={styles.innerContainer}>
        <Image
          source={{ uri: 'https://picsum.photos/200/300' }}
          style={[styles.deviceImage, imageStyle]}
        />
        <Space mT={10} />
        <View>
          <View style={styles.deviceInfoRow}>
            <MyText
              numberOfLines={2}
              style={styles.deviceName}
              fontFamily="Outfit-SemiBold"
              fontSize={hp(1.4)}
            >
              {deviceName}
            </MyText>
            {isConnected && (
              <View style={styles.statusDot} />
            )}
          </View>
          <Space mT={5} />
          <MyText fontFamily="Outfit-Medium" color="#5E6272" fontSize={hp(1.2)}>
            {userName}
          </MyText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#262A3490',
    paddingVertical: hp(1.2),
    borderRadius: hp(1.2),
    marginBottom: hp(2),
    width: hp(20),
    alignItems: 'center',
    borderWidth: .5,
    borderColor: '#00C9FF3B',
  },
  innerContainer: {
    alignItems: 'flex-start',
  },
  deviceImage: {
    height: hp(10),
    width: hp(17),
    borderRadius: hp(0.6),
  },
  deviceInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: hp(17),
  },
  deviceName: {
    width: hp(16),
  },
  statusDot: {
    height: hp(1.4),
    width: hp(1.4),
    borderRadius: hp(0.7),
    backgroundColor: '#FF0000',
  },
});

export default DeviceCard;
