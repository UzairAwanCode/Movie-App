import axios from 'axios'
import {apiKey} from '../constants'

// endpoints for calling api data
const apiBaseUrl = "https://api.themoviedb.org/3"
const trendingMoviesEndPoint = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`
const upcommingMoviesEndPoint = `${apiBaseUrl}/movie/upcomming?api_key=${apiKey}`
const topRatedMoviesEndPoint = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`

export const image500 = path=> path?`https://image.tmdb.org/t/p/w500${path}`:null
export const image342 = path=> path?`https://image.tmdb.org/t/p/w342${path}`:null
export const image185 = path=> path?`https://image.tmdb.org/t/p/w185${path}`:null

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