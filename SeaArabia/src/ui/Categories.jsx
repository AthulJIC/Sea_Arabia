import { View,Text, Pressable, Image } from "react-native";
import CustomFlatList from "../components/CustomFlatlist";

const data=[
    {
        id: 1,
        image: require('../assets/images/Boat.png'),
        title : 'Boat'
    },
    {
        id: 2,
        image: require('../assets/images/Yacht.png'),
        title : 'Yacht'
    },
    {
        id: 3,
        image: require('../assets/images/JetSki.png'),
        title : 'Jet Ski'
    },
    {
        id: 4,
        image: require('../assets/images/HeliTour.png'),
        title : 'Heli Tour'
    },
    {
        id: 5,
        image: require('../assets/images/Paragliding.png'),
        title : 'Paragliding'
    },
    {
        id: 6,
        image: require('../assets/images/Hotairballoon.png'),
        title : 'Hot air balloon'
    },
    {
        id: 7,
        image: require('../assets/images/Parasailing.png'),
        title : 'Parasailing'
    },
    {
        id: 8,
        image: require('../assets/images/DuneBuggy.png'),
        title : 'Dune Buggy'
    },
    {
        id: 9,
        image: require('../assets/images/Events.png'),
        title : 'Events'
    },
    {
        id: 10,
        image: require('../assets/images/DesertSafari.png'),
        title : 'Desert Safari'
    },
    {
        id: 11,
        image: require('../assets/images/DesertQuadbiking.png'),
        title : 'Desert Quad biking'
    }
]


function Categories(){
    function renderItem({item}){
        return(
            <View>
                <Pressable style={{marginHorizontal:5}}>
                    <Image source={item.image} style={{width:115, height:105}}></Image>
                </Pressable>
                <Text style={{color:'rgba(0, 0, 0, 0.8)', fontFamily:'Roboto-Medium', fontSize:14, textAlign:'center',marginTop:10,marginBottom:15}}>{item.title}</Text>
                <View style={{backgroundColor:'rgba(245, 245, 245, 1)',height:4,width:'100%'}}></View>
            </View>
        )
    }

    return(
        <View>
            <View style={{flexDirection:'row',padding:15}}>
                <Text style={{color:'rgba(0, 0, 0, 0.8)', fontSize:16, fontFamily:'Roboto-Medium'}}>Categories</Text>
                <Pressable style={{marginLeft:'auto'}}>
                    <Image source={require('../assets/images/Filter.png')} style={{height:28,width:32}}></Image>
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

export default Categories;