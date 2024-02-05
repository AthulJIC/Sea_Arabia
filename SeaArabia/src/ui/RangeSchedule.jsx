import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';

const RangeSchedule = ({ data, serviceList, onValueChange }) => {
    console.log('datarange=====', data, serviceList); 
    const [selectedSlots, setSelectedSlots] = useState([]);
  
    const formattedTime = (hour) => {
      const parsedHour = parseInt(hour, 10);
      const isPM = parsedHour >= 12;
      const formattedHour = isPM ? (parsedHour === 12 ? 12 : parsedHour - 12) : parsedHour;
      const period = isPM ? 'PM' : 'AM';
      return `${formattedHour}:00 ${period}`;
    };
  
    const formatTimeRange = (item) => {
      const startTime = formattedTime(item.time);
      const endTime = item.end_time ? formattedTime(item.end_time) : null;
    
      if (endTime) {
        return `${startTime} - ${endTime}`;
      } else {
        return startTime;
      }
    };
  
    const renderTimeSlot = ({ item }) => {
      const timeRange = formatTimeRange(item);
      const isSlotAvailable = checkSlotAvailability(item);
    
      const slotStyle = [
        styles.slot,
        selectedSlots.includes(item.time) ? styles.selectedSlot : null,
        !isSlotAvailable ? styles.disabledSlot : null,
      ];
    
      const textStyles = [
        styles.slotText,
        selectedSlots.includes(item.time) ? styles.selectedSlotText : null,
        !isSlotAvailable ? styles.disabledSlot : null,
      ];
    
      // const handlePress = () => {
      //   if (isSlotAvailable) {
      //     setSelectedSlots((prevSelectedSlots) => {
      //       // Ensure that prevSelectedSlots is always an array
      //       prevSelectedSlots = prevSelectedSlots || [];
      //       if (prevSelectedSlots.includes(item.time)) {
      //         // If the slot is already selected, unselect it
      //         return prevSelectedSlots.filter((slot) => slot !== item.time);
      //       } else {
      //         // If the slot is not selected, select it
      //         console.log('slots====', [...prevSelectedSlots, item.time]);
      //         onValueChange([...prevSelectedSlots, item.time])
      //         return [...prevSelectedSlots, item.time];
      //       }
            
      //     });
      //     // console.log('selecteslots===', selectedSlots);
      //   }
      // };
      // const handlePress = () => {
      //   if (isSlotAvailable) {
      //     setSelectedSlots((prevSelectedSlots) => {
      //       // Ensure that prevSelectedSlots is always an array
      //       prevSelectedSlots = prevSelectedSlots || [];
      
      //       // If the slot is already selected, unselect all slots
      //       if (prevSelectedSlots.includes(item.time)) {
      //         onValueChange([]); // Clear all selected slots
      //         return [];
      //       } else {
      //         // If the slot is not selected, select it
      //         onValueChange([item.time]); // Select only the current slot
      //         return [item.time];
      //       }
      //     });
      //   }
      // };
      const handlePress = () => {
        if (isSlotAvailable) {
          setSelectedSlots((prevSelectedSlots) => {
            // Ensure that prevSelectedSlots is always an array
            prevSelectedSlots = prevSelectedSlots || [];
      
            // If the slot is already selected, unselect all slots
            if (prevSelectedSlots.some(slot => slot === item.time || slot === item.end_time)) {
              onValueChange([]); // Clear all selected slots
              return [];
            } else {
              // If the slot is not selected, select it
              const selectedSlot = item.end_time ? [item.time, item.end_time] : [item.time];
              onValueChange(selectedSlot); // Select the current slot or range
              return selectedSlot;
            }
          });
        }
      };
      
      return (
        <Pressable
          style={slotStyle}
          onPress={handlePress}
          disabled={!isSlotAvailable}
        >
          <Text style={textStyles}>{timeRange}</Text>
        </Pressable>
      );
    };
    
    const checkSlotAvailability = (item) => {
      const startTime = parseInt(item.time, 10);
      const endTime = parseInt(item.end_time, 10);
    
      for (let i = startTime; i <= endTime; i++) {
        const slotData = data[0].find((slot) => slot.time === i);
        if (!slotData || !slotData.make_slot_available) {
          return false;
        }
      }
    
      return true;
    };  
    return (
      <View style={styles.container}>
        <FlatList
          data={serviceList}
          numColumns={5}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderTimeSlot}
        />
      </View>
    );
  };
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
  },
  slot: {
    backgroundColor: '#fff',
    margin: 5,
    borderRadius: 9,
    borderWidth: 0.5,
    borderColor: 'rgba(0, 0, 0, 0.7)',
    height: 30,
    width: 100, // Adjust the width based on your requirement
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedSlot: {
    backgroundColor: 'rgba(0, 104, 117, 0.6)',
  },
  slotText: {
    color: '#333',
    fontSize: 11,
  },
  selectedSlotText: {
    color: 'black',
  },
  disabledSlot: {
    backgroundColor: 'gray', // Change this to the desired background color for disabled slots
},
});

export default RangeSchedule;