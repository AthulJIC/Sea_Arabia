import React, { useState } from 'react';

import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';


// const timeSlots = ['7:00 AM', '7:30 AM', '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM', '10:30 PM', '11:00 PM', '11:30 PM', '12:00 AM', '12:30 AM', '1:00 AM', '1:30 AM', '2:00 AM', '2:30 AM', '3:00 AM', '3:30 AM', '4:00 AM', '4:30 AM', '5:00 AM', '5:30 AM', '6:00 AM', '6:30 AM'];


const TimeSchedule = ({data,hourValue}) => {
  console.log('data=====', data, hourValue);
  const [selectedSlots, setSelectedSlots] = useState([]);

  
  const renderTimeSlot = ({ item }) => {
    console.log('item.time', item);
    const formattedTime = formatTime(item.time);
    const isSlotAvailable = item.make_slot_available;
    
    // const selectSlot = (slot) => {
    //   setSelectedSlots((prevSelectedSlots) => {
    //     let updatedSelectedSlots = [...prevSelectedSlots];
    
    //     const selectedIndex = updatedSelectedSlots.indexOf(slot);
    
    //     if (selectedIndex !== -1) {
    //       // If the clicked slot is already selected
    //       const slotIndex = timeSlots.findIndex((item) => item.time === slot);
    
    //       // Deselect the previous slot if re-selecting an intermediate slot within the hourValue range
    //       if (slotIndex > 0) {
    //         const prevSlot = timeSlots[slotIndex - 1].time;
    //         const prevSlotIndex = updatedSelectedSlots.indexOf(prevSlot);
    //         if (prevSlotIndex !== -1) {
    //           updatedSelectedSlots.splice(prevSlotIndex, 1);
    //         }
    //       }
    
    //       // Deselect the clicked slot
    //       updatedSelectedSlots = updatedSelectedSlots.filter((selectedSlot) => selectedSlot !== slot);
    
    //       // Select subsequent slots based on hourValue
    //       for (let i = 0; i < hourValue; i++) {
    //         const nextIndex = slotIndex + i;
    //         const nextSlot = timeSlots[nextIndex]?.time;
    //         if (
    //           nextSlot &&
    //           !updatedSelectedSlots.includes(nextSlot) &&
    //           timeSlots[nextIndex].make_slot_available
    //         ) {
    //           updatedSelectedSlots.push(nextSlot);
    //         } else {
    //           break; // Break the loop if the consecutive slots are not available
    //         }
    //       }
    //     } else {
    //       // If the clicked slot is not selected
    //       updatedSelectedSlots = [slot]; // Select the clicked slot
    
    //       // Select subsequent slots based on hourValue
    //       const slotIndex = timeSlots.findIndex((item) => item.time === slot);
    //       for (let i = 1; i < hourValue; i++) {
    //         const nextIndex = slotIndex + i;
    //         if (
    //           nextIndex < timeSlots.length &&
    //           timeSlots[nextIndex].make_slot_available
    //         ) {
    //           updatedSelectedSlots.push(timeSlots[nextIndex].time);
    //         } else {
    //           break; // Break the loop if the consecutive slots are not available
    //         }
    //       }
    //     }
    
    //     return updatedSelectedSlots;
    //   });
    // };
    
    const selectSlot = (slot) => {
      if (hourValue === undefined || hourValue === 0) {
        // Display an alert if hourValue is undefined or not a positive integer
        alert("Please select the Duration to select the slots");
        return;
      }
      setSelectedSlots((prevSelectedSlots) => {
        let updatedSelectedSlots = [...prevSelectedSlots];

        const selectedIndex = updatedSelectedSlots.indexOf(slot);

        if (selectedIndex !== -1) {
          // If the clicked slot is already selected
          const slotIndex = timeSlots.findIndex((item) => item.time === slot);

          // Deselect the previous slot if re-selecting an intermediate slot within the hourValue range
          if (slotIndex > 0) {
            const prevSlot = timeSlots[slotIndex - 1].time;
            const prevSlotIndex = updatedSelectedSlots.indexOf(prevSlot);
            if (prevSlotIndex !== -1) {
              updatedSelectedSlots.splice(prevSlotIndex, 1);
            }
          }

          // Deselect the clicked slot
          updatedSelectedSlots = updatedSelectedSlots.filter((selectedSlot) => selectedSlot !== slot);

          // Select subsequent slots based on hourValue
          for (let i = 0; i < hourValue; i++) {
            const nextIndex = slotIndex + i;
            const nextSlot = timeSlots[nextIndex]?.time;

            // Check if there are subsequent slots available
            if (!nextSlot) {
              if (hourValue > 1) {
                // Display an alert if there's no subsequent slot and hourValue > 1
                alert("There's no subsequent slot. Please try another slot.");
                return prevSelectedSlots; // Return the previous selected slots
              } else {
                break; // Break the loop if hourValue is 1
              }
            }

            if (!updatedSelectedSlots.includes(nextSlot) && timeSlots[nextIndex].make_slot_available) {
              updatedSelectedSlots.push(nextSlot);
            } else {
              break; // Break the loop if the consecutive slots are not available
            }
          }
        } else {
          // If the clicked slot is not selected
          updatedSelectedSlots = [slot]; // Select the clicked slot

          // Select subsequent slots based on hourValue
          const slotIndex = timeSlots.findIndex((item) => item.time === slot);
          for (let i = 1; i < hourValue; i++) {
            const nextIndex = slotIndex + i;
            const nextSlot = timeSlots[nextIndex]?.time;

            // Check if there are subsequent slots available
            if (!nextSlot) {
              if (hourValue > 1) {
                // Display an alert if there's no subsequent slot and hourValue > 1
                alert("There's no subsequent slot. Please try another slot.");
                return prevSelectedSlots; // Return the previous selected slots
              } else {
                break; // Break the loop if hourValue is 1
              }
            }

            if (timeSlots[nextIndex].make_slot_available) {
              updatedSelectedSlots.push(nextSlot);
            } else {
              break; // Break the loop if the consecutive slots are not available
            }
          }
        }

        return updatedSelectedSlots;
      });
    };
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
  
    return (
      <Pressable
      style={slotStyle}
      onPress={onPressHandler}
      disabled={!isSlotAvailable}
    >
      <Text style={textStyles}>{formattedTime}</Text>
    </Pressable>
    );
  };
  const formatTime = (hour) => {
    console.log('hour', hour);
    const parsedHour = parseInt(hour, 10); // Ensure hour is parsed as an integer
    if (!isNaN(parsedHour) && parsedHour >= 0 && parsedHour <= 23) {
      if (parsedHour === 0) {
        return '12:00 AM';
      } else if (parsedHour < 12) {
        return parsedHour + ':00 AM';
      } else if (parsedHour === 12) {
        return '12:00 PM';
      } else {
        return (parsedHour - 12) + ':00 PM';
      }
    } else {
      return ''; // Return empty string for invalid hours
    }
  };
  
  const timeSlots = data && Array.isArray(data[0]) ? data[0] : [];

  return (
    <View style={styles.container}>
      <FlatList
        data={timeSlots}
        numColumns={5}
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
    // padding: 10,
    margin: 5, // Add margin between time slots
    borderRadius: 9,
    borderWidth: 0.5,
    borderColor: 'rgba(0, 0, 0, 0.7)',
    height:30,
    width:60,
    alignItems:'center',
    justifyContent:'center'
  },
  selectedSlot: {
    backgroundColor: 'rgba(0, 104, 117, 0.6)',
    
  },
  slotText: {
    color: '#333',
    fontSize: 11,
  },
  selectedSlotText:{
    color:'black'
  }
});

export default TimeSchedule;