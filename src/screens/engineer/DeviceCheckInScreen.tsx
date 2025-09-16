import type React from 'react';
import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Platform,
  Alert,
} from 'react-native';
import { YesNoToggle } from '../../components/YesNoToggle';
import Header from '../../components/Header';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { EngineerStackParamList } from '../../navigation';
import MyText from '../../components/MyText';
import { hp } from '../../utils';
import Space from '../../components/Space';
import { CameraSvg } from '../../assets/svg';
import {
  launchCamera,
  launchImageLibrary,
  CameraOptions,
  ImageLibraryOptions,
  Asset,
} from 'react-native-image-picker';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';
import MyInput from '../../components/MyInput';

const DeviceCheckInScreen: React.FC = () => {
  const [deviceNumber, setDeviceNumber] = useState('');
  const [waterFilterChanged, setWaterFilterChanged] = useState<boolean | null>(
    true,
  );
  const [waterTankFlushed, setWaterTankFlushed] = useState<boolean | null>(
    true,
  );
  const [hosesTankCleared, setHosesTankCleared] = useState<boolean | null>(
    false,
  );
  const [allFiltersSecured, setAllFiltersSecured] = useState<boolean | null>(
    true,
  );
  const [systemTested, setSystemTested] = useState<boolean | null>(true);
  const [photo, setPhoto] = useState<Asset | null>(null);
  // Permission helpers

  const showSettingsAlert = (type: 'Camera' | 'Gallery') => {
    Alert.alert(
      `${type} Permission Required`,
      `Please enable ${type.toLowerCase()} access in your device settings to continue.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open Settings', onPress: () => openSettings() },
      ],
    );
  };

  const requestCameraPermission = async () => {
    let result;
    if (Platform.OS === 'android') {
      result = await request(PERMISSIONS.ANDROID.CAMERA);
    } else {
      result = await request(PERMISSIONS.IOS.CAMERA);
    }
    if (result === RESULTS.BLOCKED || result === RESULTS.DENIED) {
      showSettingsAlert('Camera');
      return false;
    }
    return result === RESULTS.GRANTED;
  };

  const requestGalleryPermission = async () => {
    let result;
    if (Platform.OS === 'android') {
      result = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
    } else {
      result = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
    }
    if (result === RESULTS.BLOCKED || result === RESULTS.DENIED) {
      showSettingsAlert('Gallery');
      return false;
    }
    return result === RESULTS.GRANTED;
  };

  const handleAddPhoto = async () => {
    Alert.alert('Add Photo', 'Choose an option', [
      {
        text: 'Camera',
        onPress: async () => {
          const granted = await requestCameraPermission();
          if (!granted) {
            Alert.alert('Permission Denied', 'Camera permission is required.');
            return;
          }
          launchCamera({ mediaType: 'photo', quality: 0.7 }, response => {
            if (response.didCancel) return;
            if (response.errorCode) {
              Alert.alert('Error', response.errorMessage || 'Camera error');
              return;
            }
            if (response.assets && response.assets.length > 0) {
              setPhoto(response.assets[0]);
            }
          });
        },
      },
      {
        text: 'Gallery',
        onPress: async () => {
          const granted = await requestGalleryPermission();
          if (!granted) {
            Alert.alert('Permission Denied', 'Gallery permission is required.');
            return;
          }
          launchImageLibrary({ mediaType: 'photo', quality: 0.7 }, response => {
            if (response.didCancel) return;
            if (response.errorCode) {
              Alert.alert('Error', response.errorMessage || 'Gallery error');
              return;
            }
            if (response.assets && response.assets.length > 0) {
              setPhoto(response.assets[0]);
            }
          });
        },
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const navigation =
    useNavigation<StackNavigationProp<EngineerStackParamList>>();

  return (
    <View style={styles.container}>
      <Header
        isBack
        onBackPress={() =>
          navigation?.canGoBack?.() ? navigation?.goBack() : null
        }
        title={'Service Worksheet'}
      />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View>
          <MyText fontFamily="Outfit-Bold" fontSize={hp(3.6)}>
            Johannes Smith
          </MyText>
          <MyText fontFamily="Gilroy-Regular" fontSize={hp(2)} color="#5E6272">
            Service ID: 124-424
          </MyText>
        </View>
        <Space mB={hp(3)} />
        {/* Device Check-in Section */}
        <View style={styles.section}>
          <MyText fontFamily="Gilroy-SemiBold" fontSize={hp(2)}>
            Device Check-in
          </MyText>
          <Space mB={hp(1.5)} />

          {/* Add Photo Area */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.photoArea}
            onPress={handleAddPhoto}
          >
            {photo?.uri ? (
              <Image
                source={{ uri: photo.uri }}
                style={{
                  width: hp(10),
                  height: hp(10),
                  borderRadius: 10,
                  marginBottom: hp(1.2),
                }}
                resizeMode="cover"
              />
            ) : (
              <>
                <CameraSvg />
                <Space mB={hp(1.2)} />
                <MyText
                  fontFamily="Gilroy-Regular"
                  color="#5E6272"
                  fontSize={hp(1.5)}
                >
                  Add Photo
                </MyText>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Device Number Section */}
        <View style={styles.section}>
          <MyText fontFamily="Gilroy-SemiBold" fontSize={hp(2.1)}>
            Put Device Number
          </MyText>
          <Space mB={hp(1.5)} />
          <TextInput
            style={styles.textInput}
            value={deviceNumber}
            onChangeText={setDeviceNumber}
            placeholder=""
            placeholderTextColor="#6B7280"
          />
        </View>

        {/* Questions Section */}
        <View style={styles.questionsSection}>
          <View style={styles.questionRow}>
            <MyText style={{ width: '50%' }}>Water Filter Changed?</MyText>
            <YesNoToggle
              value={waterFilterChanged}
              onValueChange={setWaterFilterChanged}
            />
          </View>

          <View style={styles.questionRow}>
            <MyText style={{ width: '50%' }}>Water tank flushed?</MyText>
            <YesNoToggle
              value={waterTankFlushed}
              onValueChange={setWaterTankFlushed}
            />
          </View>

          <View style={styles.questionRow}>
            <MyText style={{ width: '50%' }}>Hoses Tank Cleared?</MyText>
            <YesNoToggle
              value={hosesTankCleared}
              onValueChange={setHosesTankCleared}
            />
          </View>

          <View style={styles.questionRow}>
            <MyText style={{ width: '50%' }}>All Filters secured?</MyText>
            <YesNoToggle
              value={allFiltersSecured}
              onValueChange={setAllFiltersSecured}
            />
          </View>

          <View style={styles.questionRow}>
            <MyText style={{ width: '50%' }}>System tested and working</MyText>
            <YesNoToggle value={systemTested} onValueChange={setSystemTested} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DeviceCheckInScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    marginTop: 20,
    marginBottom: 40,
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  serviceId: {
    fontSize: 18,
    color: '#6B7280',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  photoArea: {
    borderWidth: 2,
    borderColor: '#5E6272',
    borderStyle: 'dashed',
    borderRadius: 14,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  cameraIcon: {
    marginBottom: 12,
  },
  cameraBody: {
    width: 48,
    height: 36,
    backgroundColor: '#6B7280',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  cameraLens: {
    width: 16,
    height: 16,
    backgroundColor: '#374151',
    borderRadius: 8,
  },
  addPhotoText: {
    fontSize: 18,
    color: '#6B7280',
    fontWeight: '500',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#00C9FF',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#FFFFFF',
    minHeight: 56,
  },
  questionsSection: {
    marginBottom: 40,
  },
  questionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  questionText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '500',
    flex: 1,
    marginRight: 16,
  },
});
