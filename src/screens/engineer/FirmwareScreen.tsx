import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Header from '../../components/Header';
import { useNavigation, useTheme } from '@react-navigation/native';
import MyText from '../../components/MyText';
import { hp } from '../../utils';
import Space from '../../components/Space';
import NotificationCard from '../../components/NotificationCard';
import {
  HomeStartServiceIcon,
  InfoSvg,
  NextJobGearSvg,
  UserSvg,
} from '../../assets/svg';
import { EngineerStackParamList } from '../../navigation';
import { StackNavigationProp } from '@react-navigation/stack';

export default function FirmwareScreen() {
  const navigation = useNavigation<StackNavigationProp<EngineerStackParamList>>();
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <Header
        isBack
        isNotification
        isProfile
        onBackPress={() =>
          navigation?.canGoBack?.() ? navigation?.goBack() : null
        }
      />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        nestedScrollEnabled={true}
      >
        <View style={styles.headerRow}>
          <View>
            <MyText fontFamily="Outfit-Bold" fontSize={hp(3.6)}>
              Hello Olly,
            </MyText>
            <MyText
              fontFamily="Gilroy-Regular"
              fontSize={hp(2)}
              color="#5E6272"
            >
              Todays Schedule at glance
            </MyText>
          </View>
          <HomeStartServiceIcon
            onPress={() => navigation.navigate('DeviceCheckInScreen')}
            height={hp(4)}
            width={hp(4)}
            style={styles.iconCenter}
          />
        </View>
        <Space mB={hp(2)} />
        <View style={styles.jobCard}>
          <View style={styles.jobCardHeader}>
            <NextJobGearSvg height={hp(3)} width={hp(3)} />
            <MyText fontFamily="Outfit-SemiBold" fontSize={hp(3)}>
              Next Job
            </MyText>
          </View>
          <Space mB={hp(1.5)} />
          <View style={styles.jobCardRow}>
            <MyText fontFamily="Gilroy-Medium" fontSize={hp(2)}>
              Leeds Co.
            </MyText>
            <MyText fontFamily="Gilroy-Medium" fontSize={hp(2)}>
              Start at 09:00
            </MyText>
          </View>
          <Space mB={hp(1.5)} />
          <View style={styles.jobCardRow}>
            <MyText
              fontFamily="Gilroy-Medium"
              fontSize={hp(1.6)}
              color="#5E6272"
            >
              Leeds Co.
            </MyText>
            <MyText
              fontFamily="Gilroy-Medium"
              fontSize={hp(1.6)}
              color="#5E6272"
            >
              Start at 09:00
            </MyText>
          </View>
          <Space mB={hp(2.5)} />
          <Pressable
            style={[styles.startJobButton, { backgroundColor: theme.colors.primary }]}
          >
            <MyText fontFamily="Gilroy-SemiBold" fontSize={hp(2.6)}>
              Start Job
            </MyText>
          </Pressable>
        </View>
        <Space mB={hp(2)} />
        <View style={styles.jobCard}>
          <View style={styles.jobCardHeader}>
            <UserSvg height={hp(3)} width={hp(3)} />
            <MyText fontFamily="Outfit-SemiBold" fontSize={hp(3)}>
              Unconfirmed Job
            </MyText>
            <MyText
              fontSize={hp(1.6)}
              color="#5E6272"
              style={styles.proposeTime}
            >
              Propose time
            </MyText>
          </View>
          <Space mB={hp(1.5)} />
          <View style={styles.jobCardRow}>
            <MyText fontFamily="Gilroy-Medium" fontSize={hp(2)}>
              Green LTD,
            </MyText>
            <Pressable style={styles.awaitFeedbackButton}>
              <MyText
                fontFamily="Gilroy-Medium"
                color="#D6DCF3"
                fontSize={hp(1.6)}
              >
                Await feedback
              </MyText>
            </Pressable>
          </View>
        </View>
        <Space mB={hp(2)} />
        <TouchableOpacity activeOpacity={.8} onPress={() => navigation.navigate('ServiceHubScreen')} style={styles.jobCard}>
          <View style={styles.jobCardHeaderOverdue}>
            <View style={styles.jobCardHeaderOverdueLeft}>
              <InfoSvg height={hp(3)} width={hp(3)} />
              <MyText fontFamily="Outfit-SemiBold" fontSize={hp(3)}>
                Overdue Job
              </MyText>
            </View>
            <MyText
              fontSize={hp(1.6)}
              fontFamily="Gilroy-Medium"
              color="red"
              style={styles.proposeTime}
            >
              2 days Later
            </MyText>
          </View>
          <Space mB={hp(1.5)} />
          <View style={styles.jobCardRow}>
            <MyText fontFamily="Gilroy-Medium" fontSize={hp(2)}>
              Diagnostic
            </MyText>
          </View>
        </TouchableOpacity>
        <Space mB={hp(4)} />
        <Pressable style={styles.viewAllJobsButton}>
          <MyText fontFamily="Gilroy-SemiBold" fontSize={hp(2)}>
            View All Jobs
          </MyText>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: hp(2),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconCenter: {
    alignSelf: 'center',
  },
  jobCard: {
    backgroundColor: '#181A20D4',
    borderRadius: hp(1.2),
    padding: hp(2),
    borderWidth: 1,
    borderColor: '#9797971C',
  },
  jobCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: hp(1),
  },
  jobCardHeaderOverdue: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: hp(1),
  },
  jobCardHeaderOverdueLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: hp(1),
  },
  jobCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  proposeTime: {
    marginTop: hp(0.6),
  },
  startJobButton: {
    height: hp(5),
    borderRadius: hp(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
  awaitFeedbackButton: {
    backgroundColor: '#20272D',
    paddingHorizontal: hp(2),
    paddingVertical: hp(0.8),
    borderRadius: hp(0.7),
  },
  viewAllJobsButton: {
    backgroundColor: '#181A20D4',
    borderRadius: hp(1.2),
    padding: hp(2),
    borderWidth: 1,
    borderColor: '#9797971C',
    alignItems: 'center',
  },
});
