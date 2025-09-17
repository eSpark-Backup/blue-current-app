import React from 'react';
import MyText from '../../components/MyText';
import { ScrollView, View, StyleSheet } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { EngineerStackParamList } from '../../navigation';
import Header from '../../components/Header';
import Space from '../../components/Space';
import { hp, wp } from '../../utils';
import Icon from 'react-native-vector-icons/Ionicons';
import DeviceCard from '../../components/DeviceCard';
import ConfirmationModal from '../../components/ConfirmationModal';
import { ModalSuccessSvg } from '../../assets/svg';
import MyButton from '../../components/MyButton';

const UserNotes = () => {
  const navigation =
    useNavigation<StackNavigationProp<EngineerStackParamList>>();
  const { colors } = useTheme();
  const styles = useStyles(colors);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  return (
    <View style={styles.container}>
      <Header
        isBack
        onBackPress={() =>
          navigation?.canGoBack?.() ? navigation?.goBack() : null
        }
        isNotification
        isProfile
      />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <MyText
          fontFamily="Gilroy-SemiBold"
          fontSize={hp(2.5)}
          style={styles.title}
        >
          User Notes
        </MyText>

        <View>
          <MyText fontFamily="Gilroy-Regular" fontSize={hp(1.8)}>
            User Name
          </MyText>
          <Space mB={10} />
          <View style={styles.noteBox}>
            <MyText fontFamily="Gilroy-Regular" fontSize={hp(1.8)}>
              User Name
            </MyText>
          </View>
        </View>

        <View>
          <Space mB={hp(2.5)} />
          <MyText fontFamily="Gilroy-Regular" fontSize={hp(1.8)}>
            Location
          </MyText>
          <Space mB={10} />
          <View style={styles.noteBox}>
            <MyText fontFamily="Gilroy-Regular" fontSize={hp(1.8)}>
              44-45 Hythe Rd, London NW10 6RS, United Kingdom
            </MyText>

            <MyButton
              onPress={() => navigation.navigate('ServiceHubScreen')}
              title="Use Maps"
              containerStyle={{ marginTop: hp(1), alignSelf: 'flex-end', backgroundColor: colors.primary, paddingHorizontal: wp(3), paddingVertical: hp(0.5), borderRadius: hp(0.5) }}
              textStyle={{}}
              height={undefined}
              width={undefined}
              fontFamily="Outfit-Regular"
            />
          </View>
        </View>

        <View>
          <Space mB={hp(2.5)} />
          <MyText fontFamily="Gilroy-Regular" fontSize={hp(1.8)}>
            Hardware Problem
          </MyText>
          <Space mB={10} />
          <View style={styles.noteBox}>
            <MyText fontFamily="Gilroy-Regular" fontSize={hp(1.8)}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </MyText>
          </View>
        </View>

        <View>
          <Space mB={hp(2.5)} />
          <MyText fontFamily="Gilroy-Regular" fontSize={hp(1.8)}>
            Description
          </MyText>
          <Space mB={10} />
          <View style={styles.noteBox}>
            <MyText fontFamily="Gilroy-Regular" fontSize={hp(1.8)}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </MyText>
          </View>
        </View>

        <View>
          <Space mB={hp(2.5)} />
          <MyText fontFamily="Gilroy-Regular" fontSize={hp(1.8)}>
            Log Set
          </MyText>
          <Space mB={10} />
          <View style={styles.noteBox}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                marginBottom: hp(1),
              }}
            >
              <View
                style={{
                  backgroundColor: '#b00000ff',
                  width: hp(4),
                  height: hp(4),
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon name="warning-outline" color={'#fff'} size={hp(2)} />
              </View>
              <View>
                <MyText fontFamily="Gilroy-SemiBold" fontSize={hp(1.8)}>
                  Info
                </MyText>
                <MyText
                  fontFamily="Gilroy-Regular"
                  fontSize={hp(1.2)}
                  color="#666"
                >
                  20-08-2025
                </MyText>
              </View>
            </View>
            <MyText fontFamily="Gilroy-Regular" fontSize={hp(1.8)} color="#666">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s
            </MyText>
          </View>
        </View>

        <View>
          <Space mB={hp(2.5)} />
          <DeviceCard
            deviceName="HP Laptop - 15s-fq2717TU (1)"
            userName="John Doe"
            containerStyle={{ width: wp(90) }}
            imageStyle={{ width: wp(85), height: wp(30) }}
          />
        </View>
      </ScrollView>

      <View>
        <MyButton
          onPress={() => setIsModalVisible(true)}
          title="Accept"
          containerStyle={styles.acceptButton}
          textStyle={{}}
          height={undefined}
          width={undefined}
          fontFamily="Outfit-Regular"
        />
      </View>

      <ConfirmationModal
        icon={<ModalSuccessSvg />}
        title="Successfully Accepted"
        description="Your request has been Submit & Send to User!"
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        onContinue={() => {
          setIsModalVisible(false);
          navigation?.goBack?.();
        }}
      />
    </View>
  );
};

const useStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollViewContent: {
      padding: wp(5.3),
      flexGrow: 1,
    },
    title: {
      marginBottom: hp(2.5),
    },
    noteBox: {
      borderColor: colors.primary,
      padding: wp(4),
      borderRadius: wp(2.7),
      borderWidth: 0.5,
    },
    acceptButton: {
      backgroundColor: colors.primary,
      width: wp(25),
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: hp(0.6),
      borderRadius: hp(0.5),
      margin: hp(2),
      alignSelf: 'flex-end',
    },
  });

export default UserNotes;
