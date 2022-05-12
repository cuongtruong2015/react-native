import {
    StyleSheet,
    Text, View
} from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
const mongoose = require('mongoose');
const Stack = createBottomTabNavigator();
const Arrow = ({ direction }) => {
    if (direction === 'right')
        return (
            <Icon name="arrow-right" size={20} color="#900" solid />
        )
    else
        return (
            <Icon name="arrow-left" size={20} color="#900" solid />
        )
}

export default function CalendarScreen({ navigation, route }) {
    const [currentDate, setCurrentDate] = useState(new Date().toString().split('T')[0]);
    const nameDTB = 'mongodb-test'
    const pwd = '123456Aa'
    const uriConnect = 'mongodb-test.hthqk.mongodb.net'
    const nameColecttion = 'toDoList' //like table in mysql

    const uri = `mongodb+srv://${nameDTB}:${pwd}@${uriConnect}/${nameColecttion}?retryWrites=true&w=majority`;
    useEffect(() => {
        console.log(uri)
        const fetchdata = async () => {
            await fetch(uri, { useNewUrlParser: true, useUnifiedTopology: true })
                .then((rs) => {
                    console.log('Connected successfully to server');
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        fetchdata();
        return () => { }
    }, [])
    return (
        <View style={styles.container}>
            <Text>{currentDate}</Text>
            <CalendarList
                current={currentDate}
                animateScroll={true}
                horizontal={true}
                pagingEnabled={true}
                hideExtraDays={false}
                onDayPress={(day) => {
                    setCurrentDate(day.dateString)
                }}
                dayComponent={({ date, state }) => {
                    return (
                        <View>
                            <Text style={{ textAlign: 'center', color: state === 'disabled' ? 'gray' : 'black' }}>{date.day}</Text>
                        </View>
                    );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});