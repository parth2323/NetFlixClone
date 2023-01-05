//store an API ket in {process.env.API_KEY}
const API_KEY = "Enter__Your__API__Key";
//To get API key, please click this link: https://thetvdb.com/auth/login?redirect=search

const requests = {
  //Fetching different genres
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
  fetchDocsNew: `/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
};

//https://api.themoviedb.org/3/movie/top_rated?api_key=<<api_key>>&language=en-US&page=1
//https://api.themoviedc.org/3/discover/movie?api_key=${API_KEY}&with_genres=99
//https://api.themoviedb.org/3/movie/top_rated?api_key=f81980ff410e46f422d64ddf3a56dddd&language=en-US&page=1

export default requests;
