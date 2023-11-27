import React from 'react';
import { FlatList } from 'react-native';

const CustomFlatList = ({ data, renderItem, keyExtractor, horizontal,...props }) => {
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      horizontal = {horizontal}
      showsHorizontalScrollIndicator={false}
      {...props}
      style={{width:'98%',alignSelf:'center'}}
    />
  );
};

export default CustomFlatList;