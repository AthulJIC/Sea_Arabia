import { useState } from "react";
import { View,Text ,StyleSheet} from "react-native";
import {Calendar} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';

LocaleConfig.locales['en'] = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  today: 'Today'
};

LocaleConfig.defaultLocale = 'en';

function CalendarPicker(){
    const [selected, setSelected] = useState('');

    return(
        <View style={{backgroundColor:'rgba(247, 247, 249, 1)', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 2,elevation:2,marginTop:15,borderRadius:5}}>
          <Calendar
            onDayPress={day => {
              setSelected(day.dateString);
            }}
            markedDates={{
              [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
            }}
            theme={theme}
          />
        </View>
    )
}
const theme = {
  stylesheet: {
    calendar: {
      header: {
        dayHeader: {
          fontWeight: '600',
          color: 'red'
        }
      }
    }
  },
  // 'stylesheet.day.basic': {
  //   today: {
  //     borderColor: '#48BFE3',
  //     borderWidth: 0.8
  //   },
  //   todayText: {
  //     color: '#5390D9',
  //     fontWeight: '800'
  //   }
  // }
};

export default CalendarPicker;


const styles = StyleSheet.create({
    dayLabelsWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: '#ECECEC', // Change the background color as desired
      paddingVertical: 10,
    },
    weekdayText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333333', // Change the text color as desired
    },
    customWeekday: {
        color: '#FF0000', // Change the color for specific weekdays
      }
  });
  