import { SafeAreaView, Text, View ,Pressable} from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';
import BackIcon from '../../assets/icon/BackIcon';
import Styles from '../../public/Styles';
import { useState } from 'react';
import useBackButtonHandler from '../../components/BackHandlerUtils';


function OtpVerification({navigation}){
    const [otp, setOtp] = useState('');

    useBackButtonHandler(navigation, false);

    const handleTextChange = (text) => {
      // Handle changes in the entire OTP input
      setOtp(text);
      // Additional logic if needed
    };
    const handleCellTextChange = (index) => {
        // Handle changes in each cell of the OTP input
        // 'index' parameter indicates the position of the changed cell
        // Additional logic if needed
    };
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
                    handleTextChange={handleTextChange}
                    handleCellTextChange={handleCellTextChange}/>
                </View>
           </View>
           <Pressable  style={{ backgroundColor: 'rgba(0, 104, 117, 1)', width: '93%', height: 50, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 30, borderRadius: 5,marginBottom:10 }} onPress={() => navigation.navigate('ResetPassword')}>
                <Text style={{ fontSize: 16, color: 'rgba(255, 255, 255, 1)', fontFamily: 'Roboto-Medium' }}>Verify</Text>
            </Pressable>
            <View style={{flexDirection:'row',margin:15}}>
                <Text style={{color:'rgba(0, 104, 117, 1)',fontSize:14,fontFamily:'Roboto-Regular'}}>Resend Code</Text>
                <Text style={{color:'rgba(125, 132, 141, 1)',fontSize:14,fontFamily:'Roboto-Regular',marginLeft:'auto'}}>01:26</Text>
            </View>
        </SafeAreaView>
    )
}

export default OtpVerification;