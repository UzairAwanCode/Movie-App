import React from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";

const { width, height } = Dimensions.get("window");

const TrendingMovies = ({ data }) => {
  return (
    <View className="mb-8">
      <Text className="text-white text-xl mx-5 my-5">Trending</Text>
      <View className="items-center">
        <Carousel
          loop
          width={width * 0.62}
          height={width / 2}
          autoPlay={true}
          data={data}
          mode="parallax"
          parallaxScrollingScale={0.5}
          parallaxScrollingOffset={50}
          scrollAnimationDuration={1000}
          onSnapToItem={(index) => console.log("Current Index: ", index)}
          renderItem={() => <MovieCard />}
        />
      </View>
    </View>
  );
};

export default TrendingMovies;

const MovieCard = () => {
  return (
    <TouchableWithoutFeedback>
      <Image
        source={require("../assets/images/liverpool.jpg")}
        style={{ width: width * 0.6, height: height * 0.4 }}
        className="rounded-3xl"
      />
    </TouchableWithoutFeedback>
  );
};
