import React, { useCallback, useEffect, useState } from 'react';
import { BackHandler, RefreshControl, SafeAreaView, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../../components/Header';
import Categories from '../../ui/Categories';
import ComboPackages from '../../ui/ComboPackages';
import TopSuggestions from '../../ui/TopSuggestions';
import BestDeals from '../../ui/BestDeals';
import ExploreMore from '../../ui/ExploreMore';

function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);

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

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  useEffect(() => {
    const backAction = async () => {
      BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

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
    </SafeAreaView>
  );
}

export default HomeScreen;
