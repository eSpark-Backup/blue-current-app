'use client';

import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ResultModal from '../../components/ResultModal';
import Header from '../../components/Header';
import MyText from '../../components/MyText';
import GradientButton from '../../components/GradientButton';
import { StackNavigationProp } from '@react-navigation/stack';
import { EngineerStackParamList } from '../../navigation';
import { hp } from '../../utils';

const FlowRateCalculator = () => {
    const navigation = useNavigation<StackNavigationProp<EngineerStackParamList>>();
  const [inputs, setInputs] = useState({
    inputJugSize: '',
    pureJugSize1: '',
    wasteJugSize: '',
    timeForInputJug: '',
    timeForPureJug: '',
    timeForWasteJug: '',
    tankSize: '',
  });
  const [showResult, setShowResult] = useState(false);
  const [results, setResults] = useState({});

  const handleInputChange = (field: string, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const calculateResults = () => {
    const inputFlow =
      Number.parseFloat(inputs.inputJugSize) /
      (Number.parseFloat(inputs.timeForInputJug) / 60);
    const pureFlow =
      Number.parseFloat(inputs.pureJugSize1) /
      (Number.parseFloat(inputs.timeForPureJug) / 60);
    const wasteFlow =
      Number.parseFloat(inputs.wasteJugSize) /
      (Number.parseFloat(inputs.timeForWasteJug) / 60);

    const calculatedResults = {
      title: 'Flow Rates',
      data: [
        { label: 'Flow Rates', value: null },
        {
          label: 'Input:',
          value: `${inputFlow.toFixed(2)} L/min (${(inputFlow * 60).toFixed(
            2,
          )} L/h)`,
        },
        {
          label: 'Pure:',
          value: `${pureFlow.toFixed(2)} L/min (${(pureFlow * 60).toFixed(
            2,
          )} L/h)`,
        },
        {
          label: 'Waste:',
          value: `${wasteFlow.toFixed(2)} L/min (${(wasteFlow * 60).toFixed(
            2,
          )} L/h)`,
        },
        { label: 'Split % of Input', value: null },
        {
          label: 'Pure:',
          value: `${((pureFlow / inputFlow) * 100).toFixed(2)}%`,
        },
        {
          label: 'Waste:',
          value: `${((wasteFlow / inputFlow) * 100).toFixed(2)}%`,
        },
        { label: 'Split % of Output', value: null },
        {
          label: 'Pure:',
          value: `${((pureFlow / (pureFlow + wasteFlow)) * 100).toFixed(2)}%`,
        },
        {
          label: 'Waste:',
          value: `${((wasteFlow / (pureFlow + wasteFlow)) * 100).toFixed(2)}%`,
        },
        { label: 'Tank Fill', value: null },
        {
          label: 'Time to fill 500L:',
          value: `${(500 / (pureFlow * 60)).toFixed(2)} hours`,
        },
        {
          label: 'Waste water used:',
          value: `${(500 * (wasteFlow / pureFlow)).toFixed(2)} liters`,
        },
      ],
    };

    setResults(calculatedResults);
    setShowResult(true);
  };

  const resetForm = () => {
    setInputs({
      inputJugSize: '',
      pureJugSize1: '',
      wasteJugSize: '',
      timeForInputJug: '',
      timeForPureJug: '',
      timeForWasteJug: '',
      tankSize: '',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        isBack
        isNotification
        isProfile
        onBackPress={() => navigation?.navigate("CalculatorsScreen")}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <MyText fontFamily="Outfit-SemiBold" style={styles.title}>
          Flow Rate calculator
        </MyText>
        <MyText fontFamily="Outfit-Regular" style={styles.subtitle}>
          Please fill the following & calculate.
        </MyText>

        <View style={styles.inputGroup}>
          <MyText style={styles.inputLabel}>Input Jug Size (L)</MyText>
          <View style={styles.inputContainer}>
            <TextInput
              value={inputs.inputJugSize}
              style={styles.input}
              onChangeText={value => handleInputChange('inputJugSize', value)}
              placeholder="10"
              placeholderTextColor="#666"
              keyboardType="numeric"
            />
            <MyText style={styles.inputUnit}>per 25 Ltr sack</MyText>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <MyText style={styles.inputLabel}>Pure Jug Size (L)</MyText>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={inputs.pureJugSize1}
              onChangeText={value => handleInputChange('pureJugSize1', value)}
              placeholder="10"
              placeholderTextColor="#666"
              keyboardType="numeric"
            />
            <MyText style={styles.inputUnit}>part/million (ppm)</MyText>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <MyText style={styles.inputLabel}>Waste Jug Size</MyText>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={inputs.wasteJugSize}
              onChangeText={value => handleInputChange('wasteJugSize', value)}
              placeholder="10"
              placeholderTextColor="#666"
              keyboardType="numeric"
            />
            <MyText style={styles.inputUnit}>Liters</MyText>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <MyText style={styles.inputLabel}>
            Time for Input Jug (Min or Sec)
          </MyText>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={inputs.timeForInputJug}
              onChangeText={value =>
                handleInputChange('timeForInputJug', value)
              }
              placeholder="4000"
              placeholderTextColor="#666"
              keyboardType="numeric"
            />
            <MyText style={styles.inputUnit}>Liters</MyText>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <MyText style={styles.inputLabel}>
            Time for Pure Jug (Min or Sec)
          </MyText>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={inputs.timeForPureJug}
              onChangeText={value => handleInputChange('timeForPureJug', value)}
              placeholder="4000"
              placeholderTextColor="#666"
              keyboardType="numeric"
            />
            <MyText style={styles.inputUnit}>Liters</MyText>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <MyText style={styles.inputLabel}>
            Time for Waste Jug (Min or Sec)
          </MyText>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={inputs.timeForWasteJug}
              onChangeText={value =>
                handleInputChange('timeForWasteJug', value)
              }
              placeholder="4000"
              placeholderTextColor="#666"
              keyboardType="numeric"
            />
            <MyText style={styles.inputUnit}>Liters</MyText>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <MyText style={styles.inputLabel}>Tank Size (L)</MyText>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={inputs.tankSize}
              onChangeText={value => handleInputChange('tankSize', value)}
              placeholder="500"
              placeholderTextColor="#666"
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <GradientButton
            colors={['#212222', '#212222']}
            title="Reset"
            onPress={resetForm}
          />
          <GradientButton
            colors={['#212222', '#004F65']}
            title="Calculate"
            onPress={calculateResults}
          />
        </View>
      </ScrollView>

      <ResultModal
        visible={showResult}
        onClose={() => setShowResult(false)}
        results={results}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
  },
  inputContainer: {
    backgroundColor: '#181818',
    borderRadius: 8,
    padding: 5,
    paddingHorizontal: 10,
    minHeight: hp(5.5),
    color: '#fff',
    marginBottom: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  input: {
    width: '72%',
    color: '#fff',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputUnit: {
    fontSize: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 40,
    alignSelf: 'center'
  },
  resetButton: {
    flex: 1,
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  calculateButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  calculateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
   title: {
    fontSize: 28,
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#999',
    marginBottom: 30,
  },
});

export default FlowRateCalculator;
