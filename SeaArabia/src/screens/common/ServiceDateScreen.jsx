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
import { isValidElement, useCallback, useState } from "react";
import moment from 'moment';
import useBackButtonHandler from "../../components/BackHandlerUtils";
import DaySelection from "../../ui/DaySelection";
import DateSelection from "../../ui/DateSelection";
import { BookingApi } from "../../Services/bookings/BookingService";
import DurationSelection from "../../ui/DurationSelection";
import RangeSchedule from "../../ui/RangeSchedule";
import CalendarDatePicker from "../../ui/CalendarDatePicker";
import CalendarDayPicker from "../../ui/CalendarDayPicker";
import { CommonApi } from "../../Services/common/CommonApi";


function ServiceDateScreen(){
    const { item, updateHour, updateDate , updateHourRange} = useAppContext();
    const navigation = useNavigation();
    const [date, setDate] = useState(new Date());
    const [showtime, setShowTime] = useState(true);
    const [serviceMessage, setServiceMessage] = useState();
    const [time, setTime] = useState();
    const [hour, setHour] = useState();
    const [dateRange, setDateRange] = useState();
    const [hourRange, setHourRange] = useState();
    const [dayRange,setDayRange] = useState();
    const [ratingCount, setRatingCount] = useState();
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
        useCallback(async () => {
            // const dateFormat = new Date();
            // setDate(moment(dateFormat).format('YYYY-MM-DD'))
            // console.log('dateFormat', date);
            if(date){
                await getServiceAvailability(date);
            }
            else{
                await getServiceAvailability(new Date());
            }
            getRatingCount();
        }, []) 
    )
    function getRatingCount(){
        CommonApi.getReviewCount(item?.id).then((res) => {
            console.log('res====', res.data.total_reviews_count);
            setRatingCount(res.data.total_reviews_count);
        })
    }
    async function dateHandler(newValues){
        // alert('test')
        // const dob = moment(newValues,'DD-MM-YYYY').format('YYYY-MM-DD');
            setDate(newValues);
            //console.log('date', dob, newValues);
            await getServiceAvailability(newValues);
    }
    async function getServiceAvailability(date){
        setDate(date);
        const dateFormat = moment(date).format('DD-MM-YYYY');
        console.log('available====', dateFormat,item?.id);
        await BookingApi.getServiceList(dateFormat,item?.id).then((res) => {
            console.log('ress===', res.data);
            if('error' in res.data){
               setShowTime(false);
               setServiceMessage(res.data.error)
            }
            else{
                setShowTime(true);
                const timeArray = res.data.results.map(entry => entry.time);
                console.log('time====', timeArray);
                setTime(timeArray);
            }
        }).catch((err) => {
            console.error(err);
        })
    }
    
    function hourHandler(newValues){
        setHour(newValues);
        console.log('newValues====', newValues.duration_hour);
    }
    function selectedDestinationHandler(newValues){
        setHour(newValues);
        console.log('destination====', newValues.duration_hour);
    }
    function selectedDateHandler(newValues){
        setHour(newValues);
        console.log('range====', newValues);
    }
    function selectedDayHandler(newValues){
        setHour(newValues);
        console.log('range====', newValues);
    }
    function rangeHandler(newValues){
        console.log('rangeDate====',newValues);
        setDateRange(newValues)
    }
    function timeHandler(newValues){
       console.log('timeRange', newValues);
       setHourRange(newValues)
    }
    function timeRangeHandler(newValues){
        console.log('timeRange=====', newValues);
        const filteredServices = destinations.filter(service => {
            const serviceStartTime = service.time;
            const serviceEndTime = service.end_time;
          
            // Check if the service time or end time matches any value in the hour array
            return newValues.includes(serviceStartTime) || newValues.includes(serviceEndTime);

          });

        console.log('filteredServices',filteredServices);
        setHour(filteredServices[0])
        setHourRange(newValues);
    }
    function proceedHandler(){
         console.log('hourcontext', hour);
         isValid = true;
        
        if(!hour){
            console.log('test');
            isValid = false;
        }
        if((!dateRange || dateRange.length === 0) && (!hourRange || hourRange.length === 0)){
            console.log('tests');
            isValid = false;
        }
        if(isValid){
            updateHour(hour);
            if(!dateRange){
                updateDate(date)
            }
            else{
                updateDate(dateRange);
            }
            updateHourRange(hourRange)
            navigation.navigate('BookingDetails')
        }
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
                    <Rating initialRating={ratingCount}/>
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
                        <DestinationSelection data={destinations} onValueChange={selectedDestinationHandler}/>
                    </View>
                    )
                }
                {
                    item?.is_day && (
                        <View style={{ padding: 15}}>
                            <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontSize: 16, fontFamily: 'Roboto-Medium' }}>Select Package</Text>
                            <DaySelection data={destinations} onValueChange={selectedDayHandler}/>
                        </View>
                    )
                }
                {
                    item?.is_date && (
                        <View style={{ padding: 15}}>
                            <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontSize: 16, fontFamily: 'Roboto-Medium' }}>Select Package</Text>
                            <DateSelection data={destinations} onValueChange={selectedDateHandler}/>
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
                    {
                         item.is_date ? (
                            <CalendarDatePicker data={hour} onValueChange={rangeHandler}/>
                        )
                        : item.is_day ?
                        (
                            <CalendarDayPicker data={hour}/>
                        ):
                        (
                            <CalendarPicker onValueChange={dateHandler}/>
                        )
                    }
                </View>
                
                { (!item.is_day && !item.is_date) ?
                
                showtime && time  ? 
                
                    <View style={{ padding: 15 }}>
                    <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontSize: 16, fontFamily: 'Roboto-Medium' }}>Select Time Schedule</Text>
                    {/* <TimeScheduleScreen data={time} hourValue={hour?.duration_hour}/> */}
                    {!item.is_time || item?.service_price_service.length === 0 ? (
                        <TimeScheduleScreen data={time} hourValue={hour?.duration_hour} onValueChange={timeHandler}/>
                        )
                        : 
                        (
                        <RangeSchedule data={time} serviceList={item?.service_price_service} onValueChange={timeRangeHandler}/>
                        )
                    }
                </View>
                : (
                    <Text style={{color:'rgba(27, 30, 40, 1)', fontSize:15, fontFamily:'Roboto-Medium',textAlign:'center'}}>{serviceMessage}</Text>
                )
                : null
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
                    <Pressable style={{backgroundColor:'rgba(0, 104, 117, 1)', width:'90%', height:40, borderRadius:3,alignItems:'center',justifyContent:'center'}} onPress={() =>proceedHandler()}>
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