import React, { useState } from 'react';
import { View, Text, SafeAreaView, Pressable, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import BackIcon from "../../assets/icon/BackIcon";
import Styles from "../../public/Styles";
import useBackButtonHandler from "../../components/BackHandlerUtils";
import RightarrowIcon from "../../assets/icon/RightarrowIcon";
import { RadioButton } from 'react-native-paper';
function LanguageScreen({ navigation, route }) {
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const data = [

        {
            id: 1,
            title: 'Arabic',
        },
        {
            id: 2,
            title: 'English',
        },
    ]
    useBackButtonHandler(navigation, false);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView>
                <View style={{ flexDirection: 'row' }}>
                    <Pressable style={[Styles.backIcon, { marginTop: 12, }]} onPress={() => navigation.navigate('Profile')}>
                        <BackIcon color='#1B1E28'></BackIcon>
                    </Pressable>
                    <Text style={{ marginTop: 25, marginLeft: 15, fontSize: 14, color: 'rgba(25, 28, 29, 0.8)', fontFamily: 'Roboto-Medium' }}>Language</Text>
                </View>
                <View style={{ borderBottomColor: 'rgba(0, 0, 0, 0.8)', borderBottomWidth: 0.7, width: '100%', alignSelf: 'center', marginTop: 17 }}></View>
                <View style={styles.languageContainer}>
                    {data.map((item, index) => (
                        <View key={index}>
                            <Pressable
                                style={styles.languageItem}
                                onPress={() => setSelectedLanguage(item.id)}
                            >
                                <Text style={styles.languageText}>{item.title}</Text>
                                <RadioButton.Android
                                    status={selectedLanguage === item.id ? 'checked' : 'unchecked'}
                                    onPress={() => setSelectedLanguage(item.id)}
                                    color="#006970"
                                />
                            </Pressable>
                            <View style={styles.dividerLine}></View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        marginTop: 12,
        marginLeft: 15,
    },
    backIcon: {
        // Add your styles for back icon here
    },
    headerText: {
        marginTop: 25,
        marginLeft: 15,
        fontSize: 14,
        color: 'rgba(25, 28, 29, 0.8)',
        fontFamily: 'Roboto-Medium',
    },
    divider: {
        borderBottomColor: 'rgba(0, 0, 0, 0.8)',
        borderBottomWidth: 0.7,
        width: '100%',
        alignSelf: 'center',
        marginTop: 17,
    },
    languageContainer: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 30,
        backgroundColor: 'white',
        borderRadius: 6,
        elevation: 3,
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
    },
    languageItem: {
        height: 60,
        marginLeft: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    languageText: {
        color: 'rgba(27, 30, 40, 1)',
        fontSize: 15,
        fontFamily: 'Roboto-Regular',
    },
    dividerLine: {
        backgroundColor: 'rgba(245, 245, 245, 1)',
        height: 2,
        width: '90%',
        bottom: 15,
        alignSelf: 'center',
    },
});
export default LanguageScreen;