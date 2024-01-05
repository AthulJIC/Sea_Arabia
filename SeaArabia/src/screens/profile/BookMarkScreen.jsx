import { View,Text, SafeAreaView,Pressable, ScrollView } from "react-native";
import BackIcon from "../../assets/icon/BackIcon";
import Styles from "../../public/Styles";
import ServiceVerticalList from "../../ui/ServiceVerticalList";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { BookmarkApi } from "../../Services/BookMarkService/BookMarkServices";
import { useAppContext } from "../../context/AppContext";
import useBackButtonHandler from "../../components/BackHandlerUtils";

function BookMarkScreen({navigation,route}){
    const title = route?.params.title;
    const [userName,setUserName]=useState('');
    const [listData, setListData] = useState();
    const {updateList} = useAppContext();
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
   
     function getBookMarkList(){
        BookmarkApi.getBookMarkList().then((res) => {
            console.log('res=====', res.data.results);
            if(res.status === 200){
                setListData(res.data.results)
                updateList(res.data.results)
            }
        }).catch((err) => {
            console.error('err', err);
        })
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
                    <ServiceVerticalList data={listData}/>
                }
            </ScrollView>
        </SafeAreaView>
    )
}

export default BookMarkScreen;