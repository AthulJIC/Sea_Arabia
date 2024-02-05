import { View, Text, Pressable, Image, ActivityIndicator, Alert } from "react-native";
import CustomFlatList from "../components/CustomFlatlist";
import RightarrowIcon from "../assets/icon/RightarrowIcon";
import LocationIcon from "../assets/icon/LocationIcon";
import GuestIcon from "../assets/icon/GuestIcon";
import BookmarkInactive from "../assets/icon/BookmarkInactive";
import StarActiveIcon from "../assets/icon/StartActiveIcon";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useAppContext } from "../context/AppContext";
import BookMarkActive from "../assets/icon/BookmarkActive";
import { BookMarkLink, BookmarkApi } from "../Services/BookMarkService/BookMarkServices";
import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

function ServicesList({data,title,page}){
    const navigation = useNavigation();
    const {updateItem,updateList, updateTitle,bestDealsItem} = useAppContext();
    const [loading,setLoading]=useState(false)
    const [userName,setUserName]=useState('')
    const [is_BookMarked, setis_BookMarked] = useState(false)
    const [disable, setDisable] = useState(false)
    const [bookmarkedItems, setBookmarkedItems] = useState([]);
    const [ bookmarkId,setBookmarkId]  = useState()
    const [listData, setListData] = useState();
    // console.log('item====',listData);
    function serviceHandler(item) {
        // console.log('item====', item);
        navigation.navigate('ServiceExpand');
        updateItem(item)
        bestDealsItem({})
    }
    function serviceListHandler(){
        navigation.navigate('ServicesListExpand')
        updateList(data)
        updateTitle(title)
    }


    useFocusEffect(
        useCallback(() => {
        const retrieveUserName = async () => {
        try {
            if (data && Array.isArray(data) && data.length > 0) {
                setListData(data);
            }
            const username = await AsyncStorage.getItem('User');
            // Do something with the retrieved username
            let role = username;
            setUserName(role);
        } catch (error) {
            console.error('Error retrieving username from AsyncStorage:', error);
        }
        };

        retrieveUserName();
    }, [data])
    );
    function guestBookmarkHandler(){
        Alert.alert('Please Register to add your bookmarks')
    }
    // const BookMarkhandler=(item)=>{
    //     // console.log("pressed",item)
    //     const data={
    //         service:item.id,
    //     }
    //     if(item.is_bookmarked==false)
    //     {
    //         console.log("pressed",item)
    //         BookmarkApi.addBookmark(data)
    //         .then(response => {
    //             console.log("results BookMark Add", response)
    //         })
    //         .catch(error => {
    //             console.error('Error category list data:', error)
    //         })
    //         .finally(() => {
    //             setLoading(false);
    //         });
    //     }
    // }
    function bookmarkHandler(item) {  
        console.log('item======',item);         
        if (item.is_bookmarked === true) {
            console.log("delete")
            const id = item.id ;
            console.log('bookmarId====', id)
            // setis_BookMarked(true)
            BookmarkApi.deleteBookMark(id).then((res) => {
                if (res.status === 200) {

                    console.log('success')
                    updateItemIsBookmarked(item.id, false);
                   
                }
                // setis_BookMarked(false)
                // console.log('Book Mark Delete Response:', res);
                // setOrdersList(res.data.results)
            }).catch((err) => {
                console.error('err===', err);
            })

        } 
        else {
            console.log('add')
            setis_BookMarked(true)
            setDisable(true)
            setBookmarkedItems([...bookmarkedItems, item.id]);
            updateItemIsBookmarked(item.id, true)
            //console.log(itemId,bookMarkId)
            const data = {
                service: item.id,
            }
            // console.log('data====', data)
            BookmarkApi.addBookMark(data).then((res) => {
                console.log('res====', res.data);
                // if (res.status === 200) {
                //     // console.log('success',)
                //     // setOrdersList(res.data.results)
                   
                // }
                setis_BookMarked(false)
                //setDisable(false)
                //console.log('Received data Book Mark:', res);
                setBookmarkId(res.id)
                // setOrdersList(res.data.results)
            })
        }
    }
    const updateItemIsBookmarked = (itemId, isBookmarked) => {
        // Create a copy of the ordersList array
        const updatedOrdersList = [...listData];
        // Find the index of the item in the array
        const itemIndex = updatedOrdersList.findIndex(item => item.id === itemId);
        // If the item is found, update its is_bookmarked property
        if (itemIndex !== -1) {
            updatedOrdersList[itemIndex].is_bookmarked = isBookmarked;
            // Set the updated ordersList
            setListData(updatedOrdersList);
        }
    };
    function renderItem({ item }) {
        // console.log('List=====', item);
        //  console.log('ServicesList item',item)
        // const firstTwoChars = item.name ? item.name.slice(0, 2) : '';
        const names = item.name?item.name.split(' '):'';
        const firstName =names[0]? names[0].substring(0,1):'';
        const lastName = names[1]? names[1].substring(0,1):'';
        const lowestPriceService = item?.service_price_service ? item?.service_price_service.reduce((lowest, current) => {
            if (current.price < lowest.price) {
              return current;
            }
            return lowest;
          }, item?.service_price_service[0]) : '';

        return (
            <View>

                <Pressable style={{ marginHorizontal: 4, backgroundColor: 'white', elevation: 8, borderRadius: 5, 
                 shadowColor: 'black', shadowOffset: { width: 2, height: 2 }, shadowOpacity: 0.25,
                 shadowRadius: 2, width: 150, height: 209, marginTop: 2 }} onPress={() => serviceHandler(item)}>
                    {/* <Image source={{ uri: item?.service_image[0]?.image }} style={{width:'92%', height:105,alignSelf:'center', borderRadius:5,marginTop:7}} resizeMode='stretch'></Image> */}
                    {item.service_image && item.service_image.length > 0 ? (
                          <Image
                            source={{ uri: item.service_image[0]?.image}}
                            style={{
                                width:'92%', height:105,alignSelf:'center', borderRadius:5,marginTop:7}} resizeMode='stretch'
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
                        <Text style={{ color: 'rgba(102, 102, 102, 1)', fontSize: 12, fontFamily: 'Roboto-Regular' }}> {item.pickup_point_or_location}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginLeft: 7, marginTop: 10 }}>
                        <GuestIcon />
                        <Text style={{ color: 'rgba(0, 104, 117, 1)', fontFamily: 'Roboto-Medium', fontSize: 12, textAlign: 'left', marginBottom: 5, marginLeft: 2 }}>{item.capacity}</Text>
                        <Text style={{ color: 'rgba(121, 121, 128, 1)', fontFamily: 'Roboto-Medium', fontSize: 12, textAlign: 'left', marginBottom: 5, marginLeft: 2 }}>Guests</Text>
                        <View style={{ borderLeftColor: 'rgba(0, 0, 0, 0.8)', borderLeftWidth: 1, height: 13, marginLeft: 3 }}></View>
                        <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontFamily: 'Roboto-Medium', fontSize: 12, textAlign: 'left', marginBottom: 5, marginLeft: 5 }}>2</Text>
                        <Text style={{ color: 'rgba(121, 121, 128, 1)', fontFamily: 'Roboto-Medium', fontSize: 12, textAlign: 'left', marginBottom: 5, marginLeft: 5 }}>Hours</Text>
                    </View>
                    <View style={{flexDirection:'row',marginLeft:25}}>
                        <Text style={{color:'rgba(121, 121, 128, 1)',fontSize:10,fontFamily:'Roboto-Regular'}}>Starts from</Text>
                        <Text style={{color:'rgba(0, 104, 117, 1)', fontFamily:'Roboto-Medium', fontSize:10, textAlign:'left',marginBottom:5,marginLeft:5}}>{ lowestPriceService ? lowestPriceService.price : ''} KWD</Text>
                    </View>
                    
                   
                    {/* <Text style={{color:'rgba(0, 104, 117, 1)', fontFamily:'Roboto-Medium', fontSize:10, textAlign:'left',marginBottom:5,marginLeft:25,marginTop:2}}>70 KWD</Text> */}
                </Pressable>
                <View style={{ flexDirection: 'row', bottom: 195, marginLeft: 20 }}>
                    <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.85)', width: 26, height: 17, borderRadius: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontFamily: 'Roboto-Medium', fontSize: 10, textAlign: 'left', marginLeft: 4, marginTop: 2 }}>4</Text>
                        <StarActiveIcon height={12} width={11} />
                    </View>
                    {
                    userName==='Guest'? (
                        <Pressable onPress={guestBookmarkHandler} style={{marginLeft:'auto',right:25}}>
                        <BookmarkInactive height={19} width={15} color='rgba(255, 255, 255, 2)'/>
                     </Pressable>
                    ):
                    item.is_bookmarked ?
                    <Pressable onPress={()=>bookmarkHandler(item)} style={{marginLeft:'auto',right:25}}>
                    <BookMarkActive/>
                     </Pressable>:
                         <Pressable onPress={()=>bookmarkHandler(item)} style={{marginLeft:'auto',right:25}}>
                         <BookmarkInactive height={19} width={15} color='rgba(255, 255, 255, 2)'/>
                      </Pressable>
                    }
                   
                </View>
            </View>
        )
    }

    return (
        <View>
            <View style={{ flexDirection: 'row', padding: 15 }}>
                <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontSize: 16, fontFamily: 'Roboto-Medium' }}>{title}</Text>
                <Pressable style={{ marginLeft: 'auto' }} onPress={serviceListHandler} >
                    <RightarrowIcon width={9} height={16} />
                </Pressable>
            </View>

            <CustomFlatList
            data={listData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            numColumns={0}></CustomFlatList>
            <View style={{backgroundColor:'rgba(245, 245, 245, 1)',height:4,width:'100%',marginTop:15}}></View>

        </View>
    )
}

export default ServicesList;