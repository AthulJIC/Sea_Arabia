import React, { useState } from "react";
import { View, Text, SafeAreaView, Pressable, ScrollView, StyleSheet, Image, TouchableOpacity } from "react-native";
import BackIcon from "../../assets/icon/BackIcon";
import Styles from "../../public/Styles";
import useBackButtonHandler from "../../components/BackHandlerUtils";

function HelpSupportScreen({ navigation, route }) {
    useBackButtonHandler(navigation, false);

    const [isFaqCollapsed, setIsFaqCollapsed] = useState(true);
    // State to manage the visibility of answers
    const [showAnswer1, setShowAnswer1] = useState(false);
    const [showAnswer2, setShowAnswer2] = useState(false);
    const [showAnswer3, setShowAnswer3] = useState(false);

    // Function to toggle the visibility of the answers
    // State to manage the visibility of answers for each accordion item
    const [accordionStates, setAccordionStates] = useState([false, false, false]);

    // Function to toggle the visibility of the answers for a specific accordion item
    const toggleAccordion = (index) => {
        const newAccordionStates = [...accordionStates];
        newAccordionStates[index] = !newAccordionStates[index];
        setAccordionStates(newAccordionStates);
    };

    const openWhatsApp = () => {
        // Use the Linking module to open WhatsApp
        Linking.openURL('whatsapp://send?text=Hello');
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView>
                <View style={{ flexDirection: 'row' }}>
                    <Pressable style={[Styles.backIcon, { marginTop: 12, }]} onPress={() => navigation.navigate('Profile')}>
                        <BackIcon color='#1B1E28'></BackIcon>
                    </Pressable>
                    <Text style={{ marginTop: 25, marginLeft: 15, fontSize: 14, color: 'rgba(25, 28, 29, 0.8)', fontFamily: 'Roboto-Medium' }}>Help & Support</Text>
                </View>
                <View style={{ borderBottomColor: 'rgba(0, 0, 0, 0.8)', borderBottomWidth: 0.7, width: '100%', alignSelf: 'center', marginTop: 17 }}></View>
                <View style={{ borderBottomColor: 'rgba(0, 0, 0, 0.8)', width: '100%', alignSelf: 'center', marginTop: 17, alignSelf: 'left' }}>
                    <Text style={styles.HeadTxt}>Hello Alexa,</Text>
                    <Text style={styles.SubTxt}>How can we help you?</Text>
                </View>
                <View style={styles.cardContainer}>
                    {/* Card 1 */}
                    <View style={styles.card}  onPress={() => openWhatsApp()}>
                        <Image source={require('../../assets/images/whatsapp.png')} style={{ alignSelf: "center" }} resizeMode='cover'></Image>
                        <Text style={{ alignSelf: "center" }}>WhatsApp</Text>
                    </View>

                    {/* Card 2 */}
                    <View style={styles.card}>
                        <Image source={require('../../assets/images/call.png')} style={{ alignSelf: "center" }} resizeMode='cover'></Image>
                        <Text style={{ alignSelf: "center" }}>Call</Text>
                    </View>

                    {/* Card 3 */}
                    <View style={styles.card}>
                        <Image source={require('../../assets/images/mail.png')} style={{ alignSelf: "center" }} resizeMode='cover'></Image>
                        <Text style={{ alignSelf: "center" }}>E-mail</Text>
                    </View>
                </View>
                <View style={{ borderBottomColor: 'rgba(0, 0, 0, 0.8)', width: '100%', alignSelf: 'center', marginTop: 17, alignSelf: 'left' }}>
                    <Text style={styles.HeadTxt}>FAQ</Text>
                </View>

                {/* Accordion Content */}
                <TouchableOpacity style={styles.AccordionCard} onPress={() => toggleAccordion(0)}>
                    <Text style={styles.cardQuestion}>Question 1</Text>
                    {accordionStates[0] && <Text style={styles.cardAnswer}>Answer 1</Text>}
                </TouchableOpacity>
                <View style={styles.separator}></View>
                <TouchableOpacity style={styles.AccordionCard} onPress={() => toggleAccordion(1)}>
                    <Text style={styles.cardQuestion}>Question 2</Text>
                    {accordionStates[1] && <Text style={styles.cardAnswer}>Answer 2</Text>}
                </TouchableOpacity>
                <View style={styles.separator}></View>
                <TouchableOpacity style={styles.AccordionCard} onPress={() => toggleAccordion(2)}>
                    <Text style={styles.cardQuestion}>Question 3</Text>
                    {accordionStates[2] && <Text style={styles.cardAnswer}>Answer 3</Text>}
                </TouchableOpacity>
                <View style={styles.separator}></View>


                <View style={{ borderBottomColor: 'rgba(0, 0, 0, 0.8)', width: '100%', alignSelf: 'center', marginTop: 17, alignSelf: 'left' }}>
                    <Text style={styles.HeadTxt}>General</Text>
                    <TouchableOpacity style={styles.AccordionCard} onPress={() => toggleAccordion(4)}>
                        <Text style={styles.cardQuestion}>Question 3</Text>
                        {accordionStates[4] && <Text style={styles.cardAnswer}>Answer 4</Text>}
                    </TouchableOpacity>
                    <View style={styles.separator}></View>
                    <TouchableOpacity style={styles.AccordionCard} onPress={() => toggleAccordion(5)}>
                        <Text style={styles.cardQuestion}>Question 3</Text>
                        {accordionStates[5] && <Text style={styles.cardAnswer}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, assumenda!</Text>}
                    </TouchableOpacity>
                    <View style={styles.separator}></View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    HeadTxt: {
        fontSize: 20,
        marginTop: 10,
        color: 'rgba(27, 30, 40, 0.8)',
        fontWeight: '600',
        fontFamily: 'Roboto-medium',
        marginLeft: 15,
    },
    SubTxt: {
        fontSize: 25,
        color: 'rgba(27, 30, 40, 0.8)',
        fontWeight: '600',
        fontFamily: 'Roboto-medium',
        marginLeft: 15,
    },
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20

    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 20,
        width: '32%', // Adjust the width as needed
        elevation: 2, // For Android
        shadowColor: '#000', // For iOS
        shadowOffset: { width: 0, height: 2 }, // For iOS
        shadowOpacity: 0.2, // For iOS
        shadowRadius: 4, // For iOS
    },
    AccordionCard: {
        backgroundColor: 'white',
        padding: 10,
        width: '90%',
        alignSelf: 'center',
    },
    cardQuestion: {
        fontSize: 16,
        color: 'rgba(27, 30, 40, 0.8)',
        fontWeight: '600',
        fontFamily: 'Roboto-medium',
        marginBottom: 10,
        right:10
    },
    cardAnswer: {
        fontSize: 14,
        color: 'rgba(27, 30, 40, 0.8)',
        fontFamily: 'Roboto-Regular',
        right:10
    },
    separator: {
        borderBottomColor: '#F7F7F9',
        borderBottomWidth: 2.5,
        width: '90%',
        alignSelf: 'center',
        marginBottom: 10,
    },
})
export default HelpSupportScreen;