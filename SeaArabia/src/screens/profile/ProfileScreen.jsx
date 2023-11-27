import { View,Text, SafeAreaView, Pressable, Image, ScrollView } from "react-native"
import ProfileInactiveIcon from "../../assets/icon/ProfileInactiveIcon";
import BookmarkInactive from "../../assets/icon/BookmarkInactive";
import TripsIcon from "../../assets/icon/TripsIcon";
import SettingsIcon from "../../assets/icon/SettingsIcon";
import AboutIcon from "../../assets/icon/AboutIcon";
import LogoutIcon from "../../assets/icon/LogoutIcon";
import RightarrowIcon from "../../assets/icon/RightarrowIcon";

function ProfileScreen({navigation}) {
    const data = [
        {
            id : 1,
            title: 'Sign up',
            icon: <ProfileInactiveIcon/>,
            navigation: () => navigation.navigate('SignUp')
        },
        {
            id : 2,
            title: 'Bookmarked',
            icon: <BookmarkInactive height={16} width={15} color='rgba(125, 132, 141, 1)'/>,
            navigation: () => navigation.navigate('SignUp')
        },
        {
            id : 3,
            title: 'Previous Trips',
            icon: <TripsIcon/>,
            navigation: () => navigation.navigate('SignUp')
        },
        {
            id : 4,
            title: 'Settings',
            icon: <SettingsIcon/>,
            navigation: () => navigation.navigate('SignUp')
        },
        {
            id : 5,
            title: 'About',
            icon: <AboutIcon/>,
            navigation:() => navigation.navigate('SignUp')
        },
        {
            id : 6,
            title: 'Logout',
            icon: <LogoutIcon/>,
            navigation: () => navigation.navigate('SignUp')
        },
    ]
    return(
        <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
            <ScrollView>
                <View style={{justifyContent:'center', alignItems:'center',marginTop:30}}>
                    <Text style={{color:'rgba(27, 30, 40, 0.8)', fontSize:15, fontFamily:'Roboto-Medium'}}>Profile</Text>
                    <Pressable>
                        <Image source={require('../../assets/images/ProfilePic.png')} style={{width:96, height:96,marginTop:20}}></Image>
                    </Pressable>
                    <Text style={{color:'rgba(27, 30, 40, 0.8)', fontSize:16, fontFamily:'Roboto-Medium',marginTop:30}}>Guest User</Text>
                </View>
                <View style={{width:'90%',alignSelf:'center',marginTop:30,backgroundColor:'white',borderRadius:6,elevation:3,justifyContent:'center',shadowColor: '#000',shadowOffset:{ width: 0,height: 2 },shadowOpacity: 0.25, shadowRadius: 3,marginBottom:20}}>
                    {
                        data.map((item,index) => {
                            return(
                                <View key={index} style={{top:15}}>
                                    <Pressable style={{height:60,marginLeft:20,marginTop:9,flexDirection:'row'}} onPress={item.navigation}>
                                        <View>
                                            {item.icon}
                                        </View>
                                        <Text style={{color:'rgba(27, 30, 40, 1)',marginLeft:30,fontSize:15,fontFamily:'Roboto-Regular'}}>{item.title}</Text>
                                        <View style={{marginLeft:'auto',right:20}}>
                                        <RightarrowIcon/>
                                        </View>
                                    </Pressable>
                                    <View style={{backgroundColor:'rgba(245, 245, 245, 1)',height:2,width:'90%',bottom:15,alignSelf:'center'}}></View>
                                </View>
                            )
                        })
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ProfileScreen;
