import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { StyleSheet, Text, View } from 'react-native';
import SignInUp from './SignInUp';

export default function App() {
  let [loggedIn,setLoggedIn] = React.useState(false);

  if (loggedIn) {
    return(
      <View style = {styles.container}>
        <Text>Successfully logged in! </Text>
      </View>
    );
  }else{
    return (
      <View style={styles.container}>
        <SignInUp setLoggedIn = {setLoggedIn} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
