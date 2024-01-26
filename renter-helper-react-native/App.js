import { Home } from './Views/Home';
import { People } from './Views/People';
import { Messages } from './Views/Messages';
import { Settings } from './Views/Settings';
import 'react-native-gesture-handler';

import { Ionicons, Feather } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Chat from './Views/Chat';

// const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

/*const MessageStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen name="Messages" component={Messages} />
    <Stack.Screen name="Chat" component={Chat} />
  </Stack.Navigator>
)*/

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen name="People" component={People}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen name="Messages" component={Messages}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="chatbubble-outline" size={size} color={color} />
            ),
          }}

        />
        
        <Tab.Screen name="Settings" component={Settings}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
