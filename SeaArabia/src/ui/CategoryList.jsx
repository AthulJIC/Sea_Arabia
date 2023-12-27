import { View,Text } from "react-native"
import ServicesList from "./ServicesList";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { CommonApi } from "../Services/common/CommonApi";


// const data=[
//     {
//         id: 1,
//         image: require('../assets/images/BoatTS.png'),
//         title : 'Boat'
//     },
//     {
//         id: 2,
//         image: require('../assets/images/JetSkiTS.png'),
//         title : 'Jet Ski'
//     },
//     {
//         id: 3,
//         image: require('../assets/images/HeliTourTS.png'),
//         title : 'Heli Tour'
//     },
//     {
//         id: 4,
//         image: require('../assets/images/HotairballoonTS.png'),
//         title : 'Hot air balloon'
//     },
//     {
//         id: 5,
//         image: require('../assets/images/DuneBuggyTS.png'),
//         title : 'Dune Buggy'
//     },
//     {
//         id: 6,
//         image: require('../assets/images/EventTS.png'),
//         title : 'Events'
//     },
//     {
//         id: 7,
//         image: require('../assets/images/DesertQuadBikingTS.png'),
//         title : 'Desert Quad biking'
//     }
// ]

function CategoryList({title, id, premium,recommended}){
    console.log('id====premium', id,premium,recommended);
    const [serviceList, setServiceList] = useState()
    
    useFocusEffect(
        useCallback(() => {
           getServiceList();
        }, []) 
      );
    

    function getServiceList(){
        CommonApi.getServiceList(id,premium,recommended).then((res) => {
            console.log('res====', res.data.results)
            if(res.status === 200){
                setServiceList(res.data.results)
            }
        })
    }

    return(
        <View>
            <ServicesList data={serviceList} title={title}/>
        </View>
    )
}

export default CategoryList;