import { SafeAreaView, Text, View ,Pressable,Keyboard} from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';
import BackIcon from '../../assets/icon/BackIcon';
import Styles from '../../public/Styles';
import { useCallback, useEffect, useState } from 'react';
import useBackButtonHandler from '../../components/BackHandlerUtils';
import { ForgetPasswordApi } from '../../Services/forgetpassword/ForgetPasswordService';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';



function OtpVerification({navigation}){
    const [otp, setOtp] = useState('');
    const [otpError, setOtpError] = useState(false);
    const [userId, setUserId] = useState();
    // const [timerCount, setTimer] = useState(60)
    const [timer, setTimer] = useState(300); // 5 minutes in seconds
    const [formattedTime, setFormattedTime] = useState('');
    const [email, setEmail] = useState();
    const [enableResend, setEnableResend] = useState(true);

    useBackButtonHandler(navigation, false);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000); // Update the timer every second
  
      return () => clearInterval(interval); // Cleanup the interval on unmounting
  
    }, []); // Empty dependency array to run this effect only once
  
    useEffect(() => {
        if(timer === 0){
            setEnableResend(false)
        }
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
        setFormattedTime(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    }, [timer]);
    
    const handleTextChange = (text) => {
      console.log('text', text);
      setOtp(text);
    };
    const handleCellTextChange = (index) => {
        // Handle changes in each cell of the OTP input
        // 'index' parameter indicates the position of the changed cell
        // Additional logic if needed
    };
    useFocusEffect(
        useCallback(() => {
        const retrieveUserName = async () => {
        try {
            const user_id = await AsyncStorage.getItem('userId');
            setUserId(user_id);
            const email_id = await AsyncStorage.getItem('email');
            setEmail(email_id);
        } catch (error) {
            console.error('Error retrieving username from AsyncStorage:', error);
        }
        };

        retrieveUserName();
    }, [])
    );
    function resetPasswordHandler(){
        Keyboard.dismiss
        let isValid= true;
        if(!otp || otp.length < 6){
            setOtpError(true)
            isValid = false;
        }
        if(isValid){
            const data ={
                otp : otp,
                user_id : userId
            }
            ForgetPasswordApi.verifyOtp(data).then((res) =>{
                console.log('res====', res.data);
                navigation.navigate('ResetPassword')
            }).catch((err) => {
                console.error(err);
            })
        }
    }
    function resendHandler(){
        const data = {
            email : email
        }
        ForgetPasswordApi.requestOtp(data).then(async (res) =>{
            console.log('ress====', res.data);
            if(res.status === 200){
                // await AsyncStorage.setItem('userId',res.data.user_id );
                // await AsyncStorage.setItem('email',email )
                // navigation.navigate('OtpVerification')
            }
        }).catch((err) => {
            console.error(err);
        })
    }
    return(
        <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
            <Pressable style={[Styles.backIcon,{marginTop:15,}]} onPress={() => navigation.navigate('EmailVerification')}>
              <BackIcon color='#1B1E28'></BackIcon>
           </Pressable>
           <View style={{marginTop:40,alignItems:'center',justifyContent:'center'}}>
               <Text style={{color:'rgba(27, 30, 40, 1)', fontFamily:'Roboto-Medium', fontSize:26,textAlign:'center'}}>OTP Verification</Text>
               <Text style={{color:'rgba(125, 132, 141, 1)',fontSize:16, fontFamily:'Roboto-Regular',textAlign:'center',width: Platform.OS === 'ios' ? '90%' : '90%',marginTop:20}}>Please check your email imanefh28@gmail.com to see the verification code</Text>
           </View>
           <View style={{marginTop:30,marginLeft:15,width:'85%'}}>
                <Text style={{color:'rgba(27, 30, 40, 1)',fontSize:20,fontFamily:'Roboto-Regular'}}>OTP Code</Text>
                <View style={{marginTop:20}}>
                    <OTPTextInput ref={e => (otpInput = e)} 
                    textInputStyle={{backgroundColor:'rgba(247, 247, 249, 1)',borderRadius:5}} 
                    tintColor='rgba(247, 247, 249, 1)'
                    offTintColor='rgba(247, 247, 249, 1)' 
                    keyboardType="numeric"
                    inputCount={6}
                    handleTextChange={handleTextChange}
                    handleCellTextChange={handleCellTextChange}/>
                </View>
           </View>
           <Pressable  style={{ backgroundColor: 'rgba(0, 104, 117, 1)', width: '93%', height: 50, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 30, borderRadius: 5,marginBottom:10 }} onPress={resetPasswordHandler}>
                <Text style={{ fontSize: 16, color: 'rgba(255, 255, 255, 1)', fontFamily: 'Roboto-Medium' }}>Verify</Text>
            </Pressable>
            <View style={{flexDirection:'row',margin:15}}>
            {!enableResend ? (
                <Text style={{ color: 'rgba(0, 104, 117, 1)', fontSize: 14, fontFamily: 'Roboto-Regular' }} onPress={resendHandler}>
                    Resend Code
                </Text>
                ) : (
                <Text style={{ color: 'rgba(125, 132, 141, 1)', fontSize: 15, fontFamily: 'Roboto-Regular', marginLeft: 'auto',right:10 }}>
                    {formattedTime}
                </Text>
            )}
            </View>
        </SafeAreaView>
    )
}

export default OtpVerification;