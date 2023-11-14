import React, { Component, useState, useEffect } from "react";
import { Text, View, ScrollView, Pressable, FlatList, InteractionManager } from "react-native";

const SongRow = (props) =>{
    const [pressed,setPressed] = useState(false) ;

    DeleteHandler = () => {
        fetch("http://192.168.1.100/comp-333-hw3/index.php/song/delete",{
            method: 'POST',
            body: JSON.stringify({id: id})
        }).then(() => Alert.alert('Delete song','Are you sure you want to delete?',[
            {
                text: 'cancel',
                style: 'cancel'
            },{
                text: 'delete',
            }
        ])).catch((error) => console.log(error))

    } ;
    UpdateHandler = () => {

    } ;

    
    if (pressed){
        return <SongRowPopUp 
            setPRESSED = {setPressed}
            username = {props.username} 
            user = {props.user}
            song = {props.song}
            artist = {props.artist}
            rating = {props.rating}
            /> ;
    } else {
        return <Pressable onPress = {() => setPressed(true)} title = "{props.song} By {props.artist}" />;
        
    }
    if (props.username == props.user){
        return ( 
            <View>
                <Text>Song: {props.song}</Text>
                <Text>Artist: {props.artist}</Text>
                <Text>Rating: {props.rating}</Text>
                <Text>This is where the delete button will go</Text>
                <Text>This is where the update button will go</Text>
            </View>
        ) ; // Extra functionality in this case.

    } else {
        return (
            <View>
                <Text>Song: {props.song}</Text>
                <Text>Artist: {props.artist}</Text>
                <Text>Rating: {props.rating}</Text>
            </View>
        ) ;
    }
}

const SongList = (props) => {
    const [myData, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://192.168.1.100/comp-333-hw3/index.php/song/enumerate", {method: 'GET'})
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => {
            console.log(error)
        }).finally(() => setLoading(false))
    }, []);

    return (
        <View>
            {isLoading ? (
                (<Text> Loading... </Text>)
            ) : (
                <FlatList 
                    data = {myData}
                    keyExtractor={({ id }, index) => id}
                    renderItem={({ item }) => (
                        <SongRow 
                            user = {props.username} 
                            username = {item.username} 
                            song = {item.song}
                            artist = {item.artist}
                            rating = {item.rating} />
                      )}
                />
            )}
        </View>
    );
}

export default SongList;