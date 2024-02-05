import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import StarActiveIcon from '../assets/icon/StartActiveIcon';
import StarInactiveIcon from '../assets/icon/StarInactiveIcon';
import ReviewStartIcon from '../assets/icon/ReviewStartIcon';

const RatingStar = ({ initialRating = 0 }) => {
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
              <StarActiveIcon height={55} width={55} />
            ) : (
                <ReviewStartIcon/>
            )}
          </View>
        );
      })}
    </View>
  );
};

export default RatingStar;

const styles = StyleSheet.create({
  customRatingBarStyle: {
    // justifyContent: 'flexStart',
    flexDirection: 'row',
    marginTop: 5,
    marginLeft: 20,
    alignItems:'center',
    justifyContent: 'center'
  },
});