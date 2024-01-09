import DateTimePicker from 'react-native-date-picker';
import { useEffect, useState } from 'react';
import { View,Text ,Pressable,Platform,Modal,TouchableWithoutFeedback,StyleSheet} from "react-native";
import DateIcon from '../assets/icon/DateIcon';
import moment from 'moment';

function CustomDatePicker({onValueChange, onDateError,dateValue}) {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDateText, setSelectedDateText] = useState('Select Date');
  console.log('selectedDateText=======', selectedDateText);
  const onChange = (selectedDate) => {
    //setShowDatePicker(Platform.OS === 'ios'); // Close the picker for iOS after selecting
    if (selectedDate) {
      const currentDate = selectedDate || date
      setDate(currentDate); 
      setSelectedDateText(moment(currentDate).format('DD-MM-YYYY'));
      
    }
    //setShowDatePicker(false);
  };

  useEffect(() => {
    console.log('value====',dateValue)
      setSelectedDateText(moment(dateValue).format('DD-MM-YYYY') );
  }, [dateValue]);
  
  function onConfirmHandler(){
    setShowDatePicker(false);
    onValueChange(selectedDateText)
  }
  function onCancelHandler(){
    setSelectedDateText(selectedDateText);
    setShowDatePicker(false);
  }
  const showDatepicker = () => {
    onDateError(false)
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