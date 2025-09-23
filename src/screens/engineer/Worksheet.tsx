import type React from 'react';
import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { hp, wp } from '../../utils';
import ServiceCard, { type Service } from '../../components/ServiceCard';
import Header from '../../components/Header';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { EngineerStackParamList } from '../../navigation';
import AddServiceForm from '../../components/AddServiceForm';
import MyText from '../../components/MyText';
import GradientButton from '../../components/GradientButton';
import { UploadSvg } from '../../assets/svg';

const WorkSheet: React.FC = () => {
  const navigation =
    useNavigation<StackNavigationProp<EngineerStackParamList>>();
  const [services, setServices] = useState<Service[]>([
    {
      id: '1',
      name: 'Hardware Damage',
      details: 'Details',
      isSelected: false,
    },
    {
      id: '2',
      name: 'Software Damage',
      details: 'Details',
      isSelected: false,
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);

  const handleToggleService = (id: string) => {
    setServices(prevServices =>
      prevServices.map(service =>
        service.id === id
          ? { ...service, isSelected: !service.isSelected }
          : service,
      ),
    );
  };

  const handleAddService = (name: string, details: string) => {
    const newService: Service = {
      id: Date.now().toString(),
      name,
      details,
      isSelected: false,
    };
    setServices(prevServices => [...prevServices, newService]);
    setShowAddForm(false);
  };

  const handleSubmit = () => {
    const selectedServices = services.filter(service => service.isSelected);
    if (selectedServices.length === 0) {
      Alert.alert(
        'No Services Selected',
        'Please select at least one service before submitting.',
      );
      return;
    }

    Alert.alert(
      'Worksheet Submitted',
      `Selected ${selectedServices.length} service(s): ${selectedServices
        .map(s => s.name)
        .join(', ')}`,
    );
  };

  return (
    <View style={styles.container}>
      <Header
        isBack
        isNotification
        isProfile
        onBackPress={() => navigation?.goBack?.()}
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <MyText fontFamily="Outfit-SemiBold" style={styles.title}>
          Worksheet
        </MyText>

        <View style={styles.servicesContainer}>
          {services.map(service => (
            <ServiceCard
              key={service.id}
              service={service}
              onToggle={handleToggleService}
            />
          ))}

          {showAddForm ? (
            <AddServiceForm
              onSave={handleAddService}
              onCancel={() => setShowAddForm(false)}
            />
          ) : (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setShowAddForm(true)}
              activeOpacity={0.8}
            >
              <Text style={styles.addButtonText}>+ Add</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.uploadSection}>
          <View style={styles.uploadContainer}>
            <View style={styles.uploadContent}>
              <MyText fontFamily="Outfit-Regular" style={styles.uploadTitle}>
                Upload Images
              </MyText>
              <MyText fontFamily="Outfit-Regular" style={styles.uploadSubtitle}>
                2mb file
              </MyText>
            </View>
            <TouchableOpacity style={styles.uploadIcon}>
              <UploadSvg width={wp(6)} height={hp(3)} style={styles.uploadIconText} />
            </TouchableOpacity>
          </View>
        </View>

        <GradientButton
          title="Submit"
          onPress={handleSubmit}
          buttonStyle={styles.gradientButton}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollView: {
    flex: 1,
    padding: wp(5),
  },
  scrollViewContent: {
    paddingBottom: hp(5),
  },
  title: {
    color: '#FFFFFF',
    fontSize: wp(7),
    marginBottom: hp(3),
  },
  servicesContainer: {
    marginBottom: hp(3),
    borderRadius: wp(3),
    borderWidth: 0.5,
    borderColor: '#00C9FF',
    padding: wp(3),
  },
  addButton: {
    backgroundColor: '#212222',
    borderRadius: wp(1.5),
    padding: wp(2.5),
    alignItems: 'center',
    width: wp(25),
    alignSelf: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: wp(4),
    fontWeight: '600',
  },
  uploadSection: {
    marginBottom: hp(3),
    borderRadius: wp(3),
    borderWidth: 0.5,
    borderColor: '#00C9FF',
    padding: wp(3),
  },
  uploadContainer: {
    backgroundColor: '#181818',
    borderRadius: wp(3),
    padding: wp(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  uploadContent: {
    flex: 1,
  },
  uploadTitle: {
    color: '#FFFFFF',
    fontSize: wp(4.5),
    fontWeight: '600',
    marginBottom: hp(0.5),
  },
  uploadSubtitle: {
    color: '#8E8E93',
    fontSize: wp(2.8),
  },
  uploadIcon: {
    padding: wp(2),
  },
  uploadIconText: {
    fontSize: wp(5),
  },
  gradientButton: {
    alignSelf: 'flex-end',
    height: hp(5),
  },
  submitButton: {
    backgroundColor: '#007AFF',
    borderRadius: wp(3),
    padding: wp(4),
    alignItems: 'center',
    marginBottom: hp(2.5),
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: wp(4.5),
    fontWeight: '600',
  },
});

export default WorkSheet;
