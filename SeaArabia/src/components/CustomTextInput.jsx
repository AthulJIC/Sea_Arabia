import React, { useState } from 'react';
import { TextInput, StyleSheet, Text ,View,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function CustomTextInput({ placeholder, onChangeText, value, secureTextEntry,inputHeader,isPassword }){
    const [showPassword, setShowPassword] = useState(isPassword);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };
  return (
    <View style={{width:'91%',justifyContent:'center',alignSelf:'center'}}>
        <Text style={{color:'rgba(27, 30, 40, 0.8)',fontSize:14, fontFamily:'Roboto-Medium',marginTop:10,marginLeft:7}}>{inputHeader}</Text>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          onChangeText={onChangeText}
          value={value}
          secureTextEntry={secureTextEntry}
          placeholderTextColor='rgba(27, 30, 40, 0.3)'
        />
        {isPassword && (
        <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={{ position: 'absolute', right: 25, top: 15 }}>
            <Icon name={showPassword ? 'eye' : 'eye-slash'} size={20} color="gray" />
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