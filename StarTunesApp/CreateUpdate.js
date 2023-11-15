import React, {useState } from "react";
import { View, Text, TextInput, Button, Modal, StyleSheet, Pressable } from "react-native";

const RatingForm = (props) => {
    const [song,setSong] = useState("") ;
    const [artist,setArtist] = useState("");
    const [rating,setRating] = useState(NaN) ;
    const [information,setInformation] = useState("") ;
    const [modalVisible, setModalVisible] = useState(true);

    CreateHandler = () => {
        fetch("http://172.21.68.84/comp-333-hw3/index.php/song/create",
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
                    style = {styles.form}
                    onChangeText = {setSong}
                    placeholder = "Song"
                    value = {song}
                />
                <TextInput
                    style = {styles.form}
                    onChangeText = {setArtist}
                    placeholder = "Artist"
                    value = {artist}
                />
                <TextInput
                    style = {styles.form}
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
                <Text style = {styles.modalText}>Add a song rating below!</Text>
                <Button onPress = {() => setRatingCurrently(true)} title = "Chime in" />
            </View>
        ) ;
        
    }
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
      backgroundColor: 'yellow',
      borderRadius: 20,
      borderWidth: 3,
      borderColor: '#c8c800',
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
      color: 'purple',
    },
    form: {
      height: 30,
      width: 200,
      backgroundColor: "white",
      marginVertical: 8,
      fontSize: 14,
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 5,
      paddingHorizontal: 5
  },
  });

export default CreateRating