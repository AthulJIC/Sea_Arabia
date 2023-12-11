import { View,Text, SafeAreaView, Image, ScrollView,StyleSheet ,Pressable, Platform} from "react-native";
import LocationIcon from "../../assets/icon/LocationIcon";
import Rating from "../../ui/Rating";
import GuestIcon from "../../assets/icon/GuestIcon";
import BackIcon from "../../assets/icon/BackIcon";
import Styles from "../../public/Styles";
import ShareIcon from "../../assets/icon/ShareIcon";
import AmenitiesList from "../../ui/AmenitiesList";
import ReadMore from "../../ui/ReadMore";

const amenitiesList = [
    {
        id : 1,
        image: require('../../assets/images/Bedrooms.png'),
        name: 'Bedrooms'
    },
    {
        id : 2,
        image: require('../../assets/images/AC.png'),
        name: 'AC'
    },
    {
        id : 3,
        image: require('../../assets/images/Icebox.png'),
        name: 'Icebox'
    },
    {
        id : 4,
        image: require('../../assets/images/Bbq.png'),
        name: 'BBQ'
    },
    {
        id : 5,
        image: require('../../assets/images/BeachChair.png'),
        name: 'Beach Chair'
    },
    {
        id : 6,
        image: require('../../assets/images/CoffeeMachine.png'),
        name: 'Coffee Machine'
    },
    {
        id : 7,
        image: require('../../assets/images/Coffeeshop.png'),
        name: 'Coffeeshop'
    },
    {
        id : 8,
        image: require('../../assets/images/FishingTool.png'),
        name: 'Fishing Tool'
    },
    {
        id : 9,
        image: require('../../assets/images/Fridge.png'),
        name: 'Fridge'
    },
    {
        id : 10,
        image: require('../../assets/images/Guide.png'),
        name: 'Guide'
    },
]

const detailsText = "A brand-new 112m yacht, Spectre is a temple of leisure, a sanctum of tranquillity, conceived to delight an unprecedented 36 guests on a hither-to unknown scale.  From her vast beach club, open on three sides for that life-affirming connection to the ocean, to her matchless spa, an entire deck devoted to fitness, wellness and pampering, this is a yacht that elevates the already extraordinary. Whether you land by air on the foredeck helipad or by sea in a fleet of custom tenders, you’ll know you’ve arrived. Her guest accommodation is uniquely flexible, including doubles, twins and cabins that convert into suites, welcoming parties of all kinds with consummate ease. An elevator serving all decks makes her the perfect choice – indeed the only choice – for large, multi-generational groups. "


function ServiceExpandScreen({route,navigation}){
    let item;
    if( route?.params.item !== undefined){
        item = route?.params.item;
    }
    console.log('item======', item);

    function proceedHandler(){
        navigation.navigate('ServiceDate',{item})
    }

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
                <View style={{ padding: 15 }}>
                    <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontSize: 16, fontFamily: 'Roboto-Medium' }}>Amenities</Text>
                    {/* <Pressable style={{ marginLeft: 'auto' }}>
                        <Image source={require('../assets/images/Filter.png')} style={{ height: 28, width: 32 }}></Image>
                    </Pressable> */}
                    <AmenitiesList data={amenitiesList}/>
                </View>
                <View style={{ backgroundColor: 'rgba(245, 245, 245, 1)', height: 4, width: '100%' }}></View>
                <View style={{ padding: 15 }}>
                    <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontSize: 16, fontFamily: 'Roboto-Medium' }}>Details</Text>
                    <ReadMore text={detailsText}/>
                </View>
                <View style={{ backgroundColor: 'rgba(245, 245, 245, 1)', height: 4, width: '100%' }}></View>
                <View style={{ padding: 15 }}>
                    <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontSize: 16, fontFamily: 'Roboto-Medium' }}>Cancellation Policy</Text>
                    <Text style={{color:'rgba(0, 0, 0, 0.8)', fontSize:12, fontFamily:'Roboto-Regular',marginTop:10}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard</Text>
                </View>
                <View style={{ padding: 15 }}>
                    <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontSize: 16, fontFamily: 'Roboto-Medium' }}>Refund</Text>
                    <Text style={{color:'rgba(0, 0, 0, 0.8)', fontSize:12, fontFamily:'Roboto-Regular',marginTop:10}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</Text>
                </View>
                <View style={{ backgroundColor: 'rgba(245, 245, 245, 1)', height: 4, width: '100%' }}></View>
                <View style={{ padding: 15,marginBottom:20 }}>
                    <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontSize: 16, fontFamily: 'Roboto-Medium' }}>Location</Text>
                    {/* <Text style={{color:'rgba(0, 0, 0, 0.8)', fontSize:12, fontFamily:'Roboto-Regular',marginTop:10}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</Text> */}
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
                    <Pressable style={{backgroundColor:'rgba(0, 104, 117, 1)', width:'90%', height:40, borderRadius:3,alignItems:'center',justifyContent:'center'}} onPress={proceedHandler}>
                        <Text style={{color:'rgba(255, 255, 255, 1)', fontSize:14,fontFamily:'Roboto-Bold'}}>Proceed</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ServiceExpandScreen;

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