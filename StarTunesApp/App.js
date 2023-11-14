import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { StyleSheet, Text, View } from 'react-native';
import SignInUp from './SignInUp';
import SongList from './SongList';
import CreateUpdate from './CreateUpdate';
import SongView from './SongView';

export default function App() {
  let [loggedIn,setLoggedIn] = React.useState(false);
  const [username,setParentUsername] = useState('') ;

  
  if (loggedIn) {
    return(
      <View style = {styles.container}>
        <Text>Successfully logged in! </Text>
        <Text>Welcome, {username}!</Text>
        <SongList />
      </View>
    );
  }else{
    return (
      <View style={styles.container}>
        <SignInUp setLoggedIn = {setLoggedIn} setParentUsername = {setParentUsername}/>
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
