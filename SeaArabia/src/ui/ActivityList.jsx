import { View,Text } from "react-native"
import ServicesList from "./ServicesList";

const data=[
    {
        id: 1,
        image: require('../assets/images/BoatTS.png'),
        title : 'Boat'
    },
    {
        id: 2,
        image: require('../assets/images/JetSkiTS.png'),
        title : 'Jet Ski'
    },
    {
        id: 3,
        image: require('../assets/images/HeliTourTS.png'),
        title : 'Heli Tour'
    },
    {
        id: 4,
        image: require('../assets/images/HotairballoonTS.png'),
        title : 'Hot air balloon'
    },
    {
        id: 5,
        image: require('../assets/images/DuneBuggyTS.png'),
        title : 'Dune Buggy'
    },
    {
        id: 6,
        image: require('../assets/images/EventTS.png'),
        title : 'Events'
    },
    {
        id: 7,
        image: require('../assets/images/DesertQuadBikingTS.png'),
        title : 'Desert Quad biking'
    }
]

function ActivityList({title}){
    return(
        <View>
            <ServicesList data={data} title={title} page='Acitivity'/>
        </View>
    )
}

export default ActivityList;