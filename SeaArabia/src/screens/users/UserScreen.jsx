import { Pressable, SafeAreaView, Text, View } from 'react-native';
import BackIcon from '../../assets/icon/BackIcon';
import Styles from '../../public/Styles';

function UserScreen({navigation}){
    return (
        <SafeAreaView style={{backgroundColor:'white', flex:1}}>
           <View style={[Styles.backIcon,{marginTop:15,}]}>
              <BackIcon color='#1B1E28'></BackIcon>
           </View>
           <View style={{alignItems:'center',top:70}}>
            <Pressable style={Styles.userButton} onPress={() => navigation.navigate('HomeScreen')}>
                <Text style={Styles.userText}>Guest User</Text>
            </Pressable>
            <Pressable style={Styles.userButton} onPress={() => navigation.navigate('RegisterUser')}>
                <Text style={Styles.userText}>Register User</Text>
            </Pressable>
            <Pressable style={Styles.userButton}>
                <Text style={Styles.userText}>Premium User</Text>
            </Pressable>
           </View>
        </SafeAreaView>
    );
};

export default UserScreen; 