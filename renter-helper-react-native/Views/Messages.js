import React from 'react';
import { TextInput, View, Text, Button, StyleSheet } from 'react-native';


const Messages = ({navigation}) => {
    return (
        <View style = {styles.container}>
            <Text>Messages Screen</Text>
            <Button title="click here" onPress={() => navigation.navigate('Chat')}/>
        </View>
    );
};

export default Messages;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

});