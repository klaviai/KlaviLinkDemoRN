import React, {useState} from 'react';
import {
  Button,
  Linking,
  SafeAreaView,
  StyleSheet,
  TextInput,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {RootStackParamList} from '../../route';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList>;

const redirectURL = encodeURIComponent('klavilinkdemorn://redirect');
const list = [
  {
    label: 'Sandbox',
    value: `https://open-sandbox.klavi.ai/data/v1/basic-links/ofpfdemo?redirect_url=${redirectURL}`,
    key: '1',
  },
  {
    label: 'Testing',
    value: `https://open-testing.klavi.ai/data/v1/basic-links/ofpfdemo?redirect_url=${redirectURL}`,
    key: '2',
  },
  {
    label: 'Custom Klavi Link',
    value: `https://open.klavi.tech/data/v1/basic-links/ofpfdemo?redirect_url=${redirectURL}`,
    key: 'custom',
  },
];

const HomePage = ({navigation}: Props) => {
  const [selectValue, setSelectValue] = useState(list[0].value);
  const [selectIndex, setSelectIndex] = useState(0);
  const [url, setUrl] = useState<string>(list[0].value);

  return (
    <SafeAreaView style={styles.container}>
      <Picker
        selectedValue={selectValue}
        onValueChange={(itemValue, itemIndex) => {
          setSelectValue(itemValue);
          setUrl(itemValue);
          setSelectIndex(itemIndex);
        }}>
        {list.map(item => (
          <Picker.Item label={item.label} value={item.value} key={item.key} />
        ))}
      </Picker>

      <TextInput
        editable={list[selectIndex].key === 'custom'}
        multiline
        numberOfLines={4}
        onChangeText={text => setUrl(text)}
        value={url}
        style={styles.textInput}
      />
      <Button
        title="Open in webview"
        onPress={() => navigation.navigate('Web', {url: url})}
      />
      <Button title="Open in browser" onPress={() => Linking.openURL(url)} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    marginHorizontal: 16,
    gap: 10,
  },
  textInput: {
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
  },
});

export default HomePage;
