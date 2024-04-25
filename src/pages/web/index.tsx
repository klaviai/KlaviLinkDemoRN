import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {WebView} from 'react-native-webview';
import {RootStackParamList} from '../../route';
import {Linking, SafeAreaView, StyleSheet} from 'react-native';
import {ShouldStartLoadRequest} from 'react-native-webview/lib/WebViewTypes';
import {URL} from 'react-native-url-polyfill';

type Props = NativeStackScreenProps<RootStackParamList, 'Web'>;

const whiteList = [
  'open.klavi.tech',
  'open-sandbox.klavi.ai',
  'open-testing.klavi.ai',
  'open.klavi.ai',
];

const WebPage = ({route}: Props) => {
  const {url} = route.params;

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
            const requestUrl = new URL(event.url);
            if (whiteList.includes(requestUrl.host)) {
              return true;
            }
            Linking.openURL(requestUrl.href);
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
