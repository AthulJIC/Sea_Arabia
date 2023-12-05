import { View,Text, SafeAreaView ,Pressable,Image,ScrollView} from "react-native"
import Header from "../../components/Header";
import Styles from "../../public/Styles";
import { useState } from "react";
import ActivityList from "../../ui/ActivityList";
import BestDeals from "../../ui/BestDeals";


const filterTitle = [
    {
      id: 1,
      title: 'All',
      value : 'AllRequests '
    },
    {
      id: 2,
      title: 'Snorkelling',
      value : 'Processing'
    },
    {
      id: 3,
      title: 'Diving points',
      value : 'Accepted '
    },
    {
      id: 4,
      title: 'Water activities',
      value : 'Rejected '
    },
    {
      id: 5,
      title: 'Parasailing',
      value : 'Rejected '
    },
    {
        id: 6,
        title: 'Paragliding',
        value : 'Rejected '
    },
    {
        id: 7,
        title: 'Dune Buggy',
        value : 'Rejected '
    },
    {
        id: 8,
        title: 'Desert Safari',
        value : 'Rejected '
    },
    {
        id: 9,
        title: 'Desert Quadbiking',
        value : 'Rejected '
    },
    {
        id: 10,
        title: 'Paintball',
        value : 'Rejected '
    },
  ];

  function ActivityScreen() {
    const [selectedFilter, setSelectedFilter] = useState(filterTitle[0]);
    const [text, setText] = useState('Upcoming');
    return(
        <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
            <Header page='Activity'/>
                <ScrollView>
                <View style={{ flexDirection: 'row', padding: 15 }}>
                    <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontSize: 16, fontFamily: 'Roboto-Medium' }}>Activities</Text>
                    <Pressable style={{ marginLeft: 'auto' }}>
                        <Image source={require('../../assets/images/Filter.png')} style={{ height: 28, width: 32 }}></Image>
                    </Pressable>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{bottom:25}} >
                        {filterTitle.map((item, index) => {
                        return (
                            <Pressable
                            key={index}
                            style={[
                                Styles.filterContainer,
                            ]}
                            // onPress={() => {
                            //     handlePress(item);
                            // }}
                            >
                            <Text
                                style={[
                                Styles.filterText,
                                // selectedFilter.id === item.id && Styles.selectedText,
                                ]}
                            >
                                {item.title}
                            </Text>
                            </Pressable>
                        );
                        })}
                </ScrollView>
                <View style={{ backgroundColor: 'rgba(245, 245, 245, 1)', height: 4, width: '100%' ,bottom:45}}></View>
                <View style={{bottom:45}}>
                    <ActivityList title='Nearby Activities'/>
                    <ActivityList title='Top Activities'/>
                    <BestDeals title='Best Deals'/>
                    <ActivityList title='Top Activities' />
                    <ActivityList title='All Activities' />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ActivityScreen;
