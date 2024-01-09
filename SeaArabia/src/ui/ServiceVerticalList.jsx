import { View,Text, Pressable, Image, Alert } from "react-native"
import CustomFlatList from "../components/CustomFlatlist"
import LocationIcon from "../assets/icon/LocationIcon"
import Rating from "./Rating"
import BookmarkInactive from "../assets/icon/BookmarkInactive"
import { useAppContext } from "../context/AppContext"
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native"
import BookMarkActive from "../assets/icon/BookmarkActive"
import { useCallback, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { BookmarkApi } from "../Services/BookMarkService/BookMarkServices"



// const data = [
//     {
//         id : 1,
//         image : require('../assets/images/JetSki.png'),
//         title : 'JetSki',

//     },
//     {
//         id : 2,
//         image : require('../assets/images/JetSki.png'),
//         title : 'JetSki',
        
//     },
//     {
//         id : 3,
//         image : require('../assets/images/JetSki.png'),
//         title : 'JetSki',
        
//     },
//     {
//         id : 4,
//         image : require('../assets/images/JetSki.png'),
//         title : 'JetSki',
        
//     },
//     {
//         id : 5,
//         image : require('../assets/images/JetSki.png'),
//         title : 'JetSki',
        
//     },

// ]

function ServiceVerticalList({title,data}){
    const navigation = useNavigation();
    const route = useRoute();
    const routeName = route.name;
    const {list, updateItem} = useAppContext();
    const [userName,setUserName]=useState('')
    const [is_BookMarked, setis_BookMarked] = useState(false)
    const [disable, setDisable] = useState(false)
    const [bookmarkedItems, setBookmarkedItems] = useState([]);
    const [ bookmarkId,setBookmarkId]  = useState();
    const [listData, setListData] = useState();
    console.log('routeName=======', data);

    function serviceHandler(item) {
        // console.log('item====', item);
        navigation.navigate('ServiceExpand');
        updateItem(item)
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
    }, [])
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

    function renderItem({item}){
        console.log('Vertical=====', item.service_image);
        const names = item.name?item.name.split(' '):'';
        const firstName =names[0]? names[0].substring(0,1):'';
        const lastName = names[1]? names[1].substring(0,1):'';
        return(
            <Pressable style={{width:'95%', height:177,alignSelf:'center',elevation:8,backgroundColor:'white',shadowColor: '#000',shadowOffset:{ width: 0,height: 2 },shadowOpacity: 0.25, shadowRadius: 3,marginTop:5,borderRadius:16, flexDirection:'row',marginBottom:15}} onPress={() => serviceHandler(item)}>
                {/* <Image source={item.image} style={{width:136, height:134, borderRadius:5, alignSelf:'center',marginLeft:20}}></Image> */}
                {item.service_image && item.service_image.length > 0 ? (
                          <Image
                            source={{ uri: item.service_image[0]?.image}}
                            style={{
                                width:136, height:134,alignSelf:'center', borderRadius:5,alignSelf:'center',marginLeft:20}}
                          />
                    ): 
                    (
                        <View
                          style={{
                            width: 136,
                            height: 135,
                            alignSelf: "center",
                            backgroundColor: "lightgray", // Add a background color for the empty image
                            borderRadius: 5,
                            marginTop: 5,
                            alignItems:'center',
                            justifyContent:'center',
                            marginLeft:15
                          }}
                        >
                            <Text style={{ textAlign: 'center', color: 'rgba(57, 57, 57, 1)', fontSize: 27, fontFamily: 'Roboto-Bold', }}>
                                {firstName} {lastName}</Text>
                        </View>
                      ) 
                      }
                <View style={{marginTop:20, width:'55%'}}>
                    <View style={{flexDirection:'row',marginLeft:15,}}>
                        <Text style={{color:'rgba(25, 28, 29, 0.8)', fontSize:15, fontFamily:'Roboto-Medium'}}>{item.name}</Text>
                        {
                            userName==='Guest'? (
                                <Pressable onPress={guestBookmarkHandler} style={{marginLeft:'auto',right:25}}>
                                <BookmarkInactive height={19} width={15} color='rgba(25, 28, 29, 0.8))'/>
                            </Pressable>
                            ):
                            item.is_bookmarked ?
                            <Pressable onPress={()=>bookmarkHandler(item)} style={{marginLeft:'auto',right:25}}>
                            <BookMarkActive/>
                            </Pressable>:
                                <Pressable onPress={()=>bookmarkHandler(item)} style={{marginLeft:'auto',right:25}}>
                                <BookmarkInactive height={19} width={15} color='rgba(25, 28, 29, 0.8)'/>
                            </Pressable>
                        }
                    </View>
                    <View style={{flexDirection:'row',marginLeft:15,marginTop:10}}>
                        <LocationIcon color='rgba(25, 28, 29, 1)'/>
                        {/* <Text style={{color:'rgba(102, 102, 102, 1)', fontSize:12, fontFamily:'Roboto-Regular'}}>{item.service_price_service[0]?.location}</Text> */}
                    </View>
                    <View style={{right:5}}>
                        <Rating/>
                    </View>
                    <View style={{flexDirection:'row',marginTop:5,left:15}}>
                        {/* <Text style={{color:'rgba(0, 104, 117, 1)', fontFamily:'Roboto-Medium', fontSize:12, textAlign:'left',marginBottom:5}}>{item.service_price_service[0]?.price} KWD</Text> */}
                        <Text style={{color:'rgba(102, 102, 102, 1)', fontSize:12, fontFamily:'Roboto-Regular'}}> / {item.capacity} People</Text>
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
             data={listData}
             horizontal={false}
             renderItem={renderItem}
             keyExtractor={(item) => item.id.toString()}
             numColumns={0}/>
        </View>
    )
}

export default ServiceVerticalList