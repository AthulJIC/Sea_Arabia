import { View,Text, SafeAreaView, Pressable, Platform, TextInput } from "react-native";
import BackIcon from "../../assets/icon/BackIcon";
import Styles from "../../public/Styles";
import { useState } from "react";
import CustomTextInput from "../../components/CustomTextInput";

function ResetPassword({navigation}){
    
    const[password,setPassword] = useState('');
    const[confirmPassword,setConfirmPassword] = useState('');
    
    return(
        <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
            <Pressable style={[Styles.backIcon,{marginTop:15,}]} onPress={() => navigation.navigate('OtpVerification')}>
              <BackIcon color='#1B1E28'></BackIcon>
           </Pressable>
           <View style={{marginTop:40,alignItems:'center',justifyContent:'center'}}>
               <Text style={{color:'rgba(27, 30, 40, 1)', fontFamily:'Roboto-Medium', fontSize:26,textAlign:'center'}}>Reset password</Text>
           </View>
            <View style={{marginTop:30}}>
                <CustomTextInput 
                    placeholder='New password'
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    inputHeader='Enter New Password'
                    secureTextEntry={true}
                    isPassword={true}
                />
                <CustomTextInput 
                    placeholder='Enter confirm password'
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    inputHeader='Confirm Password'
                    secureTextEntry={true}
                    isPassword={true}
                />
               <Pressable  style={{ backgroundColor: 'rgba(0, 104, 117, 1)', width: '93%', height: 50, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 30, borderRadius: 5,marginBottom:10 }} onPress={() => navigation.navigate('OtpVerification')}>
                    <Text style={{ fontSize: 16, color: 'rgba(255, 255, 255, 1)', fontFamily: 'Roboto-Medium' }}>Reset Password</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

export default ResetPassword;