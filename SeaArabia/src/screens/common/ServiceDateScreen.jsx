import { View,Text, SafeAreaView, Image, ScrollView,StyleSheet ,Pressable, Platform} from "react-native";
import LocationIcon from "../../assets/icon/LocationIcon";
import Rating from "../../ui/Rating";
import GuestIcon from "../../assets/icon/GuestIcon";
import BackIcon from "../../assets/icon/BackIcon";
import Styles from "../../public/Styles";
import ShareIcon from "../../assets/icon/ShareIcon";
import DestinationSelection from "../../ui/DestinationSelection";
import CalendarPicker from "../../ui/CalendarPicker";
import TimeScheduleScreen from "../../ui/TimeSchedule";
import AdditionalHours from "../../ui/AdditionalHours";
import { useAppContext } from "../../context/AppContext";
import CarouselList from "../../components/CarouselList";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import moment from 'moment';
import useBackButtonHandler from "../../components/BackHandlerUtils";
import DaySelection from "../../ui/DaySelection";
import DateSelection from "../../ui/DateSelection";
import { BookingApi } from "../../Services/bookings/BookingService";
import DurationSelection from "../../ui/DurationSelection";
import RangeSchedule from "../../ui/RangeSchedule";


function ServiceDateScreen(){
    const { item } = useAppContext();
    const navigation = useNavigation();
    const [date, setDate] = useState(new Date());
    const [showtime, setShowTime] = useState(true);
    const [serviceMessage, setServiceMessage] = useState();
    const [time, setTime] = useState();
    const [hour, setHour] = useState();
    console.log('item======', date, time);
    useBackButtonHandler(navigation, false);
    const serviceImages = item?.service_image || [];
    const destinations = item?.service_price_service || []
    const lowestPriceService = item?.service_price_service.reduce((lowest, current) => {
        if (current.price < lowest.price) {
          return current;
        }
        return lowest;
    }, item?.service_price_service[0]);
    useFocusEffect(
        useCallback(() => {
            // const dateFormat = new Date();
            // setDate(moment(dateFormat).format('YYYY-MM-DD'))
            // console.log('dateFormat', date);
            getServiceAvailability();
        }, [setDate]) 
    )
    function getServiceAvailability(){
        const dateFormat = moment(date).format('YYYY-MM-DD');
        console.log('available====', dateFormat,item?.id);
        BookingApi.getServiceList(dateFormat,item?.id).then((res) => {
            console.log('ress===', res.data);
            if('error' in res.data){
               setShowTime(false);
               setServiceMessage(res.data.error)
            }
            else{
                setShowTime(true);
                const timeArray = res.data.map(entry => entry.time);
                console.log('time====', timeArray);
                setTime(timeArray);
            }
        }).catch((err) => {
            console.error(err);
        })
    }
    function dateHandler(newValues){
        // alert('test')
        // const dob = moment(newValues,'DD-MM-YYYY').format('YYYY-MM-DD');
         setDate(newValues);
         //console.log('date', dob, newValues);
         getServiceAvailability();
    }
    
    function hourHandler(newValues){
        setHour(newValues);
        console.log('newValues====', newValues.duration_hour);
    }
    return(
        <SafeAreaView style={{flex:1,backgroundColor:'white'}}>  
            <ScrollView style={{marginBottom:20}}>
                {/* <Image source={item?.image} style={{height:250, width:'auto'}} resizeMode='stretch'></Image> */}
                <CarouselList data={serviceImages}/>
                <View style={{flexDirection:'row'}}>
                    <Text style={{color:'rgba(0, 104, 117, 1)',fontSize:16,fontFamily:'Roboto-Medium', marginTop:15,marginLeft:20}}>{item?.name}</Text>
                    {
                        item?.service_price_service.length > 1 ?
                        (
                            <View style={{flexDirection:'row', marginLeft:'auto',right:20, marginTop:15,marginBottom:10}}>
                                <Text style={{color:'rgba(121, 121, 128, 1)', fontSize:12, fontFamily:'Roboto-Regular',marginTop:2}}>Starts from </Text>
                                <Text style={{color:'rgba(0, 104, 117, 1)', fontSize:14, fontFamily:'Roboto-Medium'}}>{lowestPriceService?.price} KWD</Text>
                            </View>
                        ) 
                        : (
                            <View style={{flexDirection:'row', marginLeft:'auto',right:20, marginTop:15,marginBottom:10}}>
                                 <Text style={{color:'rgba(0, 104, 117, 1)', fontSize:14, fontFamily:'Roboto-Medium'}}>{item?.service_price_service[0]?.price} KWD</Text>
                            </View>
                        )
                    }
                </View>
                <View style={{flexDirection:'row',marginLeft:18,marginTop:10}}>
                    <LocationIcon color='rgba(0, 0, 0, 0.8)'/>
                    <Text style={{color:'rgba(102, 102, 102, 1)', fontSize:12, fontFamily:'Roboto-Regular'}}>{item?.pickup_point_or_location}</Text>
                </View>
                <View style={{flexDirection:'row',marginBottom:15}}>
                    <Rating/>
                    <Text style={{color:'rgba(25, 28, 29, 0.8)', fontSize:11,fontFamily:'Roboto-Regular',marginLeft:'auto',bottom:20,textAlign:'right',left:55}}>Capacity</Text>
                    <View style={{right:20,flexDirection:'row'}}>
                        <GuestIcon/>
                        <Text style={{color:'rgba(0, 0, 0, 1)', fontSize:14,fontFamily:'Roboto-Regular',bottom:3,left:2}}> {item?.capacity} People</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: 'rgba(245, 245, 245, 1)', height: 4, width: '100%' }}></View>
                {
                    item?.is_destination && (
                    <View style={{ padding: 15}}>
                        <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontSize: 16, fontFamily: 'Roboto-Medium' }}>Select Destination</Text>
                        <DestinationSelection data={destinations}/>
                    </View>
                    )
                }
                {
                    item?.is_day && (
                        <View style={{ padding: 15}}>
                            <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontSize: 16, fontFamily: 'Roboto-Medium' }}>Select Package</Text>
                            <DaySelection data={destinations}/>
                        </View>
                    )
                }
                {
                    item?.is_date && (
                        <View style={{ padding: 15}}>
                            <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontSize: 16, fontFamily: 'Roboto-Medium' }}>Select Package</Text>
                            <DateSelection data={destinations}/>
                        </View>
                    )
                }
                {
                    item?.is_duration && (
                        <View style={{ padding: 15}}>
                            <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontSize: 16, fontFamily: 'Roboto-Medium' }}>Select Package</Text>
                            <DurationSelection data={destinations} onValueChange={hourHandler}/>
                        </View>
                    )
                }
                <View style={{ padding: 15}}>
                    <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontSize: 16, fontFamily: 'Roboto-Medium' }}>Select Date</Text>
                    <CalendarPicker onValueChange={dateHandler}/>
                </View>
                { showtime ? 
                
                    <View style={{ padding: 15 }}>
                    <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontSize: 16, fontFamily: 'Roboto-Medium' }}>Select Time Schedule</Text>
                    <TimeScheduleScreen data={time} hourValue={hour?.duration_hour}/>
                    {/* {item.is_time ? (
                        <RangeSchedule data={time} serviceList={item?.service_price_service}/>
                    )
                    : 
                    (
                        <TimeScheduleScreen data={time} hourValue={hour?.duration_hour}/>
                    )
                    } */}
                </View>
                : (
                    <Text style={{color:'rgba(27, 30, 40, 1)', fontSize:15, fontFamily:'Roboto-Medium',textAlign:'center'}}>{serviceMessage}</Text>
                )
                }
                <View style={{ padding: 15,marginBottom:50 }}>
                    <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontSize: 16, fontFamily: 'Roboto-Medium' }}>Additional hours</Text>
                    <AdditionalHours/>
                </View>
            </ScrollView>
            <View style={styles.overlay}>
                <View style={{flexDirection:'row',marginTop:Platform.OS === 'ios' ? 30 : 10}}>
                    <Pressable style={[Styles.backIcon,{width:'10%',height:37}]} onPress={() => navigation.goBack()}>
                        <BackIcon color='#1B1E28'></BackIcon>
                    </Pressable>
                    <Pressable style={{marginLeft:'auto',right:20}}>
                        <ShareIcon/>
                    </Pressable>
                </View>
            </View>
            <View style={{position: 'absolute', bottom: 0,left: 0,right: 0,backgroundColor: 'rgba(255, 255, 255, 1)',paddingBottom: Platform.OS === 'ios' ? 15 : 30,justifyContent:'center', alignItems:'center'}}>
                <View style={{flexDirection:'row',marginTop:Platform.OS === 'ios' ? 30 : 10,height:30}}>
                    <Pressable style={{backgroundColor:'rgba(0, 104, 117, 1)', width:'90%', height:40, borderRadius:3,alignItems:'center',justifyContent:'center'}} onPress={()=> navigation.navigate('BookingDetails')}>
                        <Text style={{color:'rgba(255, 255, 255, 1)', fontSize:14,fontFamily:'Roboto-Bold'}}>Proceed To Pay {hour?.price} KWD</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ServiceDateScreen;

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 50, // Adjust this height based on your requirement
        backgroundColor: 'rgba(0, 0, 0, 0.2)', // Change the opacity (0.5) as needed
    },
});