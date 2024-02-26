import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableHighlight } from "react-native";
import RenterInfo from "./RenterInfo";
import HomeOwnerInfo from "./HomeOwnerInfo";

function AreYouARenterOrOwner({ setIsSignedOn }) {
  const [showRenterInfo, setShowRenterInfo] = useState(false);
  const [showHomeOwnerInfo, setShowHomeOwnerinfo] = useState(false);

  const handleOwnerPress = () => {
    console.log("I am Home Owner Button pressed");
    // Add logic if needed for the Home Owner button press
    setShowHomeOwnerinfo(true);
  };

  const handleRenterPress = () => {
    console.log("I am a Renter button pressed.");
    // Set showRenterInfo to true when the Renter button is pressed
    setShowRenterInfo(true);
  };

  return (
    <View>
      {!showRenterInfo && !showHomeOwnerInfo && (
        <View style={styles.container}>
          <TouchableHighlight
            style={styles.button}
            underlayColor="rgba(255, 255, 255, 0.5)"
            onPress={handleOwnerPress}
          >
            <Text style={styles.buttonText}>I am a Home Owner</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.button}
            underlayColor="rgba(255, 255, 255, 0.5)"
            onPress={handleRenterPress}
          >
            <Text style={styles.buttonText}>I am a Renter</Text>
          </TouchableHighlight>
        </View>
      )}
      {showRenterInfo && <RenterInfo setIsSignedOn={setIsSignedOn} />}
      {showHomeOwnerInfo && <HomeOwnerInfo setIsSignedOn={setIsSignedOn} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "",
    padding: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "purple",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default AreYouARenterOrOwner;
