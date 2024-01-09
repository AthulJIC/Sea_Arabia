import { View,Text, SafeAreaView ,Pressable,Image,TextInput,ScrollView,KeyboardAvoidingView,Keyboard} from "react-native";
import BackIcon from "../../assets/icon/BackIcon";
import Styles from "../../public/Styles";
import CustomTextInput from "../../components/CustomTextInput";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import CustomDatePicker from "../../components/CustomDatePicker";
import { SelectList } from 'react-native-dropdown-select-list';
import Icon from 'react-native-vector-icons/MaterialIcons'
import moment from 'moment';
import useBackButtonHandler from "../../components/BackHandlerUtils";
import { useAppContext } from "../../context/AppContext";
import { ProfileApi } from "../../Services/profile/ProfileService";
import AsyncStorage from "@react-native-async-storage/async-storage";


function EditUserScreen(){
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
    const [gender, setGender] = useState();
    const genderOptions = [
        {key:1,value:'Male'}, {key:2,value : 'Female'}
    ];
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
    const {details} =useAppContext();
    const [userId, setUserId] = useState();
    console.log('details====', selected);
    useBackButtonHandler(navigation, false);

    const handleSelect = (value) => {
        console.log('value', value);
        setGenderError(false);
        // setSelected(value);
        setIsOpen(false); // Close dropdown after selection
    };
    function dateHandler(newValues){
        const dob = moment(newValues,'DD-MM-YYYY').format('YYYY-MM-DD')
         setDate(dob);
         console.log('date', dob);
    }
    function onDateError(error) {
        setDateError(error)
    }
    useFocusEffect(
        useCallback(() => {
        const retrieveUserName = async () => {
        try {
            const user_id = await AsyncStorage.getItem('userId');
            setUserId(user_id);
            setFirstName(details?.first_name);
            setLastName(details?.last_name);
            setEmail(details?.email);
            setMobileNo(details?.mobile);
            setLocation(details?.profileextra?.location.country)
            // setSelected(details?.profileextra.gender); 
            console.log('details====', selected);
            setDate(details?.profileextra.dob)
        } catch (error) {
            console.error('Error retrieving username from AsyncStorage:', error);
        }
        };

        retrieveUserName();
    }, [details])
    );
    function submitHandler(){
        alert('test')
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
        if(gender === undefined){
            isValid = false;
            setGenderError(true);
        }
        if(isValid){
            console.log('Signup');
            const data = {
                    "first_name" : firstName,
                    "last_name" : lastName,
                    "email": email,
                    "mobile": mobileNo,
                    "profileextra": {
                      "location": "c8fa1d04-d83c-4b05-8c78-9419e0a26965",
                      "dob":date,
                      "gender": gender
                    }
                  
            }
            console.log('data=====', data);
            ProfileApi.updateProfileDetails(userId,data).then((res) => {
                  console.log(res.status);
                  if(res.status === 200){
                    navigation.goBack();
                  }
            }).catch((err) => {
                console.error(err);
            })
        }
    }
    return(
        <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
            <ScrollView>
                <KeyboardAvoidingView
                    style={{ width: '100%' }}>   
                    <View style={{flexDirection:'row', justifyContent:'space-between',alignItems:'center',marginTop:20}}>
                        <Pressable style={[Styles.backIcon]} onPress={() => navigation.goBack()}>
                            <BackIcon color='#1B1E28'></BackIcon>
                        </Pressable>
                        <Text style={{fontSize:14, fontFamily:'Roboto-Regular', color:'rgba(27, 30, 40, 0.8)',right:15}}>Edit Profile</Text>
                        <Text style={{fontSize:16, fontFamily:'Roboto-Regular', color:'rgba(0, 104, 117, 1)',right:10,bottom:5}} onPress={submitHandler}>Done</Text>
                    </View>
                    <Pressable style={{justifyContent:'center', alignItems:'center'}}>
                        <Image source={require('../../assets/images/ProfilePic.png')} style={{ width: 96, height: 96, marginTop: 10 }}></Image>
                    </Pressable>
                    <Text style={{color:'rgba(27, 30, 40, 1)', fontSize:16, fontFamily:'Roboto-Medium',marginTop:20, textAlign:'center'}}>{details?.first_name ? details.first_name.charAt(0).toUpperCase() + details.first_name.slice(1) : ''}
                        {' '}
                        {details?.last_name ? details.last_name.charAt(0).toUpperCase() + details.last_name.slice(1) : ''}
                    </Text>                    
                    <Text style={{fontSize:16, fontFamily:'Roboto-Regular',color:'rgba(0, 104, 117, 1)',textAlign:'center',marginTop:15}}>Change Profile Picture</Text>
                    <View style={{marginTop:25,marginBottom:50}}>
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
                                <CustomDatePicker onValueChange={dateHandler} onDateError={onDateError} dateValue = {date}/>
                                {dateError && (
                                    <View style={{marginLeft:5}}>
                                        <Text style={{color:'red', fontFamily:'Roboto-Regular', fontSize:13,marginBottom:10}}>Please select DOB</Text>
                                    </View>
                                    )}
                            </View>
                            <View style={{marginLeft:'auto',right:15}}>
                                <Text style={{color:'rgba(27, 30, 40, 0.8)', fontSize:14, fontFamily:'Roboto-Medium',left:5}}>Gender</Text>
                                    <SelectList 
                                       defaultOption={genderOptions.find(option => option.value === details?.profileextra.gender)}
                                        onSelect={(value) => {
                                            setSelected(value);
                                            const selectedGender = genderOptions.find(option => option.key === 2)?.value;
                                            setGender(selectedGender)
                                            console.log('details+====', selected,selectedGender, gender);
                                          }}
                                        setSelected={setSelected}
                                        data={genderOptions} 
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
                        {/* <CustomTextInput placeholder='Enter Password'
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
                        )} */}
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    )
}

export default EditUserScreen;