import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import {useWindowDimensions} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
                <MaterialIcons name="bed" size={24} color="black" />
                <Text style={styles.detailsText}>{card.bedrooms}</Text>
                <MaterialIcons name="bathtub" size={24} color="black" />
                <Text style={styles.detailsText}>{card.bathrooms}</Text>
            </View>
            <View style={styles.detailsRow}>
                <MaterialIcons name="pets" size={24} color="black" />
                <Text style={styles.detailsText}>{card.petPolicy}</Text>
                <MaterialIcons name="smoke-free" size={24} color="black" />
                <Text style={styles.detailsText}>{card.smokingPolicy}</Text>
            </View>
            <View style={styles.detailsRow}>
                <Text style={styles.availability}>{card.availability}</Text>
                <Text style={styles.leaseLength}>{card.leaseLength}</Text>
            </View>
            <View style={styles.actionIconsContainer}>
                <MaterialCommunityIcons name="close" size={34} color="red" />
                <MaterialCommunityIcons name="heart" size={34} color="green" />
            </View>
        </View>
    );
}

// Main home component
function Home() {
    const [index, setIndex] = useState(0);
    const [likedCards, setLikedCards] = useState([]);
    const [rejectedCards, setRejectedCards] = useState([]);
    const [allSwiped, setAllSwiped] = useState(false);

    const onSwipedLeft = (cardIndex) => {
        setRejectedCards([...rejectedCards, cardIndex]);
        console.log('Rejected card index:', cardIndex);
    };

    const onSwipedRight = (cardIndex) => {
        setLikedCards([...likedCards, cardIndex]);
        console.log('Liked card index:', cardIndex);
    };

    const onSwipedAll = () => {
        console.log('All cards swiped');
        setAllSwiped(true); // Set the allSwiped state to true
    };

    return (
        <View style={styles.container}>
            {allSwiped ? (
                <Text style={styles.noMoreCardsText}>
                    No more Available houses in your region 🥲
                </Text>
            ) : (
                <Swiper
                    containerStyle={styles.swiperContainer}
                    cards={rentalData}
                    renderCard={(card) => <RentalCard card={card} />}
                    onSwipedLeft={onSwipedLeft}
                    onSwipedRight={onSwipedRight}
                    onSwipedAll={onSwipedAll}
                    cardIndex={index}
                    backgroundColor={'#f0f0f0'}
                    stackSize={2}
                    animateOverlayLabelsOpacity
                    animateCardOpacity
                />
            )}
        </View>
    );
}


// Constants for styling
const { width, height } = Dimensions.get('window');
const cardHeight = 550;
const cardMargin = 10;

// StyleSheet
const styles = StyleSheet.create({
    noMoreCardsText: {
        flex: 1,
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: cardHeight/3,
    },
    // swiperContainer: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     padding: 0, // Example to remove padding
    //     margin: 0,  // Example to remove margin
    //     // ...any other style properties you want to apply
    // },
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    card: {
        flex: 0,
        borderRadius: 10,
        borderWidth: 1,
        // height: cardHeight,
        borderColor: '#E8E8E8',
        backgroundColor: 'white',
        margin: cardMargin/2,
        // marginBottom: cardMargin, // Adding a bit more space at the bottom
        justifyContent: 'center',
        width: "100%"
    },
    image: {
        width: '100%', // Take full width of the card
        aspectRatio: 1.3, // You can adjust this value to your preference
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        resizeMode: 'cover', // or 'contain' based on your preference
    },
    address: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 5,
        paddingHorizontal: '5%',
    },
    price: {
        fontSize: 20,
        fontWeight: '600',
        marginVertical: 5,
        paddingHorizontal: '5%',
    },
    detailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%', // Use percentage for responsiveness
        alignSelf: 'center',
        marginVertical: 5,
    },
    detailsText: {
        fontSize: 16,
    },
    availability: {
        fontSize: 16,
        paddingHorizontal: '5%',
        alignSelf: "left"
    },
    leaseLength: {
        fontSize: 16,
        paddingHorizontal: '5%',
        alignSelf: "right"
    },
    actionIconsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        widht: "100%",
        padding: 10, // Add padding if necessary
    },
});

export { Home };
