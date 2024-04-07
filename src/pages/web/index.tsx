import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {WebView} from 'react-native-webview';
import {RootStackParamList} from '../../route';
import {launchApp} from '../../utils/lanuchApp';
import {SafeAreaView, StyleSheet} from 'react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'Web'>;

const WebPage = ({route}: Props) => {
  const {url} = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{
          uri: url,
        }}
        webviewDebuggingEnabled
        javaScriptCanOpenWindowsAutomatically
        startInLoadingState
        originWhitelist={['*']} // 这里需要将白名单设置成'*'，onShouldStartLoadWithRequest才能拦截所有的request
        onShouldStartLoadWithRequest={(event: any) => {
          if (event.url === 'about:blank') {
            return false;
          }
          if (!event.url.startsWith('http') && !event.url.startsWith('https')) {
            launchApp(event.url);
            return false;
          }
          return true;
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
