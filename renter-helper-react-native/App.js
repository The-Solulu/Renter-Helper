import React, { useState } from "react";
import { Home } from "./Views/Home";
import { People } from "./Views/People";
import { Messages } from "./Views/MessagesScreen";
import { Settings } from "./Views/Settings";
import "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChatScreen from "./Views/ChatScreen";
import MessagesScreen from "./Views/MessagesScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AreYouARenterOrOwner from "./Views/AreYouARenterOrOwner.js"; // Import your component
import { create_user_with, sign_in_with } from "./Backend/firebase.js"
import LoginScreen from "./Views/LoginScreen.js";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MessageStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Messages"
      component={MessagesScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Chat"
      component={ChatScreen}
      options={({ route }) => ({
        title: route.params.userName,
        headerBackTitleVisible: false,
      })}
    />
  </Stack.Navigator>
);

export default function App() {
  const getTabBarVisibility = (route) => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : "";

    if (routeName === "Chat") {
      return false;
    }
    return true;
  };

  const [isSignedOn, setIsSignedOn] = useState(false);

  if (isSignedOn) {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="People"
            component={People}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Messages"
            component={MessageStack}
            options={({ route }) => ({
              tabBarVisible: getTabBarVisibility(route),
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="chatbubble-outline" size={size} color={color} />
              ),
            })}
          />

          <Tab.Screen
            name="Settings"
            component={Settings}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="settings" size={size} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  } else {
    // Render the AreYouARenterOrOwner component
    return <LoginScreen />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
