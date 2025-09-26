import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { hp, wp } from '../../utils';
import SubscriptionCard from '../SubscriptionCard';

type Subscription = {
  title: string;
  price: string;
  features: string[];
  isCurrent?: boolean;
  onPress: () => void;
};

type SubscriptionListProps = {
  data: Subscription[];
};

const SubscriptionList: React.FC<SubscriptionListProps> = ({ data }) => {
  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={data}
        keyExtractor={(item, index) => `${item.title}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <SubscriptionCard
              title={item.title}
              price={item.price}
              features={item.features}
              isCurrent={item.isCurrent}
              onPress={item.onPress}
            />
          </View>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: hp(2),
  },
  cardWrapper: {
    marginRight: wp(3), // spacing between cards
  },
});

export default SubscriptionList;
