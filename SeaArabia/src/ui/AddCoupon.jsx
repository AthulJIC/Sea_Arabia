import { View,Text, Pressable,Image, Alert } from "react-native"
import CustomTextInput from "../components/CustomTextInput";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { BookingApi } from "../Services/bookings/BookingService";
import { useAppContext } from "../context/AppContext";


function AddCoupon({service, onCouponSelect,item}) {
    const navigation = useNavigation();
    const [couponText, setCouponText] = useState('')
    const [selectedOption, setSelectedOption] = useState();
    const [filteredCoupons, setFilteredCoupons] = useState([]);
    const { updateCouponList, coupon, bestDeals } = useAppContext();
    const [ showButton, setShowButton] = useState(false);
    const [descText, setDescText] = useState();
    const [isInitialRender, setIsInitialRender] = useState(true);
    console.log('service====',bestDeals);
    console.log('selectedOption====',selectedOption);
    console.log('couponText====',couponText);
    console.log('descText====',descText);
    console.log('showButton====',showButton);
    useFocusEffect(
        useCallback(() => {
            getCouponList();
            getSelectedCoupon();
            setIsInitialRender(false);
        }, [coupon])
    );
    useEffect(async () => {
        const fetchData = async () => {
            // const bestDeals = await AsyncStorage.getItem('userId');
            // setUserId(user_id);
            getCouponItem()
        };
        fetchData(); 
      }, [bestDeals]);
    function getSelectedCoupon() {
        if (coupon && !isInitialRender) {
            setSelectedOption(coupon);
            setCouponText(coupon.coupon_code); // Use coupon instead of selectedOption
            setShowButton(true); // Always set showButton to true when coupon is available
            updateDescText(coupon); 
            onCouponSelect(coupon);// Update descText based on the selected coupon
          } else {
            // This is the first render, set selectedOption to null
            setSelectedOption(null);
            setCouponText("");
            setShowButton(false);
            setDescText("");
            onCouponSelect(null);
          }
    }
    function getCouponItem(){
        console.log('test');
        if(bestDeals && typeof bestDeals === 'object' && 'coupon_code' in bestDeals){
            Alert.alert('test');
            console.log('bestDeals', bestDeals?.coupon_code);
            setSelectedOption(bestDeals);
            setCouponText(bestDeals.coupon_code); // Use coupon instead of selectedOption
            setShowButton(true); // Always set showButton to true when coupon is available
            updateDescText(bestDeals); 
            onCouponSelect(bestDeals);
        }
    }
    function getCouponList() {
        BookingApi.getCouponList().then((res) => {
          console.log('data====', res.data.results);
          const coupons = res.data.results;
          const updatedFilteredCoupons = coupons.filter((coupon) => {
            if (coupon.apply_global) {
              return true;
            } else {
              const selectedService = service?.service;
              const serviceExists = coupon.services.some(
                (service) => service.id === selectedService
              );
    
              return serviceExists;
            }
          });
          const filteredCouponsWithMinPurchase = updatedFilteredCoupons.filter((coupon) => {
            if (coupon.purchase_requirement) {
              return coupon.min_purchase_amount <= service?.price;
            }
            // If purchase_requirement is false, include the coupon in the result
            return true;
          });
          updateCouponList(filteredCouponsWithMinPurchase);
          // Take the first two filtered coupons
          const firstTwoCoupons = filteredCouponsWithMinPurchase.slice(0, 2);
          setFilteredCoupons(firstTwoCoupons);
        });
      }
      const updateDescText = (coupon) => {
        let desc;
        if (coupon?.discount_type === 'Percentage') {
            desc = coupon?.discount_value + '% upto ' + coupon?.up_to_amount;
        } else {
            desc = 'Flat' + coupon?.discount_value + 'off';
        }
        setDescText(desc);
    };

    const handleOptionSelection = (option) => {
        console.log('option',option);
        setSelectedOption(option);
        updateDescText(option);
        onCouponSelect(option);
    };
    function viewAllHandler() {
        navigation.navigate('CouponList')
    }
    function applyHandler(name) {
        console.log('apply===', name, selectedOption);
        
        if (selectedOption && name === 'Apply') {
            console.log('Setting couponText:', selectedOption.coupon_code);
            setCouponText(selectedOption.coupon_code);
            setShowButton(!showButton);
        } else if(name === 'Remove'){
            setCouponText('');
            setShowButton(!showButton);
        }
    
       
    }
    return(
        <View>
            <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontSize: 16, fontFamily: 'Roboto-Medium',marginLeft:20,marginTop:17 }}>Add Coupons</Text>
            <View style={{flexDirection:'row',justifyContent:'space-between',marginLeft:17,right:9,bottom:15,alignItems:'center'}}>
                <CustomTextInput placeholder='Enter Coupon Code'
                    value={couponText}
                    onChangeText={(text) => setCouponText(text)}
                    width='60%'
                />
                {
                    !showButton ? (
                        <Pressable style={{backgroundColor:'rgba(0, 104, 117, 1)', height:49, width:'35%',borderRadius:12,alignItems:'center',justifyContent:'center',marginTop:27}} onPress={() => applyHandler('Apply')}>
                            <Text style={{color:'rgba(255, 255, 255, 1)', fontSize:15,fontFamily:'Roboto-Regular'}}>Apply</Text>
                        </Pressable>
                    ) :
                    (
                        <Pressable style={{backgroundColor:'rgba(255, 255, 255, 1)', height:49, width:'35%',borderRadius:12,alignItems:'center',justifyContent:'center',marginTop:27, borderColor:'rgba(0, 0, 0, 0.7)', borderWidth:1}} onPress={() => applyHandler('Remove')}>
                            <Text style={{color:'rgba(224, 50, 50, 1)', fontSize:15,fontFamily:'Roboto-Regular'}}>Remove</Text>
                        </Pressable>
                    )
                }
            </View>
            <View>
                {showButton ? (
                    <View style={{ backgroundColor: 'rgba(247, 247, 249, 1)', height: 90, width: '92%', borderRadius: 12, alignSelf: 'center', padding: 10, marginTop: 9,marginBottom:10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                                source={require('../assets/images/RadioActive.png')}
                                style={{ width: 20, height: 20 }}
                            />
                            <Text style={{ color: 'rgba(0, 104, 117, 1)', fontSize: 14, fontFamily: 'Roboto-Regular', marginLeft: 5, textAlign: 'center', marginTop: 0 }}>
                                {selectedOption?.coupon_code}
                            </Text>
                        </View>
                        <View style={{ marginTop: 7, marginLeft: 25 }}>
                            <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontSize: 12, fontFamily: 'Roboto-Regular' }}>{selectedOption.name}</Text>
                            {/* Uncomment the next line if you want to display descText */}
                            <Text style={{ color: 'rgba(0, 0, 0, 0.5)', fontSize: 13, fontFamily: 'Roboto-Regular', marginTop: 5 }}>{descText}</Text>
                        </View>
                    </View>
                ) : (
                    <><View>
                            {filteredCoupons.map((coupon, index) => {
                                let desc;
                                if (coupon?.discount_type === 'Percentage') {
                                    desc = coupon?.discount_value + '% upto ' + coupon?.up_to_amount;
                                   
                                } else {
                                    desc = 'Flat' + coupon?.discount_value + 'off';
                                }
                                
                                return (
                                    <Pressable key={index} style={{ backgroundColor: 'rgba(247, 247, 249, 1)', height: 90, width: '92%', borderRadius: 12, alignSelf: 'center', padding: 10, marginTop: index === 0 ? 0 : 9 }} onPress={() => handleOptionSelection(coupon)}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Image
                                                source={selectedOption?.id === coupon?.id ? require('../assets/images/RadioActive.png') : require('../assets/images/RadioInactive.png')}
                                                style={{ width: 20, height: 20 }} />
                                            <Text style={{ color: 'rgba(0, 104, 117, 1)', fontSize: 14, fontFamily: 'Roboto-Regular', marginLeft: 5, textAlign: 'center', marginTop: 0 }}>
                                                {coupon?.coupon_code}
                                            </Text>
                                        </View>
                                        <View style={{ marginTop: 7, marginLeft: 25 }}>
                                            <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontSize: 12, fontFamily: 'Roboto-Regular' }}>{coupon.name}</Text>
                                            <Text style={{ color: 'rgba(0, 0, 0, 0.5)', fontSize: 13, fontFamily: 'Roboto-Regular', marginTop: 5 }}>{desc}</Text>
                                        </View>
                                    </Pressable>
                                );
                            })}
                        </View><Text style={{ color: 'rgba(0, 104, 117, 1)', fontSize: 14, fontFamily: 'Roboto-Regular', textAlign: 'right', right: 17, marginTop: 10, marginBottom: 15 }} onPress={() => viewAllHandler()}>View All</Text></>
                )}
            </View>
           
            <View style={{ backgroundColor: 'rgba(245, 245, 245, 1)', height: 4, width: '100%' }}></View>
        </View>
    )
}

export default AddCoupon;