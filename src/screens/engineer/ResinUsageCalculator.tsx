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
import { EngineerStackParamList } from '../../navigation';
import { StackNavigationProp } from '@react-navigation/stack';
import MyText from '../../components/MyText';
import GradientButton from '../../components/GradientButton';

const ResinUsageCalculator = () => {
  const navigation =
    useNavigation<StackNavigationProp<EngineerStackParamList>>();
  const [inputs, setInputs] = useState({
    costOfResin: '',
    inputTdsWater: '',
    sizeOfVessel: '',
    litersUsedPerMonth: '',
  });
  const [showResult, setShowResult] = useState(false);
  const [results, setResults] = useState({});

  const handleInputChange = (field: string, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const calculateResults = () => {
    const costPerLiter =
      Number.parseFloat(inputs.costOfResin) /
      Number.parseFloat(inputs.sizeOfVessel);
    const estimatedMonthlyCost =
      costPerLiter * Number.parseFloat(inputs.litersUsedPerMonth);
    const changeOfVesselEvery =
      (Number.parseFloat(inputs.sizeOfVessel) /
        Number.parseFloat(inputs.litersUsedPerMonth)) *
      4; // weeks

    const calculatedResults = {
      title: 'Result',
      data: [
        { label: 'Cost per Liter', value: `${costPerLiter.toFixed(3)}` },
        {
          label: 'Estimated Monthly Cost',
          value: `${estimatedMonthlyCost.toFixed(2)}`,
        },
        {
          label: 'Change Of Vessel Every',
          value: `${changeOfVesselEvery.toFixed(1)} weeks`,
        },
      ],
    };

    setResults(calculatedResults);
    setShowResult(true);
  };

  const resetForm = () => {
    setInputs({
      costOfResin: '',
      inputTdsWater: '',
      sizeOfVessel: '',
      litersUsedPerMonth: '',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        isBack
        isNotification
        isProfile
        onBackPress={() => navigation?.navigate('CalculatorsScreen')}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <MyText fontFamily="Outfit-SemiBold" style={styles.title}>
          Resin Usage calculator
        </MyText>
        <MyText fontFamily="Outfit-Regular" style={styles.subtitle}>
          Please fill the following & calculate.
        </MyText>

        <View style={styles.inputGroup}>
          <MyText style={styles.inputLabel}>Cost of Resin</MyText>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={inputs.costOfResin}
              onChangeText={value => handleInputChange('costOfResin', value)}
              placeholder="0.5"
              placeholderTextColor="#666"
              keyboardType="numeric"
            />
            <MyText style={styles.inputUnit}>per 25 Ltr pack</MyText>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <MyText style={styles.inputLabel}>Input TDS (0-999)</MyText>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={inputs.inputTdsWater}
              onChangeText={value => handleInputChange('inputTdsWater', value)}
              placeholder="10"
              placeholderTextColor="#666"
              keyboardType="numeric"
            />
            <MyText style={styles.inputUnit}>part/million (ppm)</MyText>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <MyText style={styles.inputLabel}>Size of DI Vessel</MyText>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={inputs.sizeOfVessel}
              onChangeText={value => handleInputChange('sizeOfVessel', value)}
              placeholder="10"
              placeholderTextColor="#666"
              keyboardType="numeric"
            />
            <MyText style={styles.inputUnit}>Liters</MyText>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <MyText style={styles.inputLabel}>Liters used per month</MyText>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={inputs.litersUsedPerMonth}
              onChangeText={value =>
                handleInputChange('litersUsedPerMonth', value)
              }
              placeholder="4000"
              placeholderTextColor="#666"
              keyboardType="numeric"
            />
            <MyText style={styles.inputUnit}>Liters</MyText>
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
    padding: 20,
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
    fontSize: 16,
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
  },
  inputUnit: {
    fontSize: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
    marginBottom: 40,
    alignSelf: 'center',
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

export default ResinUsageCalculator;
