import React, { useState } from "react";
import {
  View,
  Text,
  Platform,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { styles, theme } from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/Cast";
import MovieList from "../components/movieList";
import Loadng from "../components/loadng";

const { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const topMargin = ios ? "" : "mt-3";

const MovieScreen = () => {
  const navigation = useNavigation();
  const [isFavourite, toggleFavourite] = useState(false);
  const movieName = "Pirates of the Caribbean: Dead Men Tell No Tales";
  const [cast, setCast] = useState([1, 2, 3, 4, 5]);
  const [similarMovies, setSimilarMovies] = useState([1, 2, 3, 4, 5]);
  const [loading, setLoading] = useState(true);
  setTimeout(()=>{
    setLoading(false)
  }, 2000)
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
      {/* back button and movie poster */}
      <View className="w-full">
        <SafeAreaView
          className={
            "absolute z-20 w-full flex-row justify-between items-center px-4 mx-4" +
            topMargin
          }
        >
          <TouchableOpacity
            style={styles.background}
            className="rounded-xl p-1"
            onPress={() => navigation.goBack()}
          >
            <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
            <HeartIcon
              size="35"
              color={isFavourite ? theme.background : "white"}
            />
          </TouchableOpacity>
        </SafeAreaView>

        {loading ? (
          <Loadng />
        ) : (
          <View>
            <Image
              source={require("../assets/images/movie_poster.jpg")}
              style={{ width, height: height * 0.55 }}
            />
            <LinearGradient
              colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]}
              style={{ width, height: height * 0.4 }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className="absolute bottom-0"
            />
          </View>
        )}
      </View>

      {/* movie details */}
      <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
        <Text className="text-white text-3xl text-center font-bold tracking-wide">
          {movieName}
        </Text>
        <Text className="text-neutral-400 font-semibold text-center text-base">
          Released · 2017 · 150 min
        </Text>
        {/* Geners */}
        <View className="flex-row justify-center mx-4 space-x-2">
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Action ·
          </Text>
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Trill ·
          </Text>
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Comedy{" "}
          </Text>
        </View>
        {/* description */}
        <Text className="text-neutral-400 tracking-wider mx-4">
          To break the curse of Flying Dutchman, Captain Jack Sparrow and Henry
          Turner embark on a mission to find the Trident of Poseidon. They also
          try to stop Captain Salazar who intends to rule the seas.
        </Text>
      </View>
      <Cast cast={cast} navigation={navigation} />
      <MovieList
        title="Similar Movies"
        data={similarMovies}
        hideSeeAll={true}
      />
    </ScrollView>
  );
};

export default MovieScreen;
