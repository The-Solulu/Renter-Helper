import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { useWindowDimensions } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { get_test_home } from "../Backend/firebase.js"
import { set } from 'firebase/database';

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

function get_new_card() {
    get_test_home().then((res) => {
        const new_home =
        {
            address: res.address,
            price: res.price,
            bedrooms: res.bedrooms,
            bathrooms: res.bathrooms,
            petPolicy: 'Pet Allowed',
            smokingPolicy: 'No Smoking',
            availability: 'Available 7/18',
            leaseLength: '12-Month Lease',
            imageUri: 'https://reactjs.org/logo-og.png',
        }

        rentalData.push(new_home)
    })
}

// Main home component
function Home() {

    const [index, setIndex] = useState(0);
    const [likedCards, setLikedCards] = useState([]);
    const [rejectedCards, setRejectedCards] = useState([]);
    const [allSwiped, setAllSwiped] = useState(true);

    // get_new_card().then(() => {
    //     setAllSwiped(false);
    // })

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
const scaleFontSize = (size) => {
    const scaleFactor = width / 320; // Assuming 320 is the baseline width of design
    return size * scaleFactor;
};

const cardMargin = 10;
const { width, height } = Dimensions.get('window');
const cardWidth = width - (cardMargin * 2); // Width with margin taken into account
const cardHeight = height * 0.8; // Adjust this value to change the card's height based on the screen size

// const cardHeight = 550;

// StyleSheet
const styles = StyleSheet.create({
    noMoreCardsText: {
        flex: 1,
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: cardHeight / 3,
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
        borderColor: '#E8E8E8',
        backgroundColor: 'white',
        margin: cardMargin,
        justifyContent: 'center top',
        width: cardWidth,
        height: cardHeight,
    },
    image: {
        width: '100%', // Take full width of the card
        aspectRatio: 1.3, // You can adjust this value to your preference
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        resizeMode: 'cover', // or 'contain' based on your preference
    },
    address: {
        fontSize: scaleFontSize(24), // Use scale function for font size
        fontWeight: 'bold',
        marginVertical: 5,
        paddingHorizontal: '5%',
    },
    price: {
        fontSize: scaleFontSize(20), // Use scale function for font size
        fontWeight: '600',
        marginVertical: 5,
        paddingHorizontal: '5%',
    },
    detailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%', // Use percentage for responsiveness
        marginVertical: 5,
    },
    detailsText: {
        fontSize: scaleFontSize(16),
    },
    availability: {
        fontSize: scaleFontSize(16),
        paddingHorizontal: '5%',
    },
    leaseLength: {
        fontSize: scaleFontSize(16),
        paddingHorizontal: '5%',
    },
    actionIconsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        widht: "100%",
        padding: 10, // Add padding if necessary
    },
});

export { Home };
