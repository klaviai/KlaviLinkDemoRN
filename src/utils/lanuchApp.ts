import {Linking, NativeModules, Platform} from 'react-native';

export const launchApp = (url: string) => {
  try {
    if (Platform.OS === 'android') {
      NativeModules.MyNativeModule.launchApp(url);
      return;
    }
    Linking.openURL(url);
  } catch (error) {
    console.error("cant't launch app", error);
  }
};
