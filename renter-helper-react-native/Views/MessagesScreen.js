import React from "react";
import { useState } from 'react';
import { TextInput, View, Text, Button, StyleSheet, FlatList, } from "react-native";
import { get_test_person, get_conversation, } from "../Backend/firebase.js";
import { Container, Card, UserInfo, UserImgWrapper, UserImg, UserInfoText, UserName, PostTime, MessageText, TextSection, } from "../Styles/MessageStyles";

const MessagesScreen = ({ navigation }) => {
  var Messages = [
    {
      id: "1",
      userName: "Jenny Doe",
      userImg: require("../assets/user.webp"),
      messageTime: "4 mins ago",
      messageText:
        "Hey there, this is my test for a post of my social app in React Native.",
    }
  ];

  const [messages, setMessages] = useState(Messages);
  
  get_test_person().then((data) => {
    for (let index = 0; index < data.conversations.length; index++) {
      const conv_id = data.conversations[index];
      get_conversation(conv_id).then((data) => {
        var new_messages = [];
        
        data.forEach((message) => {
          new_messages.push({
            id: conv_id,
            userName: message.user_id,
            userImg: "https://developer.mozilla.org/pimg/aHR0cHM6Ly9zdGF0aWM0LmJ1eXNlbGxhZHMubmV0L3V1LzIvMTQ2NjYwLzE3MDc3NTUyMDAtbW96X21vbml0b3JfbWRuX2FkXzAyXzI2MHgyMDAucG5n.VAtgbEYsvhsDpFdmQpfOI7OshtQFnoHrxPBae38Zjuc%3D",
            messageTime: message.time.toDate().toLocaleString(),
            messageText: message.message,
          });
        })
        console.log(new_messages);
        // Messages = new_messages;
        setMessages(new_messages);
      })
    }
  })

  return (
    <Container>
      <FlatList
        data={messages}
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
