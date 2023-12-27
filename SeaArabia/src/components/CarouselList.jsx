import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 1);

// const data = [
//   {
//     id: '1',
//     imageUrl: 'https://example.com/image1.jpg',
//   },
//   {
//     id: '2',
//     imageUrl: 'https://example.com/image2.jpg',
//   },
//   {
//     id: '3',
//     imageUrl: 'https://example.com/image3.jpg',
//   },
// ];

const CarouselList = ({data}) => {
  const renderItem = ({ item }) => {
    console.log('item====',item);
    return (
      <View style={styles.item}>
        <Image source={{ uri: item.image }} style={styles.image} resizeMode='stretch' />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        data={data}
        renderItem={renderItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        // loop={true}
        // autoplay={true}
        // autoplayInterval={3000}
        layout={'default'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    width: 'auto',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  image: {
    width: '100%',
    height: 250,
  },
});

export default CarouselList;