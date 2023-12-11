import { View,Text,Pressable ,Image, SafeAreaView,ScrollView} from "react-native";
import BackIcon from "../../assets/icon/BackIcon";
import Styles from "../../public/Styles";
import CategoryList from "../../ui/CategoryList";
import BestDeals from "../../ui/BestDeals";
import CouponCode from "../../ui/CouponCode";

function CategoriesExpandScreen({route,navigation}){
    const serviceList = route?.params.serviceList;
    console.log('item====', serviceList);
    return(
        <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
            <View style={{flexDirection:'row'}}>
                <Pressable style={[Styles.backIcon,{marginTop:12,}]} onPress={() => navigation.navigate('Home')}>
                    <BackIcon color='#1B1E28'></BackIcon>
                </Pressable>
                <Text style={{marginTop:25,marginLeft:15, fontSize:14, color:'rgba(25, 28, 29, 0.8)', fontFamily:'Roboto-Medium'}}>{serviceList.name}</Text>
            </View>
            <ScrollView>
                <View>
                    <CategoryList title='Nearest Spots'/>
                    <CouponCode page='Category'/>
                    <CategoryList title='Recommendation'/>
                    <BestDeals title='Offers'/>
                    <CategoryList title='Premium'/>
                    <CategoryList title='All'/>
                </View>
            </ScrollView> 
        </SafeAreaView>
    )
}
export default CategoriesExpandScreen;