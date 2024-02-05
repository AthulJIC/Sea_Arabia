import { View,Text, SafeAreaView,Pressable, ScrollView ,Image} from "react-native";
import BackIcon from "../../assets/icon/BackIcon";
import Styles from "../../public/Styles";
import ServiceVerticalList from "../../ui/ServiceVerticalList";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { BookmarkApi } from "../../Services/BookMarkService/BookMarkServices";
import { useAppContext } from "../../context/AppContext";
import useBackButtonHandler from "../../components/BackHandlerUtils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomFlatList from "../../components/CustomFlatlist";
import BookmarkInactive from "../../assets/icon/BookmarkInactive";
import BookMarkActive from "../../assets/icon/BookmarkActive";
import LocationIcon from "../../assets/icon/LocationIcon";
import Rating from "../../ui/Rating";


function BookMarkScreen({navigation,route}){
    const title = route?.params.title;
    const [userName,setUserName]=useState('');
    const [listData, setListData] = useState();
    const {updateList,updateItem} = useAppContext();
    const [is_BookMarked, setis_BookMarked] = useState(false)
    const [disable, setDisable] = useState(false)
    const [bookmarkedItems, setBookmarkedItems] = useState([]);
    const [ bookmarkId,setBookmarkId]  = useState();
    useBackButtonHandler(navigation, false);
    console.log('title', title);
    useFocusEffect(
        useCallback(() => {
        const retrieveUserName = async () => {
        try {
            const username = await AsyncStorage.getItem('User');
            // Do something with the retrieved username
            let role = username;
            setUserName(role);
        } catch (error) {
            console.error('Error retrieving username from AsyncStorage:', error);
        }
        };

        retrieveUserName();
        getBookMarkList()
    }, [])
    );
    function serviceHandler(item) {
        console.log('item====', item);
        navigation.navigate('ServiceExpand');
        updateItem(item?.service)
    }
     function getBookMarkList(){
        BookmarkApi.getBookMarkList().then((res) => {
            console.log('Bookmark=====', res.data.results);
            if(res.status === 200){
                setListData(res.data.results)
                updateList(res.data.results)
            }
        }).catch((err) => {
            console.error('err', err);
        })
    }
    function bookmarkHandler(item) {  
        console.log('item======',item);         
        if (item.service?.is_bookmarked === true) {
            console.log("delete")
            const id = item?.service.id ;
            console.log('bookmarId====', id)
            // setis_BookMarked(true)
            BookmarkApi.deleteBookMark(id).then((res) => {
                if (res.status === 200) {

                    console.log('success')
                    updateItemIsBookmarked(item.id, false);
                    const newList = [...listData];
                    newList.splice(item?.service.id,1);
                    setListData(newList);
                }
                // setis_BookMarked(false)
                // console.log('Book Mark Delete Response:', res);
                // setOrdersList(res.data.results)
            }).catch((err) => {
                console.error('err===', err);
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
        const names = item.service.name?item.service.name.split(' '):'';
        const firstName =names[0]? names[0].substring(0,1):'';
        const lastName = names[1]? names[1].substring(0,1):'';
        return(
            <Pressable style={{width:'95%', height:177,alignSelf:'center',elevation:8,backgroundColor:'white',shadowColor: '#000',shadowOffset:{ width: 0,height: 2 },shadowOpacity: 0.25, shadowRadius: 3,marginTop:5,borderRadius:16, flexDirection:'row',marginBottom:15}} onPress={() => serviceHandler(item)}>
                {/* <Image source={item.image} style={{width:136, height:134, borderRadius:5, alignSelf:'center',marginLeft:20}}></Image> */}
                {item.service?.service_image && item.service?.service_image.length > 0 ? (
                          <Image
                            source={{ uri: item.service?.service_image[0]?.image}}
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
                        <Text style={{color:'rgba(25, 28, 29, 0.8)', fontSize:15, fontFamily:'Roboto-Medium'}}>{item?.service.name}</Text>
                        {
                            userName==='Guest'? (
                                <Pressable onPress={guestBookmarkHandler} style={{marginLeft:'auto',right:25}}>
                                <BookmarkInactive height={19} width={15} color='rgba(25, 28, 29, 0.8))'/>
                            </Pressable>
                            ):
                            item.service?.is_bookmarked ?
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
                        <Text style={{color:'rgba(102, 102, 102, 1)', fontSize:12, fontFamily:'Roboto-Regular'}}>{item.service?.pickup_point_or_location}</Text>
                    </View>
                    <View style={{right:5}}>
                        <Rating/>
                    </View>
                    <View style={{flexDirection:'row',marginTop:5,left:15}}>
                        <Text style={{color:'rgba(0, 104, 117, 1)', fontFamily:'Roboto-Medium', fontSize:12, textAlign:'left',marginBottom:5}}>{item.service?.service_price_service[0]?.price} KWD</Text>
                        <Text style={{color:'rgba(102, 102, 102, 1)', fontSize:12, fontFamily:'Roboto-Regular'}}> / {item.service?.capacity} People</Text>
                    </View>
                    <Pressable style={{height:35,backgroundColor:'rgba(0, 104, 117, 1)',width:111,alignItems:'center',justifyContent:'center',left:15,marginTop:10,borderRadius:5}} onPress={() => serviceHandler(item)}>
                        <Text style={{fontSize:12, color:'white', fontFamily:'Roboto-Regular'}}>Book now</Text>
                    </Pressable>
                </View>
            </Pressable>
        )
    }

    return(
        <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
            <ScrollView>
                <View style={{flexDirection:'row'}}>
                    <Pressable style={[Styles.backIcon,{marginTop:12,}]} onPress={() => navigation.navigate('Profile')}>
                        <BackIcon color='#1B1E28'></BackIcon>
                    </Pressable>
                    <Text style={{marginTop:25,marginLeft:15, fontSize:14, color:'rgba(25, 28, 29, 0.8)', fontFamily:'Roboto-Medium'}}>{title}</Text>
                </View>
                <View style={{ borderBottomColor: 'rgba(0, 0, 0, 0.8)', borderBottomWidth: 0.7, width:'100%', alignSelf: 'center',marginTop:17 }}></View>
                {   userName === 'Guest' ? '' :
                    <CustomFlatList
                        data={listData}
                        horizontal={false}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={0}/>
                }
            </ScrollView>
        </SafeAreaView>
    )
}

export default BookMarkScreen;