import { View,Text, Pressable, Image } from "react-native";
import CustomFlatList from "../components/CustomFlatlist";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { CommonApi } from "../Services/common/CommonApi";
import { useCallback, useState } from "react";
import { useAppContext } from "../context/AppContext";

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
    const navigation = useNavigation();
    const [combopackages, setComboPackages] = useState();
    const {updateItem} = useAppContext();
    
    useFocusEffect(
        useCallback(() => {
           getComboPackages();
        }, []) 
      );
    

    function getComboPackages(){
        CommonApi.getComboPackages().then((res) => {
            // console.log('res====', res.data)
            if(res.status === 200){
                setComboPackages(res.data.results)
            }
        })
    }
    function serviceHandler(item){
        console.log('itemData===', item);
         navigation.navigate('ComboPackagesExpand')
         updateItem(item)
    }
    function renderItem({item}){
        // console.log('item-====', item?.);
        return(
            <View>
                <Pressable style={{marginHorizontal:5}} onPress={() => serviceHandler(item)}>
                    <Image source={{uri: item.image }} style={{width:286, height:165,borderRadius:16}}></Image>
                </Pressable>
                <View style={{marginLeft:15,height:90}}>
                    {/* <Text>{item.id}</Text> */}
                    <Text style={{color:'rgba(0, 0, 0, 0.8)', fontFamily:'Roboto-Regular', fontSize:10, textAlign:'left',marginTop:7,width:286}}>{item?.short_description}</Text>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{color:'rgba(0, 0, 0, 0.8)', fontFamily:'Roboto-Medium', fontSize:12, textAlign:'left',marginTop:5}}>{item?.name}</Text>
                        {/* <Text style={{color:'rgba(255, 153, 0, 1)', fontFamily:'Roboto-Medium', fontSize:12, textAlign:'left',marginTop:5}}> 5 Days & 4 Nights</Text> */}
                    </View>
                    <Text style={{color:'rgba(0, 104, 117, 1)', fontFamily:'Roboto-Medium', fontSize:10, textAlign:'left',marginTop:5,marginBottom:15}}>{item?.price} KWD /-</Text>
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
            data={combopackages}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            numColumns={0}></CustomFlatList>
        </View>
    )
}

export default ComboPackages;