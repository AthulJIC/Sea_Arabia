import { View,Text, SafeAreaView,Pressable, ScrollView } from "react-native";
import BackIcon from "../../assets/icon/BackIcon";
import Styles from "../../public/Styles";

function AboutScreen({navigation, route}){
    const title = route?.params.title;
    console.log('title', title);
    return(
        <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
            <ScrollView>
                <View style={{flexDirection:'row'}}>
                    <Pressable style={[Styles.backIcon,{marginTop:12,}]} onPress={() => navigation.navigate('Profile')}>
                        <BackIcon color='#1B1E28'></BackIcon>
                    </Pressable>
                    <Text style={{marginTop:25,marginLeft:15, fontSize:14, color:'rgba(25, 28, 29, 0.8)', fontFamily:'Roboto-Medium'}}>{title}</Text>
                </View>
                <View style={{ borderBottomColor: 'rgba(0, 0, 0, 0.8)', borderBottomWidth: 0.7, width:'100%', alignSelf: 'center',marginTop:17 }}></View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default AboutScreen;