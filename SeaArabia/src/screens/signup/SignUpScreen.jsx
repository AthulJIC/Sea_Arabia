import { View,Text, SafeAreaView, KeyboardAvoidingView, ScrollView ,Pressable,Image, TextInput, Keyboard} from "react-native"
import CustomTextInput from "../../components/CustomTextInput";
import { useState } from "react";
import CustomDatePicker from "../../components/CustomDatePicker";
import { SelectList } from 'react-native-dropdown-select-list';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Styles from "../../public/Styles";
import { useNavigation } from "@react-navigation/native";
import { SignupApi } from "../../Services/signup/SignupService";
import moment from 'moment';
import useBackButtonHandler from "../../components/BackHandlerUtils";


function SignUpScreen(){
    const navigation = useNavigation();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNo, setMobileNo] = useState()
    const [location, setLocation] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [date, setDate] = useState('');
    const [selected, setSelected] = useState("");
    const genderOptions = ['Male', 'Female'];
    const [isOpen, setIsOpen] = useState(false);
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false)
    const [emailError, setEmailError] = useState(false);
    const [mobileError, setMobileError] = useState(false);
    const [locationError, setLocationError] = useState(false);
    const [dateError, setDateError] = useState(false);
    const [genderError, setGenderError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordErrror] = useState(false);
    console.log('location=====', location,selected,date);
    useBackButtonHandler(navigation, false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    
      const handleSelect = (value) => {
        console.log('value', value);
        setGenderError(false);
        // setSelected(value);
        setIsOpen(false); // Close dropdown after selection
    };
    
    function signupHandler(){
        Keyboard.dismiss();
        let isValid = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const numbersOnlyRegex = /^[0-9]+$/;
        const regex = /^[a-zA-Z][a-zA-Z ]*$/;
        if(!firstName || firstName === '' || !regex.test(firstName)){
            isValid = false;
            setFirstNameError(true)
        }
        if(!lastName || lastName === "" || !regex.test(lastName)){
            isValid = false;
            setLastNameError(true);
        }
        if(!emailRegex.test(email) || email === ''){
            isValid = false;
            setEmailError(true);
        }
        if(mobileNo === '' || !numbersOnlyRegex.test(mobileNo) || mobileNo.length !== 10){
            isValid = false;
            setMobileError(true);
        }
        if(!regex.test(location) || location === ''){
            isValid = false;
            setLocationError(true);
        }
        if(!date){
           isValid = false;
           setDateError(true)
        }
        if(selected === undefined){
            isValid = false;
            setGenderError(true);
        }
        if(password === ''){
            isValid = false;
            setPasswordError(true);
        }
        if(confirmPassword === '' || confirmPassword !== password ){
            isValid = false;
            setConfirmPasswordErrror(true);
        }
        if(isValid){
            console.log('Signup');
            const data = {
                "first_name": firstName,
                "last_name": lastName,
                "email": email,
                "mobile": mobileNo,
                "password": password,
                "profile_extra": {
                    "location": 'c8fa1d04-d83c-4b05-8c78-9419e0a26965',
                    "dob":date,
                    "gender": selected,
                    "images": ""
                }
            }
            console.log('data=====', data);
            SignupApi.postSignup(data).then((res) => {
                  console.log(res.status);
                  if(res.status === 201){
                    navigation.navigate('HomeScreen');
                  }
            }).catch((err) => {
                console.error(err);
            })
        }
    }
    function dateHandler(newValues){
       const dob = moment(newValues,'DD-MM-YYYY').format('YYYY-MM-DD')
        setDate(dob);
        console.log('date', dob);
    }
    function onDateError(error) {
        setDateError(error)
    }
    return(
        <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
            <ScrollView>
            <KeyboardAvoidingView
                style={{ width: '100%' }}>              
                <View>
                    <Text style={{marginLeft:'auto',right:20,color:'rgba(0, 104, 117, 1)',fontSize:18,marginTop:20,fontFamily:'Roboto-Medium'}} onPress={() => navigation.goBack()}>Skip</Text>
                    <Text style={{textAlign:'center', color:'rgba(27, 30, 40, 1)',fontSize:26,marginTop:7,fontFamily:'Roboto-Medium'}}>Sign up now</Text>
                    <Text style={{textAlign:'center', color:'rrgba(125, 132, 141, 1)',fontSize:16,marginTop:10,fontFamily:'Roboto-Regular'}}>Please fill the details and create account</Text>
                    </View>
                    <View style={{marginTop:25}}>
                        <CustomTextInput placeholder='Enter First Name'
                            inputHeader='First Name'
                            value={firstName}
                            onChangeText={(text) => setFirstName(text)}
                            width={'91%'}
                            maxLength={25}
                            onFocus={() => setFirstNameError(false)}
                        />
                        {firstNameError && (
                            <View style={{marginLeft:25}}>
                                <Text style={{color:'red', fontFamily:'Roboto-Regular', fontSize:13,marginBottom:10}}>Enter valid Firstname</Text>
                            </View>
                        )}
                        <CustomTextInput placeholder='Enter Last Name'
                            inputHeader='Last Name'
                            value={lastName}
                            onChangeText={(text) => setLastName(text)}
                            width={'91%'}
                            maxLength={25}
                            onFocus={() => setLastNameError(false)}
                            />
                        {lastNameError && (
                            <View style={{marginLeft:25}}> 
                                <Text style={{color:'red', fontFamily:'Roboto-Regular', fontSize:13,marginBottom:10}}>Enter valid Lastname</Text>
                            </View>
                        )}
                        <CustomTextInput placeholder='Enter E- Mail'
                            inputHeader='E- Mail'
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            width={'91%'}
                            keyboardType='email-address'
                            onFocus={() => setEmailError(false)}
                        />
                        {emailError && (
                            <View style={{marginLeft:25}}>
                                <Text style={{color:'red', fontFamily:'Roboto-Regular', fontSize:13,marginBottom:10}}>Enter valid email</Text>
                            </View>
                        )}
                         <CustomTextInput placeholder='Enter Mobile No'
                            inputHeader='Mobile No'
                            value={mobileNo}
                            onChangeText={(text) => setMobileNo(text)}
                            width={'91%'}
                            keyboardType='phone-pad'
                            maxLength={10}
                            onFocus={() => setMobileError(false)}
                        />
                        {mobileError && (
                            <View style={{marginLeft:25}}>
                                <Text style={{color:'red', fontFamily:'Roboto-Regular', fontSize:13,marginBottom:10}}>Enter valid mobile no</Text>
                            </View>
                        )}
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
                                    onFocus={() => setLocationError(false)}
                                />
                            </View>
                        {locationError && (
                            <View style={{marginLeft:5}}>
                                <Text style={{color:'red', fontFamily:'Roboto-Regular', fontSize:13,marginBottom:10}}>Enter valid location</Text>
                            </View>
                        )}
                        </View>
                        <View style={{marginLeft:20,marginTop:10, flexDirection:'row',marginBottom:10}}>
                            <View>
                                <Text style={{color:'rgba(27, 30, 40, 0.8)', fontSize:14, fontFamily:'Roboto-Medium'}}>Date of Birth</Text>
                                <CustomDatePicker onValueChange={dateHandler} onDateError={onDateError}/>
                                {dateError && (
                                    <View style={{marginLeft:5}}>
                                        <Text style={{color:'red', fontFamily:'Roboto-Regular', fontSize:13,marginBottom:10}}>Please select DOB</Text>
                                    </View>
                                 )}
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
                        {genderError && (
                            <View style={{marginLeft:'auto',right:75,bottom:20}}>
                                <Text style={{color:'red', fontFamily:'Roboto-Regular', fontSize:13,marginBottom:10}}>Select gender</Text>
                            </View>
                        )}
                        <CustomTextInput placeholder='Enter Password'
                            inputHeader='Password'
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry={true}
                            isPassword={true}
                            width={'91%'}
                            onFocus={() => setPasswordError(false)}
                        />
                        {passwordError && (
                            <View style={{marginLeft:25}}>
                                <Text style={{color:'red', fontFamily:'Roboto-Regular', fontSize:13,marginBottom:10}}>Enter valid password</Text>
                            </View>
                        )}
                        <CustomTextInput placeholder='Enter Password'
                            inputHeader='Confirm Password'
                            value={confirmPassword}
                            onChangeText={(text) => setConfirmPassword(text)}
                            secureTextEntry={true}
                            isPassword={true}
                            width={'91%'}
                            onFocus={() => setConfirmPasswordErrror(false)}
                        />
                        {confirmPasswordError && (
                            <View style={{marginLeft:25}}>
                                <Text style={{color:'red', fontFamily:'Roboto-Regular', fontSize:13,marginBottom:10}}>Enter valid confrim password</Text>
                            </View>
                        )}
                    </View>
                    <Pressable  style={{ backgroundColor: 'rgba(0, 104, 117, 1)', width: '95%', height: 50, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 25, borderRadius: 5,marginBottom:10 }} onPress={signupHandler}>
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
                        {/* <Pressable style={{ marginLeft: 10 }}>
                            <Image source={require('../../assets/images/fb.png')} style={{ width: 15, height: 14 }}></Image>
                        </Pressable> */}
                </View>
            </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignUpScreen;