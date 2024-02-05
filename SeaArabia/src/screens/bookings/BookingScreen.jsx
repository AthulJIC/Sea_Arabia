import { View, Text, SafeAreaView, ScrollView, Pressable, StyleSheet, Image, FlatList } from "react-native"
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BookingApi } from "../../Services/bookings/BookingService";
import moment from 'moment';
import { useAppContext } from "../../context/AppContext";

const filterTitle = [
    {
        id: 1,
        title: 'Upcoming',
        value: 'Upcoming '
    },
    {
        id: 2,
        title: 'Cancellation',
        value: 'Cancelled '
    },
    {
        id: 3,
        title: 'Completed',
        value: 'Completed '
    },
    {
        id: 4,
        title: 'Unsuccessful',
        value: 'Unsuccessful '
    },
];

function BookingScreen() {
    const navigation = useNavigation();
    const [selectedFilter, setSelectedFilter] = useState(filterTitle[0]);
    const [text, setText] = useState('Upcoming');
    const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
    const [userName, setUserName] = useState();
    const [ bookingList, setBookingList] = useState([])
    const {updateBookingId, updateBookingService} = useAppContext();
    console.log(selectedFilter);
    useBackButtonHandler(navigation, false);
    useFocusEffect(
        useCallback(() => {
        const retrieveUserName = async () => {
        try {
            const user_name = await AsyncStorage.getItem('User');
            // Do something with the retrieved username
            setUserName(user_name );
            setSelectedFilter(filterTitle[0]);
            if(user_name === 'Register'){
                getBookingList(selectedFilter?.title);
            }
        } catch (error) {
            console.error('Error retrieving username from AsyncStorage:', error);
        }
        };

        retrieveUserName();
       
    }, [])
    );
    function getBookingList(value){
        console.log('value=====', value);
        BookingApi.getBookingList(value).then((res) => {
            console.log('res====', res.data);
            const filteredBookingList = res.data.results.filter(item => item.booking_item === "Service" || item.booking_item === "Activity");
            setBookingList(filteredBookingList)
        })
    }
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
        getBookingList(item?.value)
    }

    const cancelLogout = () => {
        setLogoutModalVisible(false);
    }
    function cancelHandler(value){
        console.log('value', value.id);
        updateBookingId(value?.id)
        navigation.navigate('CancelReviewScreen')
    }
    function rateHandler(item) {
        console.log('item', item);
        updateBookingService(item)
        setLogoutModalVisible(true);

    }
    function renderItem({item}){
        console.log('item====', item);
        console.log('Vertical=====', item.service_image);
        const names = item?.service?.name ? item?.service?.name.split(' '):'';
        const firstName =names[0]? names[0].substring(0,1):'';
        const lastName = names[1]? names[1].substring(0,1):'';
        let imageUrl;
        let name;
        let location;
        // let capacity;
        // if(item?.service){
        //     imageUrl = item?.service?.service_image[0]?.image;
        //     name = item?.service?.name;
        //     location = item?.service?.pickup_point_or_location;
        // }
        // if ( item?.package){
        //     imageUrl = item?.package?.image;
        //     name = item?.package?.name;
        //     location = item?.package?.location;
        // }
        return(
                <View style={{width:'95%', height:177,alignSelf:'center',elevation:8,backgroundColor:'white',shadowColor: '#000',shadowOffset:{ width: 0,height: 2 },shadowOpacity: 0.25, shadowRadius: 3,marginTop:9,borderRadius:16, flexDirection:'row',marginBottom:15}} onPress={() => serviceHandler(item)}>
                    <Image
                    source={{ uri: item?.service?.service_image[0]?.image}}
                    style={{
                        width:136, height:134,alignSelf:'center', borderRadius:5,alignSelf:'center',marginLeft:20}}
                    /> 
                    <View style={{marginTop:20, width:'55%'}}>
                        <View style={{flexDirection:'row',marginLeft:15,}}>
                            <Text style={{color:'rgba(25, 28, 29, 0.8)', fontSize:15, fontFamily:'Roboto-Medium'}}>{item?.service?.name}</Text>
                        </View>
                        <View style={{flexDirection:'row',marginLeft:15,marginTop:10}}>
                            <LocationIcon color='rgba(25, 28, 29, 1)'/>
                            <Text style={{color:'rgba(102, 102, 102, 1)', fontSize:12, fontFamily:'Roboto-Regular'}}>{item?.service?.pickup_point_or_location}</Text>
                        </View>
                        <View style={{right:5}}>
                            <Rating/>
                        </View>
                        <View style={{flexDirection:'row',marginTop:5,left:15}}>
                            <Text style={{color:'rgba(0, 104, 117, 1)', fontFamily:'Roboto-Medium', fontSize:12, textAlign:'left',marginBottom:5}}>{item?.price_total} KWD</Text>
                            <Text style={{color:'rgba(102, 102, 102, 1)', fontSize:12, fontFamily:'Roboto-Regular'}}> / {item?.number_of_people ? item?.number_of_people : 0} People</Text>
                        </View>
                        {
                            item?.status === 'Upcoming' ? (
                                
                                <Pressable style={{ borderWidth: 1, borderColor: 'rgba(0, 104, 117, 1)', width: '55%', height: 30, borderRadius: 3, alignItems: 'center', justifyContent: 'center',marginLeft:15,marginTop:5 }} onPress={() => cancelHandler(item)}>
                                    <Text style={{ color: 'rgba(0, 104, 117, 1)', fontSize: 14, fontFamily: 'Roboto-regular' }}>Cancel </Text>
                                </Pressable>
                            ) : 
                            item?.status === 'Cancelled' ? (
                                <View style={{ borderWidth: 1, borderColor: 'white', width: '55%', height: 30, borderRadius: 3, alignItems: 'center', justifyContent: 'center',marginLeft:15,marginTop:5, backgroundColor:'lightgray' }}>
                                    <Text style={{ color: 'black', fontSize: 14, fontFamily: 'Roboto-regular' }}>Cancelled</Text>
                                </View>
                            ) : item?.status === 'Completed' ? (
                                <Pressable style={{ borderWidth: 1, borderColor: 'white', width: '55%', height: 30, borderRadius: 3, alignItems: 'center', justifyContent: 'center',marginLeft:15,marginTop:5, backgroundColor:'lightgray' }} onPress={() => rateHandler(item)}>
                                    <Text style={{ color: 'black', fontSize: 14, fontFamily: 'Roboto-regular' }}>Rate Now</Text>
                                </Pressable>
                            ) : ''
                        }
                    </View>
                </View>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <Header page='Bookings' title='Booking History' />
            <View style={styles.filterSection}>
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
            </View>
            <View>
                <View style={{ backgroundColor: 'rgba(245, 245, 245, 1)', height: 1, width: '100%', marginTop: 5 }}></View>
                {
                    bookingList.length > 0 ? (
                        <FlatList
                            data={bookingList}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id.toString()}
                            // onEndReached={onEndReached}
                            >
                        </FlatList>
                    ) : (
                        <>
                            {/* <View style={{ backgroundColor: 'rgba(245, 245, 245, 1)', height: 4, width: '100%', marginTop: 5 }}></View> */}
                            <View style={{ height: 'auto', width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 25 }}>
                                <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontSize: 18, fontFamily: 'Roboto-Medium' }}>You’ve no {text} Trips</Text>
                                <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontSize: 12, fontFamily: 'Roboto-Regular', marginTop: 10, marginBottom: 10 }}>Start Exploring for your next trip</Text>
                                <EmptyIcon />
                            </View>
                            {/* <View style={{ backgroundColor: 'rgba(245, 245, 245, 1)', height: 4, width: '100%', marginTop: 5 }}></View> */}
                        </>
                    )
                }

                <View style={{ backgroundColor: 'rgba(245, 245, 245, 1)', height: 1, width: '100%', marginTop: 5 }}></View>
            </View>
            <Modal isVisible={isLogoutModalVisible}
            hasBackdrop={true}
            backdropColor="black"
            backdropOpacity={0.70}
            onBackdropPress={() => setLogoutModalVisible(!isLogoutModalVisible)}>
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
    },
    filterSection: {
        height: 60,
        justifyContent: 'center',
        marginBottom: 10,
      },
})
export default BookingScreen;
