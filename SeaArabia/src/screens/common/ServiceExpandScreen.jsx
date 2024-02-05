import { View,Text, SafeAreaView, Image, ScrollView,StyleSheet ,Pressable, Platform,Linking} from "react-native";
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
import Share from 'react-native-share';
import { generateAppUrl } from '../../navigations/navigationUtils';


// const amenitiesList = [
//     {
//         id : 1,
//         image: require('../../assets/images/Bedrooms.png'),
//         name: 'Bedrooms'
//     },
//     {
//         id : 2,
//         image: require('../../assets/images/AC.png'),
//         name: 'AC'
//     },
//     {
//         id : 3,
//         image: require('../../assets/images/Icebox.png'),
//         name: 'Icebox'
//     },
//     {
//         id : 4,
//         image: require('../../assets/images/Bbq.png'),
//         name: 'BBQ'
//     },
//     {
//         id : 5,
//         image: require('../../assets/images/BeachChair.png'),
//         name: 'Beach Chair'
//     },
//     {
//         id : 6,
//         image: require('../../assets/images/CoffeeMachine.png'),
//         name: 'Coffee Machine'
//     },
//     {
//         id : 7,
//         image: require('../../assets/images/Coffeeshop.png'),
//         name: 'Coffeeshop'
//     },
//     {
//         id : 8,
//         image: require('../../assets/images/FishingTool.png'),
//         name: 'Fishing Tool'
//     },
//     {
//         id : 9,
//         image: require('../../assets/images/Fridge.png'),
//         name: 'Fridge'
//     },
//     {
//         id : 10,
//         image: require('../../assets/images/Guide.png'),
//         name: 'Guide'
//     },
// ]

// const detailsText = "A brand-new 112m yacht, Spectre is a temple of leisure, a sanctum of tranquillity, conceived to delight an unprecedented 36 guests on a hither-to unknown scale.  From her vast beach club, open on three sides for that life-affirming connection to the ocean, to her matchless spa, an entire deck devoted to fitness, wellness and pampering, this is a yacht that elevates the already extraordinary. Whether you land by air on the foredeck helipad or by sea in a fleet of custom tenders, you’ll know you’ve arrived. Her guest accommodation is uniquely flexible, including doubles, twins and cabins that convert into suites, welcoming parties of all kinds with consummate ease. An elevator serving all decks makes her the perfect choice – indeed the only choice – for large, multi-generational groups. "


