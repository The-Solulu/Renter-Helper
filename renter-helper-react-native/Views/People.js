import React, { useState } from 'react';
import { Button,View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {get_test_person} from '../Backend/firebase.js';

// Your rental data
var rentalData = [
  {
    name: 'Franzi',
    bed_time: '10:30 PM',
    bio: 'I am a software engineer',
    guests: 0,
    interests: ['Reading', 'Coding', 'Hiking'],
    major: 'Computer Science',
    noise_level: 3,
    pets: false,
    pronouns: 'she/her',
    roommates: 3,
    smoking: false,
    wake_time: '6:30 AM',
    tidiness: 1,
    imageUri: 'https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg',
  },
  {
    name: 'Franzi',
    bed_time: '10:30 PM',
    bio: 'I am a software engineer',
    guests: 0,
    interests: ['Reading', 'Coding', 'Hiking'],
    major: 'Computer Science',
    noise_level: 3,
    pets: false,
    pronouns: 'she/her',
    roommates: 3,
    smoking: false,
    wake_time: '6:30 AM',
    tidiness: 1,
    imageUri: 'https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg',
  },
  {
    name: 'Franzi',
    bed_time: '10:30 PM',
    bio: 'I am a software engineer',
    guests: 0,
    interests: ['Reading', 'Coding', 'Hiking'],
    major: 'Computer Science',
    noise_level: 3,
    pets: false,
    pronouns: 'she/her',
    roommates: 3,
    smoking: false,
    wake_time: '6:30 AM',
    tidiness: 1,
    imageUri: 'https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg',
  },
  
];

// Rental card component
function RentalCard({ card }) {
  return (
    <View style={styles.card}>
      <Image style={styles.image} source={{ uri: card.imageUri }} />
      <Text style={styles.name}>{card.name} ({card.pronouns})</Text>
      {/* <Text style={styles.bio}>{card.bio}</Text> */}
      {/* <Text style={styles.detailsText}>Major: {card.major}</Text> */}
      <Text style={styles.detailsText}>Interests: {card.interests.join(', ')}</Text>
      <View style={styles.detailsRow}>
        <Text style={styles.detailsText}>Bed Time: {card.bed_time}</Text>
        <Text style={styles.detailsText}>Wake Time: {card.wake_time}</Text>
      </View>
      <View style={styles.detailsRow}>
        <Text style={styles.detailsText}>Guests: {card.guests}</Text>
        <Text style={styles.detailsText}>Roommates: {card.roommates}</Text>
      </View>
      <View style={styles.detailsRow}>
        <Text style={styles.detailsText}>Noise Level: {card.noise_level}/5</Text>
        <Text style={styles.detailsText}>Tidiness: {card.tidiness}/5</Text>
      </View>
      <View style={styles.detailsRow}>
        <Text style={styles.detailsText}>Pets: {card.pets ? "Yes" : "No"}</Text>
        <Text style={styles.detailsText}>Smoking: {card.smoking ? "Yes" : "No"}</Text>
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
    console.log(data);
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
          No more potential housmates nearby 🥲
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
// const { width, height } = Dimensions.get('window');
// const cardMargin = 10;

const { width, height } = Dimensions.get('window');
const cardMargin = 10;
const cardWidth = width - (cardMargin * 5);
const cardHeight = height * 0.7;

// StyleSheet
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
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 5,
    textAlign: 'center',
  },
  bio: {
    fontSize: 16,
    marginVertical: 5,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  image: {
    width: '100%',
    aspectRatio: 1.4,
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
    flex: 1
  },
  availability: {
    fontSize: 16,
  },
  leaseLength: {
    fontSize: 16,
  },
  actionIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: 10,
  },
});

export { People };