import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import {
  useNavigation,
  useTheme,
  Theme,
  RouteProp,
  useRoute,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { UserStackParamList } from '../../navigation';
import { hp, wp } from '../../utils';
import Space from '../../components/Space';
import MyText from '../../components/MyText';
import MyInput from '../../components/MyInput';
import GradientButton from '../../components/GradientButton';
import MyButton from '../../components/MyButton';
import { ModalSuccessSvg, UploadSvg } from '../../assets/svg';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import MyInputRight from '../../components/MyInputRight/index.';
import ConfirmationModal from '../../components/ConfirmationModal';

const imagePickerOptions: ImageLibraryOptions = {
  mediaType: 'photo',
  quality: 1,
};
type RequestEngineerRouteProp = RouteProp<
  UserStackParamList,
  'RequestEngineer'
>;

const RequestEngineerScreen = () => {
  const navigation = useNavigation<StackNavigationProp<UserStackParamList>>();
  const theme: Theme = useTheme();
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [deviceImage, setDeviceImage] = useState<string>('');
  const [problem, setProblem] = useState('');
  const [hardwareProblem, setHardwareProblem] = useState('');
  const [softwareProblem, setSoftwareProblem] = useState('');
  const [description, setDescription] = useState('');
  const route = useRoute<RequestEngineerRouteProp>();
  const selectedLog = route.params?.selectedLog;

  const handleUpload = () => {
    launchImageLibrary(imagePickerOptions, response => {
      if (response.assets && response.assets.length > 0) {
        setDeviceImage(response.assets[0].uri || '');
      }
    });
  };

  const handleSubmit = () => {
    if (!selectedLog) {
      Alert.alert('Please attach a log');
      return;
    }
    setIsModalVisible(true);
    // navigation.navigate('Home');
    // Implement submit logic here
  };
  const handleAttachLog = () => {
    navigation.navigate('Firmware', { fromRequestEngineer: true });
  };

  return (
    <>
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <Space mB={hp(2.5)} />
        <View>
          <MyText fontFamily="Outfit-SemiBold" fontSize={36}>
            Request For Engineer
          </MyText>
          <MyText fontFamily="Outfit-SemiBold" fontSize={14} color="#5E6272">
            Input your queries
          </MyText>
        </View>
        <Space mB={hp(2.5)} />
        <MyInput
          label="Problem"
          variant="rounded"
          bgColor="transparent"
          value={problem}
          onChangeText={setProblem}
          placeholder="Input your problem here"
          labelColor="white"
        />
        <MyInput
          label="Hardware Problem"
          variant="rounded"
          bgColor="transparent"
          value={hardwareProblem}
          onChangeText={setHardwareProblem}
          placeholder="Input your problem here"
          labelColor="white"
        />
        <MyInput
          label="Software Problem"
          variant="rounded"
          bgColor="transparent"
          value={softwareProblem}
          onChangeText={setSoftwareProblem}
          placeholder="Input your problem here"
          labelColor="white"
        />
        <MyInput
          label="Description"
          variant="rounded"
          bgColor="transparent"
          value={description}
          onChangeText={setDescription}
          placeholder="Input your description here"
          labelColor="white"
        />
        <MyInputRight
          value={selectedLog || ''}
          onChangeText={() => {}}
          placeholder="Attach Log set for engineer"
          variant="rounded"
          RightComponent={
            <GradientButton
              title="Attached Log"
              onPress={handleAttachLog}
              colors={['#630904', '#B50202']}
              start={{ x: 0, y: 1 }}
              end={{ x: 0, y: 0 }}
              buttonStyle={styles.deviceOverviewButton}
              height={hp(3.5)}
              width={wp(28)}
              textStyle={{ fontSize: hp(1.6), fontFamily: 'Outfit-Medium' }}
            />
          }
          // onRightPress={handleAttachLog}
          labelColor="white"
          bgColor="transparent"
        />
        <MyInputRight
          label="Upload Image"
          value={deviceImage}
          onChangeText={() => {}}
          placeholder="Upload Your Device Image"
          variant="rounded"
          RightComponent={<UploadSvg stroke="pink" />}
          onRightPress={handleUpload}
          labelColor="white"
          bgColor="transparent"
        />
        <MyButton
          onPress={handleSubmit}
          title="Submit Request"
          containerStyle={{
            backgroundColor: theme.colors.primary,
            alignSelf: 'center',
            paddingHorizontal: wp(5),
            borderRadius: wp(1.2),
            paddingVertical: hp(0.6),
            marginTop: hp(3),
            marginBottom: hp(8),
          }}
        />
      </ScrollView>
      <ConfirmationModal
        icon={<ModalSuccessSvg />}
        title="Request Submitted"
        description="Your request has been submitted. You will be notified when the engineer responds."
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        onContinue={() => {
          setIsModalVisible(false);
          navigation?.goBack?.();
        }}
      />
    </>
  );
};

export default RequestEngineerScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(6),
  },
  deviceOverviewButton: {
    borderRadius: wp(1.2),
  },
});
function alert(arg0: string) {
  throw new Error('Function not implemented.');
}
