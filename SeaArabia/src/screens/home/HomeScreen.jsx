import {BackHandler, SafeAreaView, ScrollView } from "react-native"
import Header from "../../components/Header";
import Categories from "../../ui/Categories";
import ComboPackages from "../../ui/ComboPackages";
import TopSuggestions from "../../ui/TopSuggestions";
import BestDeals from "../../ui/BestDeals";
import ExploreMore from "../../ui/ExploreMore";
import { useEffect } from "react";

function HomeScreen() {
    useEffect(() => {
        const backAction = async() => {
          BackHandler.exitApp();
          return true;
        };
    
        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          backAction
        );
    
        return () => backHandler.remove();
      }, []); 
    return(
        <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
            <Header page='Home'/>
            <ScrollView>
                <Categories/>
                <ComboPackages/>
                <TopSuggestions/>
                <BestDeals title='Best Deals'/>
                <ExploreMore/>
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen;
