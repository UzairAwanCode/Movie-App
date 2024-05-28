import React from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import {useNavigation} from '@react-navigation/native'
import { image500 } from "../api/moviedb";

const { width, height } = Dimensions.get("window");

const TrendingMovies = ({ data }) => {
  const navigation = useNavigation();
  const handleClick = (item) => {
    navigation.navigate("Movie", item)
  };
  return (
    <View className="mb-8">
      <Text className="text-white text-xl mx-5 mt-5 mb-1">Trending</Text>
      <View className="items-center">
        <Carousel
          loop
          width={width}
          height={width}
          autoPlay={true}
          data={data}
          mode="parallax"
          parallaxScrollingScale={0.5}
          parallaxScrollingOffset={50}
          scrollAnimationDuration={1000}
          renderItem={({ item }) => (
            <MovieCard item={item} handleClick={handleClick} />
          )}
        />
      </View>
    </View>
  );
};

export default TrendingMovies;

const MovieCard = ({ item, handleClick }) => {
  console.log('Trending Movies Poster Path: ', item.poster_path);
  return (
    <TouchableWithoutFeedback onPress={()=>handleClick(item)}>
      <Image
        // source={require("../assets/images/liverpool.jpg")}
        source={{uri: image500(item.poster_path)}}
        style={{ width: width*0.6, height: height*0.4 }}
        className="rounded-3xl"
      />
    </TouchableWithoutFeedback>
  );
};
