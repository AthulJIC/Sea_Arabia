import React, { useCallback, useState } from "react";
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, TouchableHighlight, Pressable ,FlatList} from "react-native";
import BackIcon from "../../assets/icon/BackIcon";
import Styles from "../../public/Styles";
import useBackButtonHandler from "../../components/BackHandlerUtils";
import RaviewRating from "../../ui/Raview_Rating";
import Rating from "../../ui/Rating";
import { useAppContext } from "../../context/AppContext";
import RatingStar from "../../ui/RatingStar";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { BookingApi } from "../../Services/bookings/BookingService";
import AsyncStorage from "@react-native-async-storage/async-storage";



function ReviewScreen() {
    const navigation = useNavigation();
    useBackButtonHandler(navigation, false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [comments, setComments] = useState();
    const [userId, setUserId] = useState();
    const {rating, service} = useAppContext();
    console.log('service', service);
    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                const user_id = await AsyncStorage.getItem('userId');
                setUserId(user_id);
            };
            fetchData(); 
           getReviewComments();
    }, [])
    );
    function getReviewComments() {
        BookingApi.reviewComments().then((res) => {
            console.log('res', res.data);
            setComments(res.data.results)
        })
    }
    const handleOptionPress = (option) => {
        console.log('option', option);
        setSelectedOption(option);
    };
    function submitHandler(){
        if(selectedOption) {
            const data = {
                review_comment : selectedOption?.comment,
                service : service?.service?.id,
                user : userId,
                rating : rating
            }
            console.log(data);
            BookingApi.reviewCreation(data).then((res) => {
                console.log('res', res.data);
                ToastAndroid.show('Your rating is successfully completed', ToastAndroid.SHORT);
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
                    style={[styles.option, selectedOption?.comment === item?.comment && styles.selectedOption]}
                >
                    <Text style={[styles.optionText, selectedOption?.comment ===  item?.comment && styles.selectedOptionText]}>{item.comment}</Text>
                </TouchableHighlight>
            </View>
        )
    }
    // const handleOptionPress = (option) => {
    //     setSelectedOption(option);
    // };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView>
                <View style={{ borderBottomColor: 'rgba(0, 0, 0, 0.8)', width: '100%', alignSelf: 'center', marginTop: 17 }}>
                    <Image source={require('../../assets/images/review-1.png')} style={styles.image} resizeMode='cover'></Image>
                    <Text style={styles.ImgTxt}>"Your experience fuels our flight!"</Text>
                    <RatingStar initialRating={rating}/>
                </View>
                {/* <Text style={{ alignSelf: 'center', marginTop: 30, fontSize: 18, color: 'rgba(0, 104, 117, 1)', fontWeight: '500', lineHeight: 16 }}>"Your experience fuels our flight!"</Text> */}
                {/* <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 10 }}>
                    <View style={styles.optionsContainer}>
                        <TouchableHighlight
                            onPress={() => handleOptionPress("value1")}
                            underlayColor="#007479" // Change the background color when pressed
                            style={[styles.option, selectedOption === "value1" && styles.selectedOption]}
                        >
                            <Text style={[styles.optionText, selectedOption === "value1" && styles.selectedOptionText]}>Unprofessional Crew</Text>
                        </TouchableHighlight>

                        <TouchableHighlight
                            onPress={() => handleOptionPress("value2")}
                            underlayColor="#007479"
                            style={[styles.option, selectedOption === "value2" && styles.selectedOption]}
                        >
                            <Text style={[styles.optionText, selectedOption === "value2" && styles.selectedOptionText]}>Mechanical Issues</Text>
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 10 }}>
                    <View style={styles.optionsContainer}>
                        <TouchableHighlight
                            onPress={() => handleOptionPress("value3")}
                            underlayColor="#007479" // Change the background color when pressed
                            style={[styles.option, selectedOption === "value3" && styles.selectedOption]}
                        >
                            <Text style={[styles.optionText, selectedOption === "value3" && styles.selectedOptionText]}>Communication Issues</Text>
                        </TouchableHighlight>

                        <TouchableHighlight
                            onPress={() => handleOptionPress("value4")}
                            underlayColor="#007479"
                            style={[styles.option, selectedOption === "value4" && styles.selectedOption]}
                        >
                            <Text style={[styles.optionText, selectedOption === "value4" && styles.selectedOptionText]}>Safety Concerns</Text>
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 10 }}>
                    <View style={styles.optionsContainer}>
                        <TouchableHighlight
                            onPress={() => handleOptionPress("value5")}
                            underlayColor="#007479" // Change the background color when pressed
                            style={[styles.option, selectedOption === "value5" && styles.selectedOption]}
                        >
                            <Text style={[styles.optionText, selectedOption === "value5" && styles.selectedOptionText]}>Inadequate Facilities</Text>
                        </TouchableHighlight>

                        <TouchableHighlight
                            onPress={() => handleOptionPress("value6")}
                            underlayColor="#007479"
                            style={[styles.option, selectedOption === "value6" && styles.selectedOption]}
                        >
                            <Text style={[styles.optionText, selectedOption === "value6" && styles.selectedOptionText]}>Safety Concerns</Text>
                        </TouchableHighlight>
                    </View>
                </View> */}
                <FlatList
                        data={comments}
                        numColumns={2}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderItem}
                        style={{width: '100%'}}
                    />
                <Text style={{ alignSelf: 'center', marginTop: 40, fontSize: 14, color: 'rgba(0, 0, 0, 0.8)', fontWeight: '400', lineHeight: 20 }}>"Thank you for rating us! Your feedback helps us improve and create a better experience for you. We appreciate your support!"</Text>
                <Pressable style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginTop: 20 }}>
                    <Pressable style={{ flex: 1, height: 50, borderRadius: 3, alignItems: 'center', justifyContent: 'center' }} onPress={() => navigation.goBack()}>
                        <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontSize: 18, fontFamily: 'Roboto-regular' }}>Cancel</Text>
                    </Pressable>
                    <Pressable style={{ borderWidth: 1, borderColor: 'rgba(0, 104, 117, 1)', flex: 1, marginLeft: 10, height: 50, borderRadius: 3, alignItems: 'center', justifyContent: 'center' }} onPress={submitHandler}>
                        <Text style={{ color: 'rgba(0, 104, 117, 1)', fontSize: 18, fontFamily: 'Roboto-regular' }}>Submit</Text>
                    </Pressable>
                </Pressable>
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
        // textAlign: 'center',
        alignSelf: 'center',
    },
    ImgTxt: {
        fontSize: 20,
        // marginBottom: 140,
        marginTop: 40,
        width: 300,
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
        textAlign:'center'
      
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
export default ReviewScreen;