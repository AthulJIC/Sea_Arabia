import { View,Text, SafeAreaView, ScrollView ,Pressable,Platform} from "react-native"
import BackIcon from "../../assets/icon/BackIcon";
import Styles from "../../public/Styles";
import BookingDetails from "../../ui/BookingDetails";
import AddCoupon from "../../ui/AddCoupon";
import PaymentInfo from "../../ui/PaymentInfo";
import { useNavigation } from "@react-navigation/native";
import useBackButtonHandler from "../../components/BackHandlerUtils";

function BookingDetailsScreen(){
    const navigation = useNavigation();
    useBackButtonHandler(navigation, false);
    return(
        <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
            <ScrollView>
               <View style={{backgroundColor:'rgba(0, 104, 117, 1)', height:176, width:'100%'}}>
                <Pressable style={[Styles.backIcon,{marginTop:12,}]} onPress={() => navigation.goBack()}>
                        <BackIcon color='#1B1E28'></BackIcon>
                </Pressable>
                 <View style={{margin:20}}>
                    <Text style={{color:'rgba(255, 255, 255, 1)', fontSize:16, fontFamily:'Roboto-Regular'}}>[ Service Name ]</Text>
                    <View style={{flexDirection:'row',marginTop:8}}>
                        <Text style={{color:'rgba(255, 255, 255, 1)', fontSize:16, fontFamily:'Roboto-Regular'}}>[ Vendor Name ]</Text>
                        <Text style={{color:'rgba(255, 255, 255, 1)', fontSize:16, fontFamily:'Roboto-Regular'}}>[ Location / Pickup]</Text>
                    </View>
                    <View style={{flexDirection:'row',marginTop:8}}>
                        <Text style={{color:'rgba(255, 255, 255, 1)', fontSize:16, fontFamily:'Roboto-Regular'}}>09 Feb</Text>
                        <View style={{ borderLeftColor: 'rgba(255, 255, 255, 1)', borderLeftWidth: 0.9, height: 15, alignSelf: 'center',marginLeft:5 }}></View>
                        <Text style={{color:'rgba(255, 255, 255, 1)', fontSize:16, fontFamily:'Roboto-Regular',marginLeft:5}}>7:00 AM - 10:00 AM</Text>
                    </View>
                 </View>
               </View>
               <BookingDetails/>
               <AddCoupon/>
               <PaymentInfo/>
            </ScrollView>
            <View style={{position: 'absolute', bottom: 0,left: 0,right: 0,backgroundColor: 'rgba(255, 255, 255, 1)',paddingBottom: Platform.OS === 'ios' ? 15 : 30,justifyContent:'center', alignItems:'center'}}>
                <View style={{flexDirection:'row',marginTop:Platform.OS === 'ios' ? 30 : 10,height:30}}>
                    <Pressable style={{backgroundColor:'rgba(0, 104, 117, 1)', width:'90%', height:40, borderRadius:3,alignItems:'center',justifyContent:'center'}} onPress={() => navigation.navigate('PaymentSuccess')}>
                        <Text style={{color:'rgba(255, 255, 255, 1)', fontSize:14,fontFamily:'Roboto-Bold'}}>Pay 50 KWD</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default BookingDetailsScreen;