import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Animated,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons"; // Import FontAwesome5 icon from expo

import RenterInfo from "./RenterInfo";
import HomeOwnerInfo from "./HomeOwnerInfo";

function AreYouARenterOrOwner({ setIsSignedOn }) {
  const [showRenterInfo, setShowRenterInfo] = useState(false);
  const [showHomeOwnerInfo, setShowHomeOwnerInfo] = useState(false);
  const [buttonOpacity] = useState(new Animated.Value(1));

  const handleOwnerPress = () => {
    console.log("I am Home Owner Button pressed");
    setShowHomeOwnerInfo(true);
    animateButton();
  };

  const handleRenterPress = () => {
    console.log("I am a Renter button pressed.");
    setShowRenterInfo(true);
    animateButton();
  };

  const animateButton = () => {
    Animated.timing(buttonOpacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      {!showRenterInfo && !showHomeOwnerInfo && (
        <Animated.View style={{ opacity: buttonOpacity }}>
          <View style={styles.buttonContainer}>
            <View>
              <TouchableHighlight
                style={styles.button}
                underlayColor="rgba(255, 255, 255, 0.5)"
                onPress={handleOwnerPress}
              >
                <>
                  <FontAwesome5 name="home" size={24} color="white" />
                  <Text style={styles.buttonText}>I own a home</Text>
                </>
              </TouchableHighlight>
            </View>

            <View>
              <TouchableHighlight
                style={styles.button}
                underlayColor="rgba(255, 255, 255, 0.5)"
                onPress={handleRenterPress}
              >
                <>
                  <FontAwesome5 name="user" size={24} color="white" />
                  <Text style={styles.buttonText}>I am a Renter</Text>
                </>
              </TouchableHighlight>
            </View>
          </View>
        </Animated.View>
      )}
      {showRenterInfo && <RenterInfo setIsSignedOn={setIsSignedOn} />}
      {showHomeOwnerInfo && <HomeOwnerInfo setIsSignedOn={setIsSignedOn} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  button: {
    backgroundColor: "blue",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default AreYouARenterOrOwner;
