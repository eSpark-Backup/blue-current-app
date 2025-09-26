import React from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import MyText from '../../components/MyText';
import MyButton from '../../components/MyButton';

import MeasurementGrid, {
  MeasurementData,
} from '../../components/MeasurementGrid';
import { EngineerStackParamList } from '../../navigation';
import { hp, wp } from '../../utils';
import GradientButton from '../../components/GradientButton';
import LoadingSheet from '../../components/LoadingSheet';

export default function HomeScreen() {
  const navigation =
    useNavigation<StackNavigationProp<EngineerStackParamList>>();
  const [showLoader, setShowLoader] = React.useState(false);
  const [showButton, setShowButton] = React.useState(false);

  const measurementData: MeasurementData[] = [
    {
      id: '1',
      value: '6.9',
      label: 'pH',
      status: 'good',
      screenName: 'PHScreen',
    },
    {
      id: '2',
      value: '6.9',
      label: 'Turbidity',
      status: 'good',
      screenName: 'TurbidityScreen',
    },
    {
      id: '3',
      value: '6.9',
      label: 'Temperature',
      status: 'good',
      screenName: 'TemperatureScreen',
    },
    {
      id: '4',
      value: '6.9',
      label: 'Conductivity',
      status: 'good',
      screenName: 'ConductivityScreen',
    },
    {
      id: '5',
      value: '6.9',
      label: 'Power',
      status: 'good',
      screenName: 'PowerScreen',
    },
    {
      id: '6',
      value: '6.9',
      label: 'Heater',
      status: 'good',
      screenName: 'HeaterScreen',
    },
    {
      id: '7',
      value: '6.9',
      label: 'Dissolve oxygen',
      status: 'good',
      isFullWidth: true,
      screenName: 'DissolveOxygenScreen',
    },
  ];

  const handleCardPress = (item: MeasurementData) => {
    // In a real React Native app, you would use navigation here
    // Example: navigation.navigate(item.screenName, { measurementId: item.id });

    Alert.alert(
      'Navigation',
      `Navigate to ${item.screenName} for ${item.label}`,
      [{ text: 'OK' }],
    );

    console.log(`[v0] Navigating to ${item.screenName} for ${item.label}`);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.headerRow}>
          <View>
            <MyText fontFamily="Outfit-SemiBold" fontSize={36}>
              Dev123
            </MyText>
            <MyText fontFamily="Outfit-SemiBold" fontSize={14} color="#5E6272">
              Jimmy johnes
            </MyText>
          </View>
          <GradientButton
            title="Alert ⚠️"
            onPress={() => {
              setShowLoader(true);
            }}
            colors={['#630904', '#B50202']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            buttonStyle={styles.deviceOverviewButton}
            height={hp(4.25)}
            width={wp(25)}
            // containerStyle={styles.buttonContainer}
            textStyle={styles.buttonText}
          />
        </View>
        <View style={styles.divider80} />
        <View
          style={{
            backgroundColor: '#D9D9D9',
            height: hp(10),
            width: wp(80),
            margin: hp(2.5),
            alignSelf: 'center',
          }}
        />
        <View style={{ flex: 1, padding: wp(5) }}>
          <MeasurementGrid
            data={measurementData}
            onCardPress={handleCardPress}
            style={styles.grid}
            cardSpacing={12}
          />
        </View>
      </ScrollView>
      <LoadingSheet
        visible={showLoader}
        onComplete={() => {
          // setShowLoader(false);
          setShowButton(true);
        }}
        showButton={showButton}
        title="Problem detected"
        headerTitle="Detected"
        setVisible={setShowLoader}
        isHeader={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerRow: {
    padding: wp(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: wp(2.5),
  },
  deviceOverviewButton: {
    borderRadius: wp(2),
  },
  divider80: {
    height: 1,
    width: '80%',
    backgroundColor: '#5E6272',
    alignSelf: 'center',
  },

  grid: {
    marginBottom: 32,
  },

  buttonText: {
    fontSize: hp(1.6),
    fontWeight: '700',
    color: '#fff',
  },
});
