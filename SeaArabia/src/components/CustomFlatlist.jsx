import React from 'react';
import { FlatList } from 'react-native';

const CustomFlatList = ({ data, renderItem, keyExtractor, horizontal ,numColumns,...props }) => {
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      horizontal = {horizontal}
      showsHorizontalScrollIndicator={false}
      {...props}
      style={{width:'98%',alignSelf:'center'}}
      numColumns={numColumns}
    />
  );
};

export default CustomFlatList;