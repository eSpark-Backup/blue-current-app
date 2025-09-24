import React from 'react';
import { View, StyleSheet, FlatList, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import MyText from '../../components/MyText';
import Space from '../../components/Space';
import NotificationCard from '../../components/NotificationCard';
import { hp } from '../../utils';

const notifications = Array.from({ length: 10 }, (_, i) => ({
  id: i.toString(),
  name: 'John Doe',
  message: 'Lorem Ipsum is simply dummy text of the printing',
  time: '2h ago',
}));

export default function NotificationScreen() {
  useNavigation(); // If not used, can be removed

  const renderItem = () => (
    <NotificationCard
      name="John Doe"
      message="Lorem Ipsum is simply dummy text of the printing"
      time="2h ago"
    />
  );

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        nestedScrollEnabled
        keyboardShouldPersistTaps="handled"
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
          data={notifications}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          renderItem={renderItem}
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
