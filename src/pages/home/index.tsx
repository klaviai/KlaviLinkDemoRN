import React, {useState} from 'react';
import {Button, SafeAreaView, StyleSheet, TextInput, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {RootStackParamList} from '../../route';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList>;

const list = [
  {
    label: 'Klavi Link, redirectUrl is a URL Scheme',
    value:
      'https://open-sandbox.klavi.ai/data/v1/basic-links/ofpfdemo?redirectURL=klavilinkdemorn://redirect',
    key: '1',
  },
  {
    label: 'Custom Klavi Link',
    value:
      'https://open-testing.klavi.ai/data/v1/basic-links/ofpfdemo?redirectURL=klavilinkdemorn://redirect',
    key: 'custom',
  },
];

const HomePage = ({navigation}: Props) => {
  const [selectValue, setSelectValue] = useState(list[0].value);
  const [selectIndex, setSelectIndex] = useState(0);
  const [url, setUrl] = useState<string>(list[0].value);

  return (
    <SafeAreaView style={styles.container}>
      <View>
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
          title="go"
          onPress={() => navigation.navigate('Web', {url: url})}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    marginHorizontal: 16,
  },
  textInput: {
    padding: 10,
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
});

export default HomePage;
