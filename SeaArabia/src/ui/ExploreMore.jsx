import { View,Text, ActivityIndicator } from "react-native"
import ServicesList from "./ServicesList";
import { HomeApi } from "../Services/HomeServices/HomeService";
import { useEffect, useState } from "react";

// const data=[
//     {
//         id: 1,
//         image: require('../assets/images/EMPic1.png'),
//         title : 'Jet Ski'
//     },
//     {
//         id: 2,
//         image: require('../assets/images/EMPic2.png'),
//         title : 'Dune Buggy'
//     },
//     {
//         id: 3,
//         image: require('../assets/images/EMPic3.png'),
//         title : 'Boat'
//     },
//     {
//         id: 4,
//         image: require('../assets/images/EMPic4.png'),
//         title : 'Heli Tour'
//     },
//     {
//         id: 5,
//         image: require('../assets/images/EMPic5.png'),
//         title : 'Birthday'
//     },
//     {
//         id: 6,
//         image: require('../assets/images/EMPic6.png'),
//         title : 'Desert Safari'
//     },
// ]


function ExploreMore(){
    const [data,setData]=useState([])
    const [loading,setLoading]=useState(false)
    useEffect(() => {
        setLoading(true)
        HomeApi.ExploreMoreList()
            .then(response => {
                // console.log("results ExploreMoreList", response.data.results)
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
            {loading?<ActivityIndicator/>:
            <ServicesList data={data} title='ExploreMore'/>}
        </View>
    )
}

export default ExploreMore;