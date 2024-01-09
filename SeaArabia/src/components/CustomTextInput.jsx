import React, { useState } from 'react';
import { TextInput, StyleSheet, Text ,View,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Styles from '../public/Styles';


function CustomTextInput({ placeholder, onChangeText, value, secureTextEntry,inputHeader,isPassword, width,keyboardType ,maxLength, onFocus}){
    const [showPassword, setShowPassword] = useState(isPassword);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };
  return (
    <View style={{width:width,justifyContent:'center',alignSelf:'center',marginLeft:5}}>
        <Text style={{color:'rgba(27, 30, 40, 0.8)',fontSize:14, fontFamily:'Roboto-Medium',marginTop:10,marginLeft:7}}>{inputHeader}</Text>
        <TextInput
          style={Styles.input}
          placeholder={placeholder}
          onChangeText={onChangeText}
          value={value}
          secureTextEntry={secureTextEntry && !showPassword}
          placeholderTextColor='rgba(27, 30, 40, 0.3)'
          keyboardType={keyboardType}
          maxLength={maxLength}
          onFocus={onFocus}
        />
        {isPassword && (
        <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={{ position: 'absolute', right: 25, top: 50 }}>
            <Icon name={showPassword ? 'visibility' : 'visibility-off'} size={20} color="gray" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor:'rgba(247, 247, 249, 1)',
    borderRadius:12,
    marginTop:10
  },
});

export default CustomTextInput;