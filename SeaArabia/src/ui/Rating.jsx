import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import StarActiveIcon from '../assets/icon/StartActiveIcon';
import StarInactiveIcon from '../assets/icon/StarInactiveIcon';

const Rating = ({ initialRating = 0 }) => {
  const [defaultRating, setDefaultRating] = useState(initialRating);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

  useEffect(() => {
    setDefaultRating(initialRating);
  }, [initialRating]);

  return (
    <View style={styles.customRatingBarStyle}>
      {maxRating?.map((item, key) => {
        return (
          <View key={item}>
            {item <= defaultRating ? (
              <StarActiveIcon height={13} width={14} />
            ) : (
              <StarInactiveIcon />
            )}
          </View>
        );
      })}
    </View>
  );
};

export default Rating;

const styles = StyleSheet.create({
  customRatingBarStyle: {
    justifyContent: 'flexStart',
    flexDirection: 'row',
    marginTop: 5,
    marginLeft: 20,
  },
});