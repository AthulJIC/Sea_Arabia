import { View,Text, Pressable, Image } from "react-native"
import CustomFlatList from "../components/CustomFlatlist"
import LocationIcon from "../assets/icon/LocationIcon"
import Rating from "./Rating"
import BookmarkInactive from "../assets/icon/BookmarkInactive"


const data = [
    {
        id : 1,
        image : require('../assets/images/JetSki.png'),
        title : 'JetSki',

    },
    {
        id : 2,
        image : require('../assets/images/JetSki.png'),
        title : 'JetSki',
        
    },
    {
        id : 3,
        image : require('../assets/images/JetSki.png'),
        title : 'JetSki',
        
    },
    {
        id : 4,
        image : require('../assets/images/JetSki.png'),
        title : 'JetSki',
        
    },
    {
        id : 5,
        image : require('../assets/images/JetSki.png'),
        title : 'JetSki',
        
    },

]

function ServiceVerticalList({title}){
    function renderItem({item}){
        return(
            <Pressable style={{width:'95%', height:177,alignSelf:'center',elevation:8,backgroundColor:'white',shadowColor: '#000',shadowOffset:{ width: 0,height: 2 },shadowOpacity: 0.25, shadowRadius: 3,marginTop:5,borderRadius:16, flexDirection:'row',marginBottom:15}}>
                <Image source={item.image} style={{width:136, height:134, borderRadius:5, alignSelf:'center',marginLeft:20}}></Image>
                <View style={{marginTop:20, width:'55%'}}>
                    <View style={{flexDirection:'row',marginLeft:15,}}>
                        <Text style={{color:'rgba(25, 28, 29, 0.8)', fontSize:15, fontFamily:'Roboto-Medium'}}>{item.title}</Text>
                        <View style={{marginLeft:'auto',right:15}}>
                            <BookmarkInactive color='rgba(25, 28, 29, 0.8)' width={15} height={17}/>
                        </View>
                    </View>
                    <View style={{flexDirection:'row',marginLeft:15,marginTop:10}}>
                        <LocationIcon color='rgba(25, 28, 29, 1)'/>
                        <Text style={{color:'rgba(102, 102, 102, 1)', fontSize:12, fontFamily:'Roboto-Regular'}}> Location name</Text>
                    </View>
                    <View style={{right:5}}>
                        <Rating/>
                    </View>
                    <View style={{flexDirection:'row',marginTop:5,left:15}}>
                        <Text style={{color:'rgba(0, 104, 117, 1)', fontFamily:'Roboto-Medium', fontSize:12, textAlign:'left',marginBottom:5}}>70 KWD</Text>
                        <Text style={{color:'rgba(102, 102, 102, 1)', fontSize:12, fontFamily:'Roboto-Regular'}}> / 12 People</Text>
                    </View>
                    <Pressable style={{height:35,backgroundColor:'rgba(0, 104, 117, 1)',width:111,alignItems:'center',justifyContent:'center',left:15,marginTop:10,borderRadius:5}}>
                        <Text style={{fontSize:12, color:'white', fontFamily:'Roboto-Regular'}}>Confirm Booking</Text>
                    </Pressable>
                </View>
            </Pressable>
        )
    }
    return(
        <View>
            <View style={{padding:15}}>
                <Text style={{color:'rgba(0, 0, 0, 0.8)', fontSize:16, fontFamily:'Roboto-Medium'}}>{title}</Text>
            </View>
            <CustomFlatList
             data={data}
             horizontal={false}
             renderItem={renderItem}
             keyExtractor={(item) => item.id.toString()}
             numColumns={0}/>
        </View>
    )
}

export default ServiceVerticalList