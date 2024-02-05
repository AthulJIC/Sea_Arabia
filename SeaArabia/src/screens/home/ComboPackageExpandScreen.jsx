import { View,Text, SafeAreaView, Image, ScrollView,StyleSheet ,Pressable, Platform} from "react-native";
import LocationIcon from "../../assets/icon/LocationIcon";
import Rating from "../../ui/Rating";
import GuestIcon from "../../assets/icon/GuestIcon";
import BackIcon from "../../assets/icon/BackIcon";
import Styles from "../../public/Styles";
import ShareIcon from "../../assets/icon/ShareIcon";
import AmenitiesList from "../../ui/AmenitiesList";
import ReadMore from "../../ui/ReadMore";
import { useAppContext } from "../../context/AppContext";
import CarouselList from "../../components/CarouselList";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { CommonApi } from "../../Services/common/CommonApi";
import useBackButtonHandler from "../../components/BackHandlerUtils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BookingApi } from "../../Services/bookings/BookingService";


function ComboPackagesExpandScreen(){
   const { item , updateItem } = useAppContext();
   const navigation = useNavigation();
   const [userId, setUserId] = useState();
    console.log('useAppContext======', item);

    useBackButtonHandler(navigation, false);
    useEffect(async () => {
        const fetchData = async () => {
            const user_id = await AsyncStorage.getItem('userId');
            setUserId(user_id);
          
        };
        fetchData(); 
      }, []);
    function proceedHandler(){
       console.log('item', item);
       navigation.navigate('RaiseQuery')
    //    const data = {
    //         service : item?.service?.id,
    //         booking_item : item?.type,
    //         starting_point: item?.pickup_point_or_location,
    //         user_id : userId,
    //         package : item?.id
    //     }
    //     console.log(data);
    //     BookingApi.createBooking(data).then((res) => {
    //         console.log('createbooking', res.data);
            
    //             // console.log(selectedCoupon?.redemption_type);
    //             // if (selectedCoupon?.redemption_type == 'One-Time') {
    //             //     alert('test1');
    //             //     const updatedRedeemedCoupons = [...redeemedCoupons, selectedCoupon.id];
    //             //     setRedeemedCoupons(updatedRedeemedCoupons);
    //             //     // Save the updated redeemed coupons to AsyncStorage
    //             //     saveRedeemedCoupons(updatedRedeemedCoupons);
    //             //     console.log('updatedRedeemedCoupons', updatedRedeemedCoupons);
    //             // }

    //     })
    }

    return(
        <SafeAreaView style={{flex:1,backgroundColor:'white'}}>  
            <ScrollView style={{marginBottom:20}}>
                <Image source={{uri : item?.image}} style={{height:250, width:'auto'}} resizeMode='stretch'></Image>
                {/* <CarouselList data={serviceImages}/> */}
                <View style={{flexDirection:'row'}}>
                    <Text style={{color:'rgba(0, 104, 117, 1)',fontSize:16,fontFamily:'Roboto-Medium', marginTop:15,marginLeft:20}}>{item?.name}</Text>       
                    <View style={{flexDirection:'row', marginLeft:'auto',right:20, marginTop:15,marginBottom:10}}>
                        <Text style={{color:'rgba(0, 104, 117, 1)', fontSize:14, fontFamily:'Roboto-Medium'}}>{item?.price} KWD</Text>
                    </View>    
                </View>
                <View style={{flexDirection:'row',marginLeft:18,marginTop:10}}>
                    <LocationIcon color='rgba(0, 0, 0, 0.8)'/>
                    <Text style={{color:'rgba(102, 102, 102, 1)', fontSize:12, fontFamily:'Roboto-Regular'}}> {item?.location}</Text>
                </View>
                <View style={{flexDirection:'row',marginBottom:15}}>
                    {/* <Rating/> */}
                    <Text style={{color:'rgba(25, 28, 29, 0.8)', fontSize:11,fontFamily:'Roboto-Regular',marginLeft:'auto',bottom:20,textAlign:'right',left:55}}>Capacity</Text>
                    <View style={{right:20,flexDirection:'row'}}>
                        <GuestIcon/>
                        <Text style={{color:'rgba(0, 0, 0, 1)', fontSize:14,fontFamily:'Roboto-Regular',bottom:2,left:2}}> {item?.capacity} People</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: 'rgba(245, 245, 245, 1)', height: 1, width: '100%' }}></View>
                <View style={{ padding: 15 }}>
                    <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontSize: 16, fontFamily: 'Roboto-Medium' }}>Details</Text>
                    <ReadMore text={item?.description}/>
                </View>
                <View style={{ backgroundColor: 'rgba(245, 245, 245, 1)', height: 1, width: '100%' }}></View>
                <View style={{ padding: 15 }}>
                    <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontSize: 16, fontFamily: 'Roboto-Medium' }}>Cancellation Policy</Text>
                    <Text style={{color:'rgba(0, 0, 0, 0.8)', fontSize:12, fontFamily:'Roboto-Regular',marginTop:10}}>{item?.cancellation_policy}</Text>
                </View>
                <View style={{ padding: 15 }}>
                    <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontSize: 16, fontFamily: 'Roboto-Medium' }}>Refund</Text>
                    <Text style={{color:'rgba(0, 0, 0, 0.8)', fontSize:12, fontFamily:'Roboto-Regular',marginTop:10}}>{item?.refund_policy}</Text>
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
                    <Pressable style={{backgroundColor:'rgba(0, 104, 117, 1)', width:'90%', height:40, borderRadius:3,alignItems:'center',justifyContent:'center'}} onPress={proceedHandler}>
                        <Text style={{color:'rgba(255, 255, 255, 1)', fontSize:14,fontFamily:'Roboto-Bold'}}>Raise Enquiry</Text>
                    </Pressable>
                </View>
                </View>
                </SafeAreaView>
    )
                }

 export default ComboPackagesExpandScreen;               

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

