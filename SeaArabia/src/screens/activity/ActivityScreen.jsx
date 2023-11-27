import { View,Text, SafeAreaView } from "react-native"
import Header from "../../components/Header";
import SearchByLocation from "../../ui/SearchByLocation";

function ActivityScreen() {
    return(
        <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
            <Header page='Activity'/>
            <SearchByLocation/>
        </SafeAreaView>
    )
}

export default ActivityScreen;
