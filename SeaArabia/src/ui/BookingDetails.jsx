import { useEffect, useState } from "react";
import { View,Text, Pressable ,Image,StyleSheet, Alert} from "react-native";
import CustomTextInput from "../components/CustomTextInput";
import { useAppContext } from "../context/AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

function BookingDetails({updateBookingDetails,addGuest, capacity}){
    const [selectedOption, setSelectedOption] = useState('Myself');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [email, setEmail] =useState('');
    const [count, setCount] = useState(0);
    const [ userType, setUserType] = useState();
    const {details} =useAppContext();

    useEffect(async () => {
        const user_type = await AsyncStorage.getItem('User');
        console.log('user_type',user_type);
        setUserType(user_type);
        if(selectedOption === 'Myself' && user_type === 'Register'){
            if(details){
                setFirstName(details?.first_name);
                setLastName(details?.last_name);
                setEmail(details?.email);
                setMobileNo(details?.mobile)
            }
            else{
                setFirstName('');
                setLastName('');
                setEmail('');
                setMobileNo('')
            }
        }
    },[])

    const increment = () => {
        if(capacity > count){
            setCount(count + 1);
        }
        else Alert.alert('Maximum Reached')
    };

    const decrement = () => {
        if (count > 0) {
        setCount(count - 1);
        }
    };

    const handleOptionSelection = (option) => {
        console.log('option====', option);
        if(option === 'Myself' && userType === 'Register'){
            setFirstName(details?.first_name);
            setLastName(details?.last_name);
            setEmail(details?.email);
            setMobileNo(details?.mobile)
        }
        else{
            setFirstName('');
            setLastName('');
            setEmail('');
            setMobileNo('')
        }
        setSelectedOption(option);
    };
    updateBookingDetails({
        selectedOption: selectedOption,
        firstName: firstName,
        lastName: lastName,
        mobileNo: mobileNo,
        email: email,
        count: count,
      });
    return(
        <View>
            <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontSize: 16, fontFamily: 'Roboto-Medium',margin:20 }}>Booking Details</Text>
            <View style={{ flexDirection: 'row', marginLeft: 17,marginTop:7 }}>
                <Pressable
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                    onPress={() => handleOptionSelection('Myself')}
                    >
                    <Image
                        source={
                        selectedOption === 'Myself'
                            ? require('../assets/images/RadioActive.png')
                            : require('../assets/images/RadioInactive.png')
                        }
                        style={{ width: 20, height: 20 }}
                    ></Image>
                    <Text style={{ color: 'rgba(15, 15, 15, 1)', fontSize: 14, fontFamily: 'Roboto-Regular', marginLeft: 5, textAlign: 'center', marginTop: 2 }}>
                        For Myself
                    </Text>
                </Pressable>
                <Pressable
                    style={{ flexDirection: 'row', marginLeft: 10, alignItems: 'center' }}
                    onPress={() => handleOptionSelection('SomeoneElse')}
                    >
                    <Image
                        source={
                        selectedOption === 'SomeoneElse'
                            ? require('../assets/images/RadioActive.png')
                            : require('../assets/images/RadioInactive.png')
                        }
                        style={{ width: 20, height: 20 }}
                    ></Image>
                    <Text style={{ color: 'rgba(15, 15, 15, 1)', fontSize: 14, fontFamily: 'Roboto-Regular', marginLeft: 5, marginTop: 2 }}>
                        For Someone Else
                    </Text>
                </Pressable>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between',margin:17,right:9}}>
                <CustomTextInput placeholder='Enter First Name'
                    inputHeader='First Name'
                    value={firstName}
                    onChangeText={(text) => setFirstName(text)}
                    width='47%'
                    editable={userType === 'Register' && selectedOption === 'Myself' ? false : true}
                />
                <CustomTextInput placeholder='Enter Last Name'
                    inputHeader='Last Name'
                    value={lastName}
                    onChangeText={(text) => setLastName(text)}
                    width='50%'
                    editable={userType === 'Register' && selectedOption === 'Myself' ? false : true}
                />
            </View>
            <View style={{right:9,bottom:15}}>
                <CustomTextInput placeholder='Enter Phone Number'
                    inputHeader='Phone Number'
                    value={mobileNo}
                    onChangeText={(text) => setMobileNo(text)}
                    width='90%'
                    editable={userType === 'Register' && selectedOption === 'Myself' ? false : true}
                />
                <CustomTextInput placeholder='Enter Email'
                    inputHeader='Email'
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    width='90%'
                    editable={userType === 'Register' && selectedOption === 'Myself' ? false : true}
                />
            </View>
            {
                addGuest && (
                    <View style={{flexDirection:'row',alignItems:'center',marginBottom:20}}>
                        <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontSize: 16, fontFamily: 'Roboto-Regular',marginLeft:17,marginHorizontal:15 }}>Number Of Additional Guests</Text>
                        <Pressable onPress={decrement} style={styles.button}>
                            <Text style={styles.buttonText}>-</Text>
                        </Pressable>
                        <Text style={styles.counter}>{count}</Text>
                        <Pressable onPress={increment} style={styles.button}>
                            <Text style={styles.buttonText}>+</Text>
                        </Pressable>
                    </View>
                )
            }
            <View style={{ backgroundColor: 'rgba(245, 245, 245, 1)', height: 4, width: '100%' }}></View>
        </View>
    )
}

export default BookingDetails;

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      // alignItems: 'center',
      // justifyContent: 'center',
      marginTop:20,
      backgroundColor:'rgba(247, 247, 249, 1)',
      width:'95%',
      height:55,
      alignItems:'center',
      borderRadius:5
    },
    button: {
      backgroundColor: 'rgba(255, 255, 255, 1)',
      borderRadius: 15 ,
      borderColor:'rgba(0, 0, 0, 0.8)',
      borderWidth:0.5,
      width:30,
      height:30,
      alignItems:'center',
      justifyContent:'center',
      marginLeft:9
    },
    buttonText: {
      fontSize: 20,
      color:'rgba(151, 151, 151, 1)'
    },
    counter: {
      fontSize: 18,
      marginLeft: 10,
      color:'rgba(0, 0, 0, 0.8)'
    },
  });