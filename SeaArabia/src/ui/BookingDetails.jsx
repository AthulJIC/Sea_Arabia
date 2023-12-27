import { useState } from "react";
import { View,Text, Pressable ,Image,StyleSheet} from "react-native";
import CustomTextInput from "../components/CustomTextInput";

function BookingDetails(){
    const [selectedOption, setSelectedOption] = useState('Myself');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [email, setEmail] =useState('');
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(count + 1);
    };

    const decrement = () => {
        if (count > 0) {
        setCount(count - 1);
        }
    };

    const handleOptionSelection = (option) => {
        setSelectedOption(option);
    };
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
                />
                <CustomTextInput placeholder='Enter Last Name'
                    inputHeader='Last Name'
                    value={lastName}
                    onChangeText={(text) => setLastName(text)}
                    width='50%'
                />
            </View>
            <View style={{right:9,bottom:15}}>
                <CustomTextInput placeholder='Enter Phone Number'
                    inputHeader='Phone Number'
                    value={mobileNo}
                    onChangeText={(text) => setMobileNo(text)}
                    width='90%'
                />
                <CustomTextInput placeholder='Enter Email'
                    inputHeader='Email'
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    width='90%'
                />
            </View>
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