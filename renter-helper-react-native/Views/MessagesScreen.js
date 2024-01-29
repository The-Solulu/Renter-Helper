import React from "react";
import { TextInput, View, Text, Button, StyleSheet } from "react-native";

const MessagesScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Message Screen</Text>
      <Button title="Click Here" onPress={() => navigation.navigate("Chat")} />
    </View>
  );
};

export default MessagesScreen;
