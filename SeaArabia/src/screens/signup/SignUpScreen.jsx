import { View,Text, SafeAreaView, KeyboardAvoidingView, ScrollView } from "react-native"
import CustomTextInput from "../../components/CustomTextInput";
import { useState } from "react";

function SignUpScreen(){
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    return(
        <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={{ width: '100%' }}>
                <ScrollView>
                    <View>
                    <Text style={{marginLeft:'auto',right:20,color:'rgba(0, 104, 117, 1)',fontSize:18,marginTop:20,fontFamily:'Roboto-Medium'}}>Skip</Text>
                    <Text style={{textAlign:'center', color:'rgba(27, 30, 40, 1)',fontSize:26,marginTop:7,fontFamily:'Roboto-Medium'}}>Sign up now</Text>
                    <Text style={{textAlign:'center', color:'rrgba(125, 132, 141, 1)',fontSize:16,marginTop:10,fontFamily:'Roboto-Regular'}}>Please fill the details and create account</Text>
                    </View>
                    <View style={{marginTop:25}}>
                        <CustomTextInput placeholder='Enter Name'
                            inputHeader='Full Name'
                            value={fullName}
                            onChangeText={(text) => setFullName(text)}
                        />
                        <CustomTextInput placeholder='Enter E- Mail'
                            inputHeader='E- Mail'
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />
                        <CustomTextInput placeholder='Enter Password'
                            inputHeader='Password'
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry={true}
                            isPassword={true}
                        />
                        <CustomTextInput placeholder='Enter Password'
                            inputHeader='Confirm Password'
                            value={confirmPassword}
                            onChangeText={(text) => setConfirmPassword(text)}
                            secureTextEntry={true}
                            isPassword={true}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default SignUpScreen;