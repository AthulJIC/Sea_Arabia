import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { View,Text } from "react-native";

function PaymentInfo({info,coupon,onTotalAmountChange}){
    const [couponAmount, setCouponAmount] = useState();
    const [totalAmount,settotalAmount] = useState();
 
    console.log('amount==', couponAmount,totalAmount);

    useFocusEffect(
        useCallback(() => {
            getAmount();
        }, [coupon])
    );
    function getAmount() {
        if(coupon?.discount_type === 'Percentage'){
            const percent = info?.price * coupon?.discount_value / 100;
            
            if(percent >= coupon?.up_to_amount){
                setCouponAmount(coupon?.up_to_amount);
                const total = info?.price - coupon?.up_to_amount;
                settotalAmount(total)
                onTotalAmountChange(total);
            }
            else{
                setCouponAmount(percent);
                const total = info?.price - percent;
                settotalAmount(total)
                onTotalAmountChange(total);
            }
        }
        else{
            setCouponAmount(coupon?.discount_value)
            const total = info?.price - coupon?.discount_value;
            settotalAmount(total)
            onTotalAmountChange(total);
        }
        // console.log('discount', percent,);
    }
    return(
        <View style={{marginBottom:89}}>
            <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontSize: 16, fontFamily: 'Roboto-Medium',marginLeft:20,marginTop:17 }}>Payment Info</Text>
            <View style={{marginLeft:19,marginTop:15}}>
                <View style={{flexDirection:'row'}}>
                    <Text style={{color:'rgba(0, 0, 0, 0.8)',fontSize:14,fontFamily:'Roboto-Medium'}}>{info?.name}</Text>
                    <Text style={{color:'rgba(0, 0, 0, 0.8)',fontSize:12,fontFamily:'Roboto-Regular',marginLeft:'auto',right:15}}>{info?.price} KWD</Text>
                </View>
                <View style={{flexDirection:'row',marginTop:8}}>
                    <Text style={{color:'rgba(0, 0, 0, 0.8)',fontSize:12,fontFamily:'Roboto-Regular'}}>{coupon?.coupon_code}</Text>
                    <Text style={{color:'rgba(0, 104, 117, 1)',fontSize:12,fontFamily:'Roboto-Regular',marginLeft:'auto',right:15}}>- {couponAmount} KWD</Text>
                </View>
                <View style={{flexDirection:'row',marginTop:8}}>
                    <Text style={{color:'rgba(0, 0, 0, 0.8)',fontSize:12,fontFamily:'Roboto-Medium'}}>Total</Text>
                    <Text style={{color:'rgba(0, 104, 117, 1)',fontSize:12,fontFamily:'Roboto-Regular',marginLeft:'auto',right:15}}>{totalAmount} KWD</Text>
                </View>
            </View>
        </View>
    )
}

export default PaymentInfo;