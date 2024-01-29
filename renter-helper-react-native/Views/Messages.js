import React from 'react';
import { TextInput, View, Text, Button, StyleSheet } from 'react-native';


const Messages = ({naviagtion}) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    
            <View style={{ flex: 2 }} >

            </View>
            <View style={{ flex: 1.3 }} >
            <Text>Messages!</Text>
            <Button title="Click Here" onPress={() => navigation.navigate('Chat')}/>
            </View>

        </View>
    )
}

export { Messages };