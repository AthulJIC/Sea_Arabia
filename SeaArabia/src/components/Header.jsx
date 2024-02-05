import { View, Text, Image, Pressable, TextInput, StyleSheet,PermissionsAndroid} from "react-native";
import CloudIcon from "../assets/icon/CloudIcon";
import LocationIcon from "../assets/icon/LocationIcon";
import SearchIcon from "../assets/icon/SearchIcon";
import { useCallback, useEffect, useState } from "react";
import MicIcon from "../assets/icon/MicIcon";
import Styles from "../public/Styles";
import BackIcon from "../assets/icon/BackIcon";
import { getWeatherDataByCoordinates } from "./weather";
import Geolocation from '@react-native-community/geolocation';
import { request, PERMISSIONS, check, RESULTS } from 'react-native-permissions';
import { Linking } from 'react-native';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonApi } from "../Services/common/CommonApi";
import { useAppContext } from "../context/AppContext";




function Header({ page }) {
    const navigation = useNavigation();
    const [searchText, setSearchText] = useState('');
    const [weather, setWeather] = useState('')
    const [location, setLocation] = useState({
        latitude: '',
        longitude: ''
    });
    const [icon, setIcon] = useState('');
    const [userName, setUserName] = useState();
    const [notificationList, setNotificationList] = useState(); 
    const [notificationCount, setNotificationCount] = useState();
    const {updateNotification} = useAppContext();
    console.log('notificationCount',notificationCount);
    useEffect(() => {
        const requestLocationPermission = async () => {
          try {
            let permissionStatus;
            if (Platform.OS === 'android') {
              permissionStatus = await PermissionsAndroid.check(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
              );
              if (permissionStatus !== PermissionsAndroid.RESULTS.GRANTED) {
                const result = await PermissionsAndroid.request(
                  PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                );
                if (result === PermissionsAndroid.RESULTS.GRANTED) {
                  // Permission granted, you can now use location services
                  getLocation();
                } else {
                  // Permission denied, handle accordingly
                }
              }
            } else {
              permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
              if (permissionStatus !== RESULTS.GRANTED) {
                const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
                if (result === RESULTS.GRANTED) {
                  // Permission granted, you can now use location services
                } else {
                  // Permission denied, handle accordingly
                }
              }
            }
          } catch (error) {
            console.error('Error requesting location permission:', error);
          }
        };
    
        requestLocationPermission();
      }, []);

    function getLocation(){
        Geolocation.getCurrentPosition(
            (position) => {
                //   console.log('Geolocation', position);
                const { latitude, longitude } = position.coords;
                setLocation({ latitude, longitude });
            },
            (error) => {
                console.error('Error getting location:', error.message);
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    } 
    useFocusEffect(
        useCallback(() => {
        const retrieveUserName = async () => {
        try {
            const user_name = await AsyncStorage.getItem('User');
            // Do something with the retrieved username
            setUserName(user_name );
            if(user_name === 'Register'){
                getNotificationHandler();
            }
        } catch (error) {
            console.error('Error retrieving username from AsyncStorage:', error);
        }
        };

        retrieveUserName();
       
    }, [])
    );
    function getNotificationHandler() {
        CommonApi.getNotification().then((res) => {
            console.log('res====',res.data.results);
            setNotificationList(res.data.results.notifications);
            setNotificationCount(res.data.results.count);
            updateNotification(res.data.results.notifications);
        })
    }
    useEffect(() => {
        if (location.latitude && location.longitude) {
            getWeatherDataByCoordinates(location.latitude, location.longitude)
                .then((data) => {
                    console.log('data-----', data?.current);
                    setWeather(data.current);
                    setIcon(data.current.condition.icon);
                })
                .catch((error) => {
                    console.error('Error fetching weather data:', error);
                });
        }
    }, [location]);
    return (
        <View>
            {
                page === 'Home' ? (
                    <View style={{ marginLeft: 15, marginTop: 10, flexDirection: 'row' }}>
                        <Image
                            style={{ height: 25, width: 20 }}
                            source={{
                                uri: "https:" + icon,
                            }}
                        />
                        <Text style={{ color: 'rgba(0, 104, 117, 1)', fontSize: 13, fontFamily: 'Roboto-Regular', marginTop: 2, marginLeft: 5 }}>{weather.feelslike_c}°C </Text>
                    </View>
                ) 
                :
                    (
                        <Text style={{color:'rgba(0, 0, 0, 0.8)', fontSize:16, fontFamily:'Roboto-Medium',marginLeft:15,marginTop:15}}>Bookings History</Text>
                    )
            }

            <View style={{ flexDirection: 'row' }}>
                {
                    page === 'Home' && 
                
                <View>
                    <View style={{ flexDirection: 'row', marginLeft: 15, marginTop:10 }}>
                        <LocationIcon color='black'></LocationIcon>
                        <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontSize: 14, fontFamily: 'Roboto-Regular', marginLeft: 5,bottom:2 }}>Kuwait</Text>
                    </View>
                    {/* <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontSize: 14, fontFamily: 'Roboto-Regular', marginLeft: 30, marginTop: 2 }}>Exact location name</Text> */}
                </View>
                }
                <View style={{ flexDirection: 'row', marginLeft: 'auto', bottom : page !== 'Home' ? 25 : 0 }}>
                    {/* {
                        page === 'Home' ? (
                            <Pressable onPress={() => navigation.navigate('Dummy')}>
                                <Image source={require('../assets/images/Language.png')} style={{ height: 30, width: 30, marginHorizontal: 10, marginTop: 5 }} />
                            </Pressable>
                        ) : null
                    } */}
                   
                            <Pressable onPress={() => navigation.navigate('Notification')}>
                                <Image source={require('../assets/images/Notification.png')} style={{ height: 25, width: 20, marginRight: 15, marginTop: 8 }} />
                                { notificationCount &&  notificationCount !=0 ?
                                    <View style={[styles.notific]}>
                                        <Text style={{color:'white',fontFamily:'Poppins-Regular',fontSize:11}}>{notificationCount}</Text>
                                    </View> : ''
                                }
                            </Pressable>
                            {
                                userName === 'Guest' ? 
                                (
                                    <Pressable onPress={() => navigation.navigate('SignUp')}>
                                        <Image source={require('../assets/images/Profile.png')} style={{ height: 30, width: 30, marginRight: 30 }}></Image>
                                        <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontSize: 10, fontFamily: 'Roboto-Regular', textAlign: 'left', marginTop: 5, right: 5 }}>Add Profile</Text>
                                    </Pressable>
                                ) : (
                                    <Pressable onPress={() => navigation.navigate('Profile')}>
                                        <Image source={require('../assets/images/Profile.png')} style={{ height: 30, width: 30, marginRight: 30,marginTop:5 }}></Image>
                                    </Pressable>
                                )
                            }
                </View>
            </View>
            { page === 'Home' && 
            <View style={{ width: '93%', height: 40, borderColor: 'rgba(0, 0, 0, 0.5)', borderWidth: 0.5, borderRadius: 5, alignSelf: 'center', marginTop: 8, flexDirection: 'row' }}>
                <SearchIcon></SearchIcon>
                <TextInput
                    placeholder="Search here"
                    placeholderTextColor={'rgba(184, 184, 184, 1)'}
                    onChangeText={(text) => setSearchText(text)}
                    value={searchText}
                    style={{ width: '78%', marginLeft: 5 }}></TextInput>
                {/* <View style={{ borderLeftColor: 'rgba(0, 0, 0, 0.8)', borderLeftWidth: 0.5, height: 25, alignSelf: 'center' }}></View>
                <MicIcon></MicIcon> */}
            </View>
            }
        </View>
    )
}

export default Header;

const styles = StyleSheet.create({
    notific:{
        position:'absolute',
        left:12,
        backgroundColor:'rgba(177, 41, 44, 1)',
        borderRadius:15,
        height:17,
        width:17,
        alignItems:'center',
        justifyContent:'center'
      }
})