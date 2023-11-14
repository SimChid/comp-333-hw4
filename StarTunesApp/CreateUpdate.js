import React, { Component, useState } from "react";
import { View, Text, TextInput, Button,Alert, Modal, StyleSheet, Pressable } from "react-native";

const RatingForm = (props) => {
    const [song,setSong] = useState("") ;
    const [artist,setArtist] = useState("");
    const [rating,setRating] = useState(NaN) ;
    const [information,setInformation] = useState("") ;
    const [modalVisible, setModalVisible] = useState(true);

    CreateHandler = () => {
        fetch("http://192.168.1.100/comp-333-hw3/index.php/song/create",
            {method : 'POST', body : JSON.stringify({username : props.username, artist : artist, song : song, rating : rating})}).then(
                (response) => response.json()).then(
                    (json) => {
                        if (json === 'song added'){
                            props.setRATING(false)  // might change this
                        } else {
                            setInformation(json)
                        }
                    }).catch((error) => console.log(error)) ;
    } ;

    return (
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {setModalVisible(!modalVisible);}}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Fill out the form below to contribute to the community!</Text>
                
                <Text>Username: {props.username} </Text> 
                <TextInput 
                    onChangeText = {setSong}
                    placeholder = "Song"
                    value = {song}
                />
                <TextInput
                    onChangeText = {setArtist}
                    placeholder = "Artist"
                    value = {artist}
                />
                <TextInput
                    onChangeText = {setRating}
                    placeholder = "Rating"
                    value = {rating}
                    
                />
                <Pressable style = {[styles.button,styles.buttonClose]} onPress = {() => CreateHandler()}>
                    <Text style = {styles.textStyle}>Submit Rating</Text>
                </Pressable>
                <Text style = {styles.modalText}>{information}</Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {setModalVisible(!modalVisible); props.setRATING(false);}}>
                  <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setModalVisible(true)}>
            <Text style={styles.textStyle}>Show Modal</Text>
          </Pressable>
        </View>
      );
}

const CreateRating = (props) => {
    const [ratingCurrently,setRatingCurrently] = useState(false) ;
    if (ratingCurrently){
        return <RatingForm username = {props.Username} setRATING = {setRatingCurrently}/> ;
    } else {
        return (
            <View>
                <Text>Add a song rating below!</Text>
                <Button onPress = {() => setRatingCurrently(true)} title = "Chime in" />
            </View>
        ) ;
        
    }
}




const CreateUpdate = () => {
    const [updating,setUpdating] = useState(false);
    const [id,setId] = useState(NaN);
    const [uname,setUsername] = useState('');
    const [song,setSong] = useState('');
    const [artist,setArtist] = useState('');
    const [rating,setRating] = useState(NaN);
    const [information,setInformation] = useState('');

    CreateHandler = () => {
        fetch("http://<youripaddress>/comp-333-hw3/index.php/song/create",
            {method: 'POST',
            body: JSON.stringify({
                username: uname,
                artist: artist,
                song: song,
                rating: rating
            })}
        ).then((response) => response.json())
        .then((json) => setInformation(json))
        .catch((error) => console.log(error))
    }

    UpdateHandler = () => {
        fetch("http://<youripaddress>/comp-333-hw3/index.php/song/update",
            {method: 'POST',
            body: JSON.stringify({
                artist: artist,
                song: song,
                rating: rating,
                id: id
            })}
        ).then((response) => response.json())
        .then((json) => setInformation(json))
        .catch((error) => console.log(error))
    }

    return(
        <View>
            <Text>Username: {uname} </Text>
            <TextInput 
                onChangeText = {setSong}
                placeholder = "Song"
                value = {song}
            />
            <TextInput
                onChangeText = {setArtist}
                placeholder = "Artist"
                value = {artist}
            />
            <TextInput
                onChangeText = {setRating}
                placeholder = "Rating"
                value = {rating}
                keyboardType = 'numeric'
            />
            {updating ? (
                <Button 
                    onPress = {UpdateHandler}
                    title = "Update"
                />
            ) : (
                <Button 
                    onPress = {CreateHandler}
                    title = "Post"
                />
            )}
            <Text>{information}</Text>
            <Button
                //add redirect
                title = "Go back"
            />
        </View>
    );
}


const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  });

export default CreateRating