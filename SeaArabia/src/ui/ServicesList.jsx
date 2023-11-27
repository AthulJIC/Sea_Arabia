import { View,Text, Pressable, Image } from "react-native";
import CustomFlatList from "../components/CustomFlatlist";
import RightarrowIcon from "../assets/icon/RightarrowIcon";
import LocationIcon from "../assets/icon/LocationIcon";
import Rating from "./Rating";

function ServicesList({data,title}){
    function renderItem({item}){
        return(
            <View>
                <Pressable style={{marginHorizontal:5,backgroundColor:'white',elevation:8,borderBottomLeftRadius:3, borderBottomRightRadius:3,shadowColor: '#000',shadowOffset:{ width: 0,height: 2 },shadowOpacity: 0.25, shadowRadius: 3,}}>
                    <Image source={item.image} style={{width:115, height:105}}></Image>
                    <Text style={{color:'rgba(0, 0, 0, 0.8)', fontFamily:'Roboto-Medium', fontSize:14, textAlign:'center',marginTop:6,marginBottom:5}}>{item.title}</Text>
                </Pressable>
                <View style={{marginBottom:15}}>
                    <View style={{flexDirection:'row',marginTop:5,marginLeft:5}}>
                        <LocationIcon/>
                        <Text style={{color:'rgba(25, 28, 29, 1)', fontSize:13, fontFamily:'Roboto-Regular'}}> Location name</Text>
                    </View>
                    <Rating/>
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