import * as React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Text, View, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';

export interface IWPAProps {
  env: 'develop' | 'qa' | 'staging' | 'production';
  code: string;
  secretkey: string;
  style?: StyleProp<ViewStyle>;
  user?: {
    phone?: string;
    email?: string;
    fullname?: string;
    birthday?: Date;
    gender?: 'male' | 'female' | 'other';
    addres?: string;
  };
}

export default function WPA(props: IWPAProps) {
  const [showWebView, setShowWebView] = React.useState(false);
  const objUrl = {
    develop: 'https://wpa-qa.med247.co',
    qa: 'https://wpa-qa.med247.co',
    staging: 'https://wpa-staging.med247.co',
    production: 'https://wpa.med247.co',
  };

  // verify partner

  // lấy token partner
  const token = 'Đi lấy token từ code và secretkey';

  // Truyền params vào url web
  const params: any = { ...(props.user || {}) };
  params.token = token;
  const searchParams = new URLSearchParams(params).toString();

  // wep xử lý tạo tài khoản nếu đối tác truyền đủ thông tin cần thiết

  // Xử lý các message liên quan đến notification

  return (
    <>
      {showWebView ? (
        <View style={styles.containerView}>
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
        </View>
      ) : (
        <View style={styles.buttonApp}>
          <Text
            onPress={() => {
              setShowWebView(true);
            }}
            style={styles.buttonText}
          >
            App Med247
          </Text>
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
  headerView: { padding: 10 },

  textHeader: {
    textAlign: 'right',
  },
  mainView: {
    flex: 1,
  },
  buttonApp: { backgroundColor: '#0066b8', padding: 10 },
  buttonText: { color: 'white' },
});
