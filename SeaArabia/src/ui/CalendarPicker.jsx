import { useState } from "react";
import { View,Text } from "react-native";
import CalendarDatePicker from 'react-native-calendar-picker';

function CalendarPicker(){
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);

    const onDateChange = (date, type) => {
        //function to handle the date change
        if (type === 'END_DATE') {
        setSelectedEndDate(date);
        } else {
        setSelectedEndDate(null);
        setSelectedStartDate(date);
        }
    };
    return(
        <View style={{backgroundColor:'rgba(247, 247, 249, 1)', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 2,elevation:2,marginTop:15,borderRadius:5}}>
           <CalendarDatePicker
                startFromMonday={true}
                allowRangeSelection={false}
                minDate={new Date()}
                weekdays={
                    [
                    'S',
                    'M', 
                    'T', 
                    'W', 
                    'T', 
                    'F', 
                    'S', 
                    
                    ]}
                months={[
                    'January',
                    'Febraury',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December',
                ]}
                previousTitle="Previous"
                nextTitle="Next"
                todayBackgroundColor="rgba(0, 104, 117, 0.3)"
                selectedDayColor="rgba(0, 104, 117, 1)"
                selectedDayTextColor="white"
                scaleFactor={375}
                todayTextStyle={{color:'black'}}
                textStyle={{
                    fontFamily: 'Roboto-Regular',
                    color: '#000000',
                }}
                onDateChange={onDateChange}
                dayHeaderTextStyle={{ color: 'red', fontWeight: 'bold', fontSize: 16 }}
            />
        </View>
    )
}

export default CalendarPicker;