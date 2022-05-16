import {
    StyleSheet,
    Text, View,
    TouchableOpacity,
    Alert
} from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { API_URL } from "@env"
import DialogInput from 'react-native-dialog-input';
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
    const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
    const [listDiary, setListDiary] = useState([]);
    const ClickDate = (title, message) => {
        Alert.alert(title, message,
            [{
                text: "Cancel",
                onPress: () => Alert.alert("Cancel Pressed"),

                style: "cancel",
            }],
            {
                cancelable: true,
                onDismiss: () =>
                    Alert.alert(
                        "This alert was dismissed by tapping outside of the alert dialog."
                    ),
            })
    }
    useEffect(() => {
        const fetchdata = () => {
            fetch(`${API_URL}/diary/get-diary`, {
                'Content-Type': "multipart/form-data",
                Accept: "application/json",
                mode: "*cors"
            })
                .then(response => response.json())
                .then(json => setListDiary(json))
        }
        fetchdata();
        return () => { }
    }, [])
    const getDiaryData = (date) => {
        const data = [];
        listDiary?.map(a => {
            if (a.date.includes(date)) data.push(a)
        })
        return data;
    }
    const [isShowDialog, setIsShowDialog] = useState(false);
    const [dialogInput, setDialogInput] = useState('');
    return (
        <View style={styles.container}>
            <Text>{currentDate}</Text>
            <DialogInput isDialogVisible={isShowDialog}
                title={"DialogInput 1"}
                message={"Message for DialogInput #1"}
                hintInput={"HINT INPUT"}
                submitInput={(inputText) => { setDialogInput(inputText); setIsShowDialog(false) }}
                closeDialog={() => { setIsShowDialog(false) }}>
            </DialogInput>
            <CalendarList
                current={currentDate}
                animateScroll={true}
                horizontal={true}
                pagingEnabled={true}
                hideExtraDays={false}


                dayComponent={({ date, state }) => {
                    if ((date.month >= 10 ? date.month : "0" + date.month) === currentDate.split('-')[1]) {
                        let isCurrentDate = (date.dateString === currentDate);
                        let DataDate = getDiaryData(date.dateString);
                        return (
                            <TouchableOpacity onPress={() => ClickDate('Add Event', 'data')}>
                                <Text style={styles.diaryContent(isCurrentDate, DataDate?.length > 0, state)}>{date.day}</Text>
                                <Text style={styles.diaryContent(isCurrentDate, DataDate?.length > 0, state)} numberOfLines={2}>{DataDate?.length > 0 && DataDate[0].content}</Text>
                                <Text style={styles.diaryContent(isCurrentDate, DataDate?.length > 0, state)} numberOfLines={1}>{DataDate?.length > 0 && DataDate[0].icon}</Text>
                            </TouchableOpacity>
                        );
                    }
                    else return <TouchableOpacity onPress={() => ClickDate('Add Event', 'data')}>
                        <Text style={styles.diaryContent(null, null, state)}>{date.day}</Text>
                        <Text style={styles.diaryContent(null, null, state)}></Text>
                        <Text style={styles.diaryContent(null, null, state)}></Text>
                    </TouchableOpacity>
                }}
            />
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    diaryContent: (isCurrentDate, isMarkedDate, state) =>
    ({
        fontSize: 12,
        textAlign: 'center',
        color: isCurrentDate ? "red" : isMarkedDate ? "#ec03fc" : state === 'disabled' ? "#ced6d3" : "black",
        fontWeight: isCurrentDate || isMarkedDate ? "bold" : "normal"

    }),
});