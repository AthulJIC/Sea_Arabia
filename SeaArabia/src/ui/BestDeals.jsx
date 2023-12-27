import {View,Text,Pressable,Image,ScrollView} from 'react-native';
import CustomFlatList from '../components/CustomFlatlist';
import RightarrowIcon from '../assets/icon/RightarrowIcon';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { CommonApi } from '../Services/common/CommonApi';
import { useCallback, useState } from 'react';

// const data=[
//     {
//         id: 1,
//         image: require('../assets/images/BDPic1.png'),
//     },
//     {
//         id: 2,
//         image: require('../assets/images/BDPic2.png'),
//     },
//     {
//         id: 3,
//         image: require('../assets/images/BDPic3.png'),
//     },
//     {
//         id: 4,
//         image: require('../assets/images/BDPic4.png'),
//     },
//     {
//         id: 5,
//         image: require('../assets/images/BDPic5.png'),
//     },
//     {
//         id: 6,
//         image: require('../assets/images/BDPic6.png'),
//     },
//     {
//         id: 7,
//         image: require('../assets/images/BDPic7.png'),
//     },
//     {
//         id: 8,
//         image: require('../assets/images/BDPic8.png'),
//     },
// ]


function BestDeals({title}){
    const navigation = useNavigation();
    const [bestDeals, setBestDeals] = useState()
    
    useFocusEffect(
        useCallback(() => {
           getBestDeals();
        }, []) 
      );
    

    function getBestDeals(){
        CommonApi.getBestDeals(true).then((res) => {
            console.log('res====', res.data.results.services)
            if(res.status === 200){
                setBestDeals(res.data.results)
            }
        })
    }

    function renderItem({item}){
        const thumbnailUrls = item.services.map(service => service.service_image[0]?.image);
        console.log('item=====', thumbnailUrls);
        return(
            <ScrollView horizontal>
                {thumbnailUrls.map((thumbnailUrl, index) => (
                    <View key={index}>
                        <Pressable style={{ marginHorizontal: 5, marginBottom: 15 }} onPress={() => navigation.navigate('ServiceExpand', { item })}>
                            {/* Check if the thumbnailUrl is a valid string before rendering the Image */}
                            {thumbnailUrl && typeof thumbnailUrl === 'string' && (
                                <Image source={{ uri: thumbnailUrl }} style={{ width: 289, height: 165,borderRadius:16 }} />
                            )}
                        </Pressable>
                        <View style={{ backgroundColor: 'rgba(245, 245, 245, 1)', height: 4, width: '100%' }}></View>
                    </View>
                ))}
            </ScrollView>
        )
    }

    return(
        <View>
            <View style={{flexDirection:'row',padding:15}}>
                <Text style={{color:'rgba(0, 0, 0, 0.8)', fontSize:16, fontFamily:'Roboto-Medium'}}>{title}</Text>
                <Pressable style={{marginLeft:'auto'}}>
                    <RightarrowIcon width={9} height={16}/>
                </Pressable>
            </View>
            <CustomFlatList
            data={bestDeals}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            numColumns={0}></CustomFlatList>
        </View>
    )
}

export default BestDeals;