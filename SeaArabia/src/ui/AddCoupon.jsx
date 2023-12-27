import { View,Text, Pressable,Image } from "react-native"
import CustomTextInput from "../components/CustomTextInput";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

function AddCoupon() {
    const navigation = useNavigation();
    const [couponText, setCouponText] = useState('')
    const [selectedOption, setSelectedOption] = useState('Myself');

    const handleOptionSelection = (option) => {
        setSelectedOption(option);
    };

    return(
        <View>
            <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontSize: 16, fontFamily: 'Roboto-Medium',marginLeft:20,marginTop:17 }}>Add Coupons</Text>
            <View style={{flexDirection:'row',justifyContent:'space-between',marginLeft:17,right:9,bottom:15,alignItems:'center'}}>
                <CustomTextInput placeholder='Enter Coupon Code'
                    value={couponText}
                    onChangeText={(text) => setCouponText(text)}
                    width='60%'
                />
                <Pressable style={{backgroundColor:'rgba(0, 104, 117, 1)', height:50, width:'35%',borderRadius:12,alignItems:'center',justifyContent:'center',marginTop:23}}>
                    <Text style={{color:'rgba(255, 255, 255, 1)', fontSize:15,fontFamily:'Roboto-Regular'}}>Apply</Text>
                </Pressable>
            </View>
            <View>
                <Pressable style={{backgroundColor:'rgba(247, 247, 249, 1)', height:90,width:'92%', borderRadius:12,alignSelf:'center',padding:10}} onPress={() => handleOptionSelection('Myself')}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Image
                            source={
                            selectedOption === 'Myself'
                                ? require('../assets/images/RadioActive.png')
                                : require('../assets/images/RadioInactive.png')
                            }
                            style={{ width: 20, height: 20 }}></Image>
                        <Text style={{ color: 'rgba(0, 104, 117, 1)', fontSize: 14, fontFamily: 'Roboto-Regular', marginLeft: 5, textAlign: 'center', marginTop: 2 }}>
                            Coupon Code
                        </Text>
                    </View>
                    <View style={{marginTop:7,marginLeft:25}}>
                        <Text style={{color:'rgba(0, 0, 0, 0.8)', fontSize:12,fontFamily:'Roboto-Regular'}}>Flat 25 KWD Off</Text>
                        <Text style={{color:'rgba(0, 0, 0, 0.5)',fontSize:11,fontFamily:'Roboto-Regular',marginTop:5}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry</Text>
                    </View>
                </Pressable>
                <Pressable style={{backgroundColor:'rgba(247, 247, 249, 1)', height:90,width:'92%', borderRadius:12,alignSelf:'center',padding:10,marginTop:9}} onPress={() => handleOptionSelection('SomeoneElse')}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Image
                            source={
                            selectedOption === 'SomeoneElse'
                                ? require('../assets/images/RadioActive.png')
                                : require('../assets/images/RadioInactive.png')
                            }
                            style={{ width: 20, height: 20 }}></Image>
                        <Text style={{ color: 'rgba(0, 104, 117, 1)', fontSize: 14, fontFamily: 'Roboto-Regular', marginLeft: 5, textAlign: 'center', marginTop: 2 }}>
                            Coupon Code
                        </Text>
                    </View>
                    <View style={{marginTop:7,marginLeft:25}}>
                        <Text style={{color:'rgba(0, 0, 0, 0.8)', fontSize:12,fontFamily:'Roboto-Regular'}}>20% Discount Upto 40 KWD</Text>
                        <Text style={{color:'rgba(0, 0, 0, 0.5)',fontSize:11,fontFamily:'Roboto-Regular',marginTop:5}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry</Text>
                    </View>
                </Pressable>
            </View>
            <Text style={{color:'rgba(0, 104, 117, 1)',fontSize:14,fontFamily:'Roboto-Regular',textAlign:'right',right:17,marginTop:10,marginBottom:15}} onPress={() => navigation.navigate('CouponList')}>View All</Text>
            <View style={{ backgroundColor: 'rgba(245, 245, 245, 1)', height: 4, width: '100%' }}></View>
        </View>
    )
}

export default AddCoupon;