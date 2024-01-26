import React from "react";
import {View, Text, Button, StyleSheet} from 'react-native'

const Chat = () => {

    return (
        <View style = {styles.container}>
            <Text>Chat Screen</Text>
            <Button title="click here" onPress = {() => {}}/>        
        </View>
    );
};

export default Chat;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})