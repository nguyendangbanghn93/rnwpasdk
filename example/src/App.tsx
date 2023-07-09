import * as React from 'react';

import { SafeAreaView, StyleSheet } from 'react-native';
import { WPA } from 'rnwpasdk';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <WPA env="develop" secretkey="123" style={styles.wpa} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  wpa: { flex: 1 },
});
