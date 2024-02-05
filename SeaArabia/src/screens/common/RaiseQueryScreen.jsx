import { View,Text, SafeAreaView, ScrollView ,Pressable,Platform,Alert} from "react-native"
import BackIcon from "../../assets/icon/BackIcon";
import Styles from "../../public/Styles";
import BookingDetails from "../../ui/BookingDetails";
import AddCoupon from "../../ui/AddCoupon";
import PaymentInfo from "../../ui/PaymentInfo";
import { useNavigation } from "@react-navigation/native";
import useBackButtonHandler from "../../components/BackHandlerUtils";
import { useAppContext } from "../../context/AppContext";
import { useEffect, useState } from "react";
import moment from 'moment';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BookingApi } from "../../Services/bookings/BookingService";

function RaiseQueryScreen(){
    const { item } = useAppContext();
    const navigation = useNavigation();
    useBackButtonHandler(navigation, false);
    const [dateRangeString, setDateRangeString] = useState('');
    const [formattedHourRange, setFormattedHourRange] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [email, setEmail] = useState('');
    const [count, setCount] = useState();
    const [selectedCoupon, setSelectedCoupon] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [startTime, setStartTime] = useState();
    const [endTime, setEndtime] = useState();
    const [userId, setUserId] = useState();
    const [buttonCount, setButtonCount] = useState(0);
    const [redeemedCoupons, setRedeemedCoupons] = useState([]);
    console.log('redeemedCoupons',redeemedCoupons);
    console.log('true',item);
 
    useEffect(async () => {
        const fetchData = async () => {
            const user_id = await AsyncStorage.getItem('userId');
            setUserId(user_id);
        };
        fetchData(); 
    }, []);
    const updateBookingDetails = (data) => {
        console.log('data===',data);
        setSelectedOption(data.selectedOption);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setMobileNo(data.mobileNo);
        setEmail(data.email);
        setCount(data.count);
    };
    function paymentHandler(){ 
        const data = {
            first_name : firstName,
            last_name : lastName,
            phone_number : mobileNo,
            email:email,
            booking_for : selectedOption,
            booking_item : item?.service?.type,
            starting_point: item?.service?.pickup_point_or_location,
            user_id : userId,
            package : item?.id,
            price_total : item?.price
        }
        console.log('data',data);
        BookingApi.createBooking(data).then((res) => {
            console.log('createbooking', res.data);
            
        })
    }

    return(
        <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
            <ScrollView>
               <View style={{backgroundColor:'rgba(0, 104, 117, 1)', height:176, width:'100%'}}>
                <Pressable style={[Styles.backIcon,{marginTop:12,}]} onPress={() => navigation.goBack()}>
                        <BackIcon color='#1B1E28'></BackIcon>
                </Pressable>
                 <View style={{margin:20}}>
                    <Text style={{color:'rgba(255, 255, 255, 1)', fontSize:16, fontFamily:'Roboto-Regular'}}>{item?.name}</Text>
                    <View style={{flexDirection:'row',marginTop:8}}>
                        <Text style={{color:'rgba(255, 255, 255, 1)', fontSize:16, fontFamily:'Roboto-Regular'}}>{item?.service?.company},</Text>
                        <Text style={{color:'rgba(255, 255, 255, 1)', fontSize:16, fontFamily:'Roboto-Regular'}}> {item?.service?.pickup_point_or_location}</Text>
                    </View>
                 </View>
               </View>
               <BookingDetails updateBookingDetails={updateBookingDetails} addGuest={false}/>
            </ScrollView>
            <View style={{position: 'absolute', bottom: 0,left: 0,right: 0,backgroundColor: 'rgba(255, 255, 255, 1)',paddingBottom: Platform.OS === 'ios' ? 15 : 30,justifyContent:'center', alignItems:'center'}}>
                <View style={{flexDirection:'row',marginTop:Platform.OS === 'ios' ? 30 : 10,height:30}}>
                    <Pressable style={{backgroundColor:'rgba(0, 104, 117, 1)', width:'90%', height:40, borderRadius:3,alignItems:'center',justifyContent:'center'}} onPress={paymentHandler}>
                        <Text style={{color:'rgba(255, 255, 255, 1)', fontSize:14,fontFamily:'Roboto-Bold'}}>Raise Query</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default RaiseQueryScreen;