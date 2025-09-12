import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  FlatList,
  StyleSheet,
} from 'react-native';
import Header from '../../components/Header';
import { useNavigation } from '@react-navigation/native';
import MyText from '../../components/MyText';
import { hp } from '../../utils';
import Space from '../../components/Space';
import NotificationCard from '../../components/NotificationCard';

export default function NotificationScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Header
        isBack
        isNotification
        isProfile
        onBackPress={() =>
          navigation?.canGoBack?.() ? navigation?.goBack() : null
        }
        activeScreen={'Notification'}
      />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        nestedScrollEnabled={true}
      >
        <View>
          <MyText fontFamily="Outfit-Bold" fontSize={hp(3.6)}>
            Notification
          </MyText>
          <MyText
            fontFamily="Gilroy-Regular"
            fontSize={hp(1.4)}
            color="#5E6272"
          >
            Details
          </MyText>
          <View style={styles.divider} />
        </View>
        <Space mB={hp(2)} />
        <FlatList
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          renderItem={() => {
            return (
              <NotificationCard
                name="John Doe"
                message="Lorem Ipsum is simply dummy text of the printing"
                time="2h ago"
              />
            );
          }}
          ItemSeparatorComponent={() => <Space mB={hp(3)} />}
        />
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
  divider: {
    marginTop: hp(2),
    height: hp(0.15),
    backgroundColor: '#28282B',
  },
});
