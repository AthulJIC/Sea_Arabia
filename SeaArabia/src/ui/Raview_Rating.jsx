import React, {useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import StarActiveIcon from '../assets/icon/StartActiveIcon';
// import StarInactiveIcon from '../assets/icon/StarInactiveIcon';
import ReviewStartIcon from '../assets/icon/ReviewStartIcon';
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const  RaviewRating= () => {
    const navigation = useNavigation();
  const [defaultRating, setDefaultRating] = useState(0);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

    return (
      <View style={styles.customRatingBarStyle}>
        {maxRating?.map((item, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
            //   onPress={() => setDefaultRating(item)}
              onPress={() => navigation.navigate('ReviewScreen')}
              >
              {
                item <= defaultRating ? <StarActiveIcon height={55} width={55}/> : <ReviewStartIcon/>
              }
            </TouchableOpacity>
          );
        })}
      </View>
    );
};

export default RaviewRating;

const styles = StyleSheet.create({
    customRatingBarStyle: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        marginTop: 5,
        marginLseft: 20,
        alignItems:'center',
        justifyContent: 'center'
    },
});
