import { View,Text,Pressable ,Image, SafeAreaView,ScrollView} from "react-native";
import BackIcon from "../../assets/icon/BackIcon";
import Styles from "../../public/Styles";
import CategoryList from "../../ui/CategoryList";
import BestDeals from "../../ui/BestDeals";
import CouponCode from "../../ui/CouponCode";
import { useCallback, useState } from "react";
import { CommonApi } from "../../Services/common/CommonApi";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import useBackButtonHandler from "../../components/BackHandlerUtils";


function CategoriesExpandScreen({route}){
    const serviceList = route?.params.serviceList;
    const [serviceAllList, setServiceAllList] = useState();
    const [servicePremiumList, setServicePremiumList] = useState();
    const [serviceRecomList, setServiceRecomList] = useState();
    const navigation = useNavigation();
    console.log('serviceList',serviceList);

    useBackButtonHandler(navigation, false);
    useFocusEffect(
        useCallback(() => {
           getAllList();
           getPremiumList();
           getRecomList();
        }, []) 
      );
    function getAllList(){
        CommonApi.getServiceList(serviceList?.id).then((res) => {
            // console.log('res====', res.data.results)
            if(res.status === 200){
                setServiceAllList(res.data.results)
            }
        })
    }
    function getPremiumList(){
        CommonApi.getPremiumService(serviceList?.id).then((res) => {
            // console.log('res====', res.data.results)
            if(res.status === 200){
                setServicePremiumList(res.data.results)
            }
        })
    }
    function getRecomList(){
        CommonApi.getRecommendedService(serviceList?.id).then((res) => {
            console.log('res====', res.data.results[0]?.pickup_point_or_location)
            if(res.status === 200){
                setServiceRecomList(res.data.results)
            }
        })
    }
    return(
        <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
            <View style={{flexDirection:'row'}}>
                <Pressable style={[Styles.backIcon,{marginTop:12,}]} onPress={() => navigation.goBack()}>
                    <BackIcon color='#1B1E28'></BackIcon>
                </Pressable>
                <Text style={{marginTop:25,marginLeft:15, fontSize:14, color:'rgba(25, 28, 29, 0.8)', fontFamily:'Roboto-Medium'}}>{serviceList.name}</Text>
            </View>
            <ScrollView>
                <View>
                    <CouponCode page='Category'/>
                    <CategoryList title='Recommendation' data={serviceRecomList}/>
                    <BestDeals title='Offers'/>
                    <CategoryList title='Premium' data={servicePremiumList}/>
                    <CategoryList title='All' data={serviceAllList}/>
                </View>
            </ScrollView> 
        </SafeAreaView>
    )
}
export default CategoriesExpandScreen;