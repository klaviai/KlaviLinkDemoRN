import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

const RedirectPage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>redirect success</Text>
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
});

export default RedirectPage;
