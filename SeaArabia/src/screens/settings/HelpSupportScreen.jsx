import { View, Text, SafeAreaView, Pressable, ScrollView, StyleSheet } from "react-native";
import BackIcon from "../../assets/icon/BackIcon";
import Styles from "../../public/Styles";
import useBackButtonHandler from "../../components/BackHandlerUtils";

function HelpSupportScreen({ navigation, route }) {
    useBackButtonHandler(navigation, false);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView>
                <View style={{ flexDirection: 'row' }}>
                    <Pressable style={[Styles.backIcon, { marginTop: 12, }]} onPress={() => navigation.navigate('Profile')}>
                        <BackIcon color='#1B1E28'></BackIcon>
                    </Pressable>
                    <Text style={{ marginTop: 25, marginLeft: 15, fontSize: 14, color: 'rgba(25, 28, 29, 0.8)', fontFamily: 'Roboto-Medium' }}>Help & Support</Text>
                </View>
                <View style={{ borderBottomColor: 'rgba(0, 0, 0, 0.8)', borderBottomWidth: 0.7, width: '100%', alignSelf: 'center', marginTop: 17 }}></View>
                {/* <View style={{ marginTop: 25, marginTop: 50 }}>
                    <Text style={{ fontSize: 18, fontWeight: '500', lineHeight: 16, marginLeft: 60 }}>Hello Alexa</Text>
                    <Text style={{ fontSize: 20, fontWeight: '500', lineHeight: 16, marginLeft: 60 }}>How can we help you?</Text>

                </View>
                <View style={{ marginTop: 25, marginBottom: 50, marginTop: 50 }}>
                    <Text style={{ fontSize: 20, fontWeight: '500', lineHeight: 16, marginLeft: 60 }}>How can we help you?</Text>
                </View> */}
                <View style={{ borderBottomColor: 'rgba(0, 0, 0, 0.8)', width: '100%', alignSelf: 'center', marginTop: 17, alignSelf: 'left' }}>
                    <Text style={styles.HeadTxt}>Hello Alexa,</Text>
                    <Text style={styles.SubTxt}>How can we help you?</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    HeadTxt: {
        fontSize: 20,
        marginTop: 10,
        color: 'rgba(27, 30, 40, 0.8)',
        fontWeight: '600',
        fontFamily: 'Roboto-medium',
        marginLeft: 60,
    },
    SubTxt: {
        fontSize: 25,
        color: 'rgba(27, 30, 40, 0.8)',
        fontWeight: '600',
        fontFamily: 'Roboto-medium',
        marginLeft: 60,
    }
})
export default HelpSupportScreen;