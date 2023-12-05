import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions ,Modal,StyleSheet} from 'react-native';

const { width } = Dimensions.get('window');

const CustomDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const years = [];
  const months = [];
  const days = [];
  console.log('years', years);
  // Populate years, months, and days
  for (let i = 1900; i <= new Date().getFullYear() + 20; i++) {
    years.push(i);
  }
  for (let i = 1; i <= 12; i++) {
    months.push(i);
  }
  for (let i = 1; i <= 31; i++) {
    days.push(i);
  }
  const hideDatePicker = () => {
    setShowDatePicker(false);
  };
  const handleYearChange = index => {
    const newDate = new Date(selectedDate);
    newDate.setFullYear(years[index]);
    setSelectedDate(newDate);
    //setShowDatePicker(false);
  };

  const handleMonthChange = index => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(months[index] - 1);
    setSelectedDate(newDate);
    //setShowDatePicker(false);
  };

  const handleDayChange = index => {
    const newDate = new Date(selectedDate);
    newDate.setDate(days[index]);
    setSelectedDate(newDate);
    // setShowDatePicker(false);
  };

  return (
    <View>
      {showDatePicker && (
        <Modal
        animationType="fade"
        transparent={true}
        visible={showDatePicker}
        onRequestClose={hideDatePicker}
      >
      <View style={styles.modalBackground}>
      <View style={styles.modalContainer}>
        <ScrollView
          style={{height:150,}}
          contentContainerStyle={{ alignItems: 'center'}}
          showsVerticalScrollIndicator={false}
          onMomentumScrollEnd={event => {
            const index = Math.round(event.nativeEvent.contentOffset.y / 30);
            handleYearChange(index);
          }}
        > 
          {years.map((year, index) => (
              <TouchableOpacity key={index} style={{ height: 40 }} onPress={() => setShowDatePicker(false)}>
                <Text style={{ fontSize: 20 }}>{year}</Text>
              </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={{width:'30%',alignSelf:'center'}}>
          <View style={{ borderTopColor: 'rgba(0, 104, 117, 1)', borderTopWidth:  1, width: '100%', alignSelf: 'center',marginTop:15,marginBottom:40 }}></View>
          <View style={{ borderBottomColor: 'rgba(0, 104, 117, 1)', borderBottomWidth:  1, width: '100%', alignSelf: 'center' }}></View>
        </View>
        <View style={{width:'30%',alignSelf:'center',marginLeft:15}}>
          <View style={{ borderTopColor: 'rgba(0, 104, 117, 1)', borderTopWidth:  1, width: '100%', alignSelf: 'center',marginTop:15,marginBottom:40 }}></View>
          <View style={{ borderBottomColor: 'rgba(0, 104, 117, 1)', borderBottomWidth:  1, width: '100%', alignSelf: 'center' }}></View>
        </View>
        <View style={{width:'30%',alignSelf:'center',marginLeft:15}}>
          <View style={{ borderTopColor: 'rgba(0, 104, 117, 1)', borderTopWidth:  1, width: '100%', alignSelf: 'center',marginTop:15,marginBottom:40 }}></View>
          <View style={{ borderBottomColor: 'rgba(0, 104, 117, 1)', borderBottomWidth:  1, width: '100%', alignSelf: 'center' }}></View>
        </View>
        {/* Year */}

        {/* Month */}
        {/* <ScrollView
          style={{ width: width / 3 }}
          contentContainerStyle={{ alignItems: 'center' }}
          onMomentumScrollEnd={event => {
            const index = Math.round(event.nativeEvent.contentOffset.y / 30);
            handleMonthChange(index);
          }}
        >
          {months.map((month, index) => (
            <TouchableOpacity key={index} style={{ height: 30 }} onPress={() => setShowDatePicker(false)}>
              <Text>{month}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView> */}

        {/* Day */}
        {/* <ScrollView
          style={{ width: width / 3 }}
          contentContainerStyle={{ alignItems: 'center' }}
          onMomentumScrollEnd={event => {
            const index = Math.round(event.nativeEvent.contentOffset.y / 30);
            handleDayChange(index);
          }}
        >
          {days.map((day, index) => (
            <TouchableOpacity key={index} style={{ height: 30 }} onPress={() => setShowDatePicker(false)}>
              <Text>{day}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView> */}
      </View>
      </View>
</Modal>
)}
      {/* Display selected date */}
      <Text onPress={() => setShowDatePicker(true)}>{selectedDate.toLocaleDateString()}</Text>
    </View>
  );
};

export default CustomDatePicker;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    height:250,
    flexDirection:'row',
    width:'95%'
  }
});