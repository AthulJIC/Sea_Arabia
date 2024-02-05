import { View,Text,Pressable, SafeAreaView, ScrollView ,Image, Platform, Alert} from "react-native";
import BackIcon from "../../assets/icon/BackIcon";
import Styles from "../../public/Styles";
import CustomFlatList from "../../components/CustomFlatlist";
import { useState } from "react";
import useBackButtonHandler from "../../components/BackHandlerUtils";
import { useNavigation } from "@react-navigation/native";
import { useAppContext } from "../../context/AppContext";


function CouponListScreen(){
    const navigation = useNavigation();
    const [selectedOption, setSelectedOption] = useState(null);
    const { couponList , updateCoupon} = useAppContext();

    useBackButtonHandler(navigation, false);

    const handleOptionSelection = (option) => {
        setSelectedOption(option);
        updateCoupon(option);
    };
    function applyCouponHandler() {
        if(!selectedOption){
            Alert.alert('Please select coupon')
        }
        else{
            navigation.goBack();
        }
        
    }
    function renderItem({item}){
        let desc;
        if(item?.discount_type === 'Percentage'){
                desc = item?.discount_value + '% upto ' + item?.up_to_amount;
        }
        else{
            desc = 'Flat ' + item?.discount_value + ' off';
        }
        return(
            <Pressable style={{backgroundColor:'rgba(247, 247, 249, 1)', height:90,width:'92%', borderRadius:12,alignSelf:'center',padding:10,marginTop:12}} onPress={() => handleOptionSelection(item)}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Image
                        source={
                        selectedOption?.id === item.id
                            ? require('../../assets/images/RadioActive.png')
                            : require('../../assets/images/RadioInactive.png')
                        }
                        style={{ width: 20, height: 20 }}></Image>
                    <Text style={{ color: 'rgba(0, 104, 117, 1)', fontSize: 14, fontFamily: 'Roboto-Regular', marginLeft: 5, textAlign: 'center', marginTop: 0 }}>
                        {item.coupon_code}
                    </Text>
                </View>
                <View style={{marginTop:7,marginLeft:25}}>
                    <Text style={{color:'rgba(0, 0, 0, 0.8)', fontSize:12,fontFamily:'Roboto-Regular'}}>{item.name}</Text>
                    <Text style={{color:'rgba(0, 0, 0, 0.5)',fontSize:11,fontFamily:'Roboto-Regular',marginTop:5}}>{desc}</Text>
                </View>
            </Pressable>
        )
    }

    return(
        <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
            <ScrollView style={{marginBottom: Platform.OS === 'ios' ? 80 : 90}}>
            <Pressable style={[Styles.backIcon,{marginTop:12,}]} onPress={() => navigation.goBack()}>
                <BackIcon color='#1B1E28'></BackIcon>
            </Pressable>
            <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontSize: 16, fontFamily: 'Roboto-Medium',margin:20 }}>All Coupons</Text>
            <CustomFlatList 
                data={couponList}
                renderItem={renderItem}
                horizontal={false}
                keyExtractor={(item) => item.id.toString()}/>
            </ScrollView>
            <View style={{position: 'absolute', bottom: 0,left: 0,right: 0,backgroundColor: 'rgba(255, 255, 255, 1)',paddingBottom: Platform.OS === 'ios' ? 15 : 30,justifyContent:'center', alignItems:'center'}}>
                <View style={{flexDirection:'row',marginTop:Platform.OS === 'ios' ? 30 : 10,height:30}}>
                    <Pressable style={{backgroundColor:'rgba(0, 104, 117, 1)', width:'90%', height:40, borderRadius:3,alignItems:'center',justifyContent:'center'}} onPress={applyCouponHandler}>
                        <Text style={{color:'rgba(255, 255, 255, 1)', fontSize:14,fontFamily:'Roboto-Bold'}}>Apply Coupon</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default CouponListScreen;