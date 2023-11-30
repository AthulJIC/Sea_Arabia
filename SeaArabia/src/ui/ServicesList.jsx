import { View,Text, Pressable, Image } from "react-native";
import CustomFlatList from "../components/CustomFlatlist";
import RightarrowIcon from "../assets/icon/RightarrowIcon";
import LocationIcon from "../assets/icon/LocationIcon";
import GuestIcon from "../assets/icon/GuestIcon";
import BookmarkInactive from "../assets/icon/BookmarkInactive";
import StarActiveIcon from "../assets/icon/StartActiveIcon";
import { useNavigation } from "@react-navigation/native";

function ServicesList({data,title}){
    const navigation = useNavigation();
    function serviceHandler(item){
        console.log('item====', item);
        navigation.navigate('ServiceExpand', {item});
    }
    function renderItem({item}){
        return(
            <View style={{marginHorizontal:5}}>
                
                <Pressable style={{marginHorizontal:10,backgroundColor:'white',elevation:8,borderRadius:5,shadowColor: 'black',shadowOffset:{ width: 0,height: 2 },shadowOpacity: 0.25, shadowRadius: 3,width:'100%',height:209,marginTop:2}} onPress={() => serviceHandler(item)}>
                    <Image source={item.image} style={{width:'92%', height:105,alignSelf:'center', borderRadius:5,marginTop:7}} resizeMode='stretch'></Image>
                    <Text style={{color:'rgba(0, 0, 0, 0.8)', fontFamily:'Roboto-Medium', fontSize:14, textAlign:'left',marginTop:6,marginBottom:5,marginLeft:10}}>{item.title}</Text>
                    <View style={{flexDirection:'row',marginLeft:7}}>
                        <LocationIcon color='rgba(0, 104, 117, 1)'/>
                        <Text style={{color:'rgba(102, 102, 102, 1)', fontSize:12, fontFamily:'Roboto-Regular'}}> Location name</Text>
                    </View>
                    <View style={{flexDirection:'row',marginLeft:7,marginTop:10}}>
                        <GuestIcon/>
                        <Text style={{color:'rgba(0, 104, 117, 1)', fontFamily:'Roboto-Medium', fontSize:12, textAlign:'left',marginBottom:5,marginLeft:2}}>16</Text>
                        <Text style={{color:'rgba(121, 121, 128, 1)', fontFamily:'Roboto-Medium', fontSize:12, textAlign:'left',marginBottom:5,marginLeft:2}}>Guests</Text>
                        <View style={{borderLeftColor:'rgba(0, 0, 0, 0.8)', borderLeftWidth:1, height:13,marginLeft:3}}></View>
                        <Text style={{color:'rgba(0, 0, 0, 0.8)', fontFamily:'Roboto-Medium', fontSize:12, textAlign:'left',marginBottom:5,marginLeft:5}}>2</Text>
                        <Text style={{color:'rgba(121, 121, 128, 1)', fontFamily:'Roboto-Medium', fontSize:12, textAlign:'left',marginBottom:5,marginLeft:5}}>Hours</Text>
                    </View>
                    <Text style={{color:'rgba(0, 104, 117, 1)', fontFamily:'Roboto-Medium', fontSize:10, textAlign:'left',marginBottom:5,marginLeft:25,marginTop:2}}>70 KWD</Text>
                </Pressable>
                <View style={{flexDirection:'row', bottom:195,marginLeft:20}}>
                    <View style={{backgroundColor:'rgba(255, 255, 255, 0.85)',width:26,height:17,borderRadius:5,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                       <Text style={{color:'rgba(0, 0, 0, 0.8)', fontFamily:'Roboto-Medium', fontSize:10, textAlign:'left',marginLeft:4,marginTop:2}}>4</Text>
                       <StarActiveIcon height={12} width={11}/>
                    </View>
                    <Pressable style={{marginLeft:'auto',right:7}}>
                       <BookmarkInactive height={19} width={15} color='rgba(255, 255, 255, 2))'/>
                    </Pressable>
                </View>
                <View style={{marginBottom:15}}>
                </View>
                <View style={{backgroundColor:'rgba(245, 245, 245, 1)',height:4,width:'100%'}}></View>
            </View>
        )
    }

    return(
        <View>
            <View style={{flexDirection:'row',padding:15}}>
                <Text style={{color:'rgba(0, 0, 0, 0.8)', fontSize:16, fontFamily:'Roboto-Medium'}}>{title}</Text>
                <Pressable style={{marginLeft:'auto'}}>
                    <RightarrowIcon/>
                </Pressable>
            </View>
            <CustomFlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}></CustomFlatList>
        </View>
    )
}

export default ServicesList;