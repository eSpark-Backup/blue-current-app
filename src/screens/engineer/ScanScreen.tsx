import { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import GradientButton from '../../components/GradientButton';
import Modal from 'react-native-modal';
import { Detected, DeviceSearching, DummyScanner } from '../../assets/images';
import MyText from '../../components/MyText';
import { useNavigation, useTheme } from '@react-navigation/native';
import Header from '../../components/Header';
import { EngineerStackParamList } from '../../navigation';
import { StackNavigationProp } from '@react-navigation/stack';
import ConfirmationModal from '../../components/ConfirmationModal';
import { ModalSuccessSvg } from '../../assets/svg';
import { hp, wp } from '../../utils';

const { width, height } = Dimensions.get('window');

type FlowStep =
  | 'detecting'
  | 'detected'
  | 'notDetected'
  | 'qrScanner'
  | 'qrSuccess'
  | 'credentials';

export default function ScanScreen() {
  const navigation =
    useNavigation<StackNavigationProp<EngineerStackParamList>>();

  const [visible, setVisible] = useState(true);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState<FlowStep>('detecting');
  const [progress, setProgress] = useState(0);
  const styles = useStyles();

  useEffect(() => {
    if (visible && currentStep === 'detecting') {
      setProgress(0);

      const timer = setTimeout(() => {
        const success = false; // Math.random() > 0.3
        setCurrentStep(success ? 'detected' : 'notDetected');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [visible, currentStep]);

  useEffect(() => {
    if (currentStep === 'detecting') {
      const interval = setInterval(() => {
        setProgress(prev => (prev + 1) % 100);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [currentStep]);

  const handleClose = () => {
    setVisible(false);
  };

  const handleActivate = () => {
    setVisible(false);
    setCurrentStep('qrScanner');
  };

  const handleTryAnother = () => {
    setVisible(false);
    setCurrentStep('qrScanner');
  };

  const handleQRScan = () => {
    setTimeout(() => {
      setVisible(false);
      setConfirmationVisible(true);
    }, 1500);
  };

  const renderDetectingScreen = () => (
    <View style={styles.screenContainer}>
      <View style={styles.header}>
        <MyText fontFamily="Outfit-SemiBold" style={styles.title}>
          Detecting Monitor
        </MyText>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <Icon name="close" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.deviceContainer}>
        <Image source={DeviceSearching} style={{ width: 120, height: 120 }} />
        <MyText style={styles.statusText}>Still Looking...</MyText>
      </View>

      <MyText style={styles.instructionText}>
        Try moving your NFC around to find the NFC{'\n'}reader on your device.
      </MyText>
    </View>
  );

  const renderDetectedScreen = () => (
    <View style={styles.screenContainer}>
      <View style={styles.header}>
        <MyText fontFamily="Outfit-SemiBold" style={styles.title}>
          Monitor Detected
        </MyText>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <Icon name="close" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.deviceContainer}>
        <Image
          source={Detected}
          style={{ width: '75%', height: 75, marginBottom: 12 }}
        />
        <MyText style={styles.deviceInfo}>
          Activate Engineer Mode for Monitor SN:{'\n'}ABC1234567
        </MyText>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={handleClose}>
          <MyText style={styles.cancelButtonText}>Cancel</MyText>
        </TouchableOpacity>
        <View style={{ backgroundColor: '#333', width: 1 }} />
        <TouchableOpacity
          style={styles.activateButton}
          onPress={handleActivate}
        >
          <MyText style={styles.activateButtonText}>Activate</MyText>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderNotDetectedScreen = () => (
    <View style={styles.screenContainer}>
      <View style={styles.header}>
        <MyText style={styles.title}>Not Detected</MyText>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <Icon name="close" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.deviceContainer}>
        <Image
          source={Detected}
          style={{ width: '75%', height: 75, marginBottom: 22 }}
        />
        <MyText style={styles.errorText}>
          Something went wrong. Please check your{'\n'}connection & try again.
        </MyText>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={handleClose}>
          <MyText style={styles.cancelButtonText}>Cancel</MyText>
        </TouchableOpacity>
        <View style={{ backgroundColor: '#333', width: 1 }} />
        <TouchableOpacity
          style={styles.tryAnotherButton}
          onPress={handleTryAnother}
        >
          <MyText style={styles.tryAnotherButtonText}>
            Try Another Method
          </MyText>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderQRScannerScreen = () => (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get('window').height - 150,
      }}
    >
      <View
        style={[
          styles.screenContainer,
          {
            backgroundColor: '#181818',
            marginHorizontal: 60,
            borderRadius: 20,
          },
        ]}
      >
        <TouchableOpacity style={styles.qrContainer} onPress={handleQRScan}>
          <Image source={DummyScanner} style={{ width: '100%', height: 240 }} />
        </TouchableOpacity>

        <View style={{ padding: 24 }}>
          <MyText fontFamily="Outfit-Regular" style={styles.qrInstructions}>
            Scan the QR code available on the device{'\n'} to connect instantly.
          </MyText>
          <MyText fontFamily="Outfit-Medium" style={styles.orText}>
            Or
          </MyText>
          <MyText fontFamily="Outfit-Regular" style={styles.qrInstructions}>
            Input Credential
          </MyText>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setCurrentStep('credentials')}
            style={styles.manualButton}
          >
            <MyText style={styles.manualButtonText}>Input Manually</MyText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderQRSuccessScreen = () => (
    <View
      style={[
        styles.screenContainer,
        { flex: 1, justifyContent: 'center', width: '100%' },
      ]}
    >
      <View style={styles.header}>
        <MyText style={styles.title}>Input Device Credential</MyText>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <Icon name="close" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.successContainer}>
        <View style={styles.successIcon}>
          <Icon name="check-circle" size={80} color="#4CAF50" />
        </View>
        <MyText style={styles.successText}>Successfully Scan</MyText>
        <MyText style={styles.successSubtext}>
          Your device has been successfully scanned
        </MyText>
      </View>
    </View>
  );

  const renderCredentialsScreen = () => (
    <View style={[styles.screenContainer, { padding: 24 }]}>
      <View
        style={[
          styles.header,
          { borderBottomWidth: 0, padding: 0, marginBottom: 10 },
        ]}
      >
        <MyText fontFamily="Outfit-SemiBold" style={styles.title}>
          Input Device Credential
        </MyText>
      </View>

      <MyText style={styles.subtitle}>
        Please let us know what you are looking for.
      </MyText>

      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputText}>Device Name</TextInput>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputText}>Serial Name</TextInput>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputText}>Installation Date</TextInput>
          </View>
        </View>
        <View style={styles.inputGroup}>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputText}>Manufacturing Date</TextInput>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputText}>Software Version</TextInput>
          </View>
        </View>
      </View>

      <View style={styles.singleButtonContainer}>
        <GradientButton
          title="Add"
          onPress={() => {
            setVisible(false);
            setConfirmationVisible(true);
          }}
          colors={["#1396B9", "#004F65"]}
          width={wp('38%')}
          height={hp('4.5%')}
          buttonStyle={{ borderRadius: 5.42 }}
          textStyle={{ fontSize: 16, fontWeight: '600' }}
        />
      </View>
    </View>
  );

  const renderCurrentScreen = () => {
    switch (currentStep) {
      case 'detecting':
        return visible ? renderDetectingScreen() : renderQRScannerScreen();
      case 'detected':
        return visible ? renderDetectedScreen() : renderQRScannerScreen();
      case 'notDetected':
        return visible ? renderNotDetectedScreen() : renderQRScannerScreen();
      case 'qrScanner':
        return renderQRScannerScreen();
      case 'qrSuccess':
        return renderQRSuccessScreen();
      case 'credentials':
        return renderCredentialsScreen();
      default:
        return renderDetectingScreen();
    }
  };

  if (visible) {
    return (
      <View style={{ flex: 1 }}>
        <Header
          onBackPress={() => navigation?.goBack?.()}
          isBack
          isNotification
          isProfile
        />
        <Modal
          isVisible={visible}
          onBackdropPress={handleClose}
          onBackButtonPress={handleClose}
          backdropOpacity={0.8}
          animationIn="fadeIn"
          animationOut="fadeOut"
          style={styles.modalContainer}
        >
          <View style={styles.modal}>{renderCurrentScreen()}</View>
        </Modal>
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1 }}>
        <Header
          onBackPress={() => navigation?.goBack?.()}
          isBack
          isNotification
          isProfile
        />
        {renderCurrentScreen()}
        <ConfirmationModal
          isVisible={confirmationVisible}
          title="Successfully Scan"
          description="Your device has been successfully scanned!"
          setIsVisible={setConfirmationVisible}
          icon={<ModalSuccessSvg />}
          onContinue={() => {
            setConfirmationVisible(false);
            setVisible(true);
            setCurrentStep('detecting');
            navigation?.goBack?.();
          }}
          backdropColor='#D9D9D936'
        />
      </View>
    );
  }
}

const useStyles = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    modalContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      margin: 0,
    },
    modal: {
      width: width * 1,
      maxHeight: height * 0.7,
      // backgroundColor: "#1a1a1a",
      borderRadius: 20,
    },
    screenContainer: {
      // padding: 24,
      minHeight: 400,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 24,
      borderBottomWidth: 1,
      borderBottomColor: colors.primary + '40',
      padding: 8,
    },
    title: {
      fontSize: 18,
      color: '#fff',
    },
    subtitle: {
      fontSize: 14,
      color: '#888',
      marginBottom: 24,
    },
    closeButton: {
      padding: 8,
    },
    progressContainer: {
      marginBottom: 40,
    },
    progressBar: {
      height: 4,
      backgroundColor: '#333',
      borderRadius: 2,
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      backgroundColor: '#00BFFF',
      borderRadius: 2,
    },
    deviceContainer: {
      alignItems: 'center',
      marginBottom: 22,
    },
    deviceIcon: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: '#2a2a2a',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
    },
    detectedDevice: {
      backgroundColor: '#1a4a5a',
      borderWidth: 2,
      borderColor: '#00BFFF',
    },
    errorDevice: {
      backgroundColor: '#4a1a1a',
      borderWidth: 2,
      borderColor: '#FF6B6B',
    },
    statusText: {
      fontSize: 16,
      fontWeight: '500',
      color: '#fff',
      marginBottom: 8,
    },
    deviceInfo: {
      fontSize: 14,
      color: '#fff',
      textAlign: 'center',
      lineHeight: 20,
    },
    errorText: {
      fontSize: 14,
      textAlign: 'center',
      lineHeight: 20,
    },
    instructionText: {
      fontSize: 14,
      // color: '#888',
      textAlign: 'center',
      lineHeight: 18,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 32,
      gap: 12,
      borderTopColor: '#333',
      borderTopWidth: 1,
      // paddingTop: 16,
    },
    cancelButton: {
      flex: 1,
      paddingVertical: 15,
      // backgroundColor: '#333',
      borderRadius: 8,
      alignItems: 'center',
    },
    cancelButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '500',
    },
    activateButton: {
      flex: 1,
      paddingVertical: 15,
      // backgroundColor: '#00BFFF',
      borderRadius: 8,
      alignItems: 'center',
    },
    activateButtonText: {
      color: colors.primary,
      fontSize: 16,
      fontWeight: '600',
    },
    tryAnotherButton: {
      flex: 1,
      paddingVertical: 15,
      borderRadius: 8,
      alignItems: 'center',
      color: colors.primary,
    },
    tryAnotherButtonText: {
      color: colors.primary,
      fontSize: 16,
      fontWeight: '600',
    },
    qrContainer: {
      alignItems: 'center',
      marginVertical: 32,
      position: 'relative',
    },
    qrFrame: {
      width: 160,
      height: 160,
      borderWidth: 2,
      borderColor: '#00BFFF',
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#2a2a2a',
    },
    scanOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    scanLine: {
      width: 140,
      height: 2,
      backgroundColor: '#00BFFF',
      opacity: 0.8,
    },
    qrInstructions: {
      fontSize: 13,
      color: '#8F96A3',
      textAlign: 'center',
      lineHeight: 18,
      marginBottom: 16,
    },
    orText: {
      fontSize: 14,
      textAlign: 'center',
      marginBottom: 16,
    },
    manualButton: {
      paddingVertical: 8,
      paddingHorizontal: 30,
      borderWidth: 1,
      backgroundColor: '#212222',
      borderRadius: 8,
      alignSelf: 'center',
      borderColor: '#9797971A',
    },
    manualButtonText: {
      fontSize: 16,
      fontWeight: '500',
    },
    successContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 40,
    },
    successIcon: {
      marginBottom: 20,
    },
    successText: {
      fontSize: 20,
      fontWeight: '600',
      color: '#4CAF50',
      marginBottom: 10,
    },
    successSubtext: {
      fontSize: 14,
      color: '#888',
      textAlign: 'center',
    },
    formContainer: {
      gap: 16,
      marginBottom: 24,
    },
    inputGroup: {
      gap: 8,
    },
    inputLabel: {
      fontSize: 14,
      color: '#888',
      fontWeight: '500',
    },
    inputContainer: {
      backgroundColor: '#181818',
      borderRadius: 8,
      paddingHorizontal: 16,
      // paddingVertical: 14,
      borderWidth: 1,
      borderColor: '#181818',
    },
    inputText: {
      fontSize: 12,
      color: '#646667',
      fontFamily: 'Outfit-Regular',
    },
    finalButtonContainer: {
      flexDirection: 'row',
      gap: 12,
      marginTop: 16,
    },
      singleButtonContainer: {
        alignItems: 'center',
        marginTop: 16,
      },
      gradientAddButton: {
        width: wp('38%'), // ~142px on 375px width
        height: hp('4.5%'),
        borderRadius: 5.42,
        justifyContent: 'center',
        alignItems: 'center',
      },
      gradientAddButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
      },
    addButton: {
      flex: 1,
      paddingVertical: 15,
      backgroundColor: '#00BFFF',
      borderRadius: 8,
      alignItems: 'center',
    },
    addButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
    doneButton: {
      flex: 1,
      paddingVertical: 15,
      backgroundColor: '#4CAF50',
      borderRadius: 8,
      alignItems: 'center',
    },
    doneButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
  });
};
