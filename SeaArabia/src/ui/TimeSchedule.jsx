import React, { useState } from 'react';

import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';


const timeSlots = ['7:00 AM', '7:30 AM', '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM', '10:30 PM', '11:00 PM', '11:30 PM', '12:00 AM', '12:30 AM', '1:00 AM', '1:30 AM', '2:00 AM', '2:30 AM', '3:00 AM', '3:30 AM', '4:00 AM', '4:30 AM', '5:00 AM', '5:30 AM', '6:00 AM', '6:30 AM'];


const TimeSchedule = () => {
  const [selectedSlots, setSelectedSlots] = useState([]);

  const selectSlot = (slot) => {
    if (selectedSlots.includes(slot)) {
      setSelectedSlots(selectedSlots.filter((s) => s !== slot));
    } else {
      setSelectedSlots([...selectedSlots, slot]);
    }
  };

  const renderTimeSlot = ({ item }) => {
    return (
      <Pressable
        style={[styles.slot, selectedSlots.includes(item) ? styles.selectedSlot : null]}
        onPress={() => selectSlot(item)}
      >
        <Text style={[styles.slotText,selectedSlots.includes(item) ? styles.selectedSlotText : null]}>{item}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={timeSlots}
        numColumns={4}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderTimeSlot}
        // contentContainerStyle={styles.timeSlotList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:15
  },
  timeSlotList: {
    paddingHorizontal: 5, // Add padding to the FlatList content
  },
  slot: {
    backgroundColor: '#fff',
    padding: 10,
    margin: 5, // Add margin between time slots
    borderRadius: 9,
    borderWidth: 0.5,
    borderColor: 'rgba(0, 0, 0, 0.7)',
    height:40,
    width:77,
    alignItems:'center',
    justifyContent:'center'
  },
  selectedSlot: {
    backgroundColor: 'rgba(0, 104, 117, 0.6)',
    
  },
  slotText: {
    color: '#333',
    fontSize: 13,
    textAlign: 'center',
  },
  selectedSlotText:{
    color:'black'
  }
});

export default TimeSchedule;