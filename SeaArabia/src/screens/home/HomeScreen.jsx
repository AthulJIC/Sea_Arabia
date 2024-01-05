import React, { useCallback, useEffect, useState } from 'react';
import { BackHandler, RefreshControl, SafeAreaView, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../../components/Header';
import Categories from '../../ui/Categories';
import ComboPackages from '../../ui/ComboPackages';
import TopSuggestions from '../../ui/TopSuggestions';
import BestDeals from '../../ui/BestDeals';
import ExploreMore from '../../ui/ExploreMore';
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";
import Toast from 'react-native-toast-message';
import { decode as atob, encode as btoa } from 'base-64'
import AsyncStorage from '@react-native-async-storage/async-storage';

function HomeScreen() {
  const netInfo = useNetInfo();
  const [refreshing, setRefreshing] = useState(false);
  const [isConnected, setIsConnected] = useState(netInfo?.isConnection);
const [lastConnectionChange, setLastConnectionChange] = useState(null);
  const fetchData = () => {
    // Replace this with your actual logic to fetch or refresh data
    console.log('Data refreshed!');
    // After data is refreshed, set refreshing to false
    setRefreshing(false);
  };

  const onRefresh = () => {
    // Set refreshing to true when pull-to-refresh is triggered
    setRefreshing(true);
    // Fetch data
    fetchData();
  };
  // useFocusEffect(
  //   useCallback(() => {
  //     const getValueFromStorage = async () => {
  //       try {
  //         const value = await AsyncStorage.getItem('access_token');
  //         console.log('value====',value);
  //         if (value !== null) {
  //           const [header, payload, signature] = value.split('.');
  //           const decodedPayload = JSON.parse(atob(payload));
  //           console.log('Decoded Payload:', decodedPayload?.user_id);
  //           await AsyncStorage.setItem('userId',decodedPayload?.user_id)
  //         }
  //       } catch (error) {
  //         console.error('Error fetching data from AsyncStorage:', error);
  //       }
  //     };
  //     getValueFromStorage();
  //   }, [])
  // );
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  // useEffect(() => {
  //   const backAction = async () => {
      
  //     BackHandler.exitApp();
  //     return true;
  //   };
  //   const unsubscribeNetInfo = NetInfo.addEventListener((state) => {
  //     console.log("state",state.details)
  //     setIsConnected(state.isConnected);
  //     setLastConnectionChange(new Date());
  //     // Show toast message when connection changes
  //     Toast.show({
  //       type: state.isConnected ? 'success' : 'error',
  //       text1: state.isConnected ? `Connected ${state.type}` : 'No Connection',
  //       visibilityTime: 2000,
  //     });
  //   });

  //   const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

  //   return () => {
  //     backHandler.remove();
  //     unsubscribeNetInfo();
  //   };
  // }, []);
  useFocusEffect(
    React.useCallback(() => {
      const backAction = async () => {
        // Your code here before exiting the app
        // await AsyncStorage.setItem('LastScreen', 'Home');
        // await AsyncStorage.setItem('isSelected', 'false');
        BackHandler.exitApp();
        return true;
      };
  
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction
      );
  
      return () => {
        backHandler.remove();
      };
    }, [])
  );
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Header page="Home" />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Categories />
        <ComboPackages />
        <TopSuggestions />
        <BestDeals title="Best Deals" />
        <ExploreMore />
      </ScrollView>
      {lastConnectionChange && (
    <Toast ref={(ref) => Toast.setRef(ref)} visibilityTime={2000} />
  )}
    </SafeAreaView>
  );
}

export default HomeScreen;
