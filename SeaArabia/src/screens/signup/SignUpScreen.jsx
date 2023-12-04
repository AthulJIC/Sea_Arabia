import { View,Text, SafeAreaView, KeyboardAvoidingView, ScrollView } from "react-native"
import CustomTextInput from "../../components/CustomTextInput";
import { useState } from "react";
import CustomDatePicker from "../../components/CustomDatePicker";
import SelectDropdown from 'react-native-select-dropdown';

function SignUpScreen(){
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [selectedGender, setSelectedGender] = useState(null);
    const genderOptions = ['Male', 'Female', 'Other'];

    const onSelectGender = (selectedItem, index) => {
        setSelectedGender(selectedItem);
    };
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
                        <View style={{marginLeft:20,marginTop:10, flexDirection:'row',marginBottom:7}}>
                            <View>
                                <Text style={{color:'rgba(27, 30, 40, 0.8)', fontSize:14, fontFamily:'Roboto-Medium'}}>Date of Birth</Text>
                                <CustomDatePicker/>
                            </View>
                            <View style={{marginLeft:'auto',right:30}}>
                                <Text style={{color:'rgba(27, 30, 40, 0.8)', fontSize:14, fontFamily:'Roboto-Medium',marginLeft:'auto',right:82}}>Gender</Text>
                                <SelectDropdown
                                    data={genderOptions}
                                    onSelect={(selectedItem, index) => onSelectGender(selectedItem, index)}
                                    buttonTextAfterSelection={(selectedItem, index) => {
                                    // Display the selected gender as the button text
                                    return selectedItem;
                                    }}
                                    rowTextForSelection={(item, index) => {
                                    // Display the gender options in the dropdown
                                    return item;
                                    }}
                                    buttonStyle={{ backgroundColor: 'rgba(247, 247, 249, 1)', borderRadius: 12 , height:50,width: 130,marginTop:15}}
                                    buttonTextStyle={{ color: selectedGender !== null ?  'black' :'rgba(27, 30, 40, 0.3)' , fontSize: 16,textAlign:'left' }}
                                    dropdownStyle={{
                                        marginTop: -10,
                                        backgroundColor: 'white',
                                        borderWidth: 1,
                                        borderColor: 'gray',
                                        borderRadius: 5,
                                        width: '90%',
                                        left:20
    
                                      }}
                                    defaultButtonText="Select"
                                />
                            </View>
                        </View>
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