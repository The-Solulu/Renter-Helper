import React from "react";
import { TextInput, View, Text, Button, StyleSheet, FlatList, } from "react-native";
import { get_test_person, get_conversation, get_test_conversation } from "../Backend/firebase.js";
import { Container, Card, UserInfo, UserImgWrapper, UserImg, UserInfoText, UserName, PostTime, MessageText, TextSection, } from "../Styles/MessageStyles";


const Messages = [
  {
    id: "1",
    userName: "Jenny Doe",
    userImg: require("../assets/user.webp"),
    messageTime: "4 mins ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  }
];

const MessagesScreen = ({ navigation }) => {
  get_test_person().then((data) => {
    for (let index = 0; index < data.conversations.length; index++) {
      const conv_id = data.conversations[index];
      get_conversation(conv_id).then((data) => {
        var new_messages = [];
        data.forEach((message) => {
          
          new_messages.push({
            id: conv_id,
            userName: message.user_id,
            userImg: require("../assets/user.webp"),
            messageTime: message.timestamp,
            messageText: message.text,
          });
        }
      })
    }
  })
  return (
    <Container>
      <FlatList
        data={Messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card
            onPress={() =>
              navigation.navigate("Chat", { userName: item.userName })
            }
          >
            <UserInfo>
              <UserImgWrapper>
                <UserImg source={item.userImg} />
              </UserImgWrapper>
              <TextSection>
                <UserInfoText>
                  <UserName>{item.userName}</UserName>
                  <PostTime>{item.messageTime}</PostTime>
                </UserInfoText>
                <MessageText>{item.messageText}</MessageText>
              </TextSection>
            </UserInfo>
          </Card>
        )}
      />
    </Container>
  );
};

export default MessagesScreen;
