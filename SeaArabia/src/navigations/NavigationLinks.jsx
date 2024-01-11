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
import ServicesListExpand from '../screens/home/ServiceListExpand';
import CategoriesExpandScreen from '../screens/home/CategoriesExpandScreen';
import ServiceDateScreen from '../screens/common/ServiceDateScreen';
import EmailVerification from '../screens/forgetpassword/EmailVerification';
import OtpVerification from '../screens/forgetpassword/OtpVerification';
import ResetPassword from '../screens/forgetpassword/ResetPassword';
import BookMarkScreen from '../screens/profile/BookMarkScreen';
import PreviousTripScreen from '../screens/profile/PreviousTripScreen';
import SettingsScreen from '../screens/profile/SettingsScreen';
import AboutScreen from '../screens/profile/AboutScreen';
import EditUserScreen from '../screens/profile/EditUserScreen';
import BookingDetailsScreen from '../screens/common/BookingDetailsScreen';
import CouponListScreen from '../screens/common/CouponListScreen';
import PaymentSuccessScreen from '../screens/success/PaymentSuccessScreen';
import { navigationRef } from '../providers/RootNavigator';
import ReviewScreen from '../screens/bookings/ReviewScreen';
import CancelReviewScreen from '../screens/bookings/CancelReviewScreen';
import PrivacySecurity from '../screens/settings/PrivacySecurity';
import ChangePasswordScreen from '../screens/settings/ChangePasswordScreen';
import HelpSupportScreen from '../screens/settings/HelpSupportScreen';
import LanguageScreen from '../screens/settings/languageScreen';
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
        options={{tabBarLabel: 'Profile'
        }}/>
        
    </Tab.Navigator>
  );
}

function NavigationLinks() {
  return (
    <NavigationContainer ref={navigationRef}>
        <Stack.Navigator initialRouteName='SignIn'>
          <Stack.Screen name="User" component={UserScreen} options={{headerShown:false}}/>
          <Stack.Screen name='RegisterUser' component={RegisterUserScreen} options={{headerShown:false}}></Stack.Screen>
          <Stack.Screen name='HomeScreen' component={MyTabs} options={{headerShown:false}}></Stack.Screen>
          <Stack.Screen name='SignUp' component={SignUpScreen} options={{headerShown:false}} ></Stack.Screen>
          <Stack.Screen name='SignIn' component={SignInScreen} options={{headerShown:false}} ></Stack.Screen>
          <Stack.Screen name='EmailVerification' component={EmailVerification} options={{headerShown:false}}/>
          <Stack.Screen name='OtpVerification' component={OtpVerification} options={{headerShown:false}}/>
          <Stack.Screen name='ResetPassword' component={ResetPassword} options={{headerShown:false}}/>
          <Stack.Screen name='ServiceExpand' component={ServiceExpandScreen} options={{headerShown:false}}></Stack.Screen>
          <Stack.Screen name='ServiceDate' component={ServiceDateScreen} options={{headerShown:false}}/>
          <Stack.Screen name='ServicesListExpand' component={ServicesListExpand} options={{headerShown:false}}></Stack.Screen>
          <Stack.Screen name='CategoriesExpand' component={CategoriesExpandScreen} options={{headerShown:false}}></Stack.Screen>
          <Stack.Screen name='BookMark' component={BookMarkScreen} options={{headerShown:false}}/>
          <Stack.Screen name='PreviousTrip' component={PreviousTripScreen} options={{headerShown:false}}/>
          <Stack.Screen name='Settings' component={SettingsScreen} options={{headerShown:false}}/>
          <Stack.Screen name='About' component={AboutScreen} options={{headerShown:false}}/>
          <Stack.Screen name='EditUser' component={EditUserScreen} options={{headerShown:false}}/>
          <Stack.Screen name='BookingDetails' component={BookingDetailsScreen} options={{headerShown:false}}/>
          <Stack.Screen name='CouponList' component={CouponListScreen} options={{headerShown:false}}/>
          <Stack.Screen name='PaymentSuccess' component={PaymentSuccessScreen} options={{headerShown:false}}/>
          <Stack.Screen name='ReviewScreen' component={ReviewScreen} options={{headerShown:false}}/>
          <Stack.Screen name='CancelReviewScreen' component={CancelReviewScreen} options={{headerShown:false}}/>
          <Stack.Screen name='PrivacySecurity' component={PrivacySecurity} options={{headerShown:false}}/>
          <Stack.Screen name='ChangePassword' component={ChangePasswordScreen} options={{headerShown:false}}/>
          <Stack.Screen name='HelpSupport' component={HelpSupportScreen} options={{headerShown:false}}/>
          <Stack.Screen name='Language' component={LanguageScreen} options={{headerShown:false}}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NavigationLinks;