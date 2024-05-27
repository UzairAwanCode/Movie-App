import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";

const Cast = ({ cast, navigation }) => {
  const personName = "Johnny Depp";
  const characterName = "Jack Sparrow";
  return (
    <View className="my-6">
      <Text className="text-white text-lg mx-4 mb-5">Top Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {cast &&
          cast.map((person, index) => {
            return (
              <TouchableOpacity key={index} className="mr-4 items-center" onPress={()=>navigation.navigate("Person", person)}>
                <View className="overflow-hidden rounded-full w-35 h-30 border border-neutral-500">
                  <Image
                    className="rounded-2xl h-20 w-20"
                    source={require("../assets/images/johnny_depp.jpg")}
                  />
                </View>

                <Text className="text-white text-xs mt-1">
                  {characterName.length > 10
                    ? characterName.slice(0, 10) + "..."
                    : characterName}
                </Text>
                <Text className="text-neutral-400 text-xs mt-1">
                  {personName.length > 10
                    ? personName.slice(0, 10) + "..."
                    : personName}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default Cast;
