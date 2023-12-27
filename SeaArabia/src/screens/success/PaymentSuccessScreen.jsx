import { View,Text,Pressable } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

function PaymentSuccessScreen({navigation}){
    return(
        <>
            <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ backgroundColor: 'rgba(0, 104, 117, 1)', width: 90, height: 90, borderRadius: 50, alignItems: 'center', justifyContent: 'center',bottom:70 }}>
                    <Icon
                        name={'check'}
                        size={29}
                        color={'rgba(255, 255, 255, 1)'} />
                </View>
                <Text style={{ color: 'rgba(0, 85, 126, 1)', fontFamily: 'Roboto-Medium', fontSize: 16,bottom:30 }}>Payment Confirmed</Text>
            </View>
            <View style={{ position: 'absolute', bottom: 30, left: 0, right: 0, backgroundColor: 'rgba(255, 255, 255, 1)', paddingBottom: Platform.OS === 'ios' ? 15 : 30, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', marginTop: Platform.OS === 'ios' ? 30 : 10, height: 30 }}>
                    <Pressable style={{ backgroundColor: 'rgba(0, 104, 117, 1)', width: '90%', height: 40, borderRadius: 3, alignItems: 'center', justifyContent: 'center' }} onPress={() => navigation.navigate('Home')}>
                        <Text style={{ color: 'rgba(255, 255, 255, 1)', fontSize: 14, fontFamily: 'Roboto-Bold' }}>Go to Home</Text>
                    </Pressable>
                </View>
            </View>
        </>
    )
}

export default PaymentSuccessScreen;