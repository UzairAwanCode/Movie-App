import React, { useState } from "react";
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

const ios = Platform.OS == "ios";


const HomeScreen = () => {
  const [data, setData] = useState([1,2,3,4])
  return ( 
    <View className="flex-1 bg-neutral-800">
      <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
        <View className="flex-row justify-between item-center mx-4">
          <Bars3CenterLeftIcon size="30" color="white" strokeWidth={2} />
          <Text className="text-white text-3xl font-bold">
            <Text style={styles.text}>M</Text>ovies
          </Text>
          <TouchableOpacity>
            <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        <TrendingMovies />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
