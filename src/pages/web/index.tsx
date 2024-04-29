import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {WebView} from 'react-native-webview';
import {RootStackParamList} from '../../route';
import {Linking, SafeAreaView, StyleSheet} from 'react-native';
import {ShouldStartLoadRequest} from 'react-native-webview/lib/WebViewTypes';

type Props = NativeStackScreenProps<RootStackParamList, 'Web'>;

const WebPage = ({route}: Props) => {
  const {url} = route.params;

  const urlWhiteList = [
    'https://open.klavi.tech',
    'https://open-sandbox.klavi.ai',
    'https://open-testing.klavi.ai',
    'https://open.klavi.ai',
    'https://www.google.com/recaptcha',
    'https://recaptcha.google.com/recaptcha',
  ];

  const isInWhitelistFn = (urlString: string) => {
    return urlWhiteList.some(item => urlString.startsWith(item));
  };

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{
          uri: url,
        }}
        webviewDebuggingEnabled
        startInLoadingState
        originWhitelist={['*']} // 这里需要将白名单设置成'*'，onShouldStartLoadWithRequest才能拦截所有的request
        onShouldStartLoadWithRequest={(event: ShouldStartLoadRequest) => {
          if (event.url === 'about:blank') {
            return false;
          }
          try {
            if (isInWhitelistFn(event.url)) {
              return true;
            }
            Linking.openURL(event.url);
            return false;
          } catch (error) {
            console.warn(error);
            return false;
          }
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default WebPage;
