import { View, Text, SafeAreaView, ImageBackground, Pressable, ScrollView, TouchableOpacity, Image,KeyboardAvoidingView } from "react-native";
import BackIcon from "../../assets/icon/BackIcon";
import { TextInput } from "react-native-gesture-handler";
import { useState } from "react";
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

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };
    const loginHandler = async () => {
    
        if (!email || !password || !isSelected) {
            if (!email) {
                setEmailErorr(true);
            }
            if (!password) {
              setPasswordError(true);
            }
            if(!isSelected)
            {
              setErorr('Please click on the Terms of Service and Conditions');
              return;  
            }
            setErorr('Please fill in all fields');
            return;
          }
          
          setErorr('');
        const url = baseURL + 'api/token/';
        const requestData = {
            email: email,
            password: password
        };
      setLoading(true)
        try {
            await axios.post(url,requestData).then(async (res) => {
                if (res.status===200) {
                    console.log("response login",res.data.access)
                    await AsyncStorage.setItem('access_token', res.data.access);
                    await AsyncStorage.setItem('refresh_token', res.data.refresh);
                    setLoading(false)
                    navigation.navigate('HomeScreen')
                }
            });
        } catch (error) {
            console.error('Error Login:', error);
        }finally{
            setLoading(false)
        }
    };
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
                    placeholderTextColor='rgba(255, 255, 255, 0.7))' />
                <View>
                    <TextInput
                        secureTextEntry={!isPasswordVisible}
                        style={{ width: '95%', height: 45, borderBottomColor: 'rgba(255, 255, 255, 1)', borderBottomWidth: 1, alignSelf: 'center', marginTop: 10, fontSize: 16,color: 'rgba(255, 255, 255,1)' }}
                        placeholder="Enter Password"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        placeholderTextColor='rgba(255, 255, 255, 0.7)'
                    />
                    <TouchableOpacity
                        style={{ position: 'absolute', right: 15, top: 20 }}
                        onPress={togglePasswordVisibility}
                    >
                        <Icon
                            name={isPasswordVisible ? 'visibility-off' : 'visibility'}
                            size={20}
                            color="white"
                        />
                    </TouchableOpacity>
                </View>
                <Pressable onPress={() => navigation.navigate('EmailVerification')}>
                    <Text style={{ marginLeft: 'auto', color: 'rgba(255, 255, 255, 1)', marginTop: 10, right: 10 }}>Forget Password?</Text>
                </Pressable>
                {erorr !== '' && (
                    <Text style={{color: 'red',alignSelf: 'center',marginTop: 10,fontFamily: 'Roboto-Regular',}}>{erorr}</Text>
                    )}
                <CheckBox
                    isChecked={isSelected}
                    onClick={() => setSelection(!isSelected)}
                    rightText={'By continuing, you agree Terms of Service and Privacy Policy'}
                    rightTextStyle={{ color: 'rgba(255, 255, 255, 1)' }}
                    checkedCheckBoxColor='rgba(255, 255, 255, 1)'
                    uncheckedCheckBoxColor='rgba(255, 255, 255, 1)'
                    style={{ marginLeft: 15, marginTop: 20, width: '95%' }} />
                <Pressable onPress={()=>{loginHandler();}} style={{ backgroundColor: 'rgba(0, 104, 117, 1)', width: '95%', height: 40, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 25, borderRadius: 5 }}>
                    <Text style={{ fontSize: 16, color: 'rgba(255, 255, 255, 1)', fontFamily: 'Roboto-Regular' }}>Sign In</Text>
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
                    <Pressable style={{ marginLeft: 10 }}>
                        <Image source={require('../../assets/images/fb.png')} style={{ width: 15, height: 14 }}></Image>
                    </Pressable>
                </View>
            </View>
            {loading && <LoadingIndicator visible={loading} text='Loading...'></LoadingIndicator>}
        </ImageBackground>
    )
}
export default SignInScreen;