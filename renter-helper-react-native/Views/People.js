import { useState } from 'react';
import { TextInput, View, Text } from 'react-native';
function PeopleCard() {
    let first_name = "Jane";
    let last_name = "Doe";
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    
            <View style={{ flex: 2 }} >

            </View>
            <View style={{ flex: 1.3 }} >
            <Text>{first_name} {last_name}</Text>
            <Text> </Text>
            </View>

        </View>
    )
}
function People() {
    return (
        PeopleCard()
    );
}

export { People };