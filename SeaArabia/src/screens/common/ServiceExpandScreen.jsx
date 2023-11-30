import { View,Text, SafeAreaView, Image } from "react-native";
import LocationIcon from "../../assets/icon/LocationIcon";
import Rating from "../../ui/Rating";
import GuestIcon from "../../assets/icon/GuestIcon";

function ServiceExpandScreen({route}){
    const item = route?.params.item;
    console.log('item======', item);
    return(
        <SafeAreaView>
            <View>
                <Image source={item?.image} style={{height:250, width:'100%'}}></Image>
                <Text style={{color:'rgba(0, 104, 117, 1)',fontSize:16,fontFamily:'Roboto-Medium', marginTop:15,marginLeft:10}}>{item?.title}</Text>
                <View style={{flexDirection:'row',marginLeft:7,marginTop:10}}>
                    <LocationIcon color='rgba(0, 0, 0, 0.8)'/>
                    <Text style={{color:'rgba(102, 102, 102, 1)', fontSize:12, fontFamily:'Roboto-Regular'}}> Location name</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Rating/>
                    <Text style={{color:'rgba(25, 28, 29, 0.8)', fontSize:11,fontFamily:'Roboto-Regular',marginLeft:'auto',bottom:17,left:40}}>Capacity</Text>
                    <View style={{right:20,marginTop:10,flexDirection:'row'}}>
                        <GuestIcon/>
                        <Text style={{color:'rgba(0, 0, 0, 1)', fontSize:14,fontFamily:'Roboto-Regular',bottom:2,left:2}}>12 People</Text>
                    </View>
                </View>
                
            </View>
        </SafeAreaView>
    )
}

export default ServiceExpandScreen;