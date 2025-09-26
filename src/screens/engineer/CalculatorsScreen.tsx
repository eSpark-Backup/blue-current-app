import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { EngineerStackParamList } from '../../navigation';
import Header from '../../components/Header';
import MyText from '../../components/MyText';

const CalculatorsScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<EngineerStackParamList>>();

  const calculators = [
    {
      title: 'Flow Rate calculator',
      subtitle: 'Calculate flow rates for your system',
      screen: 'FlowRateCalculator',
    },
    {
      title: 'Resin Usage calculator',
      subtitle: 'Calculate resin consumption',
      screen: 'ResinUsageCalculator',
    },
    {
      title: 'Waste Ration calculator',
      subtitle: 'Calculate waste ratios',
      screen: 'WasteUsageCalculator',
    },
  ];

  return (
    <View style={styles.container}>
      <Header
        isBack
        isNotification
        isProfile
        onBackPress={() => navigation?.goBack?.()}
      />
      <View style={styles.content}>
        <MyText fontFamily='Outfit-SemiBold' style={styles.title}>Calculators</MyText>
        <MyText fontFamily='Outfit-Regular' style={styles.subtitle}>
          Choose a calculator you're looking for
        </MyText>

        <View style={styles.calculatorsList}>
          {calculators.map((calc, index) => (
            <TouchableOpacity
              key={index}
              style={styles.calculatorItem}
              onPress={() => navigation.navigate(calc.screen as never)}
            >
              <View style={styles.calculatorContent}>
                <MyText fontFamily='Outfit-Medium' style={styles.calculatorTitle}>{calc.title}</MyText>
                {/* <MyText style={styles.calculatorSubtitle}>{calc.subtitle}</MyText> */}
              </View>
              <Icon name="chevron-right" size={24} color="#666" />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
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
  calculatorsList: {
    flex: 1,
  },
  calculatorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#9797971C',
  },
  calculatorContent: {
    flex: 1,
  },
  calculatorTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  calculatorSubtitle: {
    fontSize: 14,
    color: '#999',
  },
});

export default CalculatorsScreen;
