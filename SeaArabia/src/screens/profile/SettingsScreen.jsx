import { View, Text, SafeAreaView, Pressable, ScrollView } from "react-native";
import BackIcon from "../../assets/icon/BackIcon";
import Styles from "../../public/Styles";
import RightarrowIcon from "../../assets/icon/RightarrowIcon";
import useBackButtonHandler from "../../components/BackHandlerUtils";


function SettingsScreen({ navigation, route }) {
    const data = [

        {
            id: 2,
            title: 'Language',
            // icon: <BookmarkInactive height={16} width={15} color='rgba(125, 132, 141, 1)' />,
            // navigation: () => navigation.navigate('BookMark',{title:'Bookmarked'})
            navigation: () => navigation.navigate('Language')
        },
        {
            id: 3,
            title: 'Change Password',
            // icon: <TripsIcon />,
            navigation: () => navigation.navigate('ChangePassword')
        },
        {
            id: 5,
            title: 'Help & Support',
            // icon: <AboutIcon />,
            navigation: () => navigation.navigate('HelpSupport')
        },
        {
            id: 6,
            title: 'Privacy & Security',
            // icon: <LogoutIcon />,
            // navigation: () => setLogoutModalVisible(true),
            navigation: () => navigation.navigate('PrivacySecurity')

        },
    ]
    const title = route?.params.title;
    console.log('title', title);
    useBackButtonHandler(navigation, false);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView>
                <View style={{ flexDirection: 'row' }}>
                    <Pressable style={[Styles.backIcon, { marginTop: 12, }]} onPress={() => navigation.navigate('Profile')}>
                        <BackIcon color='#1B1E28'></BackIcon>
                    </Pressable>
                    <Text style={{ marginTop: 25, marginLeft: 15, fontSize: 14, color: 'rgba(25, 28, 29, 0.8)', fontFamily: 'Roboto-Medium' }}>{title}</Text>
                </View>
                <View style={{ borderBottomColor: 'rgba(0, 0, 0, 0.8)', borderBottomWidth: 0.7, width: '100%', alignSelf: 'center', marginTop: 17 }}></View>
                <View style={{ width: '90%', alignSelf: 'center', marginTop: 30, backgroundColor: 'white', borderRadius: 6, elevation: 3, justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3, marginBottom: 20 }}>
                    {
                        data.map((item, index) => {
                            return (
                                <View key={index} style={{ top: 15 }}>
                                    <Pressable style={{ height: 60, marginLeft: 20, marginTop: 9, flexDirection: 'row' }} onPress={item.navigation}>
                                        {/* <View>
                                            {item.icon}
                                        </View> */}
                                        <Text style={{ color: 'rgba(27, 30, 40, 1)', fontSize: 15, fontFamily: 'Roboto-Regular' }}>{item.title}</Text>
                                        <View style={{ marginLeft: 'auto', right: 20 }}>
                                            <RightarrowIcon width={9} height={16} />
                                        </View>
                                    </Pressable>
                                    <View style={{ backgroundColor: 'rgba(245, 245, 245, 1)', height: 2, width: '90%', bottom: 15, alignSelf: 'center' }}></View>
                                </View>
                            )
                        })
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SettingsScreen;