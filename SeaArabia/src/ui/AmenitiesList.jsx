import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import CustomFlatList from "../components/CustomFlatlist";

function AmenitiesList({ data }) {
  console.log('data====',typeof data);
  const [showAllRows, setShowAllRows] = useState(false);
  const initialRowCount = 6;

  function renderItem({ item }) {
    return (
      <View>
        <View
          style={{
            backgroundColor: "rgba(248, 248, 248, 1)",
            width: 100,
            height: 100,
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
            margin: 6,
          }}
        >
          <Image
            source={{ uri : item.image}}
            style={{ width: 50, height: 50 }}
            resizeMode="contain"
          />
          <Text
            style={{
              color: "rgba(0, 0, 0, 0.8)",
              fontSize: 12,
              fontFamily: "Roboto-Regular",
              marginTop: 5,
            }}
          >
            {item.name}
          </Text>
        </View>
      </View>
    );
  }

  const displayedData =
    data.length <= initialRowCount ? data : showAllRows ? data : data.slice(0, initialRowCount);

  return (
    <View>
      <CustomFlatList
        data={displayedData}
        horizontal={false}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        renderItem={renderItem}
      />
      {data.length > initialRowCount && (
        <View style={{ alignSelf: 'center' }}>
          {!showAllRows ? (
            <TouchableOpacity onPress={() => setShowAllRows(true)}>
              <Image
                source={require("../assets/images/DownArrow.png")}
                style={{ width: 25, height: 25 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setShowAllRows(false)}>
              <Image
                source={require("../assets/images/UpArrow.png")}
                style={{ width: 25, height: 25 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

export default AmenitiesList;