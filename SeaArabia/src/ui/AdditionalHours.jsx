import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AdditionalHours = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={decrement} style={styles.button}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
      <Text style={styles.counter}>{count}</Text>
      <TouchableOpacity onPress={increment} style={styles.button}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
      <Text style={{color:'rgba(63, 72, 73, 1)',fontSize:12,fontFamily:'Roboto-Regular',marginLeft:'auto',right:20}}>0 Hours</Text>
    </View>
  );
};

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

export default AdditionalHours;