import { View, Text, SafeAreaView, Pressable, ScrollView, StyleSheet } from "react-native";
import BackIcon from "../../assets/icon/BackIcon";
import Styles from "../../public/Styles";
import useBackButtonHandler from "../../components/BackHandlerUtils";

function PrivacySecurity({ navigation, route }) {
    useBackButtonHandler(navigation, false);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView>
                <View style={{ flexDirection: 'row' }}>
                    <Pressable style={[Styles.backIcon, { marginTop: 12, }]} onPress={() => navigation.navigate('Profile')}>
                        <BackIcon color='#1B1E28'></BackIcon>
                    </Pressable>
                    <Text style={{ marginTop: 25, marginLeft: 15, fontSize: 14, color: 'rgba(25, 28, 29, 0.8)', fontFamily: 'Roboto-Medium' }}>Privacy & Security</Text>
                </View>
                <View style={{ borderBottomColor: 'rgba(0, 0, 0, 0.8)', borderBottomWidth: 0.7, width: '100%', alignSelf: 'center', marginTop: 17 }}></View>
                <View style={{ borderBottomColor: 'rgba(0, 0, 0, 0.8)', width: '100%', alignSelf: 'center', marginTop: 17, alignSelf: 'left', marginLeft: 15 }}>
                    <Text style={styles.HeadTxt}>Privacy</Text>
                    <Text style={{ fontSize: 14, fontWeight: 400 }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</Text>
                </View>

                <View style={{ borderBottomColor: 'rgba(0, 0, 0, 0.8)', width: '100%', alignSelf: 'center', marginTop: 17, alignSelf: 'left', marginLeft: 15 }}>
                    <Text style={{ fontWeight: 400, fontSize: 14, color: '#1B1E28' }}>Information</Text>
                    <Text>&#8226;  Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
                    <Text>&#8226; Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
                </View>
                <View style={{ borderBottomColor: 'rgba(0, 0, 0, 0.8)', width: '100%', marginTop: 17, alignSelf: 'left', marginLeft: 15 }}>
                    <Text style={styles.HeadTxt}>Security</Text>
                    <Text style={{ fontSize: 14, fontWeight: 400 }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took </Text>
                    <Text style={{marginTop:5}}>1. a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</Text>
                    <Text style={{marginTop:5}}>2. a galley of type and scrambled it to make a type specimen book. It has survived not only five </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    HeadTxt: {
        fontSize: 16,
        marginTop: 10,
        width: 300,
        height: 25,
        color: '#1B1E28',
        fontWeight: '600',
        fontFamily: 'Roboto-Regular',
        justifyContent: 'left',
        alignItems: 'left',
        textAlign: 'left',
        alignSelf: 'left',
    },
    SubText: {
        fontWeight: 400,
        fontSize: 12,
        fontFamily: 'roboto',
        alignSelf: 'left',
        marginLeft: 15
    }
})
export default PrivacySecurity;