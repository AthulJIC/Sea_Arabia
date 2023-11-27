import {View,Text,Pressable,Image} from 'react-native';
import CustomFlatList from '../components/CustomFlatlist';
import RightarrowIcon from '../assets/icon/RightarrowIcon';

const data=[
    {
        id: 1,
        image: require('../assets/images/BDPic1.png'),
    },
    {
        id: 2,
        image: require('../assets/images/BDPic2.png'),
    },
    {
        id: 3,
        image: require('../assets/images/BDPic3.png'),
    },
    {
        id: 4,
        image: require('../assets/images/BDPic4.png'),
    },
    {
        id: 5,
        image: require('../assets/images/BDPic5.png'),
    },
    {
        id: 6,
        image: require('../assets/images/BDPic6.png'),
    },
    {
        id: 7,
        image: require('../assets/images/BDPic7.png'),
    },
    {
        id: 8,
        image: require('../assets/images/BDPic8.png'),
    },
]


function BestDeals(){
    function renderItem({item}){
        return(
            <View>
                <Pressable style={{marginHorizontal:5,marginBottom:15}}>
                    <Image source={item.image} style={{width:289, height:165}}></Image>
                </Pressable>
                <View style={{backgroundColor:'rgba(245, 245, 245, 1)',height:4,width:'100%'}}></View>
            </View>
        )
    }

    return(
        <View>
            <View style={{flexDirection:'row',padding:15}}>
                <Text style={{color:'rgba(0, 0, 0, 0.8)', fontSize:16, fontFamily:'Roboto-Medium'}}>Best Deals</Text>
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

export default BestDeals;