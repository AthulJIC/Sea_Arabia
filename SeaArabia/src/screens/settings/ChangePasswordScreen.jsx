import { View, Text, SafeAreaView, Pressable, ScrollView, StyleSheet, Keyboard, Alert } from "react-native";
import BackIcon from "../../assets/icon/BackIcon";
import Styles from "../../public/Styles";
import useBackButtonHandler from "../../components/BackHandlerUtils";
import CustomTextInput from "../../components/CustomTextInput";
import { useCallback, useState } from "react";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";


function ChangePasswordScreen({ navigation }) {
    useBackButtonHandler(navigation, false);
    const [currentPassword, setCurrentPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordErrror] = useState(false);
    const [currentPasswordError, setCurrentPasswordErrror] = useState(false);
    const [token, setToken] = useState();
    useFocusEffect(
        useCallback(() => {
        const retrieveUserName = async () => {
        try {
            const user_name = await AsyncStorage.getItem('access_token');
            // Do something with the retrieved username
            setToken(user_name );
        } catch (error) {
            console.error('Error retrieving username from AsyncStorage:', error);
        }
        };

        retrieveUserName();
       
    }, [])
    );
    function confirmHandler() {
       Keyboard.dismiss();
       let isValid = true;
        if(!currentPassword){
            isValid = false;
            setCurrentPasswordErrror(true);
        }
        if(!newPassword){
            isValid = false;
            setPasswordError(true);
        }
        if(!confirmPassword  || confirmPassword !== newPassword ){
            isValid = false;
            setConfirmPasswordErrror(true);
        }
        if(isValid){
            postData();
        }


    }
    const postData = async () => {
        try {
          const apiUrl = 'https://api.seaarabia.jicitsolution.com/account/profile-reset-password/';
          const dataToSend = {
            current_password : currentPassword,
            new_password : newPassword,
            confirm_password : confirmPassword
          };
  
        //   const token = 'your-bearer-token';
  
          const response = await axios.post(apiUrl, dataToSend, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }).then((res => {
            console.log('res====', res.data);
            navigation.goBack();
          })).catch((err) => {
            console.log('err', err.response.data.error);
            const errorMessage = err.response.data.error;
            Alert.alert('Alert', errorMessage, [{ text: 'OK' }]);
          })
  
        //   console.log('Response:', response.data);
        } catch (error) {
          console.error('Error:', error);
        }
      };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView>
                <View style={{ flexDirection: 'row' }}>
                    <Pressable style={[Styles.backIcon, { marginTop: 12, }]} onPress={() => navigation.goBack()}>
                        <BackIcon color='#1B1E28'></BackIcon>
                    </Pressable>
                </View>
                <Text style={styles.HeadTxt}>Change Password</Text>
                <View style={{ marginTop: 25, marginBottom: 50, marginTop: 50 }}>
                    <CustomTextInput placeholder='Enter Current Password'
                        inputHeader='Enter Current Password'
                        width={'91%'}
                        maxLength={25}
                        onChangeText={(text) => setCurrentPassword(text)}
                        onFocus={() => setCurrentPasswordErrror(false)}
                    />
                    {currentPasswordError && (
                        <View style={{marginLeft:25}}>
                            <Text style={{color:'red', fontFamily:'Roboto-Regular', fontSize:13,marginBottom:10}}>Enter valid current password</Text>
                        </View>
                    )}
                    <Pressable onPress={() => navigation.navigate('EmailVerification')}>
                        <Text style={{ marginLeft: 25, color: 'rgba(0, 104, 117, 1)', marginTop: 2, marginBottom:10 }}>Forget Password?</Text>
                    </Pressable>
                    <CustomTextInput placeholder='Enter New Password'
                        inputHeader='Enter New Password'
                        width={'91%'}
                        maxLength={25}
                        onChangeText={(text) => setNewPassword(text)}
                        onFocus={() => setPasswordError(false)}
                    />
                    {passwordError && (
                        <View style={{marginLeft:25}}>
                            <Text style={{color:'red', fontFamily:'Roboto-Regular', fontSize:13,marginBottom:10}}>Enter valid new password</Text>
                        </View>
                    )}
                    <CustomTextInput placeholder='Confirm New Password'
                        inputHeader='Confirm New Password'
                        width={'91%'}
                        maxLength={25}
                        onChangeText={(text) => setConfirmPassword(text)}
                        onFocus={() => setConfirmPasswordErrror(false)}
                    />
                    {confirmPasswordError && (
                        <View style={{marginLeft:25}}>
                            <Text style={{color:'red', fontFamily:'Roboto-Regular', fontSize:13,marginBottom:10}}>Enter valid confirm password</Text>
                        </View>
                    )}
                    <Pressable style={styles.ConfirmTxt} onPress={confirmHandler}>
                        <Text style={{ color: '#fff', fontSize: 18, fontFamily: 'Roboto-regular' }}>Confirm Password</Text>
                    </Pressable>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    HeadTxt: {
        marginTop: 45,
        fontSize: 26,
        color: '#000',
        fontFamily: 'bold',
        alignSelf: 'center'
    },
    ConfirmTxt: {
        backgroundColor: 'rgba(0, 104, 117, 1)',
        flex: 1,
        marginLeft: 20,
        marginRight: 20,
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        top:20
    }
})
export default ChangePasswordScreen;