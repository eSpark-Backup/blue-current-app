import { StyleSheet } from 'react-native';

export const styles = (mT = 0, mB = 0, mR = 0, mL = 0, mH = 0, mV = 0) => {
  return StyleSheet.create({
    container: {
      marginTop: mT,
      marginBottom: mB,
      marginRight: mR,
      marginLeft: mL,
      marginHorizontal: mH,
      marginVertical: mV,
    },
  });
};
