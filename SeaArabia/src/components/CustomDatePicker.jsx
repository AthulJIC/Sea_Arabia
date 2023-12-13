import DateTimePicker from 'react-native-date-picker';
import { useState } from 'react';
import { View,Text ,Pressable,Platform,Modal,TouchableWithoutFeedback,StyleSheet} from "react-native";
import DateIcon from '../assets/icon/DateIcon';
import moment from 'moment';

function CustomDatePicker() {
  const [date, setDate] = useState(new Date());
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
  function onCancelHandler(){
    setSelectedDateText(selectedDateText);
    setShowDatePicker(false);
  }
  const showDatepicker = () => {
    setShowDatePicker(true);
  };
  const hideDatePicker = () => {
    setShowDatePicker(false);
  };
  return (
    <View>
      <Pressable onPress={showDatepicker} style={{backgroundColor:'rgba(247, 247, 249, 1)', height:50,width:'60%', marginTop:15,borderRadius:12,alignItems:'center',flexDirection:'row',right:3,marginTop:15}}>
      <Text style={{
          marginLeft: 10,
          color: selectedDateText !== 'Select Date' ? 'black' : 'rgba(27, 30, 40, 0.3)',
          fontSize: 14,
          fontFamily: 'Roboto-Regular'
        }}>{selectedDateText}</Text>
        <View style={{marginLeft:'auto',right:10}}>
         <DateIcon/>
        </View>
      </Pressable>
      {showDatePicker && (
        <Modal
        animationType="fade"
        transparent={true}
        visible={showDatePicker}
        onRequestClose={hideDatePicker}
      >
        <TouchableWithoutFeedback>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <DateTimePicker
                date={date}
                mode="date"
                onDateChange={onChange}
              />
              <View style={{flexDirection:'row', marginLeft:'auto',marginTop:10}}>
                <Text style={{color:'rgba(0, 104, 117, 1)', fontSize:15, fontFamily:'Roboto-Medium',right:27}} onPress={onCancelHandler}>CANCEL</Text>
                <Text style={{color:'rgba(0, 104, 117, 1)', fontSize:15, fontFamily:'Roboto-Medium',right:7}} onPress={onConfirmHandler}>CONFIRM</Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      )}
    </View>
  );
}

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
    height:'auto'
  }
});