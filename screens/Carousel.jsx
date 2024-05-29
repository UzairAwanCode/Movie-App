import React, { useState } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  interpolate,
  useSharedValue,
  useAnimatedStyle,
  Extrapolation,
} from "react-native-reanimated";

const {width,height} = Dimensions.get("window");
const CARD_LENGTH = width * 0.64;
const SPACING = width * 0.02;
const SIDECARD_LENGTH = (width * 0.32) / 2;
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const Carousel = () => {
  const [scrollX, setScrollX] = useState(0);
  const DATA = [
    {
      id: 1,
      title: "First Item",
    },
    {
      id: 2,
      title: "Second Item",
    },
    {
      id: 3,
      title: "Third Item",
    },
  ];

  return (
    <SafeAreaView>
      <View>
        <FlatList
          scrollEventThrottle={16}
          decelerationRate={0.8}
          snapToInterval={CARD_LENGTH + SPACING * 1.5}
          disableIntervalMomentum={true}
          disableScrollViewPanResponder={true}
        //   snapToAlignment={"center"}
          horizontal={true}
          data={DATA}
          renderItem={({ item, index }) => {
            return <Item index={index} scrollx={scrollX} />;
          }}
          keyExtractor={(item) => item.id}
          onScroll={(event) => {
            setScrollX(event.nativeEvent.contentOffset.x);
          }}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const Item = ({ index, scrollx }) => {
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

  const cardStyle = useAnimatedStyle(()=>{
    return{
      transform: [{scaleY: size.value}],
      opacity: opacity.value,
    }
  })
  return (
    <Animated.View
      style={[
        styles.card,
        cardStyle,
        {
          marginLeft: index == 0 ? SIDECARD_LENGTH : SPACING,
          marginRight: index == 2 ? SIDECARD_LENGTH : SPACING,
        },
      ]}
    >
      <Image
        source={require("../assets/images/movie_poster.jpg")}
        style={{ width: "100%", height: "100%" }}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_LENGTH,
    height: height*0.5,
    overflow: "hidden",
    borderRadius: 15
  },
});
export default Carousel;
