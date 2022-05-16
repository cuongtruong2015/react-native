import React from 'react'
import Config from "react-native-config";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CalendarScreen from './components/Calendar/CalendarScreen';
import TodoList from './components/TodoList';
const Stack = createBottomTabNavigator();
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
