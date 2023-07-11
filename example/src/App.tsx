import * as React from 'react';

import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { WPA } from 'rnwpasdk';
const initData = {
  code: 'Gotrust',
  secretkey: 'I9iCDyBRuxbHDEM3UBIgmThrfj8PA0q2MQuIsxfZsQbpu3mcamLn1UELQePJ2iNQ',
  fullname: '',
  phone: '',
  email: '',
  birthday: '',
  gender: '',
  address: '',
};

export default function App() {
  const [data, setData] = React.useState<any>(initData);
  return (
    <SafeAreaView style={styles.container}>
      <View>
        {Object.keys(initData).map((k) => {
          return (
            <View key={k} style={styles.viewIntput}>
              <Text style={styles.label}>{k}: </Text>
              <TextInput
                value={data[k]}
                onChangeText={(text) => {
                  setData((state: any) => ({ ...state, [k]: text }));
                }}
                style={styles.textIntput}
              />
            </View>
          );
        })}
      </View>
      <WPA
        env="develop"
        secretkey={data.secretkey}
        style={styles.wpa}
        code={data.code}
        user={{
          fullname: data.fullname,
          phone: data.phone,
          email: data.email,
          birthday: data.birthday,
          address: data.address,
          gender: data.gender,
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  wpa: { flex: 1 },
  textIntput: { backgroundColor: '#dddddd', height: 40 },
  viewIntput: { width: 300, marginBottom: 8 },
  label: { marginBottom: 4 },
});
