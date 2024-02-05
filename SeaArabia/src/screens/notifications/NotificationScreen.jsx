import { View,Text,SafeAreaView,KeyboardAvoidingView,ScrollView,Pressable,FlatList,StyleSheet, BackHandler } from "react-native"
import BackIcon from "../../assets/icon/BackIcon";
import Styles from "../../public/Styles";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { CommonApi } from "../../Services/common/CommonApi";
import moment from 'moment';
import { useAppContext } from "../../context/AppContext";


function NotificationScreen(){
    const navigation = useNavigation();
    const {notification}= useAppContext();
    useEffect(() => {
        const backAction = () => {
          // Call your function when going back from the Notification screen
          notificationHandler();
          // Return false to disable the default back functionality
          return false;
        };
    
        // Add the event listener for Android hardware back button
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
    
        return () => backHandler.remove(); // Clean up the event listener
    
      }, []);
    function renderItem({item}){
        console.log('itemData',item);
        const dateTime = moment(item.created_at);
        const date = dateTime.format('ddd').toLocaleString('en-US');
        const time = dateTime.format('hh:mm A').toLocaleString('en-US');
        return (
            <View style={styles.container}>
                <View style={styles.contentContainer}>
                    <Text style={styles.textItem}>{item.message}</Text>
                    <Text style={styles.dateText}>{date},{time}</Text>
                </View>
            </View>
        );
    }
    function notificationHandler(){
        CommonApi.notificationRead().then((res) => {
            console.log(res.data);
            if(res.status === 200){
                navigation.goBack();
            }
        })
    }
    return(
        <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
            <ScrollView>
                <KeyboardAvoidingView
                    style={{ width: '100%' }}>   
                    <View style={{flexDirection:'row', justifyContent:'space-between',alignItems:'center',marginTop:20}}>
                        <Pressable style={[Styles.backIcon]} onPress={notificationHandler}>
                            <BackIcon color='#1B1E28'></BackIcon>
                        </Pressable>
                        <Text style={{fontSize:16, fontFamily:'Roboto-Medium', color:'rgba(27, 30, 40, 0.8)',right:15}}>Notification</Text>
                        <Text style={{fontSize:14, fontFamily:'Roboto-Regular', color:'rgba(0, 104, 117, 1)',right:10,bottom:1}}>Clear all</Text>
                    </View>
                    <View style={{ backgroundColor: 'rgba(245, 245, 245, 1)', height: 1, width: '100%',marginTop:15 }}></View>
                    <FlatList
                        data={notification}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                        // onEndReached={onEndReached}
                        >
                    </FlatList>
                </KeyboardAvoidingView>
            </ScrollView>
            {/* {loading && <LoadingIndicator visible={loading} text='Loading...'/>} */}
        </SafeAreaView>
    )
}

export default NotificationScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        width: '92%',
        marginTop: 5,
        paddingHorizontal: 16,
        height: 84,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        marginBottom:15
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 16
    },
    textItem: {
        color: 'rgba(57, 57, 57, 1)',
        fontWeight: '500',
        fontFamily: 'Poppins-Medium',
        fontSize: 13.33,
        lineHeight: 20,
    },
    dateText: {
        color: 'rgba(132, 132, 132, 1)',
        textAlign: 'left',
        fontSize:11,
        fontFamily:'Poppins-Regular'
    },
    iconContainer: {
        backgroundColor: 'rgba(24, 183, 88, 0.2)',
        width: 50,
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,

    },
});