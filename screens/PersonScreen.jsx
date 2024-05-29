import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Platform,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../theme";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import MovieList from "../components/movieList";
import Loadng from "../components/loadng";
import { fallbackPersonImage, fetchPersonDetails, fetchPersonMovies, image342 } from "../api/moviedb";

const { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const verticalMargin = ios ? "" : "my-3";

const PersonScreen = () => {
  const navigation = useNavigation();
  const {params: item} = useRoute()
  const [isFavourite, toggleFavourite] = useState(false);
  const [personMovies, setpersonMovies] = useState([]);
  const [person, setPerson] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
    setLoading(true)
    getPersonDetails(item.id)
    getPersonMovies(item.id)
  },[item])

  const getPersonDetails = async(id)=>{
    const data = await fetchPersonDetails(id)
    if(data)  setPerson(data)
    setLoading(false)
  }

  const getPersonMovies = async(id)=>{
    const data = await fetchPersonMovies(id)
    if(data && data.cast)  setpersonMovies(data.cast)

  }
  return (
    <ScrollView className="flex-1 bg-neutral-900">
      {/* back button*/}
      <SafeAreaView
        className={
          "z-20 w-full flex-row justify-between items-center px-4 mx-4" +
          verticalMargin
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
          <HeartIcon size="35" color={isFavourite ? "red" : "white"} />
        </TouchableOpacity>
      </SafeAreaView>

      {/* person details */}
      {loading ? (
        <Loadng/>
      ) : (
        <View>
          <View
            className="flex-row justify-center"
            style={{
              shadowColor: "gray",
              shadowRadius: 40,
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 1,
            }}
          >
            <View className="align-center overflow-hidden h-70 w-70 rounded-full border-2 border-neutral-500">
              <Image
                source={{uri: image342(person?.profile_path) || fallbackPersonImage}}
                style={{ width: width * 0.74, height: height * 0.36 }}
              />
            </View>
          </View>

          <View className="mt-6">
            <Text className="text-white text-3xl font-bold text-center">
              {person?.name}
            </Text>
            <Text className="text-neutral-500 text-base text-center">
              {person?.place_of_birth}
            </Text>
          </View>

          <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full">
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Gender</Text>
              <Text className="text-neutral-300 text-sm">{person?.gender===1?'Female' : 'Male'}</Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Birthday</Text>
              <Text className="text-neutral-300 text-sm">{person?.birthday}</Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Known for</Text>
              <Text className="text-neutral-300 text-sm">{person?.known_for_department}</Text>
            </View>
            <View className="px-2 items-center">
              <Text className="text-white font-semibold">Popularity</Text>
              <Text className="text-neutral-300 text-sm">{person?.popularity?.toFixed(2)}</Text>
            </View>
          </View>

          <View className="my-6 mx-4 space-y-2">
            <Text className="text-white text-lg">Biography</Text>
            <Text className="text-neutral-400 tracking-wide">
              {person?.biography || "N/A"}
            </Text>
          </View>

          <MovieList title="Movies" hideSeeAll={true} data={personMovies} />
        </View>
      )}
      
    </ScrollView>
  );
};

export default PersonScreen;
