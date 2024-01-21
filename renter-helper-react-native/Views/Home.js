import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import Swiper from 'react-native-deck-swiper';


// You can put your data here
const rentalData = [
    {
        address: '999 Mission St',
        price: '$5,000',
        bedrooms: '4 bedroom',
        bathrooms: '2.5 bathroom',
        petPolicy: 'Pet Allowed',
        smokingPolicy: 'No Smoking',
        availability: 'Available 7/18',
        leaseLength: '12-Month Lease',
        imageUri: 'https://reactjs.org/logo-og.png',
    },
];

// Rental card component
function RentalCard({ card }) {

    return (
        <View style={styles.card}>
            <Image
                style={styles.image}
                source={{ uri: card.imageUri }}
            />
            <Text style={styles.address}>{card.address}</Text>
            <Text style={styles.price}>{card.price}</Text>
            <View style={styles.detailsRow}>
                <Text style={styles.detailsText}>{card.bedrooms}</Text>
                <Text style={styles.detailsText}>{card.bathrooms}</Text>
            </View>
            <View style={styles.detailsRow}>
                <Text style={styles.detailsText}>{card.petPolicy}</Text>
                <Text style={styles.detailsText}>{card.smokingPolicy}</Text>
            </View>
            <View style={styles.detailsRow}>
                <Text style={styles.availability}>{card.availability}</Text>
                <Text style={styles.leaseLength}>{card.leaseLength}</Text>
            </View>
        </View>
    );
}

// Main home component
function Home() {
    const [index, setIndex] = useState(0);
    const [likedCards, setLikedCards] = useState([]);
    const [rejectedCards, setRejectedCards] = useState([]);

    const onSwipedLeft = (cardIndex) => {
        setRejectedCards([...rejectedCards, cardIndex]);
        console.log('Rejected card index:', cardIndex);
    };

    const onSwipedRight = (cardIndex) => {
        setLikedCards([...likedCards, cardIndex]);
        console.log('Liked card index:', cardIndex);
    };

    return (

        <Swiper
            cards={rentalData}
            renderCard={(card) => <RentalCard card={card} />}
            onSwipedLeft={onSwipedLeft}
            onSwipedRight={onSwipedRight}
            onSwipedAll={() => console.log('All cards swiped')}
            cardIndex={index}
            backgroundColor={'#f0f0f0'}
            stackSize={2}
            animateOverlayLabelsOpacity
            animateCardOpacity
        />

    );
}


// Constants for styling
const { width, height } = Dimensions.get('window');
const cardHeight = 550;
const cardMargin = 20;

// StyleSheet
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    card: {
        height: cardHeight,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E8E8E8',
        backgroundColor: 'white',
    },
    image: {
        width: width - 2 * cardMargin,
        height: 300,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    address: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        marginLeft: cardMargin,
    },
    price: {
        fontSize: 20,
        fontWeight: '600',
        marginTop: 5,
        marginLeft: cardMargin,
    },
    detailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: cardMargin,
        marginTop: 5,
    },
    detailsText: {
        fontSize: 18,
    },
    availability: {
        fontSize: 16,
        marginLeft: cardMargin,
    },
    leaseLength: {
        fontSize: 16,
        marginRight: cardMargin,
    },
});

export { Home };
