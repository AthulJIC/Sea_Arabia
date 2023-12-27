import { View,Text, SafeAreaView, KeyboardAvoidingView, ScrollView ,Pressable,Image, TextInput} from "react-native"
import CustomTextInput from "../../components/CustomTextInput";
import { useState } from "react";
import CustomDatePicker from "../../components/CustomDatePicker";
import { SelectList } from 'react-native-dropdown-select-list';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Styles from "../../public/Styles";


function SignUpScreen({navigation}){
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [location, setLocation] = useState();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [selected, setSelected] = useState("");
    const genderOptions = ['Male', 'Female'];
    const [isOpen, setIsOpen] = useState(false);


    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    
      const handleSelect = (value) => {
        setSelected(value);
        setIsOpen(false); // Close dropdown after selection
    };
    return(
        <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
            <ScrollView>
            <KeyboardAvoidingView
                style={{ width: '100%' }}>              
                <View>
                    <Text style={{marginLeft:'auto',right:20,color:'rgba(0, 104, 117, 1)',fontSize:18,marginTop:20,fontFamily:'Roboto-Medium'}} onPress={() => navigation.navigate('Home')}>Skip</Text>
                    <Text style={{textAlign:'center', color:'rgba(27, 30, 40, 1)',fontSize:26,marginTop:7,fontFamily:'Roboto-Medium'}}>Sign up now</Text>
                    <Text style={{textAlign:'center', color:'rrgba(125, 132, 141, 1)',fontSize:16,marginTop:10,fontFamily:'Roboto-Regular'}}>Please fill the details and create account</Text>
                    </View>
                    <View style={{marginTop:25}}>
                        <CustomTextInput placeholder='Enter Name'
                            inputHeader='Full Name'
                            value={fullName}
                            onChangeText={(text) => setFullName(text)}
                            width={'91%'}
                        />
                        <CustomTextInput placeholder='Enter E- Mail'
                            inputHeader='E- Mail'
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            width={'91%'}
                        />
                        <View style={{marginLeft:20,marginTop:10,marginBottom:10}}>
                            <Text style={{color:'rgba(27, 30, 40, 0.8)', fontSize:14, fontFamily:'Roboto-Medium'}}>Location</Text>
                            <View style={[Styles.input,{width:'95%',flexDirection:'row'}]}>
                                <Image source={require('../../assets/images/Flag.png')} style={{width:19,height:15,alignSelf:'center'}} resizeMode='center'></Image>
                                <View style={{ borderLeftColor: 'rgba(0, 0, 0, 1)', borderLeftWidth: 0.5, height: 25, alignSelf: 'center',marginLeft:15 }}></View>
                                <TextInput
                                    placeholder='Enter Location'
                                    onChangeText={(text) => setLocation(text)}
                                    value={location}
                                    placeholderTextColor='rgba(27, 30, 40, 0.3)'
                                    style={{alignSelf:'center',marginLeft:15}}
                                />
                            </View>
                        </View>
                        <View style={{marginLeft:20,marginTop:10, flexDirection:'row',marginBottom:10}}>
                            <View>
                                <Text style={{color:'rgba(27, 30, 40, 0.8)', fontSize:14, fontFamily:'Roboto-Medium'}}>Date of Birth</Text>
                                <CustomDatePicker/>
                            </View>
                            <View style={{marginLeft:'auto',right:15}}>
                                <Text style={{color:'rgba(27, 30, 40, 0.8)', fontSize:14, fontFamily:'Roboto-Medium',left:5}}>Gender</Text>
                                <SelectList 
                                    onSelect={handleSelect}
                                    setSelected={setSelected}
                                    data={genderOptions} 
                                    save="value"
                                    search={false}
                                    placeholder = 'Select Gender'
                                    dropdownStyles={{
                                        backgroundColor: 'white',
                                        width: 150,
                                        marginLeft: 'auto',
                                        borderWidth: 1, // Adding a border
                                        borderColor: '#DDD', // Border color
                                        borderRadius: 8, // Border radius
                                    }}
                                    boxStyles={{borderColor:'white',height:50,width:150,marginLeft:'auto',backgroundColor:'rgba(247, 247, 249, 1)',marginTop:15}}
                                    fontFamily="Roboto-Regular"
                                    arrowicon={
                                        <Icon
                                          name={isOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                                          size={24}
                                          color={'black'}
                                        />
                                      }
                                    closeicon={<Icon name="close" size={24} color={'black'} />}
                                    dropdownShown={isOpen}
                                    dropdownItemStyles={{color:'black'}}
                                    inputStyles={{alignSelf:'center',textAlign:'left',color: selected !== ''  ?'black' : 'rgba(27, 30, 40, 0.3)'}} 
                                    dropdownTextStyles={{color:'black'}}
                                />
                            </View>
                        </View>
                        <CustomTextInput placeholder='Enter Password'
                            inputHeader='Password'
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry={true}
                            isPassword={true}
                            width={'91%'}
                        />
                        <CustomTextInput placeholder='Enter Password'
                            inputHeader='Confirm Password'
                            value={confirmPassword}
                            onChangeText={(text) => setConfirmPassword(text)}
                            secureTextEntry={true}
                            isPassword={true}
                            width={'91%'}
                        />
                    </View>
                    <Pressable  style={{ backgroundColor: 'rgba(0, 104, 117, 1)', width: '95%', height: 50, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 25, borderRadius: 5,marginBottom:10 }}>
                        <Text style={{ fontSize: 16, color: 'rgba(255, 255, 255, 1)', fontFamily: 'Roboto-Medium' }}>Sign Up</Text>
                    </Pressable>
                    <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop:10}}>
                        <Text style={{ color: 'rgba(112, 123, 129, 1)', fontSize: 14, fontFamily: 'Roboto-Regular' }}>Already have an account</Text>
                        <Text style={{ color: 'rgba(0, 104, 117, 1)', fontSize: 14, fontFamily: 'Roboto-Bold' }} onPress={() => {navigation.navigate('SignIn')}}> Sign in </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 15,marginBottom:25 }}>
                        <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontSize: 14, fontFamily: 'Roboto-Regular' }}>Or continue with</Text>
                        <Pressable style={{ marginLeft: 10 }}>
                            <Image source={require('../../assets/images/google.png')} style={{ width: 15, height: 14 }}></Image>
                        </Pressable>
                        <Pressable style={{ marginLeft: 10 }}>
                            <Image source={require('../../assets/images/fb.png')} style={{ width: 15, height: 14 }}></Image>
                        </Pressable>
                </View>
            </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignUpScreen;