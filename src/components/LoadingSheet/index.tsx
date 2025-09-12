import React, { useEffect, useRef, useState } from 'react';
import * as Progress from 'react-native-progress';
import {
  View,
  Text,
  Modal,
  Animated,
  Easing,
  Dimensions,
  StyleSheet,
} from 'react-native';
import Space from '../Space';
import { hp } from '../../utils';
import MyText from '../MyText';

interface LoadingSheetProps {
  visible: boolean;
  height?: number; // bottom sheet height (default = half screen)
  duration?: number; // how long it takes to complete (ms)
  onComplete?: () => void;
  color?: string; // progress color
  trackColor?: string; // background circle color
  size?: number; // circle size
  strokeWidth?: number; // thickness
}

const { height: screenHeight } = Dimensions.get('window');

const LoadingSheet: React.FC<LoadingSheetProps> = ({
  visible,
  height = screenHeight / 2,
  duration = 3000,
  onComplete,
  color = 'deepskyblue',
  trackColor = '#2e2e2e',
  size = 150,
  strokeWidth = 12,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [progressNum, setProgressNum] = useState(0);

  useEffect(() => {
    if (visible) {
      animatedValue.setValue(0);
      Animated.timing(animatedValue, {
        toValue: 110,
        duration,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start(({ finished }) => {
        if (finished && onComplete) onComplete();
      });
      const listenerId = animatedValue.addListener(({ value }) => {
        setProgressNum(value / 100);
      });
      return () => {
        animatedValue.removeListener(listenerId);
      };
    }
  }, [visible]);

  const progressValue = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
  });

  const percentageText = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.overlay}>
        <View style={[styles.sheet, { height }]}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: hp(10),
            }}
          >
            {/* Progress Circle using react-native-progress */}
            <Progress.Circle
              size={size}
              progress={progressNum}
              showsText={true}
              thickness={strokeWidth}
              color={color}
              unfilledColor={trackColor}
              borderWidth={0}
              animated={true}
              textStyle={{ fontSize: hp(2.5), color: 'white', fontWeight: 'bold' }}
            />
            
            <Space mB={hp(3)} />
            <MyText
              fontFamily="Outfit-Bold"
              fontSize={hp(2)}
              style={styles.label}
            >
              Verification
            </MyText>
          </View>
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
    alignItems: 'center',
    paddingVertical: 40,
  },
  percentText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  label: {
    fontWeight: '600',
    color: 'white',
    marginTop: 4,
  },
});

export default LoadingSheet;
