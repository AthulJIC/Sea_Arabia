import { View,Text } from "react-native";

function PaymentInfo(){
    return(
        <View style={{marginBottom:89}}>
            <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontSize: 16, fontFamily: 'Roboto-Medium',marginLeft:20,marginTop:17 }}>Payment Info</Text>
            <View style={{marginLeft:19,marginTop:15}}>
                <View style={{flexDirection:'row'}}>
                    <Text style={{color:'rgba(0, 0, 0, 0.8)',fontSize:12,fontFamily:'Roboto-Regular'}}>[ Machine Name ]</Text>
                    <Text style={{color:'rgba(0, 0, 0, 0.8)',fontSize:12,fontFamily:'Roboto-Regular',marginLeft:'auto',right:15}}>225 KWD</Text>
                </View>
                <View style={{flexDirection:'row',marginTop:8}}>
                    <Text style={{color:'rgba(0, 0, 0, 0.8)',fontSize:12,fontFamily:'Roboto-Regular'}}>[ Coupon Code ]</Text>
                    <Text style={{color:'rgba(0, 104, 117, 1)',fontSize:12,fontFamily:'Roboto-Regular',marginLeft:'auto',right:15}}>-25 KWD</Text>
                </View>
                <View style={{flexDirection:'row',marginTop:8}}>
                    <Text style={{color:'rgba(0, 0, 0, 0.8)',fontSize:12,fontFamily:'Roboto-Medium'}}>Total</Text>
                    <Text style={{color:'rgba(0, 104, 117, 1)',fontSize:12,fontFamily:'Roboto-Regular',marginLeft:'auto',right:15}}>200 KWD</Text>
                </View>
            </View>
        </View>
    )
}

export default PaymentInfo;