import React from "react";
import { StyleSheet, View, Text, TouchableHighlight,TouchableOpacity } from "react-native";

function AreYouARenterOrOwner() {
  const handleOwnerPress = () => {
    console.log("I am Home Owner Button pressed");
  };

  const handleRenterPress = () => {
    console.log("I am a Renter button pressed.");
  };

  return (
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "",
    padding: 60,
    alignItems: "center",
    justifyContent:"center"
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