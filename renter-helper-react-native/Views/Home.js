import { Text, View, Image } from 'react-native';

function homeCard() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={{ uri: 'https://reactjs.org/logo-og.png' }}
                style={{ width: 200, height: 200 }} />
        </View>
    );
}

function Home() {
    return (
        homeCard()
    );
}

export { Home };