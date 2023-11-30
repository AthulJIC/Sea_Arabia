import { Pressable, SafeAreaView, Text, View } from 'react-native';
import BackIcon from '../../assets/icon/BackIcon';
import Styles from '../../public/Styles';

function RegisterUserScreen({navigation}){
    return (
        <SafeAreaView style={{backgroundColor:'white', flex:1}}>
           <Pressable style={Styles.backIcon} onPress={() => navigation.navigate('User')}>
              <BackIcon color='#1B1E28'></BackIcon>
           </Pressable>
           <View style={{alignItems:'center',top:70}}>
            <Pressable style={Styles.userButton} onPress={() => navigation.navigate('SignIn')}>
                <Text style={Styles.userText}>Existing User</Text>
            </Pressable>
            <Pressable style={Styles.userButton} onPress={() => navigation.navigate('SignUp') }>
                <Text style={Styles.userText}>New User</Text>
            </Pressable>
           </View>
        </SafeAreaView>
    );
};

export default RegisterUserScreen; 