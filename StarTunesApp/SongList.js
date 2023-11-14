import React, { Component, useState, useEffect } from "react";
import { Text, View, ScrollView, Pressable, FlatList } from "react-native";

const songRow = (props) =>

const SongList = () => {
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
                        <Pressable>
                            <Text>{item.song + ": " + item.artist}</Text>
                        </Pressable>
                      )}
                />
            )}
        </View>
    );
}

export default SongList;