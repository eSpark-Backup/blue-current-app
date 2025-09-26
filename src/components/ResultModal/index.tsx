import type React from 'react';
import { useRef, useEffect, use } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MyText from '../MyText';
import { useTheme } from '@react-navigation/native';
import { wp } from '../../utils';

const { height: screenHeight } = Dimensions.get('window');

interface ResultModalProps {
  visible: boolean;
  onClose: () => void;
  results: {
    title?: string;
    data?: Array<{ label: string; value: string }>;
  };
}

const ResultModal: React.FC<ResultModalProps> = ({
  visible,
  onClose,
  results,
}) => {
  const { colors } = useTheme();
  const translateY = useRef(new Animated.Value(0)).current;
  const styles = useStyles();
  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationY: translateY } }],
    { useNativeDriver: true },
  );

  const onHandlerStateChange = (event: any) => {
    if (event.nativeEvent.oldState === 4) {
      // ACTIVE
      const { translationY, velocityY } = event.nativeEvent;

      if (translationY > 100 || velocityY > 500) {
        onClose();
      } else {
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    }
  };

  useEffect(() => {
    if (visible) {
      translateY.setValue(0);
    }
  }, [visible]);

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection="down"
      style={styles.modal}
      backdropOpacity={0.5}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropColor="#cdcdcd80"
    >
      <Animated.View
        style={[
          styles.modalContent,
          {
            transform: [{ translateY }],
          },
        ]}
      >
        <View style={styles.dragIndicator} />

        <View style={styles.header}>
          <MyText style={styles.title}>{'Result'}</MyText>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Icon name="close" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {results.data?.map((item, index) => (
            <View
              key={index}
              style={
                item.value == null
                  ? {
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 12,
                      borderTopWidth: 1,
                      borderTopColor: '#404040',
                      marginTop: 10,
                    }
                  : styles.resultRow
              }
            >
              <MyText
                style={[
                  styles.resultLabel,
                  item.value == null && { textAlign: 'center' },
                ]}
              >
                {item.label}
              </MyText>
              {item.value != null && (
                <MyText style={styles.resultValue}>{item.value}</MyText>
              )}
            </View>
          ))}
        </View>
      </Animated.View>
    </Modal>
  );
};

const useStyles = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    modal: {
      justifyContent: 'flex-end',
      margin: 0,
    },
    modalContent: {
      backgroundColor: '#000',
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
      minHeight: screenHeight * 0.4,
      maxHeight: screenHeight * 0.8,
    },
    dragIndicator: {
      width: wp(50),
      height: 4,
      backgroundColor: colors.primary,
      borderRadius: 2,
      alignSelf: 'center',
      marginTop: 8,
      marginBottom: 16,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#333',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#fff',
    },
    closeButton: {
      padding: 4,
    },
    content: {
      padding: 20,
      paddingHorizontal: 25
    },
    resultRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 12,
    },
    resultLabel: {
      fontSize: 16,
      color: '#fff',
      flex: 1,
    },
    resultValue: {
      fontSize: 16,
      fontWeight: '600',
      textAlign: 'right',
      flex: 1,
    },
  });
};

export default ResultModal;
