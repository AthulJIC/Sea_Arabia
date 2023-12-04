import { View,Text, SafeAreaView, ScrollView, Image, Platform, Pressable } from "react-native"
import Styles from "../public/Styles";
import BackIcon from "../assets/icon/BackIcon";
import SortIcon from "../assets/icon/SortIcon";
import FilterIcon from "../assets/icon/FilterIcon";
import RightarrowIcon from "../assets/icon/RightarrowIcon";
import BestDeals from "./BestDeals";
import ServiceVerticalList from "./ServiceVerticalList";


function ServicesListExpand({route, navigation}){
    const title = route?.params.title;
    return(
        <View style={{flex:1, backgroundColor:'white'}}>
            <View style={{flexDirection:'row'}}>
                <Pressable style={[Styles.backIcon]} onPress={() => navigation.navigate('Home')}>
                    <BackIcon color='#1B1E28'></BackIcon>
                </Pressable>
                <Text style={{marginTop:35,marginLeft:15, fontSize:14, color:'rgba(25, 28, 29, 0.8)', fontFamily:'Roboto-Medium'}}>{title}</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-evenly',marginTop:15}}>
                <View style={{left:20 ,marginTop:Platform.OS === 'ios' ? 2 : 4}}>
                    <SortIcon/>
                </View>
                <Text style={{color:'rgba(25, 28, 29, 0.8)', fontSize:14, fontFamily:'Roboto-Medium',right:20}}>Sort</Text>
                <View style={{ borderLeftColor: 'rgba(0, 0, 0, 0.8)', borderLeftWidth: 0.7, height: 25, alignSelf: 'center' }}></View>
                <View style={{top:5,left:15}}>
                    <FilterIcon/>
                </View>
                <Text style={{color:'rgba(25, 28, 29, 0.8)', fontSize:14, fontFamily:'Roboto-Medium',right:20}}>Filter</Text>
            </View>
            <View style={{ borderBottomColor: 'rgba(0, 0, 0, 0.8)', borderBottomWidth: 0.7, width:'100%', alignSelf: 'center',marginTop:7 }}></View>
            <ScrollView>
                <View style={{width:'93%',height:60,backgroundColor:'rgba(215, 226, 255, 0.9)',alignSelf:'center', borderRadius:16, marginTop:15,alignItems:'center',flexDirection:'row',justifyContent:'space-evenly',marginBottom:15}}>
                    <Image source={require('../assets/images/BoatTS.png')} resizeMode='cover' style={{width:45,height:45,borderRadius:10}}></Image>
                    <View>
                        <Text style={{color:'rgba(0, 0, 0, 0.8)', fontSize:16, fontFamily:'Roboto-Medium'}}>Get FREE* Hourly Stays</Text>
                        <Text style={{color:'rgba(0, 0, 0, 0.8)', fontSize:15, fontFamily:'Roboto-Medium'}}>12-1 PM | Use Code: GOTREATS</Text>
                    </View>
                    <View style={{backgroundColor:'white',width:25,height:25,alignItems:'center',justifyContent:'center',borderRadius:15}}>
                        <RightarrowIcon width={9} height={10}/>
                    </View>
                </View>
                <View style={{ backgroundColor: 'rgba(245, 245, 245, 1)', height: 4, width: '100%' }}></View>
                <BestDeals title='Offers'/>
                <ServiceVerticalList title='See all Explore more'/>
            </ScrollView>
        </View>
    )
}
export default ServicesListExpand;