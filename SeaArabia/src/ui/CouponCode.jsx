import { View,Text,Image,Pressable } from 'react-native';
import RightarrowIcon from '../assets/icon/RightarrowIcon';

function CouponCode({page}){
    return(
        <View>
            {page === 'Category' ? (
                <View style={{flexDirection:'row',paddingLeft:15,paddingTop:10}}>
                    <Text style={{color:'rgba(0, 0, 0, 0.8)', fontSize:16, fontFamily:'Roboto-Medium'}}>Know More</Text>
                    {/* <Pressable style={{marginLeft:'auto'}} >
                        <RightarrowIcon width={9} height={16} />
                    </Pressable> */}
                </View>
            ): null}
            <View style={{ width: '93%', height: 60, backgroundColor: 'rgba(215, 226, 255, 0.9)', alignSelf: 'center', borderRadius: 16, marginTop: 15, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 15 }}>
                <Image source={require('../assets/images/BoatTS.png')} resizeMode='cover' style={{ width: 45, height: 45, borderRadius: 10 }}></Image>
                <View>
                    <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontSize: 16, fontFamily: 'Roboto-Medium' }}>Get FREE* Hourly Stays</Text>
                    <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontSize: 15, fontFamily: 'Roboto-Medium' }}>12-1 PM | Use Code: GOTREATS</Text>
                </View>
                <View style={{ backgroundColor: 'white', width: 25, height: 25, alignItems: 'center', justifyContent: 'center', borderRadius: 15 }}>
                    <RightarrowIcon width={9} height={10} />
                </View>
            </View>
            <View style={{ backgroundColor: 'rgba(245, 245, 245, 1)', height: 4, width: '100%' }}></View>
        </View>
    )
}
export default CouponCode;