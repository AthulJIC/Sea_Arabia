import React, { useState } from "react";
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, TouchableHighlight, Pressable,FlatList, Alert,ToastAndroid } from "react-native";
import BackIcon from "../../assets/icon/BackIcon";
import Styles from "../../public/Styles";
import useBackButtonHandler from "../../components/BackHandlerUtils";
import { useNavigation } from "@react-navigation/native";
import { useAppContext } from "../../context/AppContext";
import { BookingApi } from "../../Services/bookings/BookingService";

const filterTitle = [
    {
        id: 1,
        title: 'Unexpected Circumstances',
    },
    {
        id: 2,
        title: 'Personal Reasons',
    },
    {
        id: 3,
        title: 'Accommodation Problems',
        
    },
    {
        id: 4,
        title: 'Health Concerns',
    },
    {
        id: 5,
        title: 'Lack of Interest',
    },
    {
        id: 6,
        title: 'Safety Concerns',
    },
];


function CancelReviewScreen() {

    const navigation = useNavigation();
    useBackButtonHandler(navigation, false);
    const [selectedOption, setSelectedOption] = useState(null);
    const {bookingId} = useAppContext();

    const handleOptionPress = (option) => {
        console.log('option', option);
        setSelectedOption(option);
    };
    function submitHandler(){
        if(selectedOption) {
            const data = {
                cancellation_reason : selectedOption?.title
            }
            console.log(data,bookingId);
            BookingApi.cancelBooking(bookingId, data).then((res) => {
                console.log('res', res.data);
                ToastAndroid.show('Your Booking is successfully cancelled', ToastAndroid.SHORT);
                navigation.navigate('Bookings')
            })
        }
        else {
            Alert.alert('Choose any option')
        }
    }
    function renderItem({item}){
        return(
            <View style={styles.optionsContainer}>
                <TouchableHighlight
                    onPress={() => handleOptionPress(item)}
                    underlayColor="#007479" // Change the background color when pressed
                    style={[styles.option, selectedOption?.id === item?.id && styles.selectedOption]}
                >
                    <Text style={[styles.optionText, selectedOption?.id ===  item?.id && styles.selectedOptionText]}>{item.title}</Text>
                </TouchableHighlight>
            </View>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView>
                <Pressable style={[Styles.backIcon,{marginTop:12,}]} onPress={() => navigation.goBack()}>
                    <BackIcon color='#1B1E28'></BackIcon>
                </Pressable>
                <View style={{ borderBottomColor: 'rgba(0, 0, 0, 0.8)', width: '100%', alignSelf: 'center', marginTop: 10 }}>
                    <Image source={require('../../assets/images/review-1.png')} style={styles.image} resizeMode='cover'></Image>
                    <Text style={styles.ImgTxt}>"Pick your compass points! Your feedback matters"</Text>
                </View>
                <View>
                    <FlatList
                        data={filterTitle}
                        numColumns={2}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderItem}
                        style={{width: '100%'}}
                    />
                </View>
                {/* <Text style={{ alignSelf: 'center', marginTop: 40, fontSize: 14, color: 'rgba(0, 0, 0, 0.8)', fontWeight: '400', lineHeight: 20 }}>"Thank you for rating us! Your feedback helps us improve and create a better experience for you. We appreciate your support!"</Text> */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginTop: 20 }}>
                    {/* <Pressable style={{ flex: 1, height: 50, borderRadius: 3, alignItems: 'center', justifyContent: 'center' }} onPress={() => navigation.goBack()}>
                        <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontSize: 18, fontFamily: 'Roboto-regular' }}>Cancel</Text>
                    </Pressable> */}
                    <Pressable style={{ borderWidth: 1, borderColor: 'rgba(0, 104, 117, 1)', flex: 1, marginLeft: 10, height: 50, borderRadius: 3, alignItems: 'center', justifyContent: 'center' }} onPress={submitHandler}>
                        <Text style={{ color: 'rgba(0, 104, 117, 1)', fontSize: 18, fontFamily: 'Roboto-regular' }}>Submit</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    image: {
        width: 290,
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        alignSelf: 'center',
    },
    ImgTxt: {
        fontSize: 14,
        // marginBottom: 140,
        marginTop: 40,
        width: 350,
        height: 25,
        color: 'rgba(0, 104, 117, 1)',
        fontWeight: '500',
        fontFamily: 'Roboto-Regular',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        alignSelf: 'center',
    },
    optionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',  // Allow items to wrap into the next row
        justifyContent: 'space-between', // Distribute items evenly between the columns
        marginTop: 10,
        alignItems: 'center',
        padding: 5,
    },
    option: {
        flexBasis: '48%', // Set the width of each item to take up approximately half of the container
        padding: 5,
        borderRadius: 5,
        // backgroundColor: 'red',
        marginBottom: 5, 
      
    },
    selectedOption: {
        backgroundColor: "#007479",
    },
    optionText: {
        fontSize: 16,
        color: "#000",
        opacity: 70,
        textAlign:'center'
    },
    selectedOptionText: {
        color: "#fff", // Set text color to white when selected
    },
})
export default CancelReviewScreen;