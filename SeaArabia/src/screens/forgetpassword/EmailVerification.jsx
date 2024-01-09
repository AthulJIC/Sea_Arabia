import { View,Text, SafeAreaView, Pressable, Platform, TextInput, Keyboard } from "react-native";
import BackIcon from "../../assets/icon/BackIcon";
import Styles from "../../public/Styles";
import { useState } from "react";
import CustomTextInput from "../../components/CustomTextInput";
import useBackButtonHandler from "../../components/BackHandlerUtils";
import { ForgetPasswordApi } from "../../Services/forgetpassword/ForgetPasswordService";
import AsyncStorage from "@react-native-async-storage/async-storage";

function EmailVerification({navigation}){
    
    const[email,setEmail] = useState('')
    const [emailError, setEmailError] = useState(false);
    useBackButtonHandler(navigation, false);
    
    async function emailHandler(){
        Keyboard.dismiss
        let isValid= true;
        if(!email){
            setEmailError(true)
            isValid = false;
        }
        if(isValid){
            const data = {
                email : email
            }
            ForgetPasswordApi.requestOtp(data).then(async (res) =>{
                console.log('ress====', res.data);
                if(res.status === 200){
                    await AsyncStorage.setItem('userId',res.data.user_id );
                    await AsyncStorage.setItem('email',email )
                    navigation.navigate('OtpVerification')
                }
            }).catch((err) => {
                console.error(err);
            })
        }
    }
    
    return(
        <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
            <Pressable style={[Styles.backIcon,{marginTop:15,}]} onPress={() => navigation.navigate('SignIn')}>
              <BackIcon color='#1B1E28'></BackIcon>
           </Pressable>
           <View style={{marginTop:40,alignItems:'center',justifyContent:'center'}}>
               <Text style={{color:'rgba(27, 30, 40, 1)', fontFamily:'Roboto-Medium', fontSize:26,textAlign:'center'}}>Forgot password</Text>
               <Text style={{color:'rgba(125, 132, 141, 1)',fontSize:16, fontFamily:'Roboto-Regular',textAlign:'center',width: Platform.OS === 'ios' ? '70%' : '70%',marginTop:20}}>Enter your email or mobile number to receive an OTP</Text>
           </View>
            <View style={{marginTop:20}}>
                <CustomTextInput 
                    placeholder='Enter E- Mail'
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    width='91%'
                />
                {emailError && (
                    <View style={{marginLeft:25}}>
                        <Text style={{color:'red', fontFamily:'Roboto-Regular', fontSize:13,marginBottom:10}}>Enter valid email</Text>
                    </View>
                )}
               <Pressable  style={{ backgroundColor: 'rgba(0, 104, 117, 1)', width: '93%', height: 50, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 30, borderRadius: 5,marginBottom:10 }} onPress={emailHandler}>
                    <Text style={{ fontSize: 16, color: 'rgba(255, 255, 255, 1)', fontFamily: 'Roboto-Medium' }}>Send OTP</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

export default EmailVerification;