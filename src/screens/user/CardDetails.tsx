import React, { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation, useTheme, Theme } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import Space from '../../components/Space';
import MyInput from '../../components/MyInput';
import MyButton from '../../components/MyButton';

import { UserStackParamList } from '../../navigation';
import { hp, wp } from '../../utils';

const CardDetailsScreen = () => {
  const navigation = useNavigation<StackNavigationProp<UserStackParamList>>();
  const theme: Theme = useTheme();

  const [problem, setProblem] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [expired, setExpired] = useState('');
  const [cvv, setCvv] = useState('');

  const handleSubmit = () => {
    if (!cardHolderName || !cardNumber || !expired || !cvv) {
      Alert.alert('Please fill in all fields');
      return;
    }
    navigation.navigate('Updates', { isUpdating: true });
    // Implement submit logic here
  };

  return (
    <>
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <Space mB={hp(2.5)} />
        <Image source={require('../../assets/images/CardImage.png')} />
        <Space mB={hp(2.5)} />
        <MyInput
          label="Card Number"
          variant="rounded"
          bgColor="transparent"
          value={cardNumber}
          onChangeText={setCardNumber}
          placeholder="Enter card number"
          labelColor="white"
        />
        <MyInput
          label="Card Holder Name"
          variant="rounded"
          bgColor="transparent"
          value={cardHolderName}
          onChangeText={setCardHolderName}
          placeholder="Enter card holder name"
          labelColor="white"
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: wp(4),
          }}
        >
          <MyInput
            label="Expired"
            variant="rounded"
            bgColor="transparent"
            value={expired}
            onChangeText={setExpired}
            placeholder="MM/YY"
            labelColor="white"
            style={{ flex: 1 }}
          />
          <MyInput
            label="CVV"
            placeholder="CVV"
            variant="rounded"
            bgColor="transparent"
            value={cvv}
            onChangeText={setCvv}
            labelColor="white"
            style={{ flex: 1 }}
          />
        </View>

        <MyButton
          onPress={handleSubmit}
          title="Submit"
          containerStyle={{
            backgroundColor: theme.colors.primary,
            alignSelf: 'center',
            paddingHorizontal: wp(8),
            borderRadius: wp(1.2),
            paddingVertical: hp(0.6),
            marginTop: hp(3),
            marginBottom: hp(8),
          }}
        />
      </ScrollView>
    </>
  );
};

export default CardDetailsScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(6),
  },
  deviceOverviewButton: {
    borderRadius: wp(1.2),
  },
});
function alert(arg0: string) {
  throw new Error('Function not implemented.');
}
