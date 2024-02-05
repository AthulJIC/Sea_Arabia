import { useEffect, useState } from "react";
import { View,Text ,StyleSheet} from "react-native";
import {Calendar} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';
import moment from 'moment';

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

function CalendarDatePicker({data,onValueChange}){
    const [selected, setSelected] = useState('');
    const currentDate = new Date();
    // const minDate = currentDate.toISOString().split('T')[0];
    const [disable, setDisable] = useState(true);
    const [markedDates, setMarkedDates] = useState({});
    const[minDate, setMinDate] = useState();
    const [maxDate, setMaxDate] = useState();
    const [textColor, setTextColor] = useState();
    console.log('selected====',markedDates);
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    useEffect(() => {
        if (data) {
            setDisable(false);
            const startDate = moment(`${currentYear}-${currentMonth}-${data.date}`, 'YYYY-MM-DD').format('YYYY-MM-DD');
            const endDate = moment(`${currentYear}-${currentMonth}-${data.end_date}`, 'YYYY-MM-DD').format('YYYY-MM-DD');
            setMinDate(startDate);
            setMaxDate(endDate);
            // setMarkedDates({ [startDate]: { startingDay: true, color: 'rgba(0, 104, 117, 1)', textColor: 'black' }, [endDate]: { endingDay: true, color: 'rgba(0, 104, 117, 1)', textColor: 'black' } });
        } 
        else {
            setDisable(true)
        }
    }, [data]);
    const handleDayPress = (day) => {
        const selectedDate = day.dateString;
        setSelected(selectedDate);
    
        // Automatically select dates between minDate and maxDate
        if (minDate && maxDate) {
          const range = getRange(minDate, maxDate);
          setMarkedDates({ ...range });
          const datesArray = Object.keys(range).map(dateString => dateString);
          console.log('selectedDate====,', datesArray);
          onValueChange(datesArray)
          // You can also call onValueChange(selectedDate) here if needed
        }
      };
      const getRange = (start, end) => {
        const range = {};
        let currentDate = moment(start);
        while (currentDate.isBefore(end) || currentDate.isSame(end, 'day')) {
          const formattedDate = currentDate.format('YYYY-MM-DD');
          range[formattedDate] = { selected: true, color: 'rgba(0, 104, 117, 1)', textColor: 'white' };
          currentDate.add(1, 'days');
        }
        return range;
      };
    return(
        <View style={{backgroundColor:'rgba(247, 247, 249, 1)', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 2,elevation:2,marginTop:15,borderRadius:5}}>
          <Calendar
            // markedDates={markedDates}
            onDayPress={handleDayPress}
            markingType='period'
            minDate={minDate}
            maxDate={maxDate}
            // markedDates={getMarked()}
            disableAllTouchEventsForDisabledDays={true}
            markedDates={markedDates}
            disabledByDefault={disable}
            // disableAllTouchEventsForDisabledDays={true}
            theme={{
              'stylesheet.calendar.header': {
                dayTextAtIndex0: {
                  color: 'rgba(0, 104, 117, 1)'
                },
                dayTextAtIndex1: {
                  color: 'rgba(0, 104, 117, 1)'
                },
                dayTextAtIndex2: {
                  color: 'rgba(0, 104, 117, 1)'
                },
                dayTextAtIndex3: {
                  color: 'rgba(0, 104, 117, 1)'
                },
                dayTextAtIndex4: {
                  color: 'rgba(0, 104, 117, 1)'
                },
                dayTextAtIndex5: {
                  color: 'rgba(0, 104, 117, 1)'
                },
                dayTextAtIndex6: {
                  color: 'rgba(0, 104, 117, 1)'
                }
              },
              backgroundColor: '#ffffff',
              calendarBackground: '#ffffff',
              textSectionTitleColor: '#b6c1cd',
              textSectionTitleDisabledColor: '#d9e1e8',
              selectedDayBackgroundColor: '#00adf5',
              selectedDayTextColor: '#ffffff',
              todayTextColor: 'rgba(218, 223, 225,1)',
            //   todayBackgroundColor:'rgba(0, 104, 117, 0.2)',
              dayTextColor: 'black',
            //   textDisabledColor: 'red',
              dotColor: '#00adf5',
              selectedDotColor: '#ffffff',
              arrowColor: 'rgba(0, 104, 117, 1)',
              disabledArrowColor: '#d9e1e8',
              monthTextColor: 'rgba(51, 51, 51, 1)',
              indicatorColor: 'blue',
              textDayFontFamily: 'Roboto-Regular',
              textMonthFontFamily: 'Roboto-Regular',
              textDayHeaderFontFamily: 'Roboto-Regular',
              textDayFontWeight: '300',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: '300',
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 16
            }}
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
  'stylesheet.day.basic': {
    today: {
      borderColor: '#48BFE3',
      borderWidth: 0.8
    },
    todayText: {
      color: 'rgba(0, 104, 117, 1)',
      fontWeight: '800'
    }
  }
};

export default CalendarDatePicker;


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
  