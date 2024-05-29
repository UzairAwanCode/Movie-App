import axios from 'axios'
import {apiKey} from '../constants'

// endpoints for calling api data
const apiBaseUrl = "https://api.themoviedb.org/3"
const trendingMoviesEndPoint = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`
const upcommingMoviesEndPoint = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`
const topRatedMoviesEndPoint = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`
const searchMoviesEndPoint = `${apiBaseUrl}/search/movie?api_key=${apiKey}`

//dynamc endpoints
const movieDetailsEndPoint = (id)=>`${apiBaseUrl}/movie/${id}?api_key=${apiKey}`
const movieCreditsEndPoint = (id)=>`${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`
const similarMoviesEndPoint = (id)=> `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`
const personDetailsEndPoint = (id)=> `${apiBaseUrl}/person/${id}?api_key=${apiKey}`
const personMoviesEndPoint = (id)=> `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`

export const image500 = path=> path?`https://image.tmdb.org/t/p/w500${path}`:null
export const image342 = path=> path?`https://image.tmdb.org/t/p/w342${path}`:null
export const image185 = path=> path?`https://image.tmdb.org/t/p/w185${path}`:null

export const fallbackMoviePostre = "https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg"
export const fallbackPersonImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0161E4B3KTS7o&usqp=CAU"


const apiCall = async(endpoint, params)=>{
    const options = {
        method: "GET",
        url: endpoint,
        params: params ? params : {}
    }

    try {
        const response = await axios.request(options)
        return response.data
    } catch (error) {
        console.log("Error in apiCall: ", error);
        return {}
    }
}

export const fetchTrendingMovies = async()=>{
    return await apiCall(trendingMoviesEndPoint)
}

export const fetchUpCommingMovies = async()=>{
    return await apiCall(upcommingMoviesEndPoint)
}

export const fetchTopRatedMovies = async()=>{
    return await apiCall(topRatedMoviesEndPoint)
}

export const fetchMovieDetails = async(id)=>{
    return await apiCall(movieDetailsEndPoint(id))
}

export const fetchMovieCredits = async(id)=>{
    return await apiCall(movieCreditsEndPoint(id))
}

export const fetchSimilarMoviesDetails = async(id)=>{
    return await apiCall(similarMoviesEndPoint(id))
}

export const fetchPersonDetails = async(id)=>{
    return await apiCall(personDetailsEndPoint(id))
}

export const fetchPersonMovies = async(id)=>{
    return await apiCall(personMoviesEndPoint(id))
}

export const searchMovies = async(params)=>{
    return await apiCall(searchMoviesEndPoint, params)
}