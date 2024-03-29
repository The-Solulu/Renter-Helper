import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ActivityIndicator } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { get_test_home } from "../Backend/firebase.js";

const { width, height } = Dimensions.get('window');
const cardMargin = 10;
const cardWidth = width - (cardMargin * 5);
const cardHeight = height * 0.7;

function RentalCard({ card }) {
    const availabilityDate = card.availability?.toDate().toLocaleDateString("en-US");
    const petPolicyText = card.petPolicy ? "Allowed" : "Unallowed";
    const smokingPolicyText = card.smokingPolicy ? "Allowed" : "Unallowed";

    return (
        <View style={styles.card}>
            <Image style={styles.image} source={{ uri: card.imageUri }} />
            <Text style={styles.address}>{card.address}</Text>
            <Text style={styles.price}>${card.price}</Text>
            <View style={styles.detailsRow}>
                <MaterialIcons name="bed" size={24} color="black" />
                <Text style={styles.detailsText}>{card.bedrooms} </Text>
                <MaterialIcons name="bathtub" size={24} color="black" />
                <Text style={styles.detailsText}>{card.bathrooms} </Text>
            </View>
            <View style={styles.detailsRow}>
                <MaterialIcons name="pets" size={24} color="black" />
                <Text style={styles.detailsText}> {petPolicyText}</Text>
                <MaterialIcons name="smoke-free" size={24} color="black" />
                <Text style={styles.detailsText}>{smokingPolicyText}</Text>
            </View>
            <View style={styles.detailsRow}>
                <Text style={styles.availability}>Date: {availabilityDate}</Text>
                <Text style={styles.leaseLength}>Lease: {card.leaseLength}</Text>
            </View>
            <View style={styles.actionIconsContainer}>
                <MaterialCommunityIcons name="close" size={34} color="red" />
                <MaterialCommunityIcons name="heart" size={34} color="green" />
            </View>
        </View>
    );
}

function Home() {
    const [index, setIndex] = useState(0);
    const [likedCards, setLikedCards] = useState([]);
    const [rejectedCards, setRejectedCards] = useState([]);
    const [allSwiped, setAllSwiped] = useState(false);
    const [rentalData, setRentalData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [swiperKey, setSwiperKey] = useState(0);

    useEffect(() => {
        get_new_card();
    }, []);

    function get_new_card() {
        setLoading(true);
        get_test_home().then((res) => {
            if (res) {
                const new_home = {
                    address: res.address,
                    price: res.price,
                    bedrooms: res.bedrooms + " bedroom",
                    bathrooms: res.bathrooms + " bathroom",
                    petPolicy: res.petPolicy ? "Allowed" : "Unallowed",
                    smokingPolicy: res.smokingPolicy ? "Allowed" : "Unallowed",
                    availability: res.availability,
                    leaseLength: res.leaseLength,
                    imageUri: res.imageUrl, // Note: Changed from imageUri to imageUrl based on your data
                };

                setRentalData([new_home]);
                setAllSwiped(false);
            } else {
                console.log("Data is undefined");
            }
        }).catch(error => console.error(error))
        .finally(() => setLoading(false));
    }

    const onSwiped = (cardIndex) => {
        get_new_card();
        setSwiperKey(prevKey => prevKey + 1); // Increment key to force swiper refresh
    };

    if (loading) {
        return <ActivityIndicator size="large" style={{ flex: 1, justifyContent: 'center' }} />;
    }

    return (
        <View style={styles.container}>
            {allSwiped ? (
                <Text style={styles.noMoreCardsText}>No more available houses in your region 🥲</Text>
            ) : (
                <Swiper
                    key={swiperKey}
                    containerStyle={styles.swiperContainer}
                    cards={rentalData}
                    renderCard={(card) => <RentalCard card={card} />}
                    onSwipedLeft={onSwiped}
                    onSwipedRight={onSwiped}
                    onSwipedAll={() => setAllSwiped(true)}
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

const styles = StyleSheet.create({
    noMoreCardsText: {
        flex: 1,
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: cardHeight / 3,
    },
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    card: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E8E8E8',
        backgroundColor: 'white',
        margin: cardMargin,
        justifyContent: 'center',
        alignItems: 'center',
        width: cardWidth,
        height: cardHeight,
    },
    image: {
        width: '100%',
        aspectRatio: 1.3,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        resizeMode: 'cover',
    },
    address: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 5,
        paddingHorizontal: '5%',
    },
    price: {
        fontSize: 18,
        fontWeight: '600',
        marginVertical: 5,
        paddingHorizontal: '5%',
    },
    detailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '90%',
        marginVertical: 5,
    },
    detailsText: {
        fontSize: 16,
    },
    availability: {
        fontSize: 16,
        paddingHorizontal: '5%',
    },
    leaseLength: {
        fontSize: 16,
        paddingHorizontal: '5%',
    },
    actionIconsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        padding: 10,
    },
    swiperContainer: {
        flex: 1,
    },
});

export { Home };
