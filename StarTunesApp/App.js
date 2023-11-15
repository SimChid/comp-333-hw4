import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from 'react-native';
import SignInUp from './SignInUp';
import SongList from './SongList';
import CreateRating from './CreateUpdate';
import DropDown from './SortingDropDown';

export default function App() {
  let [loggedIn,setLoggedIn] = React.useState(false);
  const [username,setParentUsername] = useState('') ;
  const [sortBy, setSortBy] = useState('artist') ;

  const LogOut = () => {
    setLoggedIn(false);
    setParentUsername('');
  }
  
  if (loggedIn) {
    return(
      <View style={styles.container}>
        <Text style = {styles.welcome} ></Text>
        <Text style = {styles.welcome} >Welcome, {username}!</Text>
        <Text style = {styles.welcome}> Select how to sort the song list</Text>
        <DropDown SortBy = {setSortBy}/>
        <CreateRating Username = {username} />
        <SongList user = {username} sortBy = {sortBy}/>
        
        <Button 
          onPress = {LogOut}
          title = "Log out"
        />
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
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
    paddingVertical:125
  },
  welcome: {
    paddingTop: 10,
    color: 'purple',
    fontSize: 24
  }
});
