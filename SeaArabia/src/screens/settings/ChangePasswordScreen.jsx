import { View, Text, SafeAreaView, Pressable, ScrollView, StyleSheet } from "react-native";
import BackIcon from "../../assets/icon/BackIcon";
import Styles from "../../public/Styles";
import useBackButtonHandler from "../../components/BackHandlerUtils";
import CustomTextInput from "../../components/CustomTextInput";

function ChangePasswordScreen({ navigation, route }) {
    useBackButtonHandler(navigation, false);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView>
                <View style={{ flexDirection: 'row' }}>
                    <Pressable style={[Styles.backIcon, { marginTop: 12, }]} onPress={() => navigation.navigate('Profile')}>
                        <BackIcon color='#1B1E28'></BackIcon>
                    </Pressable>
                </View>
                <Text style={styles.HeadTxt}>Change Password</Text>
                <View style={{ marginTop: 25, marginBottom: 50, marginTop: 50 }}>
                    <CustomTextInput placeholder='Enter Current Password'
                        inputHeader='Enter Current Password'
                        width={'91%'}
                        maxLength={25}
                    />
                    <CustomTextInput placeholder='Enter New Password'
                        inputHeader='Enter New Password'
                        width={'91%'}
                        maxLength={25}
                    />
                    <CustomTextInput placeholder='Confirm New Password'
                        inputHeader='Confirm New Password'
                        width={'91%'}
                        maxLength={25}
                    />
                    <Pressable style={styles.ConfirmTxt}>
                        <Text style={{ color: '#fff', fontSize: 18, fontFamily: 'Roboto-regular' }}>Confirm Password</Text>
                    </Pressable>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    HeadTxt: {
        marginTop: 45,
        fontSize: 26,
        color: '#000',
        fontFamily: 'bold',
        alignSelf: 'center'
    },
    ConfirmTxt: {
        backgroundColor: 'rgba(0, 104, 117, 1)',
        flex: 1,
        marginLeft: 20,
        marginRight: 20,
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        top:20
    }
})
export default ChangePasswordScreen;