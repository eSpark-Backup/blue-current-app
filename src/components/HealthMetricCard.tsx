import React from 'react';
import { View, Image, StyleSheet, Pressable } from 'react-native';
import MyText from './MyText';
import Space from './Space';
import { hp, wp } from '../utils';

export type HealthMetricCardProps = {
  icon: any;
  title: string;
  date: string;
  update: string;
  onPress?: () => void;
};

export default function HealthMetricCard({
  icon,
  title,
  date,
  update,
  onPress,
}: HealthMetricCardProps) {
  return (
    <Pressable style={styles.metricCard} onPress={onPress}>
      <View style={styles.metricCardLeft}>
        <Image source={icon} style={styles.metricCardImage} />
        <View>
          <MyText fontFamily="Outfit-SemiBold" fontSize={16}>
            {title}
          </MyText>
          <Space mB={hp(0.3)} />
          <MyText fontFamily="Outfit-Medium" fontSize={14} color="#5E6272">
            {date}
          </MyText>
        </View>
      </View>
      <View>
        <MyText fontFamily="Outfit-Medium" fontSize={9} color="#5E6272">
          {update}
        </MyText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  metricCard: {
    borderWidth: 1.5,
    borderColor: '#9797971C',
    borderRadius: wp(2.5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: wp(3),
    alignItems: 'center',
  },
  metricCardLeft: {
    flexDirection: 'row',
    gap: wp(2.5),
    alignItems: 'center',
  },
  metricCardImage: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(2),
    marginRight: wp(2),
    resizeMode: 'contain',
  },
});
