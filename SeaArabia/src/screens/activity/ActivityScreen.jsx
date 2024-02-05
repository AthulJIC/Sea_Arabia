import { View,Text, SafeAreaView ,Pressable,Image,ScrollView} from "react-native"
import Header from "../../components/Header";
import Styles from "../../public/Styles";
import { useCallback, useEffect, useState } from "react";
import ActivityList from "../../ui/ActivityList";
import BestDeals from "../../ui/BestDeals";
import { Activity } from "../../Services/Activity/ActivityService";
import { useFocusEffect } from "@react-navigation/native";
import { CommonApi } from "../../Services/common/CommonApi";
import { HomeApi } from "../../Services/HomeServices/HomeService";
import useBackButtonHandler from "../../components/BackHandlerUtils";



function ActivityScreen({navigation}) {
    const filterTitle = [
        {
          id: 1,
          title: 'All',
          value : 'All',
          navigation : () => navigation.navigate('Activity')
        },
        {
          id: 2,
          title: 'Snorkelling',
          value : 'Processing',
          navigation : () => navigation.navigate('ServicesListExpand',{title : 'Snorkelling'})
        },
        {
          id: 3,
          title: 'Diving points',
          value : 'Accepted ',
          navigation : () => navigation.navigate('ServicesListExpand',{title : 'Diving points'})
        },
        {
          id: 4,
          title: 'Water activities',
          value : 'Rejected ',
          navigation : () => navigation.navigate('ServicesListExpand',{title : 'Water activities'})
        },
        {
          id: 5,
          title: 'Parasailing',
          value : 'Rejected ',
          navigation : () => navigation.navigate('ServicesListExpand',{title : 'Parasailing'})
        },
        {
            id: 6,
            title: 'Paragliding',
            value : 'Rejected ',
            navigation : () => navigation.navigate('ServicesListExpand',{title : 'Paragliding'})

        },
        {
            id: 7,
            title: 'Dune Buggy',
            value : 'Rejected ',
            navigation : () => navigation.navigate('ServicesListExpand',{title : 'Dune Buggy'})

        },
        {
            id: 8,
            title: 'Desert Safari',
            value : 'Rejected ',
            navigation : () => navigation.navigate('ServicesListExpand',{title : 'Desert Safari'})

        },
        {
            id: 9,
            title: 'Desert Quadbiking',
            value : 'Rejected ',
            navigation : () => navigation.navigate('ServicesListExpand',{title : 'Desert Quadbiking'})

        },
        {
            id: 10,
            title: 'Paintball',
            value : 'Rejected ',
            navigation : () => navigation.navigate('ServicesListExpand',{title : 'Paintball'})

        },
      ];
    const [selectedFilter, setSelectedFilter] = useState(filterTitle[0]);
    const [text, setText] = useState('Upcoming');
    const [loading,setLoading]=useState(false)
    const [allActivityData,setAllActivityData]=useState();
    const [sailActivity, setSailActivity] = useState();
    const [topActivity, setTopActivity] =useState();
    const [categoryList, setCategoryList] = useState();
    console.log('categoryList====', categoryList);

    useBackButtonHandler(navigation, false);
   
    useFocusEffect(
        useCallback(() => {
            getCategoryList();
            getActivityList();
            getSailActivity();
            getTopActivity();
        }, []) 
    )
    function getActivityList(){
        CommonApi.getActivityList().then((res) => {
            console.log('res====', res.data)
            if(res.status === 200){
                setAllActivityData(res.data.results)
            }
        })
    }
    function getSailActivity(){
        CommonApi.getSailActivity().then((res) => {
            console.log('res====', res.data)
            if(res.status === 200){
                setSailActivity(res.data.results)
            }
        })
    }
    function getTopActivity(){
        CommonApi.getTopActivity().then((res) => {
            console.log('res====', res.data)
            if(res.status === 200){
                setTopActivity(res.data.results)
            }
        }).catch((err)=>{
            console.error(err);
        })
    }
    function getCategoryList(){
       CommonApi.getCategoryList().then((res) => {
            console.log('category====', res.data)
            if(res.status === 200){
                //setCategoryList(res.data.results)
                const namesArray = res.data.results.map(item => item.name);

                // Adding 'All' text to the beginning of the names array
                namesArray.unshift('All');
                console.log('namesArray=====', namesArray);
                setCategoryList(namesArray)
            }
        })
    }
    function categoryHandler(item){
        console.log('item==',item);
        if(item === 'All'){
            navigation.navigate('Activity')
        }
        else{
            navigation.navigate('ServicesListExpand',{title : item})
        }
    }
    return(
        <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
            {/* <Header page='Activity'/> */}
                <ScrollView>
                <View style={{ flexDirection: 'row', padding: 15 }}>
                    <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontSize: 16, fontFamily: 'Roboto-Medium' }}>Activities</Text>
                    {/* <Pressable style={{ marginLeft: 'auto' }}>
                        <Image source={require('../../assets/images/Filter.png')} style={{ height: 28, width: 32 }}></Image>
                    </Pressable> */}
                </View>
                {/* <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{bottom:15}} >
                        {categoryList.map((item, index) => {
                        return (
                            <Pressable
                            key={index}
                            style={[
                                Styles.filterContainer,
                            ]}
                            onPress={() =>categoryHandler(item)}
                            >
                            <Text
                                style={[
                                Styles.filterText,
                                // selectedFilter.id === item.id && Styles.selectedText,
                                ]}
                            >
                                {item}
                            </Text>
                            </Pressable>
                        );
                        })}
                </ScrollView>
                <View style={{ backgroundColor: 'rgba(245, 245, 245, 1)', height: 4, width: '100%' ,bottom:45}}></View> */}
                <View style={{bottom:45,marginTop:25}}>
                    <ActivityList data={topActivity} title='Top Activities'/>
                    <BestDeals title='Best Deals'/>
                    <ActivityList data={sailActivity} title='Sale with Activity'/>
                    <ActivityList data={allActivityData} title='All Activities'/>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ActivityScreen;
