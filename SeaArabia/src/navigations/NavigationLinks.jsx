import React from 'react';
import UserScreen from '../screens/users/UserScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/HomeScreen';
import BookingScreen from '../screens/bookings/BookingScreen';
import ActivityScreen from '../screens/activity/ActivityScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import HomeTabActiveIcon from '../assets/icon/HomeTabActiveIcon';
import HomeTabInactiveIcon from '../assets/icon/HomeTabInactiveIcon';
import BookingsActiveIcon from '../assets/icon/BookingsActiveIcon';
import BookingsInactiveIcon from '../assets/icon/BookingsInactiveIcon';
import ActivityActiveIcon from '../assets/icon/ActivityActiveIcon';
import ActivityInactiveIcon from '../assets/icon/ActivityInactiveIcon';
import ProfileActiveIcon from '../assets/icon/ProfileActiveIcon';
import ProfileInactiveIcon from '../assets/icon/ProfileInactiveIcon';
import SignUpScreen from '../screens/signup/SignUpScreen';
import ServiceExpandScreen from '../screens/common/ServiceExpandScreen';
import RegisterUserScreen from '../screens/users/RegisterUserScreen';
import SignInScreen from '../screens/signin/SignInScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    
    <Tab.Navigator
      screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: 'rgba(0, 104, 117, 1)',
      tabBarInactiveTintColor:'gray',
      tabBarStyle:[{
        display:'flex',
        backgroundColor:'rgba(255, 255, 255, 1)',
      }],
      tabBarLabelStyle : [{
         bottom:4
      }],
      
      tabBarIcon: ({ focused }) => {
        let iconComponent;

        if (route.name === 'Home') {
          iconComponent = focused ? (
            <HomeTabActiveIcon/>
          ) : (
            <HomeTabInactiveIcon/>
          );
        } 
        else if (route.name === 'Bookings') {
          iconComponent = focused ? (
            <BookingsActiveIcon/>
          ) : (
            <BookingsInactiveIcon/>
          );
        }
        else if (route.name === 'Activity') {
          iconComponent = focused ? (
           <ActivityActiveIcon />
          ) : (
            <ActivityInactiveIcon/>
          );
        }
        else if (route.name === 'Profile'){
          iconComponent = focused ? (
            <ProfileActiveIcon/>
          ): (
            <ProfileInactiveIcon/>
          )
        }
        return iconComponent;
      },
    })}>
        <Tab.Screen name="Home" component={HomeScreen} options={{
          tabBarLabel:'Home',
        }} />
        <Tab.Screen name="Bookings" component={BookingScreen} options={{
          tabBarLabel: 'My Bookings',
        }}/>
        <Tab.Screen name="Activity" component={ActivityScreen} options={{
          tabBarLabel: 'Activity',
        }}/>
        <Tab.Screen name="Profile" component={ProfileScreen} 
        options={{tabBarLabel: 'Profile',
        }}/>
       
        
    </Tab.Navigator>
  );
}

function NavigationLinks() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name="User" component={UserScreen} options={{headerShown:false}}/>
        <Stack.Screen name='RegisterUser' component={RegisterUserScreen} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name='HomeScreen' component={MyTabs} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name='SignUp' component={SignUpScreen} options={{headerShown:false}} ></Stack.Screen>
        <Stack.Screen name='SignIn' component={SignInScreen} options={{headerShown:false}} ></Stack.Screen>
        <Stack.Screen name='ServiceExpand' component={ServiceExpandScreen} options={{headerShown:false}}></Stack.Screen>
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NavigationLinks;