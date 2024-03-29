import { View, Text, SafeAreaView, Pressable, Image, ScrollView } from "react-native"
import ProfileInactiveIcon from "../../assets/icon/ProfileInactiveIcon";
import BookmarkInactive from "../../assets/icon/BookmarkInactive";
import TripsIcon from "../../assets/icon/TripsIcon";
import SettingsIcon from "../../assets/icon/SettingsIcon";
import AboutIcon from "../../assets/icon/AboutIcon";
import LogoutIcon from "../../assets/icon/LogoutIcon";
import RightarrowIcon from "../../assets/icon/RightarrowIcon";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LoginApi } from "../../Services/Login/login";
import Modal from 'react-native-modal';
import EditUserIcon from "../../assets/icon/EditUserIcon";
import useBackButtonHandler from "../../components/BackHandlerUtils";
import { ProfileApi } from "../../Services/profile/ProfileService";
import { useAppContext } from "../../context/AppContext";
function ProfileScreen() {
    const navigation = useNavigation();
    const [refresh_token, setRefreshToken] = useState('')
    const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
    const [userId, setUserId] = useState();
    const [userName,setUserName]=useState('');
    const [userDetails, setUserDetails] = useState();
    const {details} =useAppContext();
    console.log('userDetails', userDetails);
    
    function editHandler(){
        navigation.navigate('EditUser');
        // updateDetails(userDetails)

    }
    useFocusEffect(
        useCallback(async () => {
          const getValueFromStorage = async () => {
            try {
              const refresh = await AsyncStorage.getItem('refresh_token');
              let newRefreshToken = refresh;
              setRefreshToken(newRefreshToken);
              const username = await AsyncStorage.getItem('User');
              console.log('username', userName);
              let role = username;
              setUserName(role);
            //   const user_id = await AsyncStorage.getItem('userId');
            //   setUserId(user_id);
            //   console.log('user_id', userId);
              // Call getUserDetails here to fetch user details
            } catch (error) {
                console.error('Error fetching data from AsyncStorage:', error);
            }
        };
        getValueFromStorage();   
        // getUserDetails()       
        }, [])
    );    
    async function getUserDetails() {
        const user_id = await AsyncStorage.getItem('userId');
        setUserId(user_id);
        console.log('user_id', userId);
        await ProfileApi.getProfileDetails(user_id)
        .then((res) => {
            console.log('user====', res.data);
            setUserDetails(res.data);
        })
        .catch((err) => {
            console.error('errr', err);
        });

    }

    const data = [
        userName === 'Guest'
            ? {
                  id: 1,
                  title: 'Sign up',
                  icon: <ProfileInactiveIcon />,
                  navigation: () => navigation.navigate('SignUp'),
              }
            : {
                  id: 1,
                  title: 'Edit User',
                  icon: <EditUserIcon />,
                  navigation: () => editHandler(),
              },
        {
            id: 2,
            title: 'Bookmarked',
            icon: <BookmarkInactive height={16} width={15} color='rgba(125, 132, 141, 1)' />,
            navigation: () => navigation.navigate('BookMark', { title: 'Bookmarked' }),
        },
        {
            id: 3,
            title: 'Previous Trips',
            icon: <TripsIcon />,
            navigation: () => navigation.navigate('PreviousTrip', { title: 'Previous Trips' }),
        },
        {
            id: 4,
            title: 'Settings',
            icon: <SettingsIcon />,
            navigation: () => navigation.navigate('Settings', { title: 'Settings' }),
        },
        {
            id: 5,
            title: 'About',
            icon: <AboutIcon />,
            navigation: () => navigation.navigate('About', { title: 'About' }),
        },
        userName !== 'Guest'
            ? {
                  id: 6,
                  title: 'Logout',
                  icon: <LogoutIcon />,
                  navigation: () => setLogoutModalVisible(true),
              }
            : null,
    ].filter(Boolean);

    useBackButtonHandler(navigation, false);
    
    // function getUserDetails(){
    //     if(userName === 'Register'){
    //         ProfileApi.getProfileDetails(userId).then((res) =>{
    //            console.log('user====', res.data);
    //            setUserDetails(res.data)
    //         }).catch((err) => {
    //             console.error('errr', err);
    //         })
    //     }
    // }
    const logOutHandler = async () => {
        refresh = {
            "refresh": refresh_token
        }
        if(refresh_token===null)
        {
            setLogoutModalVisible(false)
            await AsyncStorage.removeItem('access_token')
            await AsyncStorage.removeItem('refresh_token')
            navigation.navigate('SignIn')
            console.log('loged out')
        }
        else{
            try {
                setLogoutModalVisible(false)
                const res = await LoginApi.userLogOut(refresh);
                if (res.status === 200) {
                    console.log('loged out')
                    await AsyncStorage.removeItem('access_token')
                    await AsyncStorage.removeItem('refresh_token')
                    navigation.navigate('SignIn')
                }
            } catch (error) {
                console.error('Error LogOut:', error);
            }
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
                    {
                        userName === 'Guest' ? 
                        (
                            <Text style={{ color: 'rgba(27, 30, 40, 0.8)', fontSize: 16, fontFamily: 'Roboto-Medium', marginTop: 30 }}>Guest User</Text>
                        ) 
                        : (
                            <View>
                                 <Text style={{color:'rgba(27, 30, 40, 1)', fontSize:16, fontFamily:'Roboto-Medium',marginTop:20, textAlign:'center'}}>{details?.first_name ? details.first_name.charAt(0).toUpperCase() + details.first_name.slice(1) : ''}
                                    {' '}
                                    {details?.last_name ? details.last_name.charAt(0).toUpperCase() + details.last_name.slice(1) : ''}
                                    </Text>
                                <Text style={{color:'rgba(125, 132, 141, 1)', fontSize:14, fontFamily:'Roboto-Regular',marginTop:10,textAlign:'center'}}>{details?.email}</Text>
                            </View>
                        )
                    }
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
                    <Pressable onPress={()=>logOutHandler()} style={{ backgroundColor: 'rgba(0, 104, 117, 1)', padding: 10,width:100,height:40, borderRadius: 5, margin: 10 }}>
                        <Text style={{alignSelf:'center', color: 'rgba(255, 255, 255, 1)', textAlign: 'center',height:25,width:50,lineHeight:20,fontWeight:"400",fontFamily:'Roboto-Regular' }}>Logout</Text>
                    </Pressable>
                  
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

export default ProfileScreen;
