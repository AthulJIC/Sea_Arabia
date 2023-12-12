import { View,Text, ActivityIndicator } from "react-native"
import ServicesList from "./ServicesList";
import { HomeApi } from "../Services/HomeServices/HomeService";
import { useEffect, useState } from "react";

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


function TopSuggestions(){
    const[data,setData]=useState([])
    const [loading,setLoading]=useState(false)
    useEffect(() => {
        setLoading(true)
        HomeApi.TopSuggestionList()
            .then(response => {
                setData(response.data.results);
            })
            .catch(error => {
                console.error('Error category list data:', error)
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);
    return(
        <View>
            {loading? <ActivityIndicator size="large" color="006875" />:
            <ServicesList data={data} title='Top Suggestions'/>
            }
            
        </View>
    )
}

export default TopSuggestions;