import { View,Text, SafeAreaView, Image, ScrollView,StyleSheet ,Pressable, Platform} from "react-native";
import LocationIcon from "../../assets/icon/LocationIcon";
import Rating from "../../ui/Rating";
import GuestIcon from "../../assets/icon/GuestIcon";
import BackIcon from "../../assets/icon/BackIcon";
import Styles from "../../public/Styles";
import ShareIcon from "../../assets/icon/ShareIcon";
import DestinationSelection from "../../ui/DestinationSelection";
import CalendarPicker from "../../ui/CalendarPicker";
import TimeScheduleScreen from "../../ui/TimeSchedule";
import AdditionalHours from "../../ui/AdditionalHours";


function ServiceDateScreen({route,navigation}){
    const item = route?.params.item;
    console.log('item======', item);
    return(
        <SafeAreaView style={{flex:1,backgroundColor:'white'}}>  
            <ScrollView style={{marginBottom:20}}>
                <Image source={item?.image} style={{height:250, width:'auto'}} resizeMode='stretch'></Image>
                <Text style={{color:'rgba(0, 104, 117, 1)',fontSize:16,fontFamily:'Roboto-Medium', marginTop:15,marginLeft:20}}>{item?.title}</Text>
                <View style={{flexDirection:'row',marginLeft:18,marginTop:10}}>
                    <LocationIcon color='rgba(0, 0, 0, 0.8)'/>
                    <Text style={{color:'rgba(102, 102, 102, 1)', fontSize:12, fontFamily:'Roboto-Regular'}}> Location name</Text>
                </View>
                <View style={{flexDirection:'row',marginBottom:15}}>
                    <Rating/>
                    <Text style={{color:'rgba(25, 28, 29, 0.8)', fontSize:11,fontFamily:'Roboto-Regular',marginLeft:'auto',bottom:27,textAlign:'right',left:55}}>Capacity</Text>
                    <View style={{right:20,flexDirection:'row'}}>
                        <GuestIcon/>
                        <Text style={{color:'rgba(0, 0, 0, 1)', fontSize:14,fontFamily:'Roboto-Regular',bottom:2,left:2}}>12 People</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: 'rgba(245, 245, 245, 1)', height: 4, width: '100%' }}></View>
                <View style={{ padding: 15}}>
                    <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontSize: 16, fontFamily: 'Roboto-Medium' }}>Select Destination</Text>
                    <DestinationSelection/>
                </View>
                <View style={{ padding: 15}}>
                    <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontSize: 16, fontFamily: 'Roboto-Medium' }}>Select Date</Text>
                    <CalendarPicker/>
                </View>
                <View style={{ padding: 15 }}>
                    <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontSize: 16, fontFamily: 'Roboto-Medium' }}>Select Time Schedule</Text>
                    <TimeScheduleScreen/>
                </View>
                <View style={{ padding: 15,marginBottom:50 }}>
                    <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontSize: 16, fontFamily: 'Roboto-Medium' }}>Additional hours</Text>
                    <AdditionalHours/>
                </View>
            </ScrollView>
            <View style={styles.overlay}>
                <View style={{flexDirection:'row',marginTop:Platform.OS === 'ios' ? 30 : 10}}>
                    <Pressable style={[Styles.backIcon,{width:'10%',height:37}]} onPress={() => navigation.navigate('Home')}>
                        <BackIcon color='#1B1E28'></BackIcon>
                    </Pressable>
                    <Pressable style={{marginLeft:'auto',right:20}}>
                        <ShareIcon/>
                    </Pressable>
                </View>
            </View>
            <View style={{position: 'absolute', bottom: 0,left: 0,right: 0,backgroundColor: 'rgba(255, 255, 255, 1)',paddingBottom: Platform.OS === 'ios' ? 15 : 30,justifyContent:'center', alignItems:'center'}}>
                <View style={{flexDirection:'row',marginTop:Platform.OS === 'ios' ? 30 : 10,height:30}}>
                    <Pressable style={{backgroundColor:'rgba(0, 104, 117, 1)', width:'90%', height:40, borderRadius:3,alignItems:'center',justifyContent:'center'}}>
                        <Text style={{color:'rgba(255, 255, 255, 1)', fontSize:14,fontFamily:'Roboto-Bold'}}>Proceed To Pay 50 KWD</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ServiceDateScreen;

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