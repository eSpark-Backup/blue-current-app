import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';

import MyText from '../../components/MyText';
import SettingsCard from '../../components/SettingsCard';
import Space from '../../components/Space';
import GradientButton from '../../components/GradientButton';
import MyInput from '../../components/MyInput';

import { hp, wp } from '../../utils';
import { CameraOutline, Mail, Phone, ProfileHead } from '../../assets/svg';
import Header from '../../components/Header';
import { useNavigation } from '@react-navigation/native';
import { EngineerStackParamList } from '../../navigation';
import { StackNavigationProp } from '@react-navigation/stack';

const PROFILE = {
  name: 'Olly Smith',
  email: 'Olly@gmail.com',
  phone: '+1234562',
  avatar: 'https://picsum.photos/200',
};

const options: ImageLibraryOptions = {
  mediaType: 'photo',
  quality: 1,
};

export default function EngineerProfile() {
 const navigation =
    useNavigation<StackNavigationProp<EngineerStackParamList>>();
      const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(PROFILE);

  const handleAvatarUpload = () => {
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.error('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        setProfile({ ...profile, avatar: response.assets[0].uri! });
      }
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <Header 
        onBackPress={() => navigation?.goBack?.()}
        isBack
        isNotification
        isProfile
        activeScreen="Profile"
      />
      <ScrollView style={styles.container}>
        <Space mB={hp(2.5)} />
        <MyText fontFamily="Outfit-Bold" fontSize={hp(3.6)}>
          Profile Settings
        </MyText>
        <MyText fontFamily="Gilroy-Regular" fontSize={hp(1.4)} color="#5E6272">
          Settings
        </MyText>
        <Space mB={hp(2.5)} />
        <View style={styles.avatarWrapper}>
          {isEditing ? (
            <TouchableOpacity onPress={handleAvatarUpload} activeOpacity={0.8}>
              <Image source={{ uri: profile.avatar }} style={styles.avatar} />
              <View style={styles.cameraOverlay}>
                <CameraOutline width={hp(4)} height={hp(4)} />
              </View>
            </TouchableOpacity>
          ) : (
            <Image source={{ uri: profile.avatar }} style={styles.avatar} />
          )}
        </View>
        <Space mB={hp(3.5)} />
        {isEditing ? (
          <>
            <MyInput
              label="Your Name"
              value={profile.name}
              onChangeText={text => setProfile({ ...profile, name: text })}
              placeholder="Enter your Name"
              uColor="transparent"
            />
            <MyInput
              label="Email"
              value={profile.email}
              onChangeText={text => setProfile({ ...profile, email: text })}
              placeholder="Enter your Email"
              uColor="transparent"
            />
            <MyInput
              label="Phone"
              value={profile.phone}
              onChangeText={text => setProfile({ ...profile, phone: text })}
              placeholder="Enter your phone number"
              uColor="transparent"
            />
          </>
        ) : (
          <>
            <SettingsCard
              icon={<ProfileHead />}
              title={profile.name}
              isProfile
            />
            <SettingsCard icon={<Mail />} title={profile.email} isProfile />
            <SettingsCard icon={<Phone />} title={profile.phone} isProfile />
          </>
        )}
        <Space mB={hp(3.5)} />
        <GradientButton
          title={isEditing ? 'Save' : 'Edit'}
          onPress={() => setIsEditing(prev => !prev)}
          height={hp(4.85)}
          colors={['#212222', '#004F65']}
          buttonStyle={styles.editButton}
          textStyle={styles.editButtonText}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(6),
  },
  avatarWrapper: {
    alignSelf: 'center',
  },
  avatar: {
    height: hp(15),
    width: hp(15),
    borderRadius: hp(7.5),
    alignSelf: 'center',
  },
  cameraOverlay: {
    position: 'absolute',
    backgroundColor: '#00c8ff81',
    height: hp(15),
    width: hp(15),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: hp(7.5),
  },
  editButton: {
    alignSelf: 'center',
  },
  editButtonText: {
    fontSize: hp(1.6),
    fontFamily: 'Outfit-Medium',
  },
});
