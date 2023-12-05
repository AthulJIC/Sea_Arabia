import { View, Text, SafeAreaView, Pressable, Image, ScrollView } from "react-native"
import ProfileInactiveIcon from "../../assets/icon/ProfileInactiveIcon";
import BookmarkInactive from "../../assets/icon/BookmarkInactive";
import TripsIcon from "../../assets/icon/TripsIcon";
import SettingsIcon from "../../assets/icon/SettingsIcon";
import AboutIcon from "../../assets/icon/AboutIcon";
import LogoutIcon from "../../assets/icon/LogoutIcon";
import RightarrowIcon from "../../assets/icon/RightarrowIcon";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LoginApi } from "../../Services/Login/login";
import Modal from 'react-native-modal';
function ProfileScreen({ navigation }) {
    const [refresh_token, setRefreshToken] = useState('')
    const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
    const data = [
        {
            id: 1,
            title: 'Sign up',
            icon: <ProfileInactiveIcon />,
            navigation: () => navigation.navigate('SignUp')
        },
        {
            id: 2,
            title: 'Bookmarked',
            icon: <BookmarkInactive height={16} width={15} color='rgba(125, 132, 141, 1)' />,
            navigation: () => navigation.navigate('SignUp')
        },
        {
            id: 3,
            title: 'Previous Trips',
            icon: <TripsIcon />,
            navigation: () => navigation.navigate('SignUp')
        },
        {
            id: 4,
            title: 'Settings',
            icon: <SettingsIcon />,
            navigation: () => navigation.navigate('SignUp')
        },
        {
            id: 5,
            title: 'About',
            icon: <AboutIcon />,
            navigation: () => navigation.navigate('SignUp')
        },
        {
            id: 6,
            title: 'Logout',
            icon: <LogoutIcon />,
            onPress: () => setLogoutModalVisible(true),
            // navigation: () => navigation.navigate('SignUp')

        },
    ]
    useFocusEffect(
        useCallback(() => {
            const getValueFromStorage = async () => {
                // setIsLoading(true);
                try {
                    const refresh = await AsyncStorage.getItem('refresh_token');
                    let newRefreshToken = refresh;
                    setRefreshToken(newRefreshToken);
                } catch (error) {
                    console.error('Error fetching data from AsyncStorage:', error);
                    //   setIsLoading(false);
                }
            };
            getValueFromStorage();
        }, [])
    );
    const logOutHandler = async () => {
        refresh = {
            "refresh": refresh_token
        }
        try {
            const res = await LoginApi.userLogOut(refresh);
            if (res.status === 200) {
                console.log('loged out')
                await AsyncStorage.removeItem('access_token')
                await AsyncStorage.removeItem('refresh_token')
                navigation.navigate('User')
            }
        } catch (error) {
            console.error('Error LogOut:', error);
        }
    }
    const cancelLogout = () => {
        setLogoutModalVisible(false);
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                    <Text style={{ color: 'rgba(27, 30, 40, 0.8)', fontSize: 15, fontFamily: 'Roboto-Medium' }}>Profile</Text>
                    <Pressable>
                        <Image source={require('../../assets/images/ProfilePic.png')} style={{ width: 96, height: 96, marginTop: 20 }}></Image>
                    </Pressable>
                    <Text style={{ color: 'rgba(27, 30, 40, 0.8)', fontSize: 16, fontFamily: 'Roboto-Medium', marginTop: 30 }}>Guest User</Text>
                </View>
                <View style={{ width: '90%', alignSelf: 'center', marginTop: 30, backgroundColor: 'white', borderRadius: 6, elevation: 3, justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3, marginBottom: 20 }}>
                    {
                        data.map((item, index) => {
                            return (
                                <View key={index} style={{ top: 15 }}>
                                    <Pressable style={{ height: 60, marginLeft: 20, marginTop: 9, flexDirection: 'row' }} onPress={item.navigation}>
                                        <View>
                                            {item.icon}
                                        </View>
                                        <Text style={{color:'rgba(27, 30, 40, 1)',marginLeft:30,fontSize:15,fontFamily:'Roboto-Regular'}}>{item.title}</Text>
                                        <View style={{marginLeft:'auto',right:20}}>
                                        <RightarrowIcon width={9} height={16}/>
                                        </View>
                                    </Pressable>
                                    <View style={{ backgroundColor: 'rgba(245, 245, 245, 1)', height: 2, width: '90%', bottom: 15, alignSelf: 'center' }}></View>
                                </View>
                            )
                        })
                    }
                </View>
            </ScrollView>
            <Modal isVisible={isLogoutModalVisible}>
                <View style={{ backgroundColor: 'rgba(242, 244, 244, 1)',width:350,height:221, borderRadius: 10, padding: 20,alignSelf:'center',justifyContent:'center' }}>
                    <Text style={{alignSelf:'center',marginBottom: 20,fontSize:16,color:'rgba(27, 30, 40, 0.8)',fontWeight:'400'}}>Logout</Text>
                    <Text style={{marginLeft:30, fontSize: 18, marginBottom: 20,width:300,height:25,color:'rgba(0, 0, 0, 0.8)',fontWeight:'400',fontFamily:'Roboto-Regular' }}>Are you sure you want to logout?</Text>
                    <View style={{flexDirection:'row',justifyContent:'center'}}>
                    <Pressable style={{ backgroundColor: 'rgba(255, 255, 255, 1)', padding: 10,width:100,height:40, borderRadius: 5, margin: 10 }} onPress={cancelLogout}>
                        <Text style={{ color: 'rgba(0, 104, 117, 1)', textAlign: 'center' }}>Cancel</Text>
                    </Pressable>
                    <Pressable onPress={logOutHandler} style={{ backgroundColor: 'rgba(0, 104, 117, 1)', padding: 10,width:100,height:40, borderRadius: 5, margin: 10 }}>
                        <Text style={{alignSelf:'center', color: 'rgba(255, 255, 255, 1)', textAlign: 'center',height:25,width:50,lineHeight:20,fontWeight:"400",fontFamily:'Roboto-Regular' }}>Logout</Text>
                    </Pressable>
                  
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

export default ProfileScreen;
