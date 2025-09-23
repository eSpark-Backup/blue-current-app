import type React from 'react';
import { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from 'react-native';
import { hp, wp } from '../../utils';
import LinearGradient from 'react-native-linear-gradient';

interface Tab {
  id: string;
  label: string;
}

interface CustomTabBarProps {
  tabs: Tab[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  style?: any;
}

const CustomTabBar: React.FC<CustomTabBarProps> = ({
  tabs,
  activeTab,
  onTabChange,
  style,
}) => {
  const [selectedTab, setSelectedTab] = useState(activeTab || tabs[0]?.id);
  const animatedValues = useRef(
    tabs.reduce((acc, tab) => {
      acc[tab.id] = {
        scale: new Animated.Value(
          tab.id === (activeTab || tabs[0]?.id) ? 1 : 0.95,
        ),
        opacity: new Animated.Value(
          tab.id === (activeTab || tabs[0]?.id) ? 1 : 0.6,
        ),
      };
      return acc;
    }, {} as Record<string, { scale: Animated.Value; opacity: Animated.Value }>),
  ).current;

  useEffect(() => {
    if (activeTab && activeTab !== selectedTab) {
      setSelectedTab(activeTab);
      animateTab(activeTab);
    }
  }, [activeTab]);

  const animateTab = (tabId: string) => {
    // Animate all tabs
    tabs.forEach(tab => {
      const isActive = tab.id === tabId;

      Animated.parallel([
        Animated.timing(animatedValues[tab.id].scale, {
          toValue: isActive ? 1 : 0.95,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValues[tab.id].opacity, {
          toValue: isActive ? 1 : 0.6,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const handleTabPress = (tabId: string) => {
    if (tabId === selectedTab) return;
    setSelectedTab(tabId);
    animateTab(tabId);
    onTabChange?.(tabId);
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.tabBar}>
        {tabs.map(tab => {
          const isActive = tab.id === selectedTab;
          return (
            <TouchableOpacity
              style={styles.tabTouchable}
              key={tab.id}
              onPress={() => handleTabPress(tab.id)}
              activeOpacity={0.8}
            >
              <Animated.View
                style={[
                  styles.tabButton,
                  {
                    transform: [{ scale: animatedValues[tab.id].scale }],
                    opacity: animatedValues[tab.id].opacity,
                  },
                ]}
              >
                {isActive ? (
                  <LinearGradient
                    colors={['#00C9FF94', '#083946']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.activeTabBackground}
                  >
                    <Text style={styles.activeTabText}>{tab.label}</Text>
                  </LinearGradient>
                ) : (
                  <View style={styles.inactiveTabBackground}>
                    <Text style={styles.inactiveTabText}>{tab.label}</Text>
                  </View>
                )}
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#181A20',
    width: '100%',
    alignItems: 'center',
    minHeight: hp(4.5),
    borderRadius: wp(2.5),
  },
  tabTouchable: {
    flex: 1,
  },
  tabButton: {
    flex: 1,
  },
  activeTabBackground: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    borderRadius: wp(2.5),
    alignItems: 'center',
    justifyContent: 'center',
    top: hp(0.3),
  },
  inactiveTabBackground: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    borderRadius: wp(2.5),
    alignItems: 'center',
    justifyContent: 'center',
    top: hp(0.3),
  },
  activeTabText: {
    color: '#FFFFFF',
    fontSize: wp(3.5),
    fontWeight: '600',
  },
  inactiveTabText: {
    color: '#8E8E93',
    fontSize: wp(3.5),
    fontWeight: '600',
  },
});

export default CustomTabBar;
