import { View, Text, Pressable, Image, ActivityIndicator } from "react-native";
import CustomFlatList from "../components/CustomFlatlist";
import { HomeApi } from "../Services/HomeServices/HomeService";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

function Categories() {
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true)
        HomeApi.GetCategoryList()
            .then(response => {
                console.log("results", response)
                setData(response);
            })
            .catch(error => {
                console.error('Error category list data:', error)
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);
    function categoryHandler(item){
       console.log('item====', item);
      navigation.navigate('CategoriesExpand',{serviceList:item})
    }
    function renderItem({ item }) {
        return (
            <View>
                <Pressable style={{ marginHorizontal: 5 }} onPress={() => categoryHandler(item)}>
                    <Image source={{ uri: item.image }} style={{ width: 115, height: 105, borderRadius: 5 }}
                        onError={(error) => console.error('Image load error:', error)}
                    />
                </Pressable>
                <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontFamily: 'Roboto-Medium', fontSize: 14, textAlign: 'center', marginTop: 10, marginBottom: 15 }}>{item.name}</Text>
                <View style={{ backgroundColor: 'rgba(245, 245, 245, 1)', height: 4, width: '100%' }}></View>
            </View>
        )
    }

    return (
        <View>
            <View style={{ flexDirection: 'row', padding: 15 }}>
                <Text style={{ color: 'rgba(0, 0, 0, 0.8)', fontSize: 16, fontFamily: 'Roboto-Medium' }}>Categories</Text>
                <Pressable style={{ marginLeft: 'auto' }}>
                    <Image source={require('../assets/images/Filter.png')} style={{ height: 28, width: 32 }}></Image>
                </Pressable>
            </View>
            {loading ? <ActivityIndicator size={24} color="#006875" /> :
                <CustomFlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    horizontal={true}
                    numColumns={0}></CustomFlatList>}
        </View>
    )
}

export default Categories;