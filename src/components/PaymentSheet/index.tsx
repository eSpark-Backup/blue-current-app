import React, { useState } from 'react';
import { View, Modal, StyleSheet, Pressable } from 'react-native';
import MyText from '../MyText';
import { hp } from '../../utils';
import Icon from 'react-native-vector-icons/Ionicons';
import PaymentOptionCard from '../PayementOptionCard';
import { PlusSign, VisaLogo } from '../../assets/svg';
import MyButton from '../MyButton';

interface PaymentSheetProps {
  visible: boolean;
  setVisible: (v: boolean) => void;
  onPress: () => void;
}

const PaymentSheet: React.FC<PaymentSheetProps> = ({
  visible,
  setVisible,
  onPress,
}) => {
  const [selected, setSelected] = useState('Master Card');

  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          {/* Header */}
          <View style={styles.header}>
            <MyText fontFamily="Outfit-Bold" fontSize={hp(2)}>
              Upgrading Your Subscription
            </MyText>
            <Pressable onPress={() => setVisible(false)}>
              <Icon name="close" size={24} color="white" />
            </Pressable>
          </View>

          {/* Payment Options */}
          <PaymentOptionCard
            title="Master Card"
            LeftComponent={<VisaLogo />}
            selected={selected === 'Master Card'}
            onPress={() => setSelected('Master Card')}
          />

          <PaymentOptionCard
            title="Visa Card"
            LeftComponent={<VisaLogo />}
            selected={selected === 'Visa Card'}
            onPress={() => setSelected('Visa Card')}
          />

          <PaymentOptionCard
            title="Add Debit Card"
            LeftComponent={<PlusSign />}
            selected={selected === 'Add Debit Card'}
            onPress={() => setSelected('Add Debit Card')}
          />
          <MyButton
            onPress={onPress}
            title="Proceed"
            containerStyle={styles.button}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  sheet: {
    backgroundColor: '#0d1117',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: hp(3),
    paddingHorizontal: hp(3),
    minHeight: hp(80),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(3),
  },
  button: {
    backgroundColor: '#00C9FF',
    borderRadius: 8,
    paddingVertical: hp(0.5),
    width: '40%',
    alignSelf: 'center',
    marginVertical: hp(3.4),
  },
});

export default PaymentSheet;
