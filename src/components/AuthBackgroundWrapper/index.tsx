import React from 'react';
import { View, Text, ImageBackground, ScrollView, StyleSheet } from 'react-native';
import { AuthBackground } from '../../assets/images';

export default function AuthBackgroundWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ImageBackground
      source={AuthBackground} 
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {children}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  scrollContent: {
    flexGrow: 1,
  },
});
