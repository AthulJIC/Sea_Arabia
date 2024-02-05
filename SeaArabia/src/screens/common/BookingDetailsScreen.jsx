import { View,Text, SafeAreaView, ScrollView ,Pressable,Platform,Alert,Linking} from "react-native"
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

function BookingDetailsScreen(){
    const { item, hour, date, hourRange, details ,updateUrl} = useAppContext();
    const navigation = useNavigation();
    useBackButtonHandler(navigation, false);
    console.log('item====',hourRange);
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

        const handleTotalAmountChange = (amount) => {
            console.log('neww===',amount);
            setTotalAmount(amount);
            // Do something with the total amount, if needed
        };

    const handleCouponSelect = (coupon) => {
        console.log('couponselected', coupon);
        setSelectedCoupon(coupon);
        // Do something with the selected coupon, if needed
    };
    useEffect(() => {
        async function loadRedeemedCoupons() {
            try {
                const storedRedeemedCoupons = await AsyncStorage.getItem('redeemedCoupons');
                if (storedRedeemedCoupons) {
                    setRedeemedCoupons(JSON.parse(storedRedeemedCoupons));
                }
            } catch (error) {
                console.error('Error loading redeemed coupons:', error);
            }
        }

        loadRedeemedCoupons();
    }, []);

    useEffect(async () => {
        const fetchData = async () => {
            const user_id = await AsyncStorage.getItem('userId');
            setUserId(user_id);
            if (date) {
                if (Array.isArray(date)) {
                    // Convert date strings to Date objects
                    const dateObjects = date.map(dateString => new Date(dateString));
                    const firstDate = new Date(date[0]);
                    const lastDate = new Date(date[date.length - 1]);
                    console.log('startend', firstDate,lastDate);
                    setStartDate(moment(firstDate).format('YYYY-MM-DD'));
                    setEndDate(moment(lastDate).format('YYYY-MM-DD'));
                    // setStartDate(firstDate);
                    // setEndDate(lastDate)
                    // Format date objects as strings with day first and short month
                    const formattedDates = dateObjects.map(date => {
                        const day = date.getDate();
                        const month = date.toLocaleDateString('en-US', { month: 'short' });
                        return `${day} ${month}`;
                    });
        
                    // Create a range string
                    const rangeString =
                        formattedDates.length > 1
                            ? `${formattedDates[0]} - ${formattedDates[formattedDates.length - 1]}`
                            : formattedDates[0];
        
                    // Update the state with the range string
                    setDateRangeString(rangeString);
                } else {
                    const dateString = moment(date).format('DD MMM');
                    setDateRangeString(dateString);
                    setStartDate(moment(date).format('YYYY-MM-DD'));
                    // setStartDate(date)
                }
            }
            if (hourRange && Array.isArray(hourRange)) {
                console.log('rangeString');
                const firstHour = hourRange[0];
                const lastHour = hourRange[hourRange.length - 1];
                setStartTime(firstHour);
                setEndtime(lastHour);
                // Convert hour numbers to formatted strings
                const formattedHours = hourRange.map(hour => {
                const formattedHour = hour % 12 || 12; // Convert 0 to 12
                const period = hour < 12 ? 'AM' : 'PM';
                return `${formattedHour}:00 ${period}`;
                });
        
                
                // Create a range string
                const rangeString =
                formattedHours.length > 1
                    ? `${formattedHours[0]} - ${formattedHours[formattedHours.length - 1]}`
                    : formattedHours[0];
                // Update the state with the formatted range string
                setFormattedHourRange(rangeString);
            }
            if(details){

            }
        };
        fetchData(); 
      }, [date, hourRange]);
      const updateBookingDetails = (data) => {
        console.log('data===',data);
        setSelectedOption(data.selectedOption);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setMobileNo(data.mobileNo);
        setEmail(data.email);
        setCount(data.count);
      };
    async function saveRedeemedCoupons(updatedRedeemedCoupons) {
        console.log('saveRedeemedCoupons',updatedRedeemedCoupons);
        try {
            await AsyncStorage.setItem('redeemedCoupons', JSON.stringify(updatedRedeemedCoupons));
        } catch (error) {
            console.error('Error saving redeemed coupons:', error);
        }
    }

    function paymentHandler(){
        if(selectedCoupon){
            if((selectedCoupon?.redeem_count !== 0 && selectedCoupon?.specify_no !== 0) && (selectedCoupon?.redeem_count === selectedCoupon?.specify_no)){
                Alert.alert('Coupon is invalid.');
                return;
            }
            if (selectedCoupon?.redemption_type === 'One-Time') {
                Alert.alert('test')
                
                // Check if the selected coupon has already been redeemed
                if (redeemedCoupons && redeemedCoupons.includes(selectedCoupon.id)) {
                    Alert.alert('Coupon has already been redeemed.');
                    return;
                }
            }    
        }
        const data = {
            offer : selectedCoupon ? selectedCoupon?.id  : '',
            service : hour?.service,
            price : hour?.id,
            first_name : firstName,
            last_name : lastName,
            phone_number : mobileNo,
            email:email,
            destination : hour?.location ? hour?.location?.name : '',
            booking_for : selectedOption,
            booking_item : item?.type,
            starting_point: item?.pickup_point_or_location,
            number_of_people : count,
            slot_start_date : startDate,
            slot_end_date : endDate ? endDate : null,
            slot_start_time : startTime ? startTime : '',
            slot_end_time : endTime ? endTime : '',
            user_id : userId
        }
        console.log('data',data);
        BookingApi.createBooking(data).then((res) => {
            console.log('createbooking', res.data.booking_id);
            if(res.status === 201){
                console.log(selectedCoupon?.redemption_type);
                if (selectedCoupon?.redemption_type == 'One-Time') {
                    alert('test1');
                    const updatedRedeemedCoupons = [...redeemedCoupons, selectedCoupon.id];
                    setRedeemedCoupons(updatedRedeemedCoupons);
                    // Save the updated redeemed coupons to AsyncStorage
                    saveRedeemedCoupons(updatedRedeemedCoupons);
                    console.log('updatedRedeemedCoupons', updatedRedeemedCoupons);
                }
                BookingApi.paymentInitiate(res.data.booking_id).then((res) => {
                    console.log('payment', res.data);
                    const paymentUrl = res.data.payment_url;
                    updateUrl(paymentUrl)
                    // Linking.openURL(paymentUrl)
                    //     .then((data) => {
                    //     console.log('Open URL success:', data);
                    //     })
                    //     .catch((error) => {
                    //     console.error('Open URL error:', error);
                    //     });
                    navigation.navigate('PaymentInitiate')
                })
            }
        })
        console.log('redeemedCoupons===', redeemedCoupons);
            // navigation.navigate('PaymentSuccess')
    }

    return(
        <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
            <ScrollView>
               <View style={{backgroundColor:'rgba(0, 104, 117, 1)', height:176, width:'100%'}}>
                <Pressable style={[Styles.backIcon,{marginTop:12,}]} onPress={() => navigation.goBack()}>
                        <BackIcon color='#1B1E28'></BackIcon>
                </Pressable>
                 <View style={{margin:20}}>
                    <Text style={{color:'rgba(255, 255, 255, 1)', fontSize:16, fontFamily:'Roboto-Regular'}}>{hour?.name}</Text>
                    <View style={{flexDirection:'row',marginTop:8}}>
                        <Text style={{color:'rgba(255, 255, 255, 1)', fontSize:16, fontFamily:'Roboto-Regular'}}>{item?.company},</Text>
                        <Text style={{color:'rgba(255, 255, 255, 1)', fontSize:16, fontFamily:'Roboto-Regular'}}> {item?.pickup_point_or_location}</Text>
                    </View>
                    <View style={{flexDirection:'row',marginTop:8}}>
                        <Text style={{color:'rgba(255, 255, 255, 1)', fontSize:16, fontFamily:'Roboto-Regular'}}>{dateRangeString}</Text>
                        {
                            hourRange && (
                                <>
                                <View style={{ borderLeftColor: 'rgba(255, 255, 255, 1)', borderLeftWidth: 0.9, height: 15, alignSelf: 'center', marginLeft: 5 }}></View>
                                <Text style={{ color: 'rgba(255, 255, 255, 1)', fontSize: 16, fontFamily: 'Roboto-Regular', marginLeft: 5 }}>{formattedHourRange}</Text>
                                </>
                            )
                        }
                    </View>
                 </View>
               </View>
               <BookingDetails updateBookingDetails={updateBookingDetails} addGuest={true} capacity={item?.capacity}/>
               <AddCoupon service={hour} onCouponSelect={handleCouponSelect} item ={item}/>
               <PaymentInfo info={hour} coupon={selectedCoupon} onTotalAmountChange={handleTotalAmountChange}/>
            </ScrollView>
            <View style={{position: 'absolute', bottom: 0,left: 0,right: 0,backgroundColor: 'rgba(255, 255, 255, 1)',paddingBottom: Platform.OS === 'ios' ? 15 : 30,justifyContent:'center', alignItems:'center'}}>
                <View style={{flexDirection:'row',marginTop:Platform.OS === 'ios' ? 30 : 10,height:30}}>
                    <Pressable style={{backgroundColor:'rgba(0, 104, 117, 1)', width:'90%', height:40, borderRadius:3,alignItems:'center',justifyContent:'center'}} onPress={paymentHandler}>
                        <Text style={{color:'rgba(255, 255, 255, 1)', fontSize:14,fontFamily:'Roboto-Bold'}}>Pay {totalAmount} KWD</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default BookingDetailsScreen;