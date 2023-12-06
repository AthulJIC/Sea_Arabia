import { View, Text, SafeAreaView, Image, Dimensions, TouchableOpacity } from 'react-native';
import LocationIcon from "../../assets/icon/LocationIcon";
import Rating from "../../ui/Rating";
import GuestIcon from "../../assets/icon/GuestIcon";
import React, { useState } from 'react';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import BackIcon from '../../assets/icon/BackIcon';
import { useNavigation } from '@react-navigation/native';
function ServiceExpandScreen({ route }) {
    const navigation = useNavigation()
    const item = route?.params.item;
    console.log('item====== ServiceExpandScreen', item);
    const [activeIndex, setActiveIndex] = useState(0);
    const nonThumbnailImages = item.service_image.filter(image => !image.is_thumbnail);
    const handleSnapToItem = (index) => {
        setActiveIndex(index);
    };
    return (
        <SafeAreaView>
            <View>
                <TouchableOpacity style={{ position: 'absolute', top: 10, left: 10, zIndex: 1 }} onPress={() => navigation.goBack()}>
                    <BackIcon />
                </TouchableOpacity>

                <Carousel
                    data={nonThumbnailImages}
                    renderItem={({ item: image }) => (
                        <Image
                            source={{ uri: image.thumbnail }}
                            style={{ width: Dimensions.get('window').width, height: 250, resizeMode: 'cover' }}
                        />
                    )}
                    sliderWidth={Dimensions.get('window').width}
                    itemWidth={Dimensions.get('window').width}
                    onSnapToItem={handleSnapToItem}
                />
                <Pagination
                    dotsLength={nonThumbnailImages.length}
                    activeDotIndex={activeIndex}
                    containerStyle={{ position: 'absolute', top: 240, alignSelf: 'center' }}
                    dotStyle={{
                        width: 8,
                        height: 8,
                        borderRadius: 4,
                        marginHorizontal: 5,
                        backgroundColor: 'rgba(0, 104, 117, 1)',
                    }}
                    inactiveDotStyle={{
                        width: 8,
                        height: 8,
                        borderRadius: 4,
                        marginHorizontal: 5,
                        backgroundColor: 'rgba(128, 128, 128, 0.5)',
                    }}
                    inactiveDotOpacity={0.6}
                    inactiveDotScale={0.8}
                />
                <Text style={{ color: 'rgba(0, 104, 117, 1)', fontSize: 16, fontFamily: 'Roboto-Medium', marginTop: 45, marginLeft: 10 }}>{item?.category}</Text>
                <View style={{ flexDirection: 'row', marginLeft: 7, marginTop: 10 }}>
                    <LocationIcon color='rgba(0, 0, 0, 0.8)' />
                    <Text style={{ color: 'rgba(102, 102, 102, 1)', fontSize: 12, fontFamily: 'Roboto-Regular' }}> {item?.pickup_point}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Rating />
                    <Text style={{ color: 'rgba(25, 28, 29, 0.8)', fontSize: 11, fontFamily: 'Roboto-Regular', marginLeft: 'auto', bottom: 17, left: 40 }}>Capacity</Text>
                    <View style={{ right: 20, marginTop: 10, flexDirection: 'row' }}>
                        <GuestIcon />
                        <Text style={{ color: 'rgba(0, 0, 0, 1)', fontSize: 14, fontFamily: 'Roboto-Regular', bottom: 2, left: 2 }}>{item?.capacity} People</Text>
                    </View>
                </View>

            </View>
        </SafeAreaView>
    )
}

export default ServiceExpandScreen;




