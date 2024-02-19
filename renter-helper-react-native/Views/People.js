import React, { useState } from 'react';
import { Button,View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {get_test_person} from '../Backend/firebase.js';

// Your rental data
var rentalData = [
  {
    name: 'First and Last Name',
    interests: 'Reading, cleaning',
    clean: 'Clean',
    petPolicy: 'Pet Allowed',
    smokingPolicy: 'No Smoking',
    availability: 'Available 7/18',
    leaseLength: '12-Month Lease',
    imageUri: 'https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg',
  },
  {
    name: 'First and Last Name',
    interests: 'Reading, cleaning',
    clean: 'Clean',
    petPolicy: 'Pet Allowed',
    smokingPolicy: 'No Smoking',
    availability: 'Available 7/18',
    leaseLength: '12-Month Lease',
    imageUri: 'https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg',
  },
  {
    name: 'First and Last Name',
    interests: 'Reading, cleaning',
    clean: 'Clean',
    petPolicy: 'Pet Allowed',
    smokingPolicy: 'No Smoking',
    availability: 'Available 7/18',
    leaseLength: '12-Month Lease',
    imageUri: 'https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg',
  }
];

// Rental card component
function RentalCard({ card }) {
  return (
    <View style={styles.card}>
      <Image
        style={styles.image}
        source={{ uri: card.imageUri }}
      />
      <Text style={styles.name}>{card.name}</Text>
      <View style={styles.detailsRow}>
        <Text style={styles.detailsText}>{card.interests}</Text>
        <Text style={styles.detailsText}>{card.clean}</Text>
      </View>
      <View style={styles.detailsRow}>
        <Text style={styles.detailsText}>{card.petPolicy}</Text>
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

// Main people component
function People() {
  get_test_person().then((data) => {
    console.log(data.bed_time);
  });
  const [allSwiped, setAllSwiped] = useState(false);

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
          onSwipedAll={onSwipedAll}
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
const cardMargin = 10;

// StyleSheet
const styles = StyleSheet.create({
  noMoreCardsText: {
    flex: 1,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: height / 2,
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
    width: width - cardMargin * 2, // Adjust card width based on screen width
    alignSelf: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 5,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: 'cover',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  detailsText: {
    fontSize: 16,
  },
  availability: {
    fontSize: 16,
  },
  leaseLength: {
    fontSize: 16,
  },
  actionIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
});

export { People };