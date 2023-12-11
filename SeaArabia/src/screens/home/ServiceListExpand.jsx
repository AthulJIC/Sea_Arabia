import { View,Text, SafeAreaView, ScrollView, Image, Platform, Pressable } from "react-native"
import Styles from "../../public/Styles";
import BackIcon from "../../assets/icon/BackIcon";
import SortIcon from "../../assets/icon/SortIcon";
import FilterIcon from "../../assets/icon/FilterIcon";
import RightarrowIcon from "../../assets/icon/RightarrowIcon";
import BestDeals from "../../ui/BestDeals";
import ServiceVerticalList from "../../ui/ServiceVerticalList";
import CouponCode from "../../ui/CouponCode";


function ServicesListExpand({route, navigation}){
    const title = route?.params.title;
    return(
        <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
            <View style={{flexDirection:'row'}}>
                <Pressable style={[Styles.backIcon,{marginTop:15,}]} onPress={() => navigation.navigate('Home')}>
                    <BackIcon color='#1B1E28'></BackIcon>
                </Pressable>
                <Text style={{marginTop:30,marginLeft:15, fontSize:14, color:'rgba(25, 28, 29, 0.8)', fontFamily:'Roboto-Medium'}}>{title}</Text>
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
                <CouponCode/>
                <BestDeals title='Offers'/>
                <ServiceVerticalList title='See all Explore more'/>
            </ScrollView>
        </SafeAreaView>
    )
}
export default ServicesListExpand;