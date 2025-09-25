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
import { ModalSuccessSvg, UploadSvg } from '../../assets/svg';
import ConfirmationModal from '../../components/ConfirmationModal';
import LoadingSheet from '../../components/LoadingSheet';
import Calendar from '../../components/Calendar';

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
  const [uploadVisible, setUploadVisible] = useState(false);
  const [watchlistVisible, setWatchlistVisible] = useState(false);
  const [watchlistLoading, setWatchlistLoading] = useState(false);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false)
  const [reschedule, setReschedule] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

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

    const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setIsCalendarVisible(false)
    setReschedule(true)
  }

  const formatDate = (date: Date | null) => {
    if (!date) return "Select Date"

    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
      year: "numeric",
    }

    return date.toLocaleDateString("en-US", options)
  }
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
              <UploadSvg
                width={wp(6)}
                height={hp(3)}
                style={styles.uploadIconText}
              />
            </TouchableOpacity>
          </View>
        </View>

        <GradientButton
          title="Submit"
          onPress={() => setUploadVisible(true)}
          buttonStyle={styles.gradientButton}
        />
      </ScrollView>
      <ConfirmationModal
        title="Successfully Upload"
        description="details of device"
        icon={<ModalSuccessSvg />}
        isVisible={uploadVisible}
        setIsVisible={setUploadVisible}
        customButtons={
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.closeButton}
              onPress={() => {
                setIsCalendarVisible(true);
                setUploadVisible(false);
              }}
            >
              <MyText
                fontFamily="Outfit-Regular"
                style={styles.closeButtonText}
              >
                Reschedule
              </MyText>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.closeButton}
              onPress={() => {
                setUploadVisible(false);
                setWatchlistLoading(true);
              }}
            >
              <MyText
                fontFamily="Outfit-Regular"
                style={[styles.closeButtonText, { color: '#fff' }]}
              >
                Watchlist
              </MyText>
            </TouchableOpacity>
          </View>
        }
      />
      <ConfirmationModal
        title={reschedule ? "Successfully Reschedule" : "Successfully Access Watchlist"}
        description="details of device"
        icon={<ModalSuccessSvg />}
        isVisible={watchlistVisible || reschedule}
        setIsVisible={watchlistVisible ? setWatchlistVisible : setReschedule}
        customButtons={
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.closeButton}
              onPress={() => {
                setWatchlistVisible(false);
                setReschedule(false);
                navigation.navigate('Explore');
              }}
            >
              <MyText
                fontFamily="Outfit-Regular"
                style={styles.closeButtonText}
              >
                Go back to Device Dashboard
              </MyText>
            </TouchableOpacity>
          </View>
        }
      />
      <LoadingSheet
        visible={watchlistLoading}
        setVisible={setWatchlistLoading}
        title="Waiting For User to Responds"
        headerTitle="Watchlist Requested"
        isHeader
        onComplete={() => {
          setWatchlistLoading(false);
          setWatchlistVisible(true);
        }}
      />
      <Calendar
        isVisible={isCalendarVisible}
        onClose={() => setIsCalendarVisible(false)}
        selectedDate={selectedDate || undefined}
        onDateSelect={handleDateSelect}
        disablePastDates={true}
      />
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
  closeButton: {
    borderRadius: wp(2),
    paddingVertical: hp(1),
    paddingHorizontal: wp(8),
    borderColor: '#181A20',
    borderTopWidth: 1,
    width: '100%',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#00C9FF',
    fontSize: hp(1.7),
  },
});

export default WorkSheet;
