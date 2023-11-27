import React, {useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import StarActiveIcon from '../assets/icon/StartActiveIcon';
import StarInactiveIcon from '../assets/icon/StartInactiveIcon';

const  Rating= () => {
  // To set the default Star Selected
  const [defaultRating, setDefaultRating] = useState(0);
  // To set the max number of Stars
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

    return (
      <View style={styles.customRatingBarStyle}>
        {maxRating?.map((item, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => setDefaultRating(item)}>
              {
                item <= defaultRating ? <StarActiveIcon/> : <StarInactiveIcon/>
              }
            </TouchableOpacity>
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
        marginLeft : 20
    },
});
