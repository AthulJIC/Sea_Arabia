import { View,Text, Image, Pressable, TextInput } from "react-native";
import CloudIcon from "../assets/icon/CloudIcon";
import LocationIcon from "../assets/icon/LocationIcon";
import SearchIcon from "../assets/icon/SearchIcon";
import { useState } from "react";
import MicIcon from "../assets/icon/MicIcon";
import Styles from "../public/Styles";
import BackIcon from "../assets/icon/BackIcon";

function Header({page}){
    const [searchText, setSearchText] = useState('');
    return(
        <View>
            {
                page === 'Home' || page === "Activity" ? (
                <View style={{marginLeft:15,marginTop:10,flexDirection:'row'}}>
                    <CloudIcon/>
                    <Text style={{color:'rgba(0, 104, 117, 1)',fontSize:13, fontFamily:'Roboto-Regular', marginTop:2, marginLeft:5}}>Cloudy 29°C </Text>
                </View>
                ) :
                (
                <View style={{backgroundColor : 'rgba(247, 247, 249, 1)',
                marginLeft:10,
                marginTop:5,
                width:'7%',
                height:24,
                marginBottom:7,
                justifyContent:'center',
                alignItems:'center',
                borderRadius:25}}>
                      <BackIcon></BackIcon>
                </View>
                )
            }
            
            <View style={{flexDirection:'row'}}>
                <View>
                    <View style={{flexDirection:'row', marginLeft:15,marginTop:5}}>
                      <LocationIcon></LocationIcon>
                      <Text style={{color:'rgba(0, 0, 0, 0.8)', fontSize:14,fontFamily:'Roboto-Regular', marginLeft:5}}>Your location</Text>
                    </View>
                    <Text style={{color:'rgba(0, 0, 0, 0.8)', fontSize:14,fontFamily:'Roboto-Regular', marginLeft:30,marginTop:2}}>Exact location name</Text>
                </View>
                <View style={{flexDirection:'row',marginLeft:'auto'}}>
                    {
                        page === 'Home' ? (
                        <Pressable>
                            <Image source={require('../assets/images/Language.png')} style={{height:30, width:30,marginHorizontal:10,marginTop:5}}/>
                        </Pressable>
                        ) : null
                    }
                    
                    <Pressable>
                        <Image source={require('../assets/images/Notification.png')} style={{height:25, width:20,marginRight:15,marginTop:8}}/>
                    </Pressable>
                    <Pressable>
                        <Image source={require('../assets/images/Profile.png')} style={{height:30, width:30,marginRight:35}}></Image>
                        <Text style={{color:'rgba(0, 0, 0, 0.8)', fontSize:10, fontFamily:'Roboto-Regular',textAlign:'left',marginTop:5,right:5}}>Add Profile</Text>
                    </Pressable>
                </View>
            </View>
            <View style={{width:'93%', height:40,borderColor:'rgba(0, 0, 0, 0.5)', borderWidth:0.5,borderRadius:5,alignSelf:'center',marginTop:8, flexDirection:'row'}}>
                <SearchIcon></SearchIcon>
                <TextInput
                placeholder="Search here"
                placeholderTextColor={'rgba(184, 184, 184, 1)'}
                onChangeText={(text) => setSearchText(text)}
                value={searchText}
                style={{width:'78%', marginLeft:5}}></TextInput>
                <View style={{borderLeftColor:'rgba(0, 0, 0, 0.8)', borderLeftWidth:0.5, height:25,alignSelf:'center'}}></View>
                <MicIcon></MicIcon>
            </View>
        </View>
    )
}

export default Header;