import { View,Text, SafeAreaView,ScrollView ,Pressable} from "react-native"
import Header from "../../components/Header";
import { useCallback, useState } from "react";
import Styles from "../../public/Styles";
import EmptyIcon from "../../assets/icon/EmptyIcon";
import BestDeals from "../../ui/BestDeals";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import useBackButtonHandler from "../../components/BackHandlerUtils";


const filterTitle = [
    {
      id: 1,
      title: 'Upcoming',
      value : 'AllRequests '
    },
    {
      id: 2,
      title: 'Reserved',
      value : 'Processing'
    },
    {
      id: 3,
      title: 'Cancellation',
      value : 'Accepted '
    },
    {
      id: 4,
      title: 'Completed',
      value : 'Rejected '
    },
    {
      id: 5,
      title: 'Unsuccessful',
      value : 'Rejected '
    },
  ];

function BookingScreen() {
    const navigation = useNavigation();
    const [selectedFilter, setSelectedFilter] = useState(filterTitle[0]);
    const [text, setText] = useState('Upcoming');

    useBackButtonHandler(navigation, false);

    // useFocusEffect(
    //     useCallback(() => {
    //        getComboPackages();
    //     }, []) 
    //   );
    

    // function getComboPackages(){
    //     CommonApi.getComboPackages().then((res) => {
    //         // console.log('res====', res.data)
    //         if(res.status === 200){
    //             setComboPackages(res.data.results)
    //         }
    //     })
    // }

    function handlePress(item){
        // console.log('handlePress', item);
        setSelectedFilter(item);
        if(item.title === 'Upcoming'){
            setText(item.title)
        }
        else if(item.title === 'Reserved'){
            setText(item.title)
        }
        else if(item.title === 'Cancellation'){
            setText(item.title)
        }
        else if(item.title === 'Completed'){
            setText(item.title)
        }
        else if(item.title === 'Unsuccessful'){
            setText(item.title)
        }
    }
    return(
        <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
            <Header page='Bookings' title='Booking History'/>
            <ScrollView>
                {/* <Text style={{color:'rgba(0, 0, 0, 0.8)', fontSize:16, fontFamily:'Roboto-Medium',marginLeft:15,marginTop:15}}>Bookings History</Text> */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {filterTitle.map((item, index) => {
                    return (
                        <Pressable
                        key={index}
                        style={[
                            Styles.filterContainer,
                        ]}
                        onPress={() => {
                            handlePress(item);
                        }}
                        >
                        <Text
                            style={[
                            Styles.filterText,
                            selectedFilter.id === item.id && Styles.selectedText,
                            ]}
                        >
                            {item.title}
                        </Text>
                        </Pressable>
                    );
                    })}
                </ScrollView>
                <View style={{backgroundColor:'rgba(245, 245, 245, 1)',height:4,width:'100%',marginTop:5}}></View>
                <View style={{height:'auto', width:'100%',justifyContent:'center',alignItems:'center',marginTop:25,marginBottom:25}}>
                    <Text style={{color:'rgba(0, 0, 0, 0.8)', fontSize:18,fontFamily:'Roboto-Medium'}}>You’ve no {text} Trips</Text>
                    <Text style={{color:'rgba(0, 0, 0, 0.8)', fontSize:12,fontFamily:'Roboto-Regular',marginTop:10,marginBottom:10}}>Start Exploring for your next trip</Text>
                    <EmptyIcon/>
                </View>
                <View style={{backgroundColor:'rgba(245, 245, 245, 1)',height:4,width:'100%',marginTop:5}}></View>
                <BestDeals title='Great Deals'/>
            </ScrollView>
        </SafeAreaView>
    )
}

export default BookingScreen;
