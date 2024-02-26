import React, { useState, useEffect } from "react";
import { Text, FlatList } from "react-native";
import {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  TextSection,
} from "../Styles/MessageStyles";
import { get_test_person, get_conversation } from "../Backend/firebase.js";

const MessagesScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await get_test_person();
        const promises = data.conversations.map(async (conv_id) => {
          const chatData = await get_conversation(conv_id);
          const new_messages = chatData.map((message) => ({
            id: conv_id,
            userName: message.user_id,
            userImg:
              "https://developer.mozilla.org/pimg/aHR0cHM6Ly9zdGF0aWM0LmJ1eXNlbGxhZHMubmV0L3UvMi9FdXJvcGUtbmF0aW9uYWwtbG9nby1zdGF0dXMtMi0yLmdpZg.PntQdToUJrSuz2zU2InyD_NvGWuYUJ7O-C4nh_zC61o%3D",
            messageTime: message.time.toDate().toLocaleString(),
            messageText: message.message,
          }));
          return new_messages;
        });

        const result = await Promise.all(promises);
        const flattenedMessages = result.flat();
        setMessages(flattenedMessages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
                <UserImg
                  source={{ uri: item.userImg }}
                  defaultSource={require("../assets/user.webp")}
                />
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
