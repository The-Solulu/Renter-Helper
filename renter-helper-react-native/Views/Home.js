import { useState } from 'react';
import { TextInput, View } from 'react-native';

function Home() {
    const [text, setText] = useState('');
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TextInput
                style={{ height: 40 }}
                placeholder="Type here to translate!"
                onChangeText={newText => setText(newText)}
                defaultValue={text}
            />
        </View>
    );
}

export { Home };