import { View, Text, SafeAreaView, ImageBackground, Pressable, ScrollView, TouchableOpacity, Image,KeyboardAvoidingView, Keyboard, Alert } from "react-native";
import BackIcon from "../../assets/icon/BackIcon";
import { TextInput } from "react-native-gesture-handler";
import { useCallback, useEffect, useState } from "react";
import Icon from 'react-native-vector-icons/MaterialIcons';
import CheckBox from 'react-native-check-box';
import { LoginApi } from "../../Services/Login/login";
import LoadingIndicator from "../../components/Loader";
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { baseURL } from "../../Services/config";
import NetInfo from '@react-native-community/netinfo';
import { useFocusEffect } from "@react-navigation/native";
import ErrorIcon from "../../assets/icon/ErrorIcon";

// import jwt from 'jsonwebtoken';
// import "core-js/stable/atob";
function SignInScreen({ navigation }) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isSelected, setSelection] = useState(false);
    const [erorr,setErorr]=useState('')
    const [loading,setLoading]=useState(false)
    const [emailErorr,setEmailErorr]=useState(false)
    const [passwordErorr,setPasswordError]=useState(false)
    const [isLoading, setIsLoading] = useState(false);

    useFocusEffect(
        useCallback(() => {
          const addInputValues = async () => {
            const savedRememberMe = await AsyncStorage.getItem('RememberMe');
            const savedloginId = await AsyncStorage.getItem('loginId');
            console.log('savedRememberMe====', savedRememberMe)
            if(savedRememberMe === 'true'){
              setSelection(true);
              setEmail(savedloginId);
              setPassword('')
            }
            else{
              setSelection(false);
              setEmail('');
              setPassword('');
            }
          }
          addInputValues();
        }, [])
      );
      useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
          if (!state.isConnected) {
            // Show an alert if there is no internet connectivity
            Alert.alert(
              'No Internet Connection',
              'Please check your internet connection and try again.',
              [{ text: 'OK' }]
            );
          }
        });
    
        return () => {
          unsubscribe(); // Unsubscribe from the NetInfo event listener when the component unmounts
        };
      }, []);
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

   async function guestHandler(){
       await AsyncStorage.setItem('User', 'Guest') 
       navigation.navigate('HomeScreen')
    }
    const LoginAPI = async () => {
        await AsyncStorage.setItem('User', 'Register')
        Keyboard.dismiss();
        let isValid= true;
        if(!email){
            setEmailErorr(true)
            isValid = false
        }
        if(!password){
            setPasswordError(true);
            isValid = false
        }
        if(isValid){
            getUserHandler();
        }
          
    };
    async function getUserHandler() {
        if (isSelected) {
          await AsyncStorage.setItem('loginId', email);
          await AsyncStorage.setItem('RememberMe', "true")
        }
        else{
          await AsyncStorage.setItem('loginId', '');
          await AsyncStorage.setItem('RememberMe', "false")
        }
        loginHandler() 
    }
    async function loginHandler(){
        setIsLoading(true)
        NetInfo.fetch().then(state => {
          if (state.isConnected) {
            const url = baseURL + 'api/token/';
            const data ={
              email: email,
              password: password
            }
            console.log('data', data)
            axios.post(url, data).then(async(res)  => {
            // LoginApi.userLogin(data).then(async(res) => {
                console.log('res', res.data);
                if (res.status===200) {
                    console.log("response login",res.data.access)
                    await AsyncStorage.setItem('access_token', res.data.access);
                    await AsyncStorage.setItem('refresh_token', res.data.refresh);
                    setLoading(false)
                    navigation.navigate('HomeScreen')
                }
            })
            .catch((err) => {
              setIsLoading(false);
              console.error(err)
            });
          } else {
            setIsLoading(false)
            Alert.alert(
              'No Internet Connection',
              'Please check your internet connection and try again.',
              [{ text: 'OK' }]
            );
          }
        });
      }
    const googleSignIn= async ()=>{
        try {
            GoogleSignin.configure({
                webClientId: 'YOUR_WEB_CLIENT_ID',
                offlineAccess: true,
            });
            console.log('Google Sign-In configured successfully');
          } catch (error) {
            console.error('Error configuring Google Sign-In:', error);
          }
    }
    return (
        <ImageBackground source={require('../../assets/images/signinbg.gif')} style={{ flex: 1 }} imageStyle={{ resizeMode: 'cover' }}>
            <View style={{ width: '100%', height: 380, marginTop: 'auto', backgroundColor: 'rgba(0, 0, 0, 0.45)', borderTopLeftRadius: 13, borderTopRightRadius: 13 }}>
                <TextInput 
                style={{ width: '95%', height: 45, borderBottomColor: 'rgba(255, 255, 255, 1)', borderBottomWidth: 1, alignSelf: 'center', marginTop: 10, fontSize: 16, color: 'rgba(255, 255, 255,1)' }}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    keyboardType='email-address'
                    placeholder="Enter E- Mail "
                    placeholderTextColor='rgba(255, 255, 255, 0.7))'
                    onPressIn={() => setEmailErorr(false)}
                    maxLength={50} />
                <View>
                {
                    emailErorr && (
                    <View style={{flexDirection:'row',marginLeft:15,marginTop:10}}>
                        <ErrorIcon/>
                        <Text style={{color:'red',marginLeft:5}}>This field is required</Text>
                    </View>
                    )
                }
                    <TextInput
                        secureTextEntry={!isPasswordVisible}
                        style={{ width: '95%', height: 45, borderBottomColor: 'rgba(255, 255, 255, 1)', borderBottomWidth: 1, alignSelf: 'center', marginTop: 10, fontSize: 16,color: 'rgba(255, 255, 255,1)' }}
                        placeholder="Enter Password"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        placeholderTextColor='rgba(255, 255, 255, 0.7)'
                        onPressIn={() => setPasswordError(false)}
                    />
                    <TouchableOpacity
                        style={{ position: 'absolute', right: 15, top: 20 }}
                        onPress={togglePasswordVisibility}
                    >
                        <Icon
                            name={isPasswordVisible ? 'visibility' : 'visibility-off'}
                            size={20}
                            color="white"
                        />
                    </TouchableOpacity>
                </View>
                {
                    passwordErorr && (
                    <View style={{flexDirection:'row',marginLeft:15,marginTop:10}}>
                        <ErrorIcon/>
                        <Text style={{color:'red',marginLeft:5}}>This field is required</Text>
                    </View>
                    )
                }
                <View style={{flexDirection:'row'}}>
                    <CheckBox
                        isChecked={isSelected}
                        onClick={() => setSelection(!isSelected)}
                        rightText={'Remember me'}
                        rightTextStyle={{ color: 'rgba(255, 255, 255, 1)' }}
                        checkedCheckBoxColor='rgba(255, 255, 255, 1)'
                        uncheckedCheckBoxColor='rgba(255, 255, 255, 1)'
                        style={{ marginLeft: 10, marginTop: 10, width: '95%' }} />
                    <Pressable onPress={() => navigation.navigate('EmailVerification')}>
                        <Text style={{ marginLeft: 'auto', color: 'rgba(255, 255, 255, 1)', marginTop: 10, right: 115 }}>Forget Password?</Text>
                    </Pressable>
                </View>
                {erorr !== '' && (
                    <Text style={{color: 'red',alignSelf: 'center',marginTop: 10,fontFamily: 'Roboto-Regular',}}>{erorr}</Text>
                    )}
                <Pressable onPress={()=>{LoginAPI();}} style={{ backgroundColor: 'rgba(0, 104, 117, 1)', width: '95%', height: 40, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 25, borderRadius: 5 }}>
                    <Text style={{ fontSize: 16, color: 'rgba(255, 255, 255, 1)', fontFamily: 'Roboto-Regular' }}>Sign In</Text>
                </Pressable>
                <Pressable onPress={guestHandler} style={{ backgroundColor: 'rgba(255, 255, 255, 1)', width: '95%', height: 40, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 15, borderRadius: 5 }}>
                    <Text style={{ fontSize: 16, color: 'rrgba(37, 37, 37, 1)', fontFamily: 'Roboto-Regular' }}>Continue as a guest</Text>
                </Pressable>
                <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 15 }}>
                    <Text style={{ color: 'white', fontSize: 14, fontFamily: 'Roboto-Regular' }}>Don’t have an account?</Text>
                    <Text style={{ color: 'white', fontSize: 14, fontFamily: 'Roboto-Bold' }} onPress={() => {navigation.navigate('SignUp')}}> Sign up</Text>
                </View>
                <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 25 }}>
                    <Text style={{ color: 'white', fontSize: 14, fontFamily: 'Roboto-Regular' }}>Or continue with</Text>
                    <Pressable style={{ marginLeft: 10 }}>
                        <Image source={require('../../assets/images/google.png')} style={{ width: 15, height: 14 }}></Image>
                    </Pressable>
                    {/* <Pressable style={{ marginLeft: 10 }}>
                        <Image source={require('../../assets/images/fb.png')} style={{ width: 15, height: 14 }}></Image>
                    </Pressable> */}
                </View>
                <View style={{flexDirection:'row',alignSelf:'center',marginTop:15}}>
                    <Text style={{color:'rgba(255, 255, 255, 1)',fontSize:13, fontFamily:'Roboto-Regular'}}>By continuing, you agree</Text>
                    <Text style={{color:'rgba(255, 255, 255, 1)',fontSize:13, fontFamily:'Roboto-Regular', textDecorationLine:'underline'}}> Terms of Service</Text>
                    <Text style={{color:'rgba(255, 255, 255, 1)',fontSize:13, fontFamily:'Roboto-Regular'}}> and</Text>
                    <Text style={{color:'rgba(255, 255, 255, 1)',fontSize:13, fontFamily:'Roboto-Regular',textDecorationLine:'underline'}}> Privacy Policy</Text>
                </View>
            </View>
            {loading && <LoadingIndicator visible={loading} text='Loading...'></LoadingIndicator>}
        </ImageBackground>
    )
}
export default SignInScreen;