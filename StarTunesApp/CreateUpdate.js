import React, { Component, useState } from "react";
import { View, Text, TextInput, Button } from "react-native";

const CreateUpdate = () => {
    const [updating,setUpdating] = useState(false);
    const [id,setId] = useState(NaN);
    const [uname,setUsername] = useState('');
    const [song,setSong] = useState('');
    const [artist,setArtist] = useState('');
    const [rating,setRating] = useState(NaN);
    const [information,setInformation] = useState('');

    CreateHandler = () => {
        fetch("http://172.21.68.84/comp-333-hw3/index.php/song/create",
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
        fetch("http://172.21.68.84/comp-333-hw3/index.php/song/update",
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

export default CreateUpdate