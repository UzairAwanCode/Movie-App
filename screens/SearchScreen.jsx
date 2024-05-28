import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { XMarkIcon } from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";
import Loadng from "../components/loadng";

const { width, height } = Dimensions.get("window");

const SearchScreen = () => {
  const navigation = useNavigation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const movieName = "Pirates of the Caribbean: Dead Men Tell No Tales";
  setTimeout(()=>{
    setLoading(false)
  }, 2000)
  return (
    <SafeAreaView className="flex-1 bg-neutral-800">
      <View className="mx-4 mb-3 flex-row border border-neutral-500 rounded-full justify-between item-center">
        <TextInput
          placeholder="Search Movie"
          placeholderTextColor={"lightgray"}
          className="text-white pb-1 pl-6 text-base font-semibold tracking-wider flex-1"
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          className="bg-neutral-500 rounded-full p-3 m-1"
        >
          <XMarkIcon size="25" color="white" />
        </TouchableOpacity>
      </View>

      {/* Results */}
      {loading ? (
        <Loadng />
      ) : results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className="space-y-3"
        >
          <Text className="text-white font-semibold ml-1">
            Results ({results.length})
          </Text>
          <View className="flex-row justify-between flex-wrap">
            {results.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => navigation.push("Movie", item)}
                >
                  <View className="space-y-2 mb-4">
                    <Image
                      className="rounded-3xl"
                      source={require("../assets/images/movie_poster.jpg")}
                      style={{ width: width * 0.44, height: height * 0.3 }}
                    />
                    <Text className="text-neutral-300 ml-1">
                      {movieName.length > 22
                        ? movieName.slice(0, 22) + "..."
                        : movieName}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-row justify-center">
          <Image
            source={require("../assets/images/3909718.jpg")}
            className="h-96 w-96"
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;
