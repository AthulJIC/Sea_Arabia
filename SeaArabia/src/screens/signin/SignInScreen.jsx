import {View , Text, SafeAreaView, ImageBackground, Pressable, ScrollView ,TouchableOpacity,Image} from "react-native";
import BackIcon from "../../assets/icon/BackIcon";
import { TextInput } from "react-native-gesture-handler";
import { useState } from "react";
import Icon from 'react-native-vector-icons/MaterialIcons';
import CheckBox from 'react-native-check-box';

function SignInScreen({navigation}) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isSelected, setSelection] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };
    return(
        <ImageBackground source={require('../../assets/images/signinbg.gif')} style={{flex:1}} imageStyle={{resizeMode:'cover'}}>
                <View>
                    <Pressable style={{marginLeft:20,marginTop:30}} onPress={() => navigation.navigate('RegisterUser')}>
                        <BackIcon color='rgba(255, 255, 255, 1)'/>
                    </Pressable>
                    <Text style={{fontSize:26, textAlign:'center',color:'rgba(255, 255, 255, 1)', fontFamily:'Roboto-Medium',marginTop:20}}>Sign in now</Text>
                    <Text style={{fontSize:16, textAlign:'center',color:'rgba(255, 255, 255, 1)', fontFamily:'Roboto-Regular',marginTop:9}}>Please sign in to continue our app</Text>
                </View>
                <View style={{width:'100%', height:380,marginTop:'auto', backgroundColor:'rgba(0, 0, 0, 0.45)', borderTopLeftRadius:13, borderTopRightRadius:13}}>
                    <TextInput style={{width:'95%', height:45, borderBottomColor:'rgba(255, 255, 255, 1)', borderBottomWidth:1, alignSelf:'center', marginTop:10, fontSize:16, color:'rgba(0, 0, 0, 1)'}}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    keyboardType='email-address'
                    placeholder="Enter E- Mail "
                    placeholderTextColor='rgba(255, 255, 255, 0.7))'></TextInput>
                    <View>
                        <TextInput
                            secureTextEntry={!isPasswordVisible}
                            style={{width:'95%', height:45, borderBottomColor:'rgba(255, 255, 255, 1)', borderBottomWidth:1, alignSelf:'center', marginTop:10, fontSize:16, color:'rgba(0, 0, 0, 1)'}}
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
                    <Pressable>
                        <Text style={{marginLeft:'auto',color:'rgba(255, 255, 255, 1)',marginTop:10,right:10}}>Forget Password?</Text>
                    </Pressable>
                    <CheckBox
                        isChecked={isSelected}
                        onClick={() => setSelection(!isSelected)}
                        rightText={'By continuing, you agree Terms of Service and Privacy Policy'}
                        rightTextStyle={{color:'rgba(255, 255, 255, 1)'}}
                        checkedCheckBoxColor='rgba(255, 255, 255, 1)'
                        uncheckedCheckBoxColor='rgba(255, 255, 255, 1)'
                        style={{marginLeft:15,marginTop:20,width:'95%'}}/>
                    <Pressable style={{backgroundColor:'rgba(0, 104, 117, 1)', width:'95%', height:40, justifyContent:'center', alignItems:'center',alignSelf:'center',marginTop:25,borderRadius:5}}>
                        <Text style={{fontSize:16, color:'rgba(255, 255, 255, 1)', fontFamily:'Roboto-Regular'}}>Sign In</Text>
                    </Pressable>
                    <View style={{flexDirection:'row',alignSelf:'center',marginTop:15}}>
                        <Text style={{color:'white',fontSize:14, fontFamily:'Roboto-Regular'}}>Don’t have an account?</Text>
                        <Text style={{color:'white',fontSize:14, fontFamily:'Roboto-Bold'}} onPress={() => navigation.navigate('SignUp')}> Sign up</Text>
                    </View>
                     <View style={{flexDirection:'row',alignSelf:'center',marginTop:25}}>
                        <Text style={{color:'white',fontSize:14, fontFamily:'Roboto-Regular'}}>Or continue with</Text>
                        <Pressable style={{marginLeft:10}}>
                            <Image source={require('../../assets/images/google.png')} style={{width:15,height:14}}></Image>
                        </Pressable>
                        <Pressable style={{marginLeft:10}}>
                            <Image source={require('../../assets/images/fb.png')} style={{width:15,height:14}}></Image>
                        </Pressable>
                    </View>
                </View>
        </ImageBackground>
    )
}
export default SignInScreen;