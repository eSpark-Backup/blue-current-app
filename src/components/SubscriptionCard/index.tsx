import React from 'react';
import { View, StyleSheet } from 'react-native';
import { hp, wp } from '../../utils';
import MyButton from '../MyButton';
import MyText from '../MyText';
import Space from '../Space';

type SubscriptionCardProps = {
  title: string;
  price: string;
  features: string[];
  isCurrent?: boolean;
  onPress: () => void;
};

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  title,
  price,
  features,
  isCurrent = false,
  onPress,
}) => (
  <View style={[styles.card, isCurrent && styles.activeCard]}>
    <View style={styles.header}>
      <MyText fontSize={hp(1.6)} color={isCurrent ? '#00C9FF' : '#fff'}>
        {title}
      </MyText>
      <MyButton
        title={isCurrent ? 'Current Package' : 'Update Package'}
        onPress={onPress}
        textStyle={styles.buttonText}
        containerStyle={[styles.button, isCurrent && styles.disabledButton]}
        disabled={isCurrent}
      />
    </View>
    <Space mB={hp(0.7)} />

    <MyText fontSize={hp(1.8)} fontWeight="bold" color="#fff">
      {price}
    </MyText>
    <Space mB={hp(0.7)} />

    <MyText fontSize={hp(1.5)} color="#979797" style={styles.featuresLabel}>
      Features:
    </MyText>
    <Space mB={hp(0.7)} />

    <View style={styles.featuresList}>
      {features.map(feature => (
        <MyText
          key={feature}
          fontSize={hp(1.5)}
          color="#fff"
          style={styles.featureItem}
        >
          • {feature}
        </MyText>
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8,
    padding: wp(4),
    // marginBottom: hp(2.5),
    // backgroundColor: '#181818',
  },
  activeCard: {
    borderColor: '#00C9FF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#078cb1ff',
    borderRadius: 8,
    paddingVertical: hp(0.5),
    paddingHorizontal: wp(2),
    alignSelf: 'center',
  },
  disabledButton: {
    backgroundColor: '#078cb1b4',
  },
  buttonText: {
    fontSize: hp(1.2),
  },
  featuresLabel: {
    marginTop: hp(1),
  },
  featuresList: {
    marginTop: hp(0.5),
    paddingLeft: wp(2),
    width: '95%',
  },
  featureItem: {
    marginBottom: hp(0.8),
    lineHeight: hp(2),
  },
});

export default SubscriptionCard;
