import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

function ReadMore({ text, limit = 50 }) {
  const [showAllText, setShowAllText] = useState(false);

  const toggleShowText = () => {
    setShowAllText(!showAllText);
  };

  const displayText = showAllText ? text : text.split(" ").slice(0, limit).join(" ") + " ...";

  return (
    <View style={{marginTop:10}}>
      <Text style={{color:'rgba(0, 0, 0, 0.8)', fontSize:12, fontFamily:'Roboto-Regular'}}>{displayText}</Text>
      {text.length > limit && (
        <TouchableOpacity onPress={toggleShowText} style={{marginLeft:'auto'}}>
          <Text style={{ color: "rgba(0, 104, 117, 1)", fontSize:12, fontFamily:'Roboto-Regular' }}>
            {showAllText ? "Less" : "More"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default ReadMore;