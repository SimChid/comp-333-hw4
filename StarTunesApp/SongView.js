import React, { useState, useEffect } from "react";
import { View, Text, Button, Alert } from "react-native";

const SongView = () => {
    const [myData,setData] = useState([]);
    const [uname,setUsername] = useState('');
    const [id,setId] = useState(3);

    useEffect(() => {
        fetch("http://172.21.229.198/comp-333-hw3/index.php/song/read?id=${id}",{
            method: 'GET',
        }).then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.log(error))
    },[]);

    const DeleteHandler = () => {
        fetch("http://172.21.229.198/comp-333-hw3/index.php/song/delete",{
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
        //.finally => return to main page
    }

    return(
        <View>
            <Text>Song: {myData.song}</Text>
            <Text>Artist: {myData.artist}</Text>
            <Text>Rating: {myData.rating}</Text>
            {uname === myData.username && (
                <View>
                <Button 
                    title="Update" 
                />
                <Button
                    onPress={DeleteHandler} title="Delete"
                />
                </View>
            )}
        <Button 
            title = "Go back"
        />
        </View>
    );
}

export default SongView