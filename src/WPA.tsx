import * as React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  SafeAreaView,
  Platform,
} from 'react-native';
import WebView from 'react-native-webview';

export interface IWPAProps {
  env: 'develop' | 'qa' | 'staging' | 'production';
  code: string;
  secretkey: string;
  style?: StyleProp<ViewStyle>;
  button?: '';
  user?: {
    phone?: string;
    email?: string;
    fullname?: string;
    birthday?: string;
    gender?: 'male' | 'female' | 'other';
    address?: string;
  };
}

export default function WPA(props: IWPAProps) {
  const [showWebView, setShowWebView] = React.useState(false);
  const [token, setToken] = React.useState<string>('');
  const objUrl = {
    develop: 'https://wpa-qa.med247.co',
    qa: 'https://wpa-qa.med247.co',
    staging: 'https://wpa-staging.med247.co',
    production: 'https://wpa.med247.co',
  };
  const objApi = {
    develop: 'https://qa.pms-api.health.med247.co',
    qa: 'https://qa.pms-api.health.med247.co',
    staging: 'https://staging.pms-api.health.med247.co',
    production: 'https://pms-api.health.med247.co',
  };

  // lấy token partner
  // Truyền params vào url web
  const params: any = { ...(props.user || {}) };
  params.token = token;
  const searchParams = new URLSearchParams(params).toString();

  // wep xử lý tạo tài khoản nếu đối tác truyền đủ thông tin cần thiết

  // Xử lý các message liên quan đến notification

  return (
    <>
      {showWebView ? (
        <SafeAreaView style={styles.containerView}>
          <View style={styles.headerView}>
            <Text
              style={styles.textHeader}
              onPress={() => {
                setShowWebView(false);
              }}
            >
              Đóng
            </Text>
          </View>
          <WebView
            source={{
              uri: `${objUrl[props.env]}?${searchParams}`,
            }}
            style={styles.mainView}
          />
        </SafeAreaView>
      ) : (
        <View style={styles.buttonApp}>
          {props.button || (
            <Text
              onPress={async () => {
                const tokenResult: string = await getToken(
                  objApi[props.env],
                  props.code,
                  props.secretkey
                );
                if (tokenResult) {
                  setToken(tokenResult);
                  setShowWebView(true);
                } else {
                  Alert.alert(
                    'Thông báo',
                    'Đối tác chưa được xác thực vui lòng thử lại sau',
                    [
                      {
                        text: 'Ok',
                        onPress: () => console.log('Đã đồng ý'),
                      },
                    ],
                    { cancelable: false }
                  );
                }
              }}
              style={styles.buttonText}
            >
              App Med247
            </Text>
          )}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  containerView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  headerView: { padding: 10, paddingTop: Platform.OS === 'ios' ? 30 : 10 },

  textHeader: {
    textAlign: 'right',
  },
  mainView: {
    flex: 1,
  },
  buttonApp: { backgroundColor: '#0066b8', padding: 10 },
  buttonText: { color: 'white' },
});

const getToken = async (
  apiUrl: string,
  code: string,
  secretKey: string
): Promise<string> => {
  try {
    const result = await fetch(
      `${apiUrl}/users/get_token_partner?code=${code}&secretKey=${secretKey}`
    );
    const val = await result.json();
    return val.data;
  } catch (error) {
    console.log(error);
    return '';
  }
};
