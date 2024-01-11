import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';

const RangeSchedule = ({ data, serviceList }) => {
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
      const endTime = formattedTime(item.end_time);
      if (endTime) {
        return `${startTime} - ${endTime}`;
      } else {
        return startTime;
      }
    };
  
    const isSlotAvailable = (start, end, data) => {
        console.log('dataavailable', data);
        if (data[0] && data[0].length > 0) {
          const startTimeIndex = data[0].findIndex((slot) => slot.time === start);
          const endTimeIndex = data[0].findIndex((slot) => slot.time === end);
      
          if (startTimeIndex !== -1 && endTimeIndex !== -1) {
            return data[0]
              .slice(startTimeIndex, endTimeIndex + 1)
              .every((slot) => slot.make_slot_available);
          }
        }
      
        return false;
      };
  
      const renderTimeSlot = ({ item }) => {
        const timeRange = formatTimeRange(item);
        const isSlotAvailable = item.make_slot_available;
      
        const slotStyle = [
          styles.slot,
          selectedSlots.includes(item.time) ? styles.selectedSlot : null,
          !isSlotAvailable ? styles.disabledSlot : null,
        ];
      
        const textStyles = [
          styles.slotText,
          selectedSlots.includes(item.time) ? styles.selectedSlotText : null,
          !isSlotAvailable ? styles.disabledSlotText : null,
        ];
      
        const onPressHandler = () => {
          if (isSlotAvailable) {
            selectSlot(item.time);
          }
        };
      
        // Check availability for each slot in the range
        const isRangeAvailable = () => {
            if (Array.isArray(serviceList) && serviceList.length > 0 && Array.isArray(data) && data.length > 0 && Array.isArray(data[0])) {
                for (const service of serviceList) {
                    const startTime = parseInt(service.time, 10);
                    const endTime = parseInt(service.end_time, 10);
        
                    const rangeAvailable = data[0].slice(startTime, endTime + 1).every((slot) => slot.make_slot_available);
                    console.log('rangeAvailable',rangeAvailable);
                    if (!rangeAvailable) {
                        return false; // If any part of the range is not available, return false
                    }
                }
        
                return true; // If all parts of the range are available, return true
            }
        
            return false;
        };
        
      
        return (
          <Pressable
            style={slotStyle}
            onPress={onPressHandler}
            disabled={!isRangeAvailable()}
          >
            <Text style={textStyles}>{timeRange}</Text>
          </Pressable>
        );
      };
  
    const selectSlot = (slot) => {
      // Your selectSlot logic here
      console.log('Selected Slot:', slot);
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