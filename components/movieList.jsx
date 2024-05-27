import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from "react-native";
import { styles } from "../theme";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const MovieList = ({ title, data, hideSeeAll }) => {
  let movieName = "Ant-Man and thr wasp: Quantmonaia";
  const navigation = useNavigation();

  return (
    <View className="mb-4 space-y-4">
      <View className="flex-row justify-between mx-4 align-center">
        <Text className="text-white text-xl">{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text className="text-lg" style={styles.text}>
              See All
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.push("Movie", item)}
            >
              <View className="space-y-1 mr-4">
                <Image
                  source={require("../assets/images/liverpool.jpg")}
                  style={{ width: width * 0.33, height: height * 0.22 }}
                  className="rounded-3xl"
                />
                <Text className="text-neutral-300 ml-1">
                  {movieName.length > 14
                    ? movieName.slice(0, 14) + "..."
                    : movieName}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default MovieList;
