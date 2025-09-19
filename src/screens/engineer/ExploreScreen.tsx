import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import { View, Text } from 'react-native';
import MyText from '../../components/MyText';
import Header from '../../components/Header';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { EngineerStackParamList } from '../../navigation';
import GradientButton from '../../components/GradientButton';
import SelectableGrid from '../../components/SelectableGrid';
import Space from '../../components/Space';
import { hp } from '../../utils';

export default function ExploreScreen() {
  const navigation =
    useNavigation<StackNavigationProp<EngineerStackParamList>>();
  const [selected, setSelected] = useState(0);
  const gridData = [
    { title: '2,3,4', description: 'Current\nFirm Ware Version', icon: null },
    { title: '5,3,4', description: 'Current\nLog sets', icon: null },
    { title: '2,3,4', description: 'Watchlist\nDevices', icon: null },
    { title: '2,3,4', description: 'Services Settings', icon: null },
    { title: '2,3,4', description: 'Calculators', icon: null },
    { title: '2,3,4', description: 'History Usage', icon: null },
  ];
  const screenWidth = Dimensions.get('window').width;
  // Assume each box is at least 110px wide including margin, max 3 per row
  const minBoxWidth = 110;
  const maxColumns = Math.min(3, Math.floor(screenWidth / minBoxWidth) || 1);
  return (
    <View style={{ flex: 1 }}>
      <Header
        isBack
        isNotification
        isProfile
        onBackPress={() => navigation?.goBack?.()}
      />
      <View
        style={{
          padding: 20,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          justifyContent: 'space-between',
        }}
      >
        <View>
          <MyText fontFamily="Outfit-SemiBold" fontSize={36}>
            Dev123
          </MyText>
          <MyText fontFamily="Outfit-SemiBold" fontSize={14} color="#5E6272">
            Jimmy johnes
          </MyText>
        </View>
        <GradientButton
          title="Device Overview"
          onPress={() => navigation.navigate('Explore')}
          buttonStyle={{ borderRadius: 8 }}
        />
      </View>
      <View
        style={{
          height: 0.4,
          width: '80%',
          backgroundColor: '#5E6272',
          alignSelf: 'center',
        }}
      />
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <Space mB={hp(1)} />
        <SelectableGrid
          data={gridData}
          selectedIndex={selected}
          onSelect={setSelected}
          numColumns={3}
          children={(item, idx, isSelected) => (
            <View
              style={{
                padding: 5,
                paddingHorizontal: 15,
                alignItems: 'flex-start',
              }}
            >
              {item?.icon ? (
                <View>{item?.icon}</View>
              ) : (
                <MyText fontFamily="Outfit-SemiBold" fontSize={24}>
                  {item.title}
                </MyText>
              )}
              <MyText fontFamily="Outfit-Medium" fontSize={10}>
                {item.description}
              </MyText>
            </View>
          )}
        />
        <Space mB={hp(1.3)} />
        <View
          style={{
            height: 0.4,
            width: '85%',
            backgroundColor: '#5E6272',
            alignSelf: 'center',
          }}
        />
      </View>
    </View>
  );
}
