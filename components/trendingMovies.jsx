import React from 'react';
import { View, Text, Dimensions, TouchableWithoutFeedback, Image } from 'react-native';
// import Carousel from 'react-native-snap-carousel';

const {width, height} = Dimensions.get('window')

const TrendingMovies = ({data}) => {
  return (
    <View className="mb-8">
      <Text className="text-white text-xl mx-5 my-5">Trending</Text>
      {/* <Carousel 
        data={data}
        renderItem={()=> <MovieCard/>}
        firstItem={1}
        inactiveSlideOpacity={0.60}
        sliderWidth={width}
        itemWidth={width*0.62}
        slideStyle={{display:'flex', alignItems:'center'}}
      /> */}
    </View>
  );
}

export default TrendingMovies;

const MovieCard = ()=>{
  return(
    <TouchableWithoutFeedback>
      <Image 
        source={require('../assets/images/liverpool.jpg')}
        style={{width: width*0.6, height: height*0.4}}
        className="rounded-3xl"
      />
    </TouchableWithoutFeedback>
  )
}