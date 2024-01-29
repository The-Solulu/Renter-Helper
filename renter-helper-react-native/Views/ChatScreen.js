import React from "react";
import { View, ScrollView, Text, Button, StyleSheet } from "react-native";

const ChatScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Chat Screen</Text>
      <Button title="Click here" onPress={() => {}} />
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
