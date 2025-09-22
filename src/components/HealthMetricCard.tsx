import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import MyText from './MyText';
import Space from './Space';
import { hp, wp } from '../utils';

export type HealthMetricCardProps = {
  icon: any;
  title: string;
  date: string;
  update: string;
};

export default function HealthMetricCard({ icon, title, date, update }: HealthMetricCardProps) {
  return (
    <View style={styles.metricCard}>
      <View style={styles.metricCardLeft}>
        <Image
          source={icon}
          style={styles.metricCardImage}
        />
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
    </View>
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
    borderTopLeftRadius: wp(2.5),
    borderBottomLeftRadius: wp(2.5),
    marginRight: wp(2),
  },
});