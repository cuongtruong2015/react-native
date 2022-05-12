import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Button,
  Alert,
  Image,
  KeyboardAvoidingView,
  TextInput
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { RNCamera } from 'react-native-camera'
import Task from './components/Task';
import TodoList from './components/TodoList';
import CalendarScreen from './components/Calendar/CalendarScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
const Stack = createBottomTabNavigator();
import Svg, {
  SvgUri
} from 'react-native-svg';
import Autocode from './assets/svg/autocode.svg'
import Heartcalendar from './assets/svg/heartcalendar.svg'
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Today"
          component={TodoList}
          options={{
            title: "Today's tasks", tabBarIcon: () => (
              <Icon name="calendar" width={120} height={40} />

            )
          }}
        />
        <Stack.Screen
          name="Calendar"
          component={CalendarScreen}
          options={{
            title: "Calendar",
            tabBarIcon: () => (
              <Icon name="calendar-week" size={25} solid color={"#ffaaad"} />
            )
          }}
        />
        <Stack.Screen
          name="Week"
          component={TodoList}
          options={{ title: "Week's tasks" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
