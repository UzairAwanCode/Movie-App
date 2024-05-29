import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { styles } from "../theme";
import TrendingMovies from "../components/trendingMovies";
import MovieList from "../components/movieList";
import { useNavigation } from "@react-navigation/native";
import Loadng from "../components/loadng";
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpCommingMovies } from "../api/moviedb";

const ios = Platform.OS == "ios";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [trending, setTrending] = useState([]);
  const [upComming, setUpComming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    getTrendingMovies()
    getUpcommingMovies()
    getTopRatedMovies()
  },[])

  const getTrendingMovies = async()=>{
    const data = await fetchTrendingMovies()
    if(data && data.results){
      setTrending(data.results)
    }
    setLoading(false)
  }

  const getUpcommingMovies = async()=>{
    const data = await fetchUpCommingMovies()
    if(data && data.results){
      setUpComming(data.results)
    }
  }

  const getTopRatedMovies = async()=>{
    const data = await fetchTopRatedMovies()
    if(data && data.results){
      setTopRated(data.results)
    }
  }
  return (
    <View className="flex-1 bg-neutral-800">
      <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
        <View className="flex-row justify-between item-center mx-4">
          <Bars3CenterLeftIcon size="30" color="white" strokeWidth={2} />
          <Text className="text-white text-3xl font-bold">
            <Text style={styles.text}>M</Text>ovies
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {loading ? (
        <Loadng />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {trending.length>0 && <TrendingMovies data={trending}/>}
          <MovieList title="Upcomming" data={upComming} />
          <MovieList title="Top Rated" data={topRated} />
        </ScrollView>
      )}
    </View>
  );
};

export default HomeScreen;
