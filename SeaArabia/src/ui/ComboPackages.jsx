import { View,Text, Pressable, Image } from "react-native";
import CustomFlatList from "../components/CustomFlatlist";

const data=[
    {
        id: 1,
        image: require('../assets/images/ComboPackagePic1.png'),
    },
    {
        id: 2,
        image: require('../assets/images/ComboPackagePic2.png'),
    },
]


function ComboPackages(){
    function renderItem({item}){
        return(
            <View>
                <Pressable style={{marginHorizontal:5}}>
                    <Image source={item.image} style={{width:286, height:165}}></Image>
                </Pressable>
                <View style={{marginLeft:15}}>
                    <Text style={{color:'rgba(0, 0, 0, 0.8)', fontFamily:'Roboto-Regular', fontSize:10, textAlign:'left',marginTop:7}}>Travel far enough, you meet yourself.</Text>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{color:'rgba(0, 0, 0, 0.8)', fontFamily:'Roboto-Medium', fontSize:12, textAlign:'left',marginTop:5}}>Al Shaab Sea Club</Text>
                        <Text style={{color:'rgba(255, 153, 0, 1)', fontFamily:'Roboto-Medium', fontSize:12, textAlign:'left',marginTop:5}}> 5 Days & 4 Nights</Text>
                    </View>
                    <Text style={{color:'rgba(0, 104, 117, 1)', fontFamily:'Roboto-Medium', fontSize:10, textAlign:'left',marginTop:5,marginBottom:15}}>450 KWD /-</Text>
                </View>
                <View style={{backgroundColor:'rgba(245, 245, 245, 1)',height:4,width:'100%'}}></View>
            </View>
        )
    }

    return(
        <View>
            <View style={{flexDirection:'row',padding:15}}>
                <Text style={{color:'rgba(0, 0, 0, 0.8)', fontSize:16, fontFamily:'Roboto-Medium'}}>Combo Packages</Text>
            </View>
            <CustomFlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}></CustomFlatList>
        </View>
    )
}

export default ComboPackages;