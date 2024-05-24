import React from "react";
import {
  View,
  Text,
  Platform,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { styles } from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const topMargin = ios ? "" : "mt-3";

const MovieScreen = () => {
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
      {/* back button */}
      <View className="w-full">
        <SafeAreaView className={"w-full flex-row justify-between items-center px-4 mx-4" + topMargin}>
          <TouchableOpacity
            style={styles.background}
            className="rounded-xl px-1"
          >
            <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </ScrollView>
  );
};

export default MovieScreen;
