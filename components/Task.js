
import React from 'react';
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

} from 'react-native';

export default function Task({ text }) {
    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <TouchableOpacity style={styles.square} />
                <Text style={styles.text}>{text}</Text>
            </View>
            <View style={styles.circular} />
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    itemLeft: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItem: 'center'
    },
    square: {
        width: 24,
        height: 24,
        backgroundColor: '#55BCF6',
        // opacity: 0.4,
        marginRight: 10,
        borderRadius: 5,
    },
    text: {
        fontSize: 18,
        maxWidth: '80%',
    },
    circular: {
        width: 12,
        height: 12,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#55BCF6',

    }
});
