import { useEffect, useState } from "react";
import { View,Text ,StyleSheet, TurboModuleRegistry} from "react-native";
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

function CalendarPicker({onValueChange, data}){
    const [selected, setSelected] = useState('');
    const currentDate = new Date();
    const minDate = currentDate.toISOString().split('T')[0];
    const [disable, setDisable] = useState(true);
    const [markedDates, setMarkedDates] = useState({});


    // const isDateEnabled = (date) => {
    //     if (!data) {
    //       return false; // If data is undefined, disable all dates
    //     }
    
    //     const selectedDate = new Date(date);
    //     const startDay = data.day;
    //     const endDay = data.end_day;
        
    //     // Get the day index (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    //     const dayIndex = selectedDate.getDay();
    //     console.log('Selected Date:', selectedDate);
        
    //     console.log('Start Day:', startDay);
    //     console.log('End Day:', endDay);
    //     console.log('Day Index:', dayIndex);
    
    //     const isEnabled = dayIndex >= getDayIndex(startDay) && dayIndex <= getDayIndex(endDay);
    //     console.log('Is Enabled:', isEnabled);

    //     return isEnabled;
    //   };
    const isDateEnabled = (date) => {
        if (!data || typeof data !== 'object') {
            return false; // If data is not an object, disable all dates
        }
    
        const selectedDate = new Date(date);
    
        // Check if the selected date is within the specified date range
        if (data.day && data.end_day) {
            const startDayIndex = getDayIndex(data.day);
            const endDayIndex = getDayIndex(data.end_day);
    
            const dayIndex = selectedDate.getDay();
            const isWithinRange = dayIndex >= startDayIndex && dayIndex <= endDayIndex;
    
            // Check if the selected date is within the current month
            const isCurrentMonth = selectedDate.getMonth() === currentDate.getMonth();
    
            return isWithinRange && isCurrentMonth;
        }
    
        // If the selected date is not within the date range or current month, disable it
        return false;
    };
    
      const getDayIndex = (day) => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days.indexOf(day);
      };
    
      const dayComponent = ({ date, state }) => {
        const isDisabled = !isDateEnabled(date.dateString);
        const textColor = isDisabled ? styles.disabledText : (state === 'disabled' ? styles.disabledText : styles.dayText);
        console.log('Date:', date.dateString);
        console.log('Is Disabled:', isDisabled);
        return (
          <View style={[styles.dayContainer, isDisabled && styles.disabledDayContainer]}>
            <Text style={[styles.dayText, isDisabled ? styles.disabledDayText : null, state === 'disabled' && styles.disabledText]}>
              {date.day}
            </Text>
          </View>
        );
      };
      const handleDayPress = (day) => {
        const selectedDateString = day.dateString;
    
        // Create a copy of the current markedDates state
        const updatedMarkedDates = { ...markedDates };
    
        // Update the selected date in the copied state
        updatedMarkedDates[selectedDateString] = {
            selected: true,
            selectedDotColor: 'orange',
            selectedColor: 'rgba(0, 104, 117, 1)',
        };
    
        // Update the markedDates state
        setMarkedDates(updatedMarkedDates);
    
        // Update the selected state
        setSelected(selectedDateString);
    
        // Handle week selection if needed
        handleWeekSelection(selectedDateString);
    
        // Call the onValueChange callback if provided
        if (onValueChange) {
            onValueChange(selectedDateString);
        }
    };
    
    const handleWeekSelection = (selectedDate) => {
        const startDate = new Date(selectedDate);
        const endDate = new Date(selectedDate);
        const startDayIndex = getDayIndex(data.day);
        const endDayIndex = getDayIndex(data.end_day);
        console.log('Start Date:', startDate);
        console.log('End Date:', endDate);
        console.log('Selected Dates:', selectedDates);
    
        // Find the start and end dates of the selected range
        while (startDate.getDay() !== startDayIndex) {
            startDate.setDate(startDate.getDate() - 1);
        }
    
        while (endDate.getDay() !== endDayIndex) {
            endDate.setDate(endDate.getDate() + 1);
        }
    
        const selectedDates = {};
        let currentDate = new Date(startDate);
    
        // Mark all dates within the selected range as selected
        while (currentDate <= endDate) {
            const dateString = currentDate.toISOString().split('T')[0];
            if (isDateEnabled(dateString)) {
                selectedDates[dateString] = {
                    selected: true,
                    selectedDotColor: 'orange',
                    selectedColor: 'rgba(0, 104, 117, 1)',
                };
            }
    
            currentDate.setDate(currentDate.getDate() + 1);
        }
    
        // Update the markedDates state
        setMarkedDates(selectedDates);
    };
    
      
   
    
    return(
        <View style={{backgroundColor:'rgba(247, 247, 249, 1)', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 2,elevation:2,marginTop:15,borderRadius:5}}>
          <Calendar
            onDayPress={handleDayPress}
            markedDates={markedDates}
            minDate={minDate}
            dayComponent={dayComponent}
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
              textDisabledColor: '#d9e1e8',
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
      },
      container: {
        backgroundColor: 'rgba(247, 247, 249, 1)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        // elevation: 2,
        marginTop: 10,
        borderRadius: 5,
      },
      dayContainer: {
        alignItems: 'center',
        justifyContent: 'center',
      },
      dayText: {
        color: 'black',
        fontSize:16
      },
      disabledDayContainer: {
        opacity: 0.4,
      },
      disabledDayText: {
        color: 'rgba(218, 223, 225,1)',
      },
      disabledText: {
        opacity:0.2,
      },
  });
  