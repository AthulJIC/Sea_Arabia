import { View, Text, Pressable, Image, ActivityIndicator } from "react-native";
import CustomFlatList from "../components/CustomFlatlist";
import RightarrowIcon from "../assets/icon/RightarrowIcon";
import LocationIcon from "../assets/icon/LocationIcon";
import GuestIcon from "../assets/icon/GuestIcon";
import BookmarkInactive from "../assets/icon/BookmarkInactive";
import StarActiveIcon from "../assets/icon/StartActiveIcon";
import { useNavigation } from "@react-navigation/native";

function ServicesList({data,title,page}){
    const navigation = useNavigation();
    function serviceHandler(item) {
        console.log('item====', item);
        navigation.navigate('ServiceExpand', { item });
    }

    function renderItem({ item }) {
        console.log('ServicesList item',item)
        // const firstTwoChars = item.name ? item.name.slice(0, 2) : '';
        const names = item.name?item.name.split(' '):'';
        const firstName =names[0]? names[0].substring(0,1):'';
        const lastName = names[1]? names[1].substring(0,1):'';

        return (
            <View style={{ marginHorizontal: 8 }}>

                <Pressable style={{ marginHorizontal: 10, backgroundColor: 'white', elevation: 8, borderRadius: 5, 
                 shadowColor: 'black', shadowOffset: { width: 2, height: 2 }, shadowOpacity: 0.25,
                 shadowRadius: 2, width: 150, height: 209, marginTop: 2 }} onPress={() => serviceHandler(item)}>
                    {/* <Image source={{ uri: item?.service_image[0]?.image }} style={{width:'92%', height:105,alignSelf:'center', borderRadius:5,marginTop:7}} resizeMode='stretch'></Image> */}
                    {item.service_image && item.service_image.find(image => image.is_thumbnail) ? (
                        <Image
                            source={{ uri: item.service_image.find(image => image.is_thumbnail).thumbnail }}
                            style={{ width: '92%', height: 105, alignSelf: 'center', borderRadius: 5, marginTop: 7 }}
                            resizeMode='stretch'
                        />
                    ):
                    (
                        <View
                          style={{
                            width: "92%",
                            height: 105,
                            alignSelf: "center",
                            backgroundColor: "lightgray", // Add a background color for the empty image
                            borderRadius: 5,
                            marginTop: 7,
                          }}
                        >
                            <Text style={{marginTop:30, textAlign: 'center', color: 'rgba(57, 57, 57, 1)', fontSize: 27, fontFamily: 'Roboto-Bold', }}>
                                {firstName} {lastName}</Text>
                        </View>
                      ) }
                    <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontFamily: 'Roboto-Medium', fontSize: 14, textAlign: 'left', marginTop: 6, marginBottom: 5, marginLeft: 10 }}>{item.name}</Text>
                    <View style={{ flexDirection: 'row', marginLeft: 7 }}>
                        <LocationIcon color='rgba(0, 104, 117, 1)' />
                        <Text style={{ color: 'rgba(102, 102, 102, 1)', fontSize: 12, fontFamily: 'Roboto-Regular' }}> {item.pickup_point}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginLeft: 7, marginTop: 10 }}>
                        <GuestIcon />
                        <Text style={{ color: 'rgba(0, 104, 117, 1)', fontFamily: 'Roboto-Medium', fontSize: 12, textAlign: 'left', marginBottom: 5, marginLeft: 2 }}>{item.capacity}</Text>
                        <Text style={{ color: 'rgba(121, 121, 128, 1)', fontFamily: 'Roboto-Medium', fontSize: 12, textAlign: 'left', marginBottom: 5, marginLeft: 2 }}>Guests</Text>
                        <View style={{ borderLeftColor: 'rgba(0, 0, 0, 0.8)', borderLeftWidth: 1, height: 13, marginLeft: 3 }}></View>
                        <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontFamily: 'Roboto-Medium', fontSize: 12, textAlign: 'left', marginBottom: 5, marginLeft: 5 }}>2</Text>
                        <Text style={{ color: 'rgba(121, 121, 128, 1)', fontFamily: 'Roboto-Medium', fontSize: 12, textAlign: 'left', marginBottom: 5, marginLeft: 5 }}>Hours</Text>
                    </View>
                    { page === 'Acitivity' ? (
                        <View style={{flexDirection:'row',marginLeft:25}}>
                            <Text style={{color:'rgba(121, 121, 128, 1)',fontSize:10,fontFamily:'Roboto-Regular'}}>Starts from</Text>
                            <Text style={{color:'rgba(0, 104, 117, 1)', fontFamily:'Roboto-Medium', fontSize:10, textAlign:'left',marginBottom:5,marginLeft:5}}>70 KWD</Text>
                        </View>
                    ) : (
                    <View>
                        {item.service_price && (
                        <Text style={{ color: 'rgba(0, 104, 117, 1)', fontFamily: 'Roboto-Medium', fontSize: 10, textAlign: 'left', marginBottom: 5, marginLeft: 25, marginTop: 2 }}>{item.service_price[0]?.price} KWD</Text>
                    )}
                    </View>
                    )}
                   
                    {/* <Text style={{color:'rgba(0, 104, 117, 1)', fontFamily:'Roboto-Medium', fontSize:10, textAlign:'left',marginBottom:5,marginLeft:25,marginTop:2}}>70 KWD</Text> */}
                </Pressable>
                <View style={{ flexDirection: 'row', bottom: 195, marginLeft: 20 }}>
                    <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.85)', width: 26, height: 17, borderRadius: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontFamily: 'Roboto-Medium', fontSize: 10, textAlign: 'left', marginLeft: 4, marginTop: 2 }}>4</Text>
                        <StarActiveIcon height={12} width={11} />
                    </View>
                    <Pressable style={{marginLeft:'auto',right:7}}>
                       <BookmarkInactive height={19} width={15} color='rgba(255, 255, 255, 2)'/>
                    </Pressable>
                </View>
            </View>
        )
    }

    return (
        <View>
            <View style={{ flexDirection: 'row', padding: 15 }}>
                <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontSize: 16, fontFamily: 'Roboto-Medium' }}>{title}</Text>
                <Pressable style={{ marginLeft: 'auto' }} onPress={() => navigation.navigate('ServicesListExpand', { title: title })} >
                    <RightarrowIcon width={9} height={16} />
                </Pressable>
            </View>

            <CustomFlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}></CustomFlatList>
            <View style={{backgroundColor:'rgba(245, 245, 245, 1)',height:4,width:'100%',marginTop:15}}></View>

        </View>
    )
}

export default ServicesList;