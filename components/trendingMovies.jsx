import React, { useState } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import Animated, {
  interpolate,
  useSharedValue,
  useAnimatedStyle,
  Extrapolation,
} from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { useNavigation } from "@react-navigation/native";
import { image500 } from "../api/moviedb";

const { width, height } = Dimensions.get("window");
const CARD_LENGTH = width * 0.64;
const SPACING = width * 0.02;
const SIDECARD_LENGTH = (width * 0.31) / 2;
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const TrendingMovies = ({ data }) => {
  const navigation = useNavigation();
  const [scrollX, setScrollX] = useState(0);
  const handleClick = (item) => {
    navigation.navigate("Movie", item)
    // navigation.navigate("Carosel");
  };
  return (
    <View className="mb-8">
      <Text className="text-white text-xl mx-5 mt-5 mb-1">Trending</Text>
      <View className="items-center">
        <FlatList
          scrollEventThrottle={16}
          decelerationRate={0.8}
          snapToInterval={CARD_LENGTH + SPACING * 1.5}
          disableIntervalMomentum={true}
          disableScrollViewPanResponder={true}
          //   snapToAlignment={"center"}
          horizontal={true}
          data={data}
          renderItem={({ item, index }) => {
            return (
              <MovieCard
                index={index}
                scrollx={scrollX}
                item={item}
                handleClick={handleClick}
              />
            );
          }}
          keyExtractor={(item) => item.id}
          onScroll={(event) => {
            setScrollX(event.nativeEvent.contentOffset.x);
          }}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default TrendingMovies;

const MovieCard = ({ index, scrollx, item, handleClick }) => {
  const size = useSharedValue(0.8);

  const InputRange = [
    (index - 1) * CARD_LENGTH,
    index * CARD_LENGTH,
    (index + 1) * CARD_LENGTH,
  ];

  size.value = interpolate(
    scrollx,
    InputRange,
    [0.8, 1, 0.8],
    Extrapolation.CLAMP
  );

  const opacity = useSharedValue(1);
  const opacityInputRange = [
    (index - 1) * CARD_LENGTH,
    index * CARD_LENGTH,
    (index + 1) * CARD_LENGTH,
  ];
  opacity.value = interpolate(
    scrollx,
    opacityInputRange,
    [0.5, 1, 0.5],
    Extrapolation.CLAMP
  );

  const cardStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scaleY: size.value }],
      opacity: opacity.value,
    };
  });
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <Animated.View
        style={[
          styles.card,
          cardStyle,
          {
            marginLeft: index == 0 ? SIDECARD_LENGTH : SPACING,
            marginRight: index == index+1 ? SIDECARD_LENGTH : SPACING,
          },
        ]}
      >
        <Image
          source={{ uri: image500(item.poster_path) }}
          style={{ width: "100%", height: "100%" }}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_LENGTH,
    height: height * 0.5,
    overflow: "hidden",
    borderRadius: 15,
  },
});

// const MovieCard = ({ index, scrollx, item, handleClick }) => {
//   return (
//     <TouchableWithoutFeedback onPress={() => handleClick(item)}>
//       <Image
//         // source={require("../assets/images/liverpool.jpg")}
//         source={{ uri: image500(item.poster_path) }}
//         style={{ width: width * 0.6, height: height * 0.4 }}
//         className="rounded-3xl"
//       />
//     </TouchableWithoutFeedback>
//   );
// };
