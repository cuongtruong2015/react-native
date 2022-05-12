import React, { useRef, useState, useEffect } from 'react';
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
import Task from './Task';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Stack = createBottomTabNavigator();
export default function TodoList({ navigation, route }) {
  const [task, setTask] = useState();
  const [tasks, setTasks] = useState([]);
  const isTodayScreen = route?.params?.name === "Today"
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos').then(response => response.json()).then(json => setData(json));
  }, [])
  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        {/* <Text style={styles.title}> Today's tasks</Text> */}
        {/* Task List */}
        <View style={styles.itemList}>
          {tasks.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => setTasks(tasks.filter(i => i !== item))}>
              <Task text={item} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <KeyboardAvoidingView style={styles.taskWritter}
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TextInput style={styles.taskInput} placeholder={'Write a task'} onChangeText={(text) => setTask(text)} />
        <TouchableOpacity style={styles.taskButton} onPress={() => setTasks([...tasks, task])}>
          <View style={styles.iconPlusWrapper} >
            <Text style={styles.iconPlus} >+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView >
      {!isTodayScreen &&
        <Button onPress={() => navigation.navigate('Today', { name: 'Today' })} title={"move to Today's task"}></Button>}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tasksWrapper: {
    paddingTop: 30,
    paddingHorizontal: 20,
    flex: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  itemList: {},
  taskWritter: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 30
  },
  taskInput: {
    width: 250,
    backgroundColor: '#fff',
    borderRadius: 60,
    borderWidth: 1,
    borderColor: '#C0C0C0',
    padding: 15
  },
  iconPlusWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 60,
    borderWidth: 1,
    borderColor: '#C0C0C0',
  },
  iconPlus: {
    fontSize: 30,
  }
  , taskButton: {}
});

