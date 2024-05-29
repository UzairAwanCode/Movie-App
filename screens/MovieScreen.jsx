import React, { useEffect, useState } from "react";
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
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/Cast";
import MovieList from "../components/movieList";
import Loadng from "../components/loadng";
import {
  fallbackMoviePostre,
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMoviesDetails,
  image500,
} from "../api/moviedb";

const { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const topMargin = ios ? "" : "mt-3";

const MovieScreen = () => {
  const navigation = useNavigation();
  const { params: item } = useRoute();
  const [isFavourite, toggleFavourite] = useState(false);
  const movieName = "Pirates of the Caribbean: Dead Men Tell No Tales";
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    // console.log(item.id);
    setLoading(true);
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
  }, []);

  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(id);
    if (data) setMovie(data);
    setLoading(false);
  };

  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredits(id);
    if (data && data.cast) setCast(data.cast);
    setLoading(false);
  };

  const getSimilarMovies = async (id) => {
    const data = await fetchSimilarMoviesDetails(id);
    if (data && data.results) setSimilarMovies(data.results);
    setLoading(false);
  };
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
              source={{
                uri: image500(movie?.poster_path) || fallbackMoviePostre,
              }}
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
          {movie.title}
        </Text>

        {/* status, Release date, minutes */}
        {movie?.id ? (
          <Text className="text-neutral-400 font-semibold text-center text-base">
            {movie?.status} · {movie?.release_date?.split("-")[0]} ·{" "}
            {movie?.runtime} min
          </Text>
        ) : null}

        {/* Geners */}
        <View className="flex-row justify-center mx-4 space-x-2">
          {movie?.genres?.map((genre, index) => {
            let lastIndex = index + 1 != movie.genres.length;
            return (
              <Text
                key={index}
                className="text-neutral-400 font-semibold text-base text-center"
              >
                {genre?.name} {lastIndex ? "·" : null}
              </Text>
            );
          })}
        </View>
        {/* description */}
        <Text className="text-neutral-400 tracking-wider mx-4">
          {movie?.overview}
        </Text>
      </View>
      {cast.length > 0 && <Cast cast={cast} navigation={navigation} />}
      {similarMovies.length > 0 && (
        <MovieList
          title="Similar Movies"
          data={similarMovies}
          hideSeeAll={true}
        />
      )}
    </ScrollView>
  );
};

export default MovieScreen;
