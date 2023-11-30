import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { View,Text ,Pressable,Platform} from "react-native";
import DateIcon from '../assets/icon/DateIcon';
import moment from 'moment';

function CustomDatePicker() {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDateText, setSelectedDateText] = useState('Select Date');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios'); // Close the picker for iOS after selecting
    setDate(currentDate);
    setShowDatePicker(false);
    setSelectedDateText(moment(currentDate).format('DD-MM-YYYY'));
  };
  const showDatepicker = () => {
    setShowDatePicker(true);
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
        <View style={{right:5}}>
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display={Platform.OS === 'android' ? 'spinner' : 'spinner'}
          onChange={onChange}
        />
        </View>
      )}
    </View>
  );
}

export default CustomDatePicker;