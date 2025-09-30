import React from 'react';
import { Modal, View, StyleSheet, TouchableOpacity } from 'react-native';
import MyText from './MyText';
import { hp, wp } from '../utils';
import { useTheme } from '@react-navigation/native';

interface ConfirmationModalProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
  onContinue?: () => void;
  backdropColor?: string;
  customButtons?: React.ReactNode;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  icon,
  title,
  description,
  isVisible,
  setIsVisible,
  onContinue = () => {},
  backdropColor = undefined,
  customButtons = undefined,
}) => {
  const styles = useStyles();
  return (
    <Modal
      visible={isVisible}
      transparent={backdropColor ? false : true}
      backdropColor={backdropColor}
      animationType="fade"
      onRequestClose={() => setIsVisible(false)}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <View style={styles.iconContainer}>{icon}</View>
          <MyText fontFamily="Outfit-SemiBold" style={styles.title}>
            {title}
          </MyText>
          <MyText fontFamily="Outfit-Regular" style={styles.description}>
            {description}
          </MyText>
          {customButtons ? (
            customButtons
          ) : (
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.closeButton}
              onPress={() => onContinue?.()}
            >
              <MyText
                fontFamily="Outfit-Regular"
                style={styles.closeButtonText}
              >
                Continue
              </MyText>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

const useStyles = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: '#000',
      borderRadius: wp(4),
      alignItems: 'center',
      width: wp(80),
      padding: wp(4),
    },
    iconContainer: {
      marginBottom: hp(2),
    },
    title: {
      color: '#fff',
      fontSize: hp(1.6),
      textAlign: 'center',
    },
    description: {
      color: '#666',
      fontSize: hp(1.4),
      marginBottom: hp(2.5),
      textAlign: 'center',
    },
    closeButton: {
      borderRadius: wp(2),
      paddingVertical: hp(2),
      paddingHorizontal: wp(8),
      borderColor: '#181A20',
      borderTopWidth: 1,
      width: '100%',
      alignItems: 'center',
    },
    closeButtonText: {
      color: colors.primary,
      fontSize: hp(1.7),
    },
  });
};

export default ConfirmationModal;
