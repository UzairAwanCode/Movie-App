import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
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

const { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const verticalMargin = ios ? "" : "my-3";

const PersonScreen = () => {
  const navigation = useNavigation();
  const [isFavourite, toggleFavourite] = useState(false);
  const [personMovies, setpersonMovies] = useState([1, 2, 3, 4]);
  const [loading, setLoading] = useState(true);
  setTimeout(()=>{
    setLoading(false)
  }, 2000)
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
                source={require("../assets/images/johnny_depp.jpg")}
                style={{ width: width * 0.74, height: height * 0.36 }}
              />
            </View>
          </View>

          <View className="mt-6">
            <Text className="text-white text-3xl font-bold text-center">
              Johnny Depp
            </Text>
            <Text className="text-neutral-500 text-base text-center">
              Owensboro, Kentucky, United States
            </Text>
          </View>

          <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full">
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Gender</Text>
              <Text className="text-neutral-300 text-sm">Male</Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Birthday</Text>
              <Text className="text-neutral-300 text-sm">1963-06-09</Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Known for</Text>
              <Text className="text-neutral-300 text-sm">Acting</Text>
            </View>
            <View className="px-2 items-center">
              <Text className="text-white font-semibold">Popularity</Text>
              <Text className="text-neutral-300 text-sm">55</Text>
            </View>
          </View>

          <View className="my-6 mx-4 space-y-2">
            <Text className="text-white text-lg">Biography</Text>
            <Text className="text-neutral-400 tracking-wide">
              John Christopher Depp II is an American actor and musician. He is
              the recipient of multiple accolades, including a Golden Globe
              Award as well as nominations for three Academy Awards and two
              BAFTA awards.
            </Text>
          </View>

          <MovieList title="Movies" hideSeeAll={true} data={personMovies} />
        </View>
      )}
      
    </ScrollView>
  );
};

export default PersonScreen;