function ServiceExpandScreen(){
   const { item , updateItem,bestDealsItem } = useAppContext();
   const navigation = useNavigation();
   const [service, setService] = useState();
   const [deals, setDeals] = useState();
   const [ratingCount, setRatingCount] = useState();
    console.log('useAppContext======', item.id);
    const { uniqueID } = item?.id;
    useBackButtonHandler(navigation, false);

    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                const bestDeals = await AsyncStorage.getItem('best_Deals');
                setDeals(bestDeals);
                getServiceView();
                getRatingCount();
            };
            fetchData(); 
        }, []) 
    )
    useEffect(() => {
        // Handle deep linking here
        const deepLinkingHandler = (event) => {
          if (event.url) {
            const url = event.url;
            const route = Linking.parse(url);
            console.log('route', route);
            // if (route && route.route) {
            //   navigation.navigate(route.route.name, route.route.params);
            // }
          }
        };
    
        // Subscribe to deep linking events
        Linking.addEventListener('url', deepLinkingHandler);
    
        // Clean up the event listener when the component unmounts
        return () => {
          Linking.removeEventListener('url', deepLinkingHandler);
        };
      }, [navigation]);
    const handleShare = async () => {
        // const url = `https://seaarabia.com/screen/${item?.id}`;
        // const url = generateAppUrl('ServiceExpand', { itemId: item?.id });
        const url = `seaarabia://details/${item.id}`
        console.log('url=====', url);
        try {
          const result = await Share.open({ message: url });
          console.log(result);
        } catch (error) {
          console.error('Error sharing:', error.message);
        }
      };
    function getRatingCount(){
        CommonApi.getReviewCount(item?.id).then((res) => {
            console.log('res====', res.data.total_reviews_count);
            setRatingCount(res.data.total_reviews_count);
        })
    }
    function getServiceView() {
        CommonApi.getIndividualService(item.id).then((res) => {
            console.log('service====', res.data);
            if(res.status === 200){
                setService(res.data);
            }
        })
        
    }
    function proceedHandler(){
        if(deals){}
        updateItem(service);
        navigation.navigate('ServiceDate')
        // BestDealsItem({});
    }
    const serviceImages = service?.service_image || [];
    const amenitiesList = service?.amenities || [];
    const description = service?.description;
    const lowestPriceService = service?.service_price_service.reduce((lowest, current) => {
        if (current.price < lowest.price) {
          return current;
        }
        return lowest;
      }, service?.service_price_service[0]);
    return(
        <SafeAreaView style={{flex:1,backgroundColor:'white'}}>  
            <ScrollView style={{marginBottom:20}}>
                {/* <Image source={item?.image} style={{height:250, width:'auto'}} resizeMode='stretch'></Image> */}
                <CarouselList data={serviceImages}/>
                <View style={{flexDirection:'row'}}>
                    <Text style={{color:'rgba(0, 104, 117, 1)',fontSize:16,fontFamily:'Roboto-Medium', marginTop:15,marginLeft:20}}>{service?.name}</Text>
                    {
                        service?.service_price_service.length > 1 ?
                        (
                            <View style={{flexDirection:'row', marginLeft:'auto',right:20, marginTop:15,marginBottom:10}}>
                                <Text style={{color:'rgba(121, 121, 128, 1)', fontSize:12, fontFamily:'Roboto-Regular',marginTop:2}}>Starts from </Text>
                                <Text style={{color:'rgba(0, 104, 117, 1)', fontSize:14, fontFamily:'Roboto-Medium'}}>{lowestPriceService?.price} KWD</Text>
                            </View>
                        ) 
                        : (
                            <View style={{flexDirection:'row', marginLeft:'auto',right:20, marginTop:15,marginBottom:10}}>
                                <Text style={{color:'rgba(0, 104, 117, 1)', fontSize:14, fontFamily:'Roboto-Medium'}}>{service?.service_price_service[0]?.price} KWD</Text>
                            </View>
                        )
                    }
                </View>
                <View style={{flexDirection:'row',marginLeft:18,marginTop:10}}>
                    <LocationIcon color='rgba(0, 0, 0, 0.8)'/>
                    <Text style={{color:'rgba(102, 102, 102, 1)', fontSize:12, fontFamily:'Roboto-Regular'}}> {service?.pickup_point_or_location}</Text>
                </View>
                <View style={{flexDirection:'row',marginBottom:15}}>
                    <Rating initialRating={ratingCount}/>
                    <Text style={{color:'rgba(25, 28, 29, 0.8)', fontSize:11,fontFamily:'Roboto-Regular',marginLeft:'auto',bottom:20,textAlign:'right',left:55}}>Capacity</Text>
                    <View style={{right:20,flexDirection:'row'}}>
                        <GuestIcon/>
                        <Text style={{color:'rgba(0, 0, 0, 1)', fontSize:14,fontFamily:'Roboto-Regular',bottom:2,left:2}}>{service?.capacity} People</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: 'rgba(245, 245, 245, 1)', height: 4, width: '100%' }}></View>
                <View style={{ padding: 15 }}>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row', width:160, height:36, backgroundColor:'rgba(248, 248, 248, 1)',borderRadius:5,alignItems:'center' }}>
                            <Image source={require('../../assets/images/Bedrooms1.png')} style={{width:20, height:15,marginLeft:15}}></Image>
                            <Text style={{fontSize:14, color:'rgba(0, 0, 0, 1)', fontFamily:'Roboto-Regular',marginLeft:15}}>{service?.bedroom} Bedroom</Text>
                        </View>
                        <View style={{flexDirection:'row', width:160, height:36, backgroundColor:'rgba(248, 248, 248, 1)',borderRadius:5,alignItems:'center' }}>
                            <Image source={require('../../assets/images/Lounge.png')} style={{width:20, height:15,marginLeft:15}}></Image>
                            <Text style={{fontSize:14, color:'rgba(0, 0, 0, 1)', fontFamily:'Roboto-Regular',marginLeft:15}}>{service?.lounge} Lounge</Text>
                        </View>
                    </View>
                    <View style={{flexDirection:'row', width:160, height:36, backgroundColor:'rgba(248, 248, 248, 1)',borderRadius:5,alignItems:'center',marginTop:10 }}>
                        <Image source={require('../../assets/images/Washroom.png')} style={{width:20, height:15,marginLeft:15}}></Image>
                        <Text style={{fontSize:14, color:'rgba(0, 0, 0, 1)', fontFamily:'Roboto-Regular',marginLeft:15}}>{service?.toilet} Washroom</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: 'rgba(245, 245, 245, 1)', height: 4, width: '100%' }}></View>
                <View style={{ padding: 15 }}>
                    <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontSize: 16, fontFamily: 'Roboto-Medium' }}>Amenities</Text>
                    {/* <Pressable style={{ marginLeft: 'auto' }}>
                        <Image source={require('../assets/images/Filter.png')} style={{ height: 28, width: 32 }}></Image>
                    </Pressable> */}
                    <AmenitiesList data={amenitiesList}/>
                </View>
                <View style={{ backgroundColor: 'rgba(245, 245, 245, 1)', height: 4, width: '100%' }}></View>
                <View style={{ padding: 15 }}>
                    <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontSize: 16, fontFamily: 'Roboto-Medium' }}>Details</Text>
                    <ReadMore text={description}/>
                </View>
                <View style={{ backgroundColor: 'rgba(245, 245, 245, 1)', height: 4, width: '100%' }}></View>
                <View style={{ padding: 15 }}>
                    <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontSize: 16, fontFamily: 'Roboto-Medium' }}>Cancellation Policy</Text>
                    <Text style={{color:'rgba(0, 0, 0, 0.8)', fontSize:12, fontFamily:'Roboto-Regular',marginTop:10}}>{service?.cancellation_policy}</Text>
                </View>
                <View style={{ padding: 15 }}>
                    <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontSize: 16, fontFamily: 'Roboto-Medium' }}>Refund</Text>
                    <Text style={{color:'rgba(0, 0, 0, 0.8)', fontSize:12, fontFamily:'Roboto-Regular',marginTop:10}}>{service?.refund_policy}</Text>
                </View>
                <View style={{ backgroundColor: 'rgba(245, 245, 245, 1)', height: 4, width: '100%' }}></View>
                <View style={{ padding: 15,marginBottom:25 }}>
                    <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontSize: 16, fontFamily: 'Roboto-Medium' }}>Location</Text>
                    <Image source={require('../../assets/images/LocationMap.png')} style={{width:'95%', height:150, borderRadius:3,alignSelf:'center',marginTop:9}}></Image>
                </View>
            </ScrollView>
            <View style={styles.overlay}>
                <View style={{flexDirection:'row',marginTop:Platform.OS === 'ios' ? 30 : 10}}>
                    <Pressable style={[Styles.backIcon,{width:'10%',height:37}]} onPress={() => navigation.goBack()}>
                        <BackIcon color='#1B1E28'></BackIcon>
                    </Pressable>
                    <Pressable style={{marginLeft:'auto',right:20}} onPress={handleShare}>
                        <ShareIcon/>
                    </Pressable>
                </View>
            </View>
            <View style={{position: 'absolute', bottom: 0,left: 0,right: 0,backgroundColor: 'rgba(255, 255, 255, 1)',paddingBottom: Platform.OS === 'ios' ? 15 : 30,justifyContent:'center', alignItems:'center'}}>
                <View style={{flexDirection:'row',marginTop:Platform.OS === 'ios' ? 30 : 10,height:30}}>
                    <Pressable style={{backgroundColor:'rgba(0, 104, 117, 1)', width:'90%', height:40, borderRadius:3,alignItems:'center',justifyContent:'center'}} onPress={proceedHandler}>
                        <Text style={{color:'rgba(255, 255, 255, 1)', fontSize:14,fontFamily:'Roboto-Bold'}}>Proceed</Text>
                    </Pressable>
                </View>
                </View>
                </SafeAreaView>
    )
                }

 export default ServiceExpandScreen;               

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

