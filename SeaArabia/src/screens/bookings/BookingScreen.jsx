import { View, Text, SafeAreaView, ScrollView, Pressable, StyleSheet, Image } from "react-native"
import Header from "../../components/Header";
import { useCallback, useState } from "react";
import Styles from "../../public/Styles";
import EmptyIcon from "../../assets/icon/EmptyIcon";
import BestDeals from "../../ui/BestDeals";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import useBackButtonHandler from "../../components/BackHandlerUtils";
import LocationIcon from "../../assets/icon/LocationIcon";
import Rating from "../../ui/Rating";
import RaviewRating from "../../ui/Raview_Rating";
import Modal from 'react-native-modal';
const filterTitle = [
    {
        id: 1,
        title: 'Upcoming',
        value: 'AllRequests '
    },
    {
        id: 2,
        title: 'Cancellation',
        value: 'Accepted '
    },
    {
        id: 3,
        title: 'Completed',
        value: 'Rejected '
    },
    {
        id: 4,
        title: 'Unsuccessful',
        value: 'Rejected '
    },
];

function BookingScreen() {
    const navigation = useNavigation();
    const [selectedFilter, setSelectedFilter] = useState(filterTitle[0]);
    const [text, setText] = useState('Upcoming');
    const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);

    useBackButtonHandler(navigation, false);
    function handlePress(item) {
        // console.log('handlePress', item);
        setSelectedFilter(item);
        if (item.title === 'Upcoming') {
            setText(item.title)
        }
        else if (item.title === 'Cancellation') {
            setText(item.title)
        }
        else if (item.title === 'Completed') {
            setText(item.title)
        }
        else if (item.title === 'Unsuccessful') {
            setText(item.title)
        }
    }

    const cancelLogout = () => {
        setLogoutModalVisible(false);
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <Header page='Bookings' title='Booking History' />
            <ScrollView>
                {/* <Text style={{color:'rgba(0, 0, 0, 0.8)', fontSize:16, fontFamily:'Roboto-Medium',marginLeft:15,marginTop:15}}>Bookings History</Text> */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {filterTitle.map((item, index) => {
                        return (
                            <Pressable
                                key={index}
                                style={[
                                    Styles.filterContainer,
                                ]}
                                onPress={() => {
                                    handlePress(item);
                                }}
                            >
                                <Text
                                    style={[
                                        Styles.filterText,
                                        selectedFilter.id === item.id && Styles.selectedText,
                                    ]}
                                >
                                    {item.title}
                                </Text>
                            </Pressable>
                        );
                    })}
                </ScrollView>
                <View style={{ backgroundColor: 'rgba(245, 245, 245, 1)', height: 4, width: '100%', marginTop: 5 }}></View>
                <View style={styles.container}>
                    {selectedFilter.title === 'Upcoming' && (
                        <View style={styles.top} >
                            {/* <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontSize: 18, fontFamily: 'Roboto-Medium' }}>You’ve no  Trips</Text> */}
                            <View style={styles.card}>
                                {/* Card 1 content */}
                                {/* <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontSize: 18, fontFamily: 'Roboto-Medium' }}>Card 1 Content</Text> */}
                                <View
                                    style={{
                                        width: "92%",
                                        height: 105,
                                        alignSelf: "center",
                                        backgroundColor: "lightgray", // Add a background color for the empty image
                                        borderRadius: 5,
                                        marginTop: 7,
                                    }}
                                >
                                    <Text style={{ marginTop: 30, textAlign: 'center', color: 'rgba(57, 57, 57, 1)', fontSize: 27, fontFamily: 'Roboto-Bold', }}>
                                    </Text>
                                </View>
                                <Rating />
                            </View>
                            <View style={styles.card}>
                                {/* Card 2 content */}
                                {/* <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontSize: 18, fontFamily: 'Roboto-Medium' }}>Card 2 Content</Text> */}
                                <View style={{ flexDirection: 'row', marginLeft: 7, marginTop: 10 }}>
                                    <Text style={{ color: 'rgba(0, 104, 117, 1)', fontFamily: 'Roboto-Medium', fontSize: 12, textAlign: 'left', marginBottom: 5, marginLeft: 2 }}>Category : </Text>
                                    <Text style={{ color: 'rgba(121, 121, 128, 1)', fontFamily: 'Roboto-Medium', fontSize: 12, textAlign: 'left', marginBottom: 5, marginLeft: 2 }}>Yatch</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginLeft: 7 }}>
                                    <LocationIcon color='#000' />
                                    <Text style={{ color: 'rgba(102, 102, 102, 1)', fontSize: 14, fontFamily: 'Roboto-Regular' }}> Location Name</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginLeft: 7, marginTop: 10 }}>
                                    <Text style={{ color: 'rgba(0, 104, 117, 1)', fontFamily: 'Roboto-Medium', fontSize: 12, textAlign: 'left', marginBottom: 5, marginLeft: 2 }}>24/07/2023 - </Text>
                                    <Text style={{ color: 'rgba(121, 121, 128, 1)', fontFamily: 'Roboto-Medium', fontSize: 12, textAlign: 'left', marginBottom: 5, marginLeft: 2 }}>24/07/2023</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginLeft: 7, marginTop: 10 }}>
                                    <Text style={{ color: 'rgba(0, 104, 117, 1)', fontFamily: 'Roboto-Medium', fontSize: 12, textAlign: 'left', marginBottom: 5, marginLeft: 2 }}>504 KWD / </Text>
                                    <Text style={{ color: 'rgba(121, 121, 128, 1)', fontFamily: 'Roboto-Medium', fontSize: 12, textAlign: 'left', marginBottom: 5, marginLeft: 2 }}>12 People</Text>
                                </View>
                                <Pressable style={{ borderWidth: 1, borderColor: 'rgba(0, 104, 117, 1)', width: '90%', height: 30, borderRadius: 3, alignItems: 'center', justifyContent: 'center' }} onPress={() => navigation.navigate('CancelReviewScreen')}>
                                    <Text style={{ color: 'rgba(0, 104, 117, 1)', fontSize: 14, fontFamily: 'Roboto-regular' }}>Cancel </Text>
                                </Pressable>
                            </View>
                        </View>
                    )}

                    {selectedFilter.title === 'Cancellation' && (
                        <View style={styles.top} >
                            {/* <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontSize: 18, fontFamily: 'Roboto-Medium' }}>You’ve no  Trips</Text> */}
                            <View style={styles.card}>
                                {/* Card 1 content */}
                                {/* <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontSize: 18, fontFamily: 'Roboto-Medium' }}>Card 1 Content</Text> */}
                                <View
                                    style={{
                                        width: "92%",
                                        height: 105,
                                        alignSelf: "center",
                                        backgroundColor: "lightgray", // Add a background color for the empty image
                                        borderRadius: 5,
                                        marginTop: 7,
                                    }}
                                >
                                    <Text style={{ marginTop: 30, textAlign: 'center', color: 'rgba(57, 57, 57, 1)', fontSize: 27, fontFamily: 'Roboto-Bold', }}>
                                    </Text>
                                </View>
                                <Rating />
                            </View>
                            <View style={styles.card}>
                                {/* Card 2 content */}
                                {/* <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontSize: 18, fontFamily: 'Roboto-Medium' }}>Card 2 Content</Text> */}
                                <View style={{ flexDirection: 'row', marginLeft: 7, marginTop: 10 }}>
                                    <Text style={{ color: 'rgba(0, 104, 117, 1)', fontFamily: 'Roboto-Medium', fontSize: 12, textAlign: 'left', marginBottom: 5, marginLeft: 2 }}>Category : </Text>
                                    <Text style={{ color: 'rgba(121, 121, 128, 1)', fontFamily: 'Roboto-Medium', fontSize: 12, textAlign: 'left', marginBottom: 5, marginLeft: 2 }}>Yatch | </Text>
                                    <Text style={{ color: '#FF0000', fontFamily: 'Roboto-Medium', fontSize: 12, textAlign: 'left', marginBottom: 5, marginLeft: 2 }}>Cancel</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginLeft: 7 }}>
                                    <LocationIcon color='#000' />
                                    <Text style={{ color: 'rgba(102, 102, 102, 1)', fontSize: 14, fontFamily: 'Roboto-Regular' }}> Location Name</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginLeft: 7, marginTop: 10 }}>
                                    <Text style={{ color: 'rgba(0, 104, 117, 1)', fontFamily: 'Roboto-Medium', fontSize: 12, textAlign: 'left', marginBottom: 5, marginLeft: 2 }}>24/07/2023 - </Text>
                                    <Text style={{ color: 'rgba(121, 121, 128, 1)', fontFamily: 'Roboto-Medium', fontSize: 12, textAlign: 'left', marginBottom: 5, marginLeft: 2 }}>24/07/2023</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginLeft: 7, marginTop: 10 }}>
                                    <Text style={{ color: 'rgba(0, 104, 117, 1)', fontFamily: 'Roboto-Medium', fontSize: 12, textAlign: 'left', marginBottom: 5, marginLeft: 2 }}>504 KWD / </Text>
                                    <Text style={{ color: 'rgba(121, 121, 128, 1)', fontFamily: 'Roboto-Medium', fontSize: 12, textAlign: 'left', marginBottom: 5, marginLeft: 2 }}>12 People</Text>
                                </View>
                            </View>
                        </View>

                    )}

                    {selectedFilter.title === 'Completed' && (
                        <View style={styles.top} >
                            <View style={styles.card}>
                                <View
                                    style={{
                                        width: "92%",
                                        height: 105,
                                        alignSelf: "center",
                                        backgroundColor: "lightgray",
                                        borderRadius: 5,
                                        marginTop: 7,
                                    }}
                                >
                                    <Text style={{ marginTop: 30, textAlign: 'center', color: 'rgba(57, 57, 57, 1)', fontSize: 27, fontFamily: 'Roboto-Bold', }}>
                                    </Text>
                                </View>
                                <Rating />
                            </View>
                            <View style={styles.card}>
                                <View style={{ flexDirection: 'row', marginLeft: 7, marginTop: 10 }}>
                                    <Text style={{ color: 'rgba(0, 104, 117, 1)', fontFamily: 'Roboto-Medium', fontSize: 12, textAlign: 'left', marginBottom: 5, marginLeft: 2 }}>Category : </Text>
                                    <Text style={{ color: 'rgba(121, 121, 128, 1)', fontFamily: 'Roboto-Medium', fontSize: 12, textAlign: 'left', marginBottom: 5, marginLeft: 2 }}>Yatch</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginLeft: 7 }}>
                                    <LocationIcon color='#000' />
                                    <Text style={{ color: 'rgba(102, 102, 102, 1)', fontSize: 14, fontFamily: 'Roboto-Regular' }}> Location Name</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginLeft: 7, marginTop: 10 }}>
                                    <Text style={{ color: 'rgba(0, 104, 117, 1)', fontFamily: 'Roboto-Medium', fontSize: 12, textAlign: 'left', marginBottom: 5, marginLeft: 2 }}>24/07/2023 - </Text>
                                    <Text style={{ color: 'rgba(121, 121, 128, 1)', fontFamily: 'Roboto-Medium', fontSize: 12, textAlign: 'left', marginBottom: 5, marginLeft: 2 }}>24/07/2023</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginLeft: 7, marginTop: 10 }}>
                                    <Text style={{ color: 'rgba(0, 104, 117, 1)', fontFamily: 'Roboto-Medium', fontSize: 12, textAlign: 'left', marginBottom: 5, marginLeft: 2 }}>504 KWD / </Text>
                                    <Text style={{ color: 'rgba(121, 121, 128, 1)', fontFamily: 'Roboto-Medium', fontSize: 12, textAlign: 'left', marginBottom: 5, marginLeft: 2 }}>12 People</Text>
                                </View>
                                <Pressable style={{ backgroundColor: 'rgba(217, 217, 217, 1)', width: '90%', height: 30, borderRadius: 3, alignItems: 'center', justifyContent: 'center' }} onPress={() => setLogoutModalVisible(true)}>
                                    <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontSize: 14, fontFamily: 'Roboto-regular' }}>Rate Now </Text>
                                </Pressable>
                            </View>
                        </View>

                    )}

                    {selectedFilter.title === 'Unsuccessful' && (
                        <View style={styles.top} >
                            {/* <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontSize: 18, fontFamily: 'Roboto-Medium' }}>You’ve no  Trips</Text> */}
                            <View style={styles.card}>
                                {/* Card 1 content */}
                                {/* <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontSize: 18, fontFamily: 'Roboto-Medium' }}>Card 1 Content</Text> */}
                                <View
                                    style={{
                                        width: "92%",
                                        height: 105,
                                        alignSelf: "center",
                                        backgroundColor: "lightgray", // Add a background color for the empty image
                                        borderRadius: 5,
                                        marginTop: 7,
                                    }}
                                >
                                    <Text style={{ marginTop: 30, textAlign: 'center', color: 'rgba(57, 57, 57, 1)', fontSize: 27, fontFamily: 'Roboto-Bold', }}>
                                    </Text>
                                </View>
                                <Rating />
                            </View>
                            <View style={styles.card}>
                                {/* Card 2 content */}
                                {/* <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontSize: 18, fontFamily: 'Roboto-Medium' }}>Card 2 Content</Text> */}
                                <View style={{ flexDirection: 'row', marginLeft: 7, marginTop: 10 }}>
                                    <Text style={{ color: 'rgba(0, 104, 117, 1)', fontFamily: 'Roboto-Medium', fontSize: 12, textAlign: 'left', marginBottom: 5, marginLeft: 2 }}>Category : </Text>
                                    <Text style={{ color: 'rgba(121, 121, 128, 1)', fontFamily: 'Roboto-Medium', fontSize: 12, textAlign: 'left', marginBottom: 5, marginLeft: 2 }}>Yatch</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginLeft: 7 }}>
                                    <LocationIcon color='#000' />
                                    <Text style={{ color: 'rgba(102, 102, 102, 1)', fontSize: 14, fontFamily: 'Roboto-Regular' }}> Location Name</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginLeft: 7, marginTop: 10 }}>
                                    <Text style={{ color: 'rgba(0, 104, 117, 1)', fontFamily: 'Roboto-Medium', fontSize: 12, textAlign: 'left', marginBottom: 5, marginLeft: 2 }}>24/07/2023 - </Text>
                                    <Text style={{ color: 'rgba(121, 121, 128, 1)', fontFamily: 'Roboto-Medium', fontSize: 12, textAlign: 'left', marginBottom: 5, marginLeft: 2 }}>24/07/2023</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginLeft: 7, marginTop: 10 }}>
                                    <Text style={{ color: 'rgba(0, 104, 117, 1)', fontFamily: 'Roboto-Medium', fontSize: 12, textAlign: 'left', marginBottom: 5, marginLeft: 2 }}>504 KWD / </Text>
                                    <Text style={{ color: 'rgba(121, 121, 128, 1)', fontFamily: 'Roboto-Medium', fontSize: 12, textAlign: 'left', marginBottom: 5, marginLeft: 2 }}>12 People</Text>
                                </View>
                                <Pressable style={{ backgroundColor: 'rgba(255, 218, 214, 1)', borderColor: 'rgba(0, 104, 117, 1)', width: '90%', height: 30, borderRadius: 3, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: 'rgba(0, 0, 0, 0.7)', fontSize: 14, fontFamily: 'Roboto-regular' }}>Check Out </Text>
                                </Pressable>
                            </View>
                        </View>

                    )}

                </View>

                <View style={{ backgroundColor: 'rgba(245, 245, 245, 1)', height: 4, width: '100%', marginTop: 5 }}></View>
            </ScrollView>

            <Modal isVisible={isLogoutModalVisible}>
                <View style={styles.model}>
                    <Image source={require('../../assets/images/review-1.png')} style={styles.image} resizeMode='cover'></Image>
                    <Text style={styles.ImgTxt}>"Your experience fuels our flight!"</Text>
                    <Text style={{ alignItems: 'center', marginBottom: 20, fontSize: 14, color: 'rgba(27, 30, 40, 0.8)', fontWeight: '400' }}>Your opinion navigates our next destination!
                        Share your thoughts and rate our travel app today. Help us tailor your journey and explore new horizons together.</Text>
                    <RaviewRating />
                </View>
            </Modal>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        padding: 5,
        margin: 5,
    },
    top: {
        flexDirection: 'row',
        flex: 0.3,
        borderWidth: 1,
        borderRadius: 16,
        overflow: 'hidden',
        borderColor: '#00000026'
    },
    card: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white',
    },
    image: {
        width: 310,
        height: 210,
        bottom: 40
    },
    ImgTxt: {
        fontSize: 20,
        marginBottom: 20,
        width: 300,
        height: 25,
        color: 'rgba(0, 104, 117, 1)',
        fontWeight: '500',
        fontFamily: 'Roboto-Regular',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    model: {
        backgroundColor: 'rgba(242, 244, 244, 1)',
        width: 350,
        height: 521,
        borderRadius: 10,
        padding: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        top: 110,
    }
})
export default BookingScreen;
