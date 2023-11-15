import React, { Component, useState, useEffect } from "react";
import { Text, View, ScrollView, Pressable, FlatList, InteractionManager,TextInput, Button, Modal, StyleSheet } from "react-native";

const SongRowPopUp = (props) => {
    const [deleting,setDeleting] = useState(false) ;
    const [updating,setUpdating] = useState(false) ;
    const [modalVisible, setModalVisible] = useState(true);

    const [song,setSong] = useState(props.song) ;
    const [artist,setArtist] = useState(props.artist);
    const [rating,setRating] = useState(props.rating) ;
    const [information,setInformation] = useState("") ;

    DeleteHandler = () => {
        fetch("http://172.21.229.198/comp-333-hw3/index.php/song/delete",{
            method: 'POST', body: JSON.stringify({id : props.id})}).then(
                (response) => response.json()).then(
                    (json) => {
                        if (json === 'song deleted'){
                            setDeleting(false)  // might change this
                            props.setPRESSED(false)
                            setModalVisible(false)
                        } else {
                            setInformation(json)
                        }
                    }).catch((error) => console.log(error)) ;
    } ;

    UpdateHandler = () => {
        fetch("http://172.21.229.198/comp-333-hw3/index.php/song/update",
            {method: 'POST',
            body: JSON.stringify({artist: artist, song: song,rating: rating,id: props.id})}).then(
                (response) => response.json()).then(
                    (json) => {
                        if (json === 'song updated'){
                            setUpdating(false)
                            props.setPRESSED(false)
                            setModalVisible(false)
                        } else {
                            setInformation(json)
                        }
                    }).catch((error) => console.log(error))
    } ;

    if (updating){
        // Want to return a form to update, with a button for cancelling at the bottom
        return (
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {setModalVisible(!modalVisible);}}>
                    <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>update your rating below</Text>
                        <Text>Username: {props.user} </Text> 
                        <TextInput onChangeText = {setSong} placeholder = "Song" value = {song} style = {styles.form} />
                        <TextInput onChangeText = {setArtist} placeholder = "Artist" value = {artist} style = {styles.form} />
                        <TextInput onChangeText = {setRating} placeholder = "Rating" value = {rating} style = {styles.form} />
                        <Pressable style = {[styles.button,styles.buttonClose]} onPress = {() => UpdateHandler()}>
                            <Text style = {styles.textStyle}>Update Rating</Text>
                        </Pressable>
                        <Text style = {styles.modalText}>{information}</Text>
                        <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {setModalVisible(!modalVisible); setUpdating(false);}}>
                        <Text style={styles.textStyle}>Cancel</Text>
                        </Pressable>
                    </View>
                    </View>
                </Modal>
            </View>
        ) ;

    } else if (deleting) {
        return (
            <View style={styles.centeredView}>
                <Modal
                    style = {styles.modal}
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {setModalVisible(!modalVisible);}}>
                    <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Are you sure you want to delete your rating?</Text>
                        <Text>Username: {props.user} </Text> 
                        <Text>Song: {song} </Text>
                        <Text>Artist: {artist} </Text>
                        <Text>Rating: {rating}</Text>
                        <Pressable style = {[styles.button,styles.buttonClose]} onPress = {() => DeleteHandler()}>
                            <Text style = {styles.textStyle}>Delete Rating</Text>
                        </Pressable>
                        <Text style = {styles.modalText}>{information}</Text>
                        <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {setModalVisible(!modalVisible); setDeleting(false);}}>
                        <Text style={styles.textStyle}>Cancel</Text>
                        </Pressable>
                    </View>
                    </View>
                </Modal>
            </View>
        ) ;

    } else {
        if (props.user == props.username){
            return (
                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {setModalVisible(!modalVisible);}}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Here's what the community has to say about {props.song} by {props.artist}</Text>
                            <Text style={styles.rating} >{props.rating} Stars!</Text>
                            <Pressable style={styles.button} onPress = {() => setDeleting(true)}><Text>Delete Rating</Text></Pressable>
                            <Pressable style={styles.button} onPress = {() => setUpdating(true)}><Text>Update Rating</Text></Pressable>
                            <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => {setModalVisible(!modalVisible); props.setPRESSED(false);}}>
                            <Text style={styles.textStyle}>Done</Text>
                            </Pressable>
                        </View>
                    </Modal>
                </View>
            ) ;
        } else {
            return (
                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {setModalVisible(!modalVisible);}}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Here's what the community has to say about {props.song} by {props.artist}</Text>
                            <Text style={styles.rating}>{props.rating} Stars</Text>
                            
                            <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => {setModalVisible(!modalVisible); props.setPRESSED(false);}}>
                            <Text style={styles.textStyle}>Done</Text>
                            </Pressable>
                        </View>
                    </Modal>
                </View>
            ) ;

        }
    }
}

const SongRow = (props) =>{
    const [pressed,setPressed] = useState(false) ;
    if (pressed){
        return (
            <View>
                <Pressable 
                    onPress = {() => setPressed(true)}
                    style = {styles.pressed}
                >
                    <Text style = {styles.song}>{props.song} By {props.artist}</Text>
                </Pressable>
                <SongRowPopUp 
                    setPRESSED = {setPressed}
                    username = {props.username} 
                    user = {props.user}
                    song = {props.song}
                    artist = {props.artist}
                    rating = {props.rating}
                    id = {props.id}
                />      
            </View>);
    } else {
        return (
            <Pressable
                onPress = {() => setPressed(true)}
                style = {styles.notPressed}
            >
                <Text style = {styles.song}>{props.song} By {props.artist}</Text>
            </Pressable>); 
    }
}

const SongList = (props) => {
    const [myData, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://172.21.229.198/comp-333-hw3/index.php/song/sort", {method: 'POST',body : JSON.stringify({val : props.sortBy})})
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => {
            console.log(error)
        }).finally(() => setLoading(false))
    });

    return (
        <View>
            {isLoading ? (
                (<Text> Loading... </Text>)
            ) : (
                <FlatList 
                    style = {styles.list}
                    data = {myData}
                    keyExtractor={({ id }, index) => id}
                    renderItem={({ item }) => (
                        <SongRow 
                            user = {props.user} 
                            username = {item.username} 
                            song = {item.song}
                            artist = {item.artist}
                            rating = {item.rating}
                            id = {item.id} />
                      )}
                />
            )}
        </View>
    );
}

export default SongList;


const styles = StyleSheet.create({
    list: {
        flex: 5
    },
    pressed: {
        backgroundColor: '#763568',
        border: 1,
        borderColor: '#5B3256',
        borderRatius: 5,
        marginVeritcal: 5,
    },
    notPressed: {
        backgroundColor: 'purple',
        border: 1,
        borderColor: '#5B3256',
        borderRadius: 5,
        marginVertical: 5,
    },
    song: {
        color: '#ddd',
        fontSize: 24,
        padding: 12
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
      color: "purple",
      fontSize: 18
    },
    rating: {
        color: "purple",
        fontSize: 24
    }
  });